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

  const graphEur = useMemo(
    () => ({
      labels: valuesEur.map(x => x.date),
      datasets: [
        {
          label: "ETHERIUM/EUR",
          data: valuesEur.map(x => x.price),
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
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
          label: "ETHERIUM/USD",
          data: valuesUsd.map(x => x.price),
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
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
          Note: Only last 10 update are displayed in the chart.
        </Typography>
        <Grid item xs={12} spacing={1} container>
          <Grid item xs={6}>
            <Line data={graphEur} />
          </Grid>
          <Grid item xs={6}>
            <Line data={graphUsd} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
