import React from "react";
import s from './CoinElement.module.css'

const CoinElement = (props) => {
  //debugger
  if(typeof(props))
  return (
    <div className={s.coinBlock}>
      <div>
        <img src={props.img} />
      </div>
      <div>
        <div>{props.name}</div>
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

export default CoinElement;
