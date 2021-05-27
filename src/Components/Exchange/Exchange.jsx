import React, { useEffect, useState } from "react";
import { Container, Dropdown, Spinner } from "react-bootstrap";
import { exchangeHistorySparkline, exchangeRates } from "../../API/api";
import CoinInput from "./CoinInput";
import s from "./Exchange.module.css";
import SparklineExhange from "./SparklineExhange";
import { connect } from "react-redux";
import { setDataSparklineThunk, setActiveEl } from "../../redux/exchange-reducer";

const Exchange = (props) => {
  //debugger
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [exchangeRate, setExchangeRate] = useState();
  const [indexFromCurrency, setIndexFromCurrency] = useState(0);
  const [indexToCurrency, setIndexToCurrency] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  const [sparklineDataFrom, setSparklineDataFrom] = useState();
  const [sparklineDataTo, setSparklineDataTo] = useState();

  //first load
  useEffect(() => {
    exchangeRates().then((response) => {
      setCurrencyOptions([...response.data.map((el) => el.currency)]);
      setExchangeRate([...response.data.map((el) => el.rate)]);
      setFromCurrency(response.data[0].currency);
      setToCurrency(response.data[0].currency);
      let date = new Date();
    date.setDate(date.getDate() - 7);
    props.setDataSparklineThunk(fromCurrency, toCurrency, date.toISOString());
    });
  }, []);
  //console.log(fromCurrency,toCurrency )

  useEffect(() => {
    let date = new Date();
    date.setDate(date.getDate() - 7);
    props.setDataSparklineThunk(fromCurrency, toCurrency, date.toISOString());
  }, [fromCurrency, toCurrency]);

  //useEffect(() => {
  //  exchangeHistorySparkline(toCurrency).then((res) => {
  //    //debugger
  //    setSparklineDataTo(res.data);
  //  });
  //}, [toCurrency]);

  //console.log(sparklineDataTo);

  if (exchangeRate !== undefined) {
    //console.log(exchangeRate[indexFromCurrency], exchangeRate[indexToCurrency]);
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

  
  console.log(fromCurrency, toCurrency)
  const getData1 = () => {
    console.log(fromCurrency, toCurrency)
    let date = new Date();
    date.setDate(date.getDate() - 3);
    props.setDataSparklineThunk(fromCurrency, toCurrency, date.toISOString());
    
  };

  const getData7 = () => {
    let date = new Date();
    date.setDate(date.getDate() - 7);
    props.setDataSparklineThunk(fromCurrency, toCurrency, date.toISOString());
  };

  const getDataMonth = () => {
    let date = new Date();
    date.setDate(date.getDate() - 31);
    props.setDataSparklineThunk(fromCurrency, toCurrency, date.toISOString());
  };

  const getDataYear = () => {
    var oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 1);
    props.setDataSparklineThunk(
      fromCurrency,
      toCurrency,
      oneYearFromNow.toISOString()
    );
  };

  //useEffect(()=> {
  //
  //}, [indexFromCurrency, indexToCurrency])

  //console.log(indexFromCurrency, indexToCurrency);
  //console.log(fromCurrency, indexToCurrency)

  //console.log(currencyOptions)
  return (
    <div>
      <div className={`${s.inputsContainer} ${s.section}`}>
        <div className={s.inputBox}>
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
        
        <div className={s.equalSign}>
          <div>=</div>
        </div>
        <div className={s.inputBox}>
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
      <Container className={`${s.sparklineBox} ${s.section}`}>
        {props.isLoading ? (
          <Spinner animation="border" />
        ) : (
          <SparklineExhange
            dataFrom={props.sparklineDataFrom}
            dataTo={props.sparklineDataTo}
            setActiveEl={props.setActiveEl}
            activeEl={props.activeEl}
            getData1={getData1}
            getData7={getData7}
            getDataMonth={getDataMonth}
            getDataYear={getDataYear}
          />
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sparklineDataFrom: state.exchangePage.sparklineDataFrom,
    sparklineDataTo: state.exchangePage.sparklineDataTo,
    isLoading: state.exchangePage.isLoading,
    activeEl: state.exchangePage.activeEl
  };
};

const EchangeContainer = connect(mapStateToProps, { setDataSparklineThunk, setActiveEl })(
  Exchange
);
export default EchangeContainer;
