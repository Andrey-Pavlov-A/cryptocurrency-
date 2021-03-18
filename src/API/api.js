import axios from "axios";

const key = "7be0558d67d197f6e80bc9dd8f7a4c85";
const config = {};

export const currencies = () => {
  return axios
    .get(`https://api.nomics.com/v1/currencies/ticker?key=${key}`)
    .then((response) => {
      return response.data;
    });
};

export const currenciesPerPage = (currentPage, itemsPerPage) => {
  return axios
    .get(
      `https://api.nomics.com/v1/currencies/ticker?key=${key}&per-page=${itemsPerPage}&page=${currentPage}`
    )
    .then((res) => {
      return res.data;
    });
};
