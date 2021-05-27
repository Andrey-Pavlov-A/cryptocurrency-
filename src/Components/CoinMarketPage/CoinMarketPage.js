import React from 'react'
import { connect } from 'react-redux'
import CoinContainer1 from '../coinElement/CoinContainer1'
import CoinMarketHeaderContainer from '../CoinMarketHeader/CoinMarketHeader'

const CoinMarketPage = (props) => {
    return (
        <div>
            <div>
                <CoinMarketHeaderContainer/>
                <CoinContainer1/>
            </div>
            
        </div>
    )
}

const maStateToProps = (state) => {
    return {
        isDataLoading: state.coinsPage.isDataLoading
    }
}
const CoinMarketPageContainer = connect(maStateToProps, {})(CoinMarketPage)

export default CoinMarketPageContainer
