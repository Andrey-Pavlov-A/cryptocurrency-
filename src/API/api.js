import axios from "axios";

const key = "7be0558d67d197f6e80bc9dd8f7a4c85";
const config = {};

export const currencies = () => {
  return axios
    .get(`https://api.nomics.com/v1/currencies/ticker?key=${key}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      setTimeout(currencies, 3000);
    });
};

export const currenciesPerPage = (currentPage, itemsPerPage) => {
  return axios
    .get(
      `https://api.nomics.com/v1/currencies/ticker?key=${key}&per-page=${itemsPerPage}&page=${currentPage}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      setTimeout(currenciesPerPage, 2000);
    });
};

export const currenciesMetadata = (id) => {
  return axios
    .get(`https://api.nomics.com/v1/currencies?key=${key}&ids=${id.replace(/"/g,)}`)
    .then((res) => {
      //debugger
      return res.data;
    });
};

export const sparklineData = (id, fromDate = '2018-04-14T00%3A00%3A00Z') => {
  //debugger
  console.log(fromDate)
  let currentDate = new Date()
  return axios
    .get(`https://api.nomics.com/v1/currencies/sparkline?key=${key}&ids=${id.replace(/"/g,)}&start=${fromDate}&end=${currentDate.toISOString()}`)
    .then((res) => {
      //debugger
      return res.data[0];
    });
};