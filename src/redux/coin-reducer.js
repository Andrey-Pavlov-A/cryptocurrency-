import { currencies, currenciesPerPage } from "../API/api"

const SORTCOINS = 'SORT_COINS'
const SETCOINS = 'SET_COINS'
const SETPAGE = 'SET_PAGE'
const SETAMOUNTOFPAGES = 'SET_AMOUNT_OF_PAGES'

let initState ={
    coins:[],
    currentPage: 1,
    pages: 0,
    totalPages: 0
}

const coinReducer = (state = initState, action) => {
    switch (action.type){
        case SETCOINS:
            return{
                ...state,
                coins: action.coins
            }
        case SETPAGE:
            return{
                ...state,
                currentPage: action.currentPage
            }
        case SORTCOINS:
            return{
                ...state
            }
        case SETAMOUNTOFPAGES:
            return{
                ...state,
                totalPages: action.totalPages
            }
        default:
            return state
    }
}


export const setCoinsAC = (coins) => {
    return {
        type: SETCOINS,
        coins
    }
}

export const setCurrentPageAC = (currentPage) => {
    return {
        type: SETPAGE,
        currentPage
    }
}

export const setTotalPagesAC = (totalPages) =>{
    return{
        type: SETAMOUNTOFPAGES,
        totalPages
    }
}

//export const setAmmoutOfPages

export const setPageThunkCreator = (currentPage, itemsPerPage) => async (dispatch) => {
    //debugger
    const response = await currenciesPerPage(currentPage, itemsPerPage)
    dispatch(setCurrentPageAC(currentPage))
    dispatch(setCoinsAC(response))
}

export const setCoinsThunkCreator = () => async (dispatch) => {
    const response = await currencies()
    dispatch(setCoinsAC(response))
}

export const setSetTotalPagesThunkCreator = () => async (dispatch) => {
    const response = await currencies()
    dispatch(setTotalPagesAC(response.length))
}

export default coinReducer