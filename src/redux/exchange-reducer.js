import { exchangeHistorySparkline } from "../API/api";

const SET_DATA_FROM = 'SET_DATA_FROM'
const SET_DATA_TO = 'SET_DATA_TO'
const SET_OPTIONS = 'SET_OPTIONS'
const SET_ACTIVE_ELEM = 'SET_ACTIVE_ELEM'

let initState = {
  sparklineDataFrom: [],
  sparklineDataTo: [],
  options: [],
  exchangeRates: [],
  isLoading: false,
  activeEl: ''
};

const exchangeReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_DATA_FROM:
      return {
        ...state,
        sparklineDataFrom: action.data
      };
    case SET_DATA_TO:
      return{
        ...state,
        sparklineDataTo: action.data
      }
    case SET_OPTIONS:
        return{
            ...state,
            isLoading: action.isLoading
        }
    case SET_ACTIVE_ELEM:
        return{
          ...state,
          activeEl: action.nameEl
        }
    default:
      return state;
  }
};

export const setDataFromAC = (data) => {
    return{
        type: SET_DATA_FROM,
        data
    }
}

export const setDataToAC = (data) => {
    return{
        type: SET_DATA_TO,
        data
    }
}

export const setLoading = (isLoading) => {
    return{
        type: SET_OPTIONS,
        isLoading
    }
}

export const setActiveEl = (nameEl) => {
  return{
      type: SET_ACTIVE_ELEM,
      nameEl
  }
}

//Нужно объеденить это как-то в один санкер, но проблема что у нас два массива данных, и два разных запроса (с разными коинами)
export const setDataSparklineThunk = (coinFrom, coinTo, toDate) => async dispatch => {
  //debugger
    dispatch(setLoading(true))
    await exchangeHistorySparkline(coinFrom, toDate)
    .then(res => {
      //debugger
        dispatch(setDataFromAC(res))
    })
    await exchangeHistorySparkline(coinTo, toDate)
    .then(res => {
        dispatch(setDataToAC(res))
    })
    dispatch(setLoading(false))
}

//export const setDataSparklineToThunk = (coin, toDate) => async dispatch => {
//    await exchangeHistorySparkline(coin, toDate)
//    .then(res => {
//        dispatch(setDataToAC(res))
//    })
//}

export default exchangeReducer
