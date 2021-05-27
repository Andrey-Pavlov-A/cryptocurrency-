import axios from "axios";
import delayAdapterEnhancer from "axios-delay";
import axiosRetry from "axios-retry";

const currentDate = new Date().toISOString()
const key = "7be0558d67d197f6e80bc9dd8f7a4c85";
const api = axios.create({
  adapter: delayAdapterEnhancer(axios.defaults.adapter)
})

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
  let currentDate = new Date()
  console.log(fromDate)
  return api
    .get(`https://api.nomics.com/v1/currencies/sparkline?key=${key}&ids=${id.replace(/"/g,)}&start=${fromDate}&end=${currentDate.toISOString()}`, {delay: 700})
    .then((res) => {
      //debugger
      return res.data[0];
    }).catch(error => {
    })
};

export const exchangeRates = () => {
  return api.get(`https://api.nomics.com/v1/exchange-rates?key=${key}`)
  .then(response => {
    return response
  })
}

export const exchangeRateHistory = () => {
  axios.get('https://api.nomics.com/v1/exchange-rates/history?key=your-key-here&currency=BTC&start=2018-04-14T00%3A00%3A00Z&end=2018-05-14T00%3A00%3A00Z')
  .then(response => {
    return response
  })
}

export const exchangeHistorySparkline = (coin, toDate = '2021-04-14T00%3A00%3A00Z') => {
  //debugger
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() - 1)
  //console.log(toDate)
  return api.get(`https://api.nomics.com/v1/exchange-rates/history?key=${key}&currency=${coin.replace(/"/g,)}&start=${toDate}&end=${currentDate.toISOString()}`, {delay: 1000})
  .then(res => {
    //debugger
    return res.data
  })
}