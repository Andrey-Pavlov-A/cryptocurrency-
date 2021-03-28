import React from 'react'
import { connect } from 'react-redux'
import s from './CoinMarketHeader.module.css'
import {sortByPriceAC, sortByChangePriceAC, sortByMarketCapAC, sortByNameAC} from '../../redux/coin-reducer'


const CoinMarketHeader = (props) => {
    //debugger

    const sortByPrice = () => {
        //debugger
        props.sortByPriceAC(props.isSortByPrice)
    }

    const sortByChangePrice = () => {
        props.sortByChangePriceAC(props.isSortByChangePrice)
    }

    const sortByMarketCap = () =>{
        props.sortByMarketCapAC(props.isSortByMarketCap)
    }

    const sortByName = () =>{
        props.sortByNameAC(props.isSortByName)
    }

    return (
        <div className={s.header}>
            <div className={s.name}>
                <h3 onClick={sortByName}>Name</h3>
            </div>
            <div className={s.price}>
                <h3 onClick={sortByPrice}>Price</h3>
            </div>
            <div className={s.price_change}>
                <h3 onClick={sortByChangePrice}>Price change</h3>
            </div>
            <div className={s.market_cap}>
                <h3 onClick={sortByMarketCap}>Market cap</h3>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        isSortByPrice: state.coinsPage.isSortByPrice,
        isSortByChangePrice: state.coinsPage.isSortByChangePrice,
        isSortByMarketCap: state.coinsPage.isSortByMarketCap,
        isSortByName: state.coinsPage.isSortByName
    }
}

const CoinMarketHeaderContainer = connect(mapStateToProps, {sortByPriceAC, sortByChangePriceAC,
     sortByMarketCapAC, sortByNameAC})(CoinMarketHeader)

export default CoinMarketHeaderContainer
