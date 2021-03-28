import { currenciesMetadata, sparklineData } from "../API/api";


const SET_INFO = 'SET_INFO'
const SET_LOADING = 'SET_LOADING'
const SET_COIN_ID = 'SET_COIN_ID'
const SET_SPARKLINE = 'SET_SPARKLINE'

let initState = {
  info: [],
  sparklineData: [],
  isLoading: true,
  currentCoinId: ''
};

const metadataReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_INFO:
      return {
        ...state,
        info: action.info,
      };
    case SET_LOADING:
      return{
        ...state,
        isLoading: action.loading
      }
    case SET_COIN_ID:
      return{
        ...state,
        currentCoinId: action.id
      }
    case SET_SPARKLINE:
      return{
        ...state,
        sparklineData: action.data
      }
    default:
      return state;
  }
};

export const setInfoAC = (info) => {
    return{
        type: SET_INFO,
        info
    }
}

export const setLoadingAC = (loading) => {
    return{
        type: SET_LOADING,
        loading
    }
}

export const setSparklineDataAC = (data) => {
  return{
      type: SET_SPARKLINE,
      data
  }
}

export const setCoinIdAC = (id) => {
  //debugger
  return{
      type: SET_COIN_ID,
      id
  }
}

export const getMetaDataThunkCreator = (id) => async dispatch =>{
    //debugger
    dispatch(setLoadingAC(true))
    let responseMetaData = await currenciesMetadata(id)
    .then(res => {
      dispatch(setInfoAC(res))
      let responseSparklineData = sparklineData(id)
      .then(result => {
        dispatch(setSparklineDataAC(result))
      })
    })
    
    dispatch(setLoadingAC(false))
}

export const getSparklineData = (id, dateFrom) => async dispatch =>{
  //debugger
  let responseSparklineData = sparklineData(id, dateFrom)
  .then(result => {
    dispatch(setSparklineDataAC(result))
  })
}

export default metadataReducer
