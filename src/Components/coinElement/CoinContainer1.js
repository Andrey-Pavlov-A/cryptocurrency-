import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  setCoinsThunkCreator,
  setPageThunkCreator,
  setSetTotalPagesThunkCreator
} from "../../redux/coin-reducer";
import CoinBlock from "./coinElement";
import s from "./CoinElement.module.css";

const CoinElement = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  const [pageNumberLimit, setPageNumberLimit] = useState(10);

  useEffect(() => {
    props.setPageThunkCreator(1, itemsPerPage);
    props.setSetTotalPagesThunkCreator()
  }, []);

  //console.log(props.coins);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.coins.slice(indexOfFirstItem, indexOfLastItem);

  const CoinBlockElem = props.coins.map((el) => (
    <CoinBlock
      name={el.name}
      img={el.logo_url}
      price={el.price}
      price_change_prc={
        el["1d"] !== undefined
          ? el["1d"].price_change_pct
          : el["7d"] !== undefined ? el["7d"].price_change_pct  : el["30d"].price_change_pct
      }
      market_cap={el.market_cap ? el.market_cap : NaN}
    />
  ));
  console.log(props.coins)
  const amountOfPages = [];

  for (let i = 1; i < Math.ceil(props.totalPages / itemsPerPage); i++) {
    amountOfPages.push(i);
  }

  const currentPageFunc = (el) => {
    props.setPageThunkCreator(+el.target.id, itemsPerPage);
    setCurrentPage(+el.target.id)
  };

  let PaginationEl = amountOfPages.map((el) => {
    if (el > minPageNumberLimit && el <= maxPageNumberLimit) {
      return (
        <li
          key={el}
          name={el}
          id={el}
          onClick={currentPageFunc}
          className={props.currentPage === el && el > 0 ? s.activeEl : null}
        >
          {el}
        </li>
      );
    }
  });

  useEffect(() => {
      setCurrentPage(currentPage)
  }, [props.currentPage])

  const handleNext = () => {
    setCurrentPage(currentPage + 1);

    if (props.currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage-1)
    }
    console.log(currentPage)

    if (props.currentPage - 1 <= minPageNumberLimit && props.currentPage !== 1) {
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

  useEffect(() => {
    props.setPageThunkCreator(currentPage, itemsPerPage);
  }, [currentPage, maxPageNumberLimit, minPageNumberLimit])

  return (
    <div>
      {CoinBlockElem}
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
        {maxPageNumberLimit >= pageNumberLimit ? (
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

const mapStateToProps = (state) => {
  return {
    coins: state.coinsPage.coins,
    currentPage: state.coinsPage.currentPage,
    pages: state.coinsPage.pages,
    totalPages: state.coinsPage.totalPages
  };
};
const CoinContainer1 = connect(mapStateToProps, {
  setCoinsThunkCreator,
  setPageThunkCreator,
  setSetTotalPagesThunkCreator
})(CoinElement);

export default CoinContainer1;
