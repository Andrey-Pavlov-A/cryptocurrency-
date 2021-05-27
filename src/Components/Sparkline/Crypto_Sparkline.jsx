import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { getSparklineData } from "../../redux/metadata-reducer";
import s from "../Exchange/Exchange.module.css";

const Sparkline = (props) => {
  //debugger
  const getData7 = () => {
    let date = new Date();
    date.setDate(date.getDate() - 7);

    props.getSparklineData(props.currentCoinId, date.toISOString());
  };

  const getData14 = () => {
    let date = new Date();
    date.setDate(date.getDate() - 14);

    props.getSparklineData(props.currentCoinId, date.toISOString());
  };

  const getDataMonth = () => {
    let date = new Date();
    date.setDate(date.getDate() - 31);

    props.getSparklineData(props.currentCoinId, date.toISOString());
  };

  const getDataYear = () => {
    var oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 1);

    props.getSparklineData(props.currentCoinId, oneYearFromNow.toISOString());
  };

  const [buttons, setButtons] = useState({
    activeObjectId: null,
    objects: [
      { id: 1, getData: getData7, name: "7d" },
      { id: 2, getData: getData14, name: "2w" },
      { id: 3, getData: getDataMonth, name: "1m" },
      { id: 4, getData: getDataYear, name: "1y" },
    ],
  });

  const setActive = (name) => {
    //debugger
    props.setActiveEl(name)
  };

  return (
    <div>
      <div className={s.buttonsDate}>
        {buttons.objects.map((el, index) => (
          <button
            className={props.activeEl == el.name ? s.activeEl : s.notActiveEl}
            onClick={() => (setActive(el.name), el.getData())}
          >
            {el.name}
          </button>
        ))}
      </div>
      <Line
        height={30}
        width={60}
        data={{
          labels: props.sparklineData.timestamps,
          datasets: [
            {
              label: "Price",
              data: props.sparklineData.prices,
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
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sparklineData: state.metaDataPage.sparklineData,
    currentCoinId: state.metaDataPage.currentCoinId,
  };
};

const SparklineContainer = connect(mapStateToProps, { getSparklineData })(
  Sparkline
);

export default SparklineContainer;
