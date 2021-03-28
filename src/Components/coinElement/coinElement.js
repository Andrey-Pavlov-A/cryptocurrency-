import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import s from './CoinElement.module.css'
import {getMetaDataThunkCreator} from '../../redux/metadata-reducer'
import {setCoinIdAC} from '../../redux/metadata-reducer'

const CoinElement = (props) => {

  const setId = () => {
    props.setCoinIdAC(props.id)
  }

  let url = `/${props.id}`
  if(typeof(props))
  return (
    <div className={s.coinBlock}>
      <div>
        <img src={props.img} />
      </div>
      <div>
        <NavLink onClick={setId} to='/coins/metadata'>
          <div>{props.name}</div>
        </NavLink>
      </div>
      <div>
        <div>${(+props.price).toFixed(3)}</div>
      </div>
      <div>
        <div>{(+props.price_change_prc * 100).toFixed(2)}%</div>
      </div>
      <div>
        {props.market_cap.length >= 13
          ? " $" + +(props.market_cap / 1000000000000).toFixed(3) + "T"
          : true}
        {props.market_cap.length < 13
          ? " $" + +(props.market_cap / 1000000000).toFixed(3) + "B"
          : true}
      </div>
    </div>
  );
};

const CoinElementContainer = connect(null, {getMetaDataThunkCreator, setCoinIdAC})(CoinElement)

export default CoinElementContainer;
