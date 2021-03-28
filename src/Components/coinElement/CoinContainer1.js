import React, { useState, useEffect } from "react";
import { Nav, Pagination, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  setCoinsThunkCreator,
  setPageThunkCreator,
  setSetTotalPagesThunkCreator,
} from "../../redux/coin-reducer";
import {getMetaDataThunkCreator} from '../../redux/metadata-reducer'
import CoinBlock from "./coinElement";
import s from "./CoinElement.module.css";

const CoinPage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  const [pageNumberLimit, setPageNumberLimit] = useState(10);

  useEffect(() => {
    props.setPageThunkCreator(props.currentPage, itemsPerPage);
  }, [currentPage]);
 
  const CoinBlockElem = props.coins
    ? props.coins.map((el) => (
        <CoinBlock
          id={el.id}
          name={el.name}
          img={el.logo_url}
          price={el.price}
          price_change_prc={
            el["1d"] !== undefined
              ? el["1d"].price_change_pct
              : el["7d"] !== undefined
              ? el["7d"].price_change_pct
              : el["30d"].price_change_pct
          }
          market_cap={el.market_cap ? el.market_cap : NaN}
        />
      ))
    : null;

  const amountOfPages = [];

  for (let i = 1; i < Math.ceil(5000 / itemsPerPage); i++) {
    amountOfPages.push(i);
  }

  const currentPageFunc = (el) => {
    props.setPageThunkCreator(+el.target.id, itemsPerPage);
    setCurrentPage(+el.target.id);
  };

  let PaginationEl = amountOfPages.map((el) => {
    if (el > minPageNumberLimit && el <= maxPageNumberLimit) {
      return (
        <NavLink to={'/coins'}>
          <Pagination.Item
            size="sm"
            key={el}
            name={el}
            id={el}
            active={el === props.currentPage}
            onClick={currentPageFunc}
          >
            {el}
          </Pagination.Item>
        </NavLink>
      );
    }
  });

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [props.currentPage]);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);

    if (props.currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

    if (
      props.currentPage - 1 <= minPageNumberLimit &&
      props.currentPage !== 1
    ) {
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
  }, [currentPage, maxPageNumberLimit, minPageNumberLimit]);

  return (
    <div className={props.isDataLoading ? s.spinnerBlock : null}>
      {props.isDataLoading ? (
        <Spinner className={s.spinner} animation="border" />
      ) : (
        <div>
          {CoinBlockElem}
          <ul className={s.pagination}>
            <li>
              <button
                onClick={handlePrev}
                disabled={props.currentPage === 1 ? true : false}
              >
                Prev
              </button>
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
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    coins: state.coinsPage.coins,
    currentPage: state.coinsPage.currentPage,
    pages: state.coinsPage.pages,
    totalPages: state.coinsPage.totalPages,
    isDataLoading: state.coinsPage.isDataLoading,
  };
};
const CoinContainer1 = connect(mapStateToProps, {
  setCoinsThunkCreator,
  setPageThunkCreator,
  setSetTotalPagesThunkCreator,
  getMetaDataThunkCreator,
})(CoinPage);

export default CoinContainer1;
