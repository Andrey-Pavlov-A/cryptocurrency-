import { Dropdown } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import s from "./Exchange.module.css";

const CoinInput = (props) => {
  //debugger
  const {
    options,
    selectedCurrency,
    onChangeCurrency,
    handleIndex,
    amount,
    onChangeAmount,
  } = props;

  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);

  //useEffect(() => {
  //  valueInput.current.focus();
  //  setActive(!active);
  //  console.log("ljk");
  //}, [valueInput.current]);

  useEffect(() => {
    setSearch('')
  }, [onChangeCurrency])

  const recieveValue = (e) => {
    setSearch(e.target.value);
  };

  const dropMenu = () => {
    setActive(!active);
  };

  let OptionElement = options.map((option, index) => (
    <Dropdown.Item
      onClick={onChangeCurrency}
      name={option}
      index={index}
      id={[option, index]}
    >
      {option}
    </Dropdown.Item>
  ));

  return (
    <div className={s.convertForm}>
      <input type="number" value={amount} onChange={onChangeAmount} className={s.inputNumber}/>
      <div>
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-basic" className={s.dropButton}>
              {selectedCurrency}
            </Dropdown.Toggle>

            <Dropdown.Menu className={s.dropdownSearch}>
              <input
                value={search}
                onChange={recieveValue}
                className={s.searchInput}
                placeholder="Search..."
              />
              {OptionElement.filter((val) => {
                if (search == "") {
                  return val;
                } else if (
                  val.props.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default CoinInput;

{
  /* <select value={selectedCurrency} onChange={onChangeCurrency}>
{options.map((option, index) => <option name={option} id={index} value={[option, index]}>{option}</option>)}
</select> */
}

// filter((val) => {
//     if (search == "") {
//       return val;
//     } else if (val.toLowerCase().includes(search.toLowerCase())) {
//       return val;
//     }
//   })

{
  /* <input value={selectedCurrency}  className={s.inputValue} onClick={dropMenu}/>
        <div ref={valueInput} className={active ? s.dropdownSearch : s.notActive}>
            <input value={search} onChange={recieveValue} className={s.searchInput}/>
            {OptionElement.filter((val) => {
            if (search == "") {
                return val;
            } else if (val.props.name.toLowerCase().includes(search.toLowerCase())){
                return val
            }
            })} */
}
