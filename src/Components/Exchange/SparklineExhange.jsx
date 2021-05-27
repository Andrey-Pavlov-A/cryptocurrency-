import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import s from "./Exchange.module.css";

const SparklineExhange = (props) => {
  //debugger
  const rateArr = [];
  const timeArr = [];
  if (props.dataFrom !== undefined && props.dataTo !== undefined) {
    for (let i = 0; i < props.dataFrom.length; i++) {
      if (props.dataFrom[i] !== undefined && props.dataTo[i] !== undefined) {
        //debugger
        rateArr.push(+props.dataFrom[i].rate / +props.dataTo[i].rate);
        timeArr.push(props.dataFrom[i].timestamp);
      }
    }
  }

  const [buttons, setButtons] = useState({
    activeObjectId: null,
    objects: [
      { id: 1, getData: props.getData1, name: "3d" },
      { id: 2, getData: props.getData7, name: "7d" },
      { id: 3, getData: props.getDataMonth, name: "1m" },
      { id: 4, getData: props.getDataYear, name: "1y" },
    ],
  });

  let [indexx, setIndexx] = useState(null);

  useEffect(() => {
    //setIndexx(3)
  }, [indexx]);

  const setActive = (name) => {
    //debugger
    props.setActiveEl(name);
  };

  return (
    <div className={s.try}>
      <span className={s.buttonsDate}>
        {buttons.objects.map((el, index) => (
          <button
            className={props.activeEl == el.name ? s.activeEl : s.notActiveEl}
            onClick={() => (setActive(el.name), el.getData())}
          >
            {el.name}
          </button>
        ))}
      </span>
      <Line
        height={40}
        width={"100%"}
        data={{
          labels: timeArr,
          datasets: [
            {
              label: "Price",
              data: rateArr,
              backgroundColor: "rgba(255,193,7, 0.5)",
            },
          ],
        }}
        options={{
          scales: {
            xAxes: [
              {
                ticks: {
                  display: true,
                  callback: function (value, index, values) {
                    let index1 = value.indexOf("T");
                    return value.slice(0, index1);
                  },
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default SparklineExhange;
