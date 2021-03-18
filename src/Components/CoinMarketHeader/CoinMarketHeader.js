import React from 'react'
import s from './CoinMarketHeader.module.css'

const CoinMarketHeader = (props) => {
    //debugger
    return (
        <div className={s.header}>
            <div className={s.name}>
                <h3>Name</h3>
            </div>
            <div className={s.price}>
                <h3>Price</h3>
            </div>
            <div className={s.price_change}>
                <h3>Price change</h3>
            </div>
            <div className={s.market_cap}>
                <h3>Market cap</h3>
            </div>
        </div>
    )
}

export default CoinMarketHeader
