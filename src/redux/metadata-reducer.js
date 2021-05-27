import {
  currenciesMetadata,
  getMetaData,
  markets,
  sparklineData,
} from "../API/api";

const SET_INFO = "SET_INFO";
const SET_LOADING = "SET_LOADING";
const SET_COIN_ID = "SET_COIN_ID";
const SET_SPARKLINE = "SET_SPARKLINE";
const SET_MARKET = "SET_MARKET";
const SET_ACTIVE_EL = "SET_ACTIVE_EL";
const SET_LOADING_SPARKLINE = "SET_LOADING_SPARKLINE";

let initState = {
  info: [],
  sparklineData: [],
  isLoading: true,
  currentCoinId: "",
  marketData: [],
  activeEl: "",
  isSpaklineLoaded: false,
};

const metadataReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_INFO:
      return {
        ...state,
        info: action.info,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.loading,
      };
    case SET_COIN_ID:
      return {
        ...state,
        currentCoinId: action.id,
      };
    case SET_SPARKLINE:
      return {
        ...state,
        sparklineData: action.data,
      };
    case SET_MARKET:
      return {
        ...state,
        marketData: action.data,
      };
    case SET_ACTIVE_EL:
      return {
        ...state,
        activeEl: action.elName,
      };
    case SET_LOADING_SPARKLINE:
      //debugger
      return {
        ...state,
        isSpaklineLoaded: action.loading,
      };
    default:
      return state;
  }
};

export const setInfoAC = (info) => {
  return {
    type: SET_INFO,
    info,
  };
};

export const setLoadingAC = (loading) => {
  return {
    type: SET_LOADING,
    loading,
  };
};

export const setSparklineDataAC = (data) => {
  return {
    type: SET_SPARKLINE,
    data,
  };
};

export const setCoinIdAC = (id) => {
  //debugger
  return {
    type: SET_COIN_ID,
    id,
  };
};

export const setMarketAC = (data) => {
  //debugger
  return {
    type: SET_MARKET,
    data,
  };
};

export const setActiveEl = (elName) => {
  //debugger
  return {
    type: SET_ACTIVE_EL,
    elName,
  };
};

export const setLoadindOfSparkline = (loading) => {
  //debugger
  return {
    type: SET_LOADING_SPARKLINE,
    loading,
  };
};

export const getMetaDataThunkCreator = (id) => async (dispatch) => {
  //debugger
  dispatch(setLoadingAC(true));
  let responseMetaData = await currenciesMetadata(id).then((res) => {
    dispatch(setInfoAC(res));
  });
  let responseSparklineData = await sparklineData(id).then((result) => {
    dispatch(setSparklineDataAC(result));
  });
  dispatch(setLoadingAC(false));
};

export const getSparklineData = (id, dateFrom) => async (dispatch) => {
  //debugger
  dispatch(setLoadindOfSparkline(true))
  let responseSparklineData = await sparklineData(id, dateFrom).then((result) => {
    dispatch(setSparklineDataAC(result));
  });
  dispatch(setLoadindOfSparkline(false))
};

export default metadataReducer;

