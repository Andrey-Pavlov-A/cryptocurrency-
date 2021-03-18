import React, { useEffect, useState } from "react";
import { currencies, currenciesPerPage } from "../../API/api";
import { setCoinsThunkCreator } from "../../redux/coin-reducer";
import CoinMarketHeader from "../CoinMarketHeader/CoinMarketHeader";
import CoinBlock from "./coinElement";
import s from "./CoinElement.module.css";

const CoinElementContainer = () => {
  
  //debugger
  const [coins, setCoins] = useState([]);
  const [totalCoins, setTotalCoins] = useState([]);
  const [pages, setPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [sortPriceDown, setsortPriceDown] = useState(false)

  useEffect(() => {
    return currenciesPerPage().then((res) => {
      setCoins(res.data);
      console.log(res);
      setIsFetching(false);
    });
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = coins.slice(indexOfFirstItem, indexOfLastItem);

  console.log(coins);

  const amountOfPages = [];

  for (let i = 1; i < Math.ceil(coins.length / itemsPerPage); i++) {
    amountOfPages.push(i);
  }

  const currentPageFunc = (el) => {
    setCurrentPage(+el.target.id);
  };

  let PaginationEl = amountOfPages.map((el) => {
    if (el > minPageNumberLimit && el <= maxPageNumberLimit) {
      return (
        <li
          key={el}
          name={el}
          id={el}
          onClick={currentPageFunc}
          className={currentPage === el && el > 0 ? s.activeEl : null}
        >
          {el}
        </li>
      );
    }
  });

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    console.log(currentPage);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    console.log(currentPage);
    console.log(minPageNumberLimit);
    if (currentPage - 1 <= minPageNumberLimit && currentPage !== 1) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleBack = () => {
    setCurrentPage(currentPage - pageNumberLimit);
    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
  };

  const handleFuther = () => {
    setCurrentPage(currentPage + pageNumberLimit);
    setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
  };

  const CoinBlockElem = currentItems.map((el) => (
    <CoinBlock
      name={el.name}
      img={el.logo_url}
      price={el.price}
      price_change_prc={
        el["1d"] !== undefined
          ? el["1d"].price_change_pct
          : el["7d"].price_change_pct
      }
      market_cap={el.market_cap ? el.market_cap : NaN}
    />
  ));


  return (
    <div>
      {isFetching ? "loading..." : CoinBlockElem}
      <ul className={s.pagination}>
        <li>
          <button onClick={handlePrev}>Prev</button>
        </li>
        {minPageNumberLimit >= pageNumberLimit ? (
          <li>
            <button onClick={handleBack}>...</button>
          </li>
        ) : null}
        {PaginationEl}
        {maxPageNumberLimit > pageNumberLimit ? (
          <li>
            <button onClick={handleFuther}>...</button>
          </li>
        ) : null}
        <li>
          <button onClick={handleNext}>Next</button>
        </li>
      </ul>
    </div>
  );
};

export default CoinElementContainer;
