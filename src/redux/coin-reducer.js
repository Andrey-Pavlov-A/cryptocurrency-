import { currencies, currenciesPerPage } from "../API/api";

const SORTCOINSBYPRICE = "SORT_COINS";
const SETCOINS = "SET_COINS";
const SETPAGE = "SET_PAGE";
const SETAMOUNTOFPAGES = "SET_AMOUNT_OF_PAGES";
const SORT_COINS_BY_CHANGE_PRICE = "SORT-COINS-BY-CHANGE-PRICE";
const SORT_BY_MARKET_CAP = "SORT_BY_MARKET_CAP";
const SORT_BY_NAME = "SORT_BY_NAME";
const IS_DATA_LOADING = "IS_DATA_LOADING"

let initState = {
  coins: [],
  currentPage: 1,
  pages: 0,
  totalPages: 0,
  isSortByPrice: true,
  isSortByChangePrice: true,
  isSortByMarketCap: true,
  isSortByName: true,
  isDataLoading: false
};

const coinReducer = (state = initState, action) => {
  switch (action.type) {
    case SETCOINS:
      return {
        ...state,
        coins: action.coins,
      };
    case SETPAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SORTCOINSBYPRICE:
      //debugger
      return {
        ...state,
        coins: action.isSort
          ? [
              ...state.coins.sort((a, b) => {
                return +b.price - +a.price;
              }),
            ]
          : [
              ...state.coins.sort((a, b) => {
                return +a.price - +b.price;
              }),
            ],
        isSortByPrice: !state.isSortByPrice,
        isSortByChangePrice: true,
        isSortByMarketCap: true,
        isSortByName: true,
      };
    case SORT_COINS_BY_CHANGE_PRICE:
      //debugger
      return {
        ...state,
        coins:
          action.isSort && state.coins["1d"] !== undefined
            ? state.coins
            : action.isSort
            ? [
                ...state.coins.sort((a, b) => {
                  return +b["1d"].price_change_pct - +a["1d"].price_change_pct;
                }),
              ]
            : [
                ...state.coins.sort((a, b) => {
                  return +a["1d"].price_change_pct - +b["1d"].price_change_pct;
                }),
              ],
        isSortByChangePrice: !state.isSortByChangePrice,
        isSortByMarketCap: true,
        isSortByName: true,
        isSortByPrice: true,
      };
    case SORT_BY_MARKET_CAP:
      return {
        ...state,
        coins: action.isSort
          ? [
              ...state.coins.sort((a, b) => {
                return +b.market_cap - +a.market_cap;
              }),
            ]
          : [
              ...state.coins.sort((a, b) => {
                return +a.market_cap - +b.market_cap;
              }),
            ],
        isSortByMarketCap: !state.isSortByMarketCap,
        isSortByPrice: true,
        isSortByChangePrice: true,
        isSortByName: true,
      };
    case SORT_BY_NAME:
      //debugger
      return {
        ...state,
        coins: action.isSort
          ? [
              ...state.coins.sort((a, b) => {
                if (a.name < b.name) return -1;
              }),
            ]
          : [...state.coins.reverse()],
        isSortByName: !state.isSortByName,
        isSortByPrice: true,
        isSortByChangePrice: true,
        isSortByMarketCap: true,
      };
    case IS_DATA_LOADING:
      return{
        ...state,
        isDataLoading: action.isDataLoading
      }
    case SETAMOUNTOFPAGES:
      return {
        ...state,
        totalPages: action.totalPages,
      };
    default:
      return state;
  }
};

export const isDataLoadingAC = (isDataLoading) => {
  return {
    type: IS_DATA_LOADING,
    isDataLoading
  };
};

export const setCoinsAC = (coins) => {
  return {
    type: SETCOINS,
    coins,
  };
};

export const setCurrentPageAC = (currentPage) => {
  return {
    type: SETPAGE,
    currentPage,
  };
};

export const setTotalPagesAC = (totalPages) => {
  return {
    type: SETAMOUNTOFPAGES,
    totalPages,
  };
};

export const sortByPriceAC = (isSort) => {
  return {
    type: SORTCOINSBYPRICE,
    isSort,
  };
};

export const sortByChangePriceAC = (isSort) => {
  return {
    type: SORT_COINS_BY_CHANGE_PRICE,
    isSort,
  };
};

export const sortByMarketCapAC = (isSort) => {
  return {
    type: SORT_BY_MARKET_CAP,
    isSort,
  };
};

export const sortByNameAC = (isSort) => {
  return {
    type: SORT_BY_NAME,
    isSort,
  };
};

export const setPageThunkCreator = (currentPage, itemsPerPage) => async (
  dispatch
) => {
  //debugger
  dispatch(isDataLoadingAC(true))
  const response = await currenciesPerPage(currentPage, itemsPerPage)
  dispatch(isDataLoadingAC(false))
  dispatch(setCurrentPageAC(currentPage));
  if (response !== undefined){
    dispatch(setCoinsAC(response));
  }
  
};

export const setCoinsThunkCreator = () => async (dispatch) => {
  const response = await currencies();
  dispatch(setCoinsAC(response));
};

export const setSetTotalPagesThunkCreator = () => async (dispatch) => {
  const response = await currencies()
  if(response !== undefined){
    dispatch(setTotalPagesAC(response.length));
  }
};

export default coinReducer;
