import { createSelector } from "reselect";
import moment from "moment";

export const convertData = (symbol) => {
    return createSelector(
        (state) => state.data.data,
        (data) => data.filter(x => x.s === symbol).map((d) => ({
          date: moment.utc(d.t).format("YYYY/MM/DD HH:mm:ss"),
          price: d.p,
          symbol: d.s
        })).slice(-10)
    );
}