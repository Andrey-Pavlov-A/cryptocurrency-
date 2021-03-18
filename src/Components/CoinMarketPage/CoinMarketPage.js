import React from 'react'
import CoinContainer1 from '../coinElement/CoinContainer1'
import CoinElementContainer from '../coinElement/coinElementContainer'
import CoinMarketHeader from '../CoinMarketHeader/CoinMarketHeader'
import CoinPagination from '../CoinPagination/CoinPagination'

const CoinMarketPage = () => {
    return (
        <div>
            <CoinMarketHeader/>
            <CoinContainer1/>
            <CoinPagination />
        </div>
    )
}

export default CoinMarketPage
