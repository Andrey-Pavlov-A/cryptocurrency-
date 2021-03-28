import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { connect } from "react-redux";
import {getSparklineData} from '../../redux/metadata-reducer'

const Sparkline = (props) => {
  //debugger
  const getData7 = () => {
    let date = new Date()
    date.setDate(date.getDate() - 7)
    
    props.getSparklineData(props.currentCoinId, date.toISOString())
  }

  const getData14 = () => {
    let date = new Date()
    date.setDate(date.getDate() - 14)
    
    props.getSparklineData(props.currentCoinId, date.toISOString())
  }

  const getDataMonth = () => {
    let date = new Date()
    date.setDate(date.getDate() - 31)
    
    props.getSparklineData(props.currentCoinId, date.toISOString())
  }

  const getDataYear = () => {
    var oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 1);
    
    props.getSparklineData(props.currentCoinId, oneYearFromNow.toISOString())
  }

  return (
    <div>
      <div>
        <button onClick={getData7}>7 days</button>
        <button onClick={getData14}>2 weeks</button>
        <button onClick={getDataMonth}>1 month</button>
        <button onClick={getDataYear}>1 year</button>
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
              backgroundColor: 'rgba(27, 171, 58, 0.5)'
            },
          ],
        }}
        options={{
          scales: {
            xAxes: [
              {
                ticks: {
                  display: true,
                  callback: function(value, index, values){
                    console.log(value)
                    let index1 = value.indexOf('T')
                    return value.slice(0, index1)
                  },
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                }
              }
            ]
          }
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sparklineData: state.metaDataPage.sparklineData,
    currentCoinId: state.metaDataPage.currentCoinId
  };
};

const SparklineContainer = connect(mapStateToProps, {getSparklineData})(Sparkline);

export default SparklineContainer;
