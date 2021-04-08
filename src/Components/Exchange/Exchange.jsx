import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { exchangeRates } from "../../API/api";
import CoinInput from "./CoinInput";
import s from "./Exchange.module.css";

const Exchange = (props) => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [indexFromCurrency, setIndexFromCurrency] = useState(0);
  const [indexToCurrency, setIndexToCurrency] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  useEffect(() => {
    exchangeRates().then((response) => {
      setCurrencyOptions([...response.data.map((el) => el.currency)]);
      setExchangeRate([...response.data.map((el) => el.rate)]);
      setFromCurrency(response.data[0].currency);
      setToCurrency(response.data[0].currency);
    });
  }, []);

  if (exchangeRate !== undefined) {
    console.log(exchangeRate[indexFromCurrency], exchangeRate[indexToCurrency]);
  }

  let toAmount, fromAmount;
  if (amountInFromCurrency && exchangeRate !== undefined) {
    fromAmount = amount;
    toAmount =
      (amount * exchangeRate[indexFromCurrency]) /
      exchangeRate[indexToCurrency];
  } else if (exchangeRate !== undefined) {
    toAmount = amount;
    fromAmount =
      (amount * exchangeRate[indexToCurrency]) /
      exchangeRate[indexFromCurrency];
  }

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

  //useEffect(()=> {
  //
  //}, [indexFromCurrency, indexToCurrency])

  console.log(indexFromCurrency, indexToCurrency);
  //console.log(fromCurrency, indexToCurrency)

  //console.log(currencyOptions)
  return (
    <div>
      <div className={s.inputsContainer}>
        <div className={s.inputsContainer}>
          <CoinInput
            options={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e) => {
              //setIndexCurrency(e.target.value)
              setFromCurrency(e.target.id.split(",")[0]);
              setIndexFromCurrency(e.target.id.split(",")[1]);
            }}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
          />
        </div>
        <div>=</div>
        <div className={s.inputsContainer}>
          <CoinInput
            options={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e) => {
              setToCurrency(e.target.id.split(",")[0]);
              setIndexToCurrency(e.target.id.split(",")[1]);
            }}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
          />
        </div>
      </div>
    </div>
  );
};

export default Exchange;
