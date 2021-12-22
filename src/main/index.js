import React from 'react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { initSocketConnection, onSocketMessage, unsubscribeSocket } from '../utils';
import { convertData } from '../selectors';
import { updateSymbol } from '../actions';

import { Line } from "react-chartjs-2";
import { AppBar, Box, Typography, Toolbar, Grid } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const symbols = ['BINANCE:ETHEUR', 'BINANCE:ETHUSDT'];
  const valuesEur = useSelector(convertData(symbols[0]));
  const valuesUsd = useSelector(convertData(symbols[1]));

  const options = {
    animation: {
      duration: 0
    }
  }

  const graphEur = useMemo(
    () => ({
      labels: valuesEur.map(x => x.date),
      datasets: [
        {
          label: "ETHEREUM/EUR",
          data: valuesEur.map(x => x.price),
          fill: true,
          backgroundColor: "rgba(104, 136, 252,0.2)",
          borderColor: "rgba(104, 136, 252,1)"
        },
      ]
    }),
    [valuesEur]
  );

  const graphUsd = useMemo(
    () => ({
      labels: valuesUsd.map(x => x.date),
      datasets: [
        {
          label: "ETHEREUM/USD",
          data: valuesUsd.map(x => x.price),
          fill: true,
          backgroundColor: "rgba(76, 166, 93,0.2)",
          borderColor: "rgba(76, 166, 93,1)"
        },
      ]
    }),
    [valuesUsd]
  );

  // 1. listen for a cpu event and update the state
  useEffect(() => {
    const socket = initSocketConnection(symbols);

    onSocketMessage(socket, (data) => {
      if(data.type === 'trade'){
        dispatch(updateSymbol(data));
      }
    })

    return () => {
      unsubscribeSocket(socket, symbols);
    }
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar spacing={5}>
          <Typography variant="h6" component="div">
            Finnhub Crypto
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100%",
          marginTop: '10%'
        }}
      >
        <Typography variant="h6" component="div" sx={{ textAlign: 'center', marginBottom: '10px' }}>
          Note: Only last 10 updates are displayed in the chart.
        </Typography>
        <Grid item xs={12} spacing={1} container>
          <Grid item xs={6}>
            <Line data={graphEur} options={options} />
          </Grid>
          <Grid item xs={6}>
            <Line data={graphUsd} options={options} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
