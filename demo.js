
import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import * as d3 from "d3";
import Chart from "../components/Chart";
import DataScrambler from "../components/DataScrambler";

function RecordScreen() {
  const chart_width = 780;
  const chart_height = 380;
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState([]);

  const randomZero = (weight = 1) => {
    return (Math.random() + Math.random() - 1) * weight;
  };

  const generateDefaultData = () => {
    let length = 30; // Displaying a default graph with 30 data points
    let list = [];
    const seedClose = Math.random() * 150 + 50;
    let previousClose = seedClose;
    let previousVolume = Math.random() * 300 + 10;
    let trend = Math.floor(Math.random() * 2) * 2 - 1;

    for (let i = 0; i < length; i++) {
      const open = previousClose * (1 + randomZero(0.1));
      const close = open * (1 + randomZero(0.2) * trend);
      const high = Math.max(open, close) * (1 + randomZero(0.1));
      const low = Math.min(open, close) * (1 - randomZero(0.1));
      const volume = previousVolume * (1 + randomZero(0.5));

      previousClose = close;
      trend = Math.floor(Math.random() * 2) * 2 - 1;

      const newDataItem = {
        time: i,
        open,
        high,
        low,
        close,
        volume,
      };

      list.push(newDataItem);
    }

    return list;
  };

  useEffect(() => {
    // Set initial data when the component mounts
    const initialData = generateDefaultData();
    setData(initialData);
  }, []);

  const generateNewData = () => {
    let length = 60;
    let list = [];
    const seedClose = Math.random() * 150 + 50;
    let previousClose = seedClose;
    let previousVolume = Math.random() * 300 + 10;
    let trend = Math.floor(Math.random() * 2) * 2 - 1;

    const newData = d3.range(length).map((item, i) => {
      const open = previousClose * (1 + randomZero(0.1));
      const close = open * (1 + randomZero(0.2) * trend);
      const high = Math.max(open, close) * (1 + randomZero(0.1));
      const low = Math.min(open, close) * (1 - randomZero(0.1));
      const volume = previousVolume * (1 + randomZero(0.5));

      previousClose = close;
      trend = Math.floor(Math.random() * 2) * 2 - 1;

      const newDataItem = {
        time: i,
        open,
        high,
        low,
        close,
        volume,
      };

      list.push(newDataItem);
      return newDataItem;
    });

    setData(newData);
    console.log("New data generated");
    return newData;
  };

  const onClickButtonHandler = () => {
    generateNewData();
    setIsClicked(true);
  };

  const changeData = () => {
    generateNewData();
    setIsClicked(false);
  };

  const onRevertButtonHandler = () => {
    setIsClicked(false);
    console.log("Revert clicked");
  };

  const displayedData = isClicked ? data : data.slice(0, 29);
  const content = (
    <Chart
      data={displayedData}
      width={isClicked ? chart_width * 1.5 : chart_width}
      height={isClicked ? chart_height * 1.12 : chart_height}
    />
  );

  return (
    <div className="header">
      <div>
        <h1 className="header"> Japanese Candlestick Simulation</h1>
      </div>
      <div>RecordScreen</div>
      <div className="center">{content}</div>

      <div>
        <button onClick={onRevertButtonHandler} className="buttons">
          Back List
        </button>
        <button onClick={onClickButtonHandler} className="buttons">
          Full list
        </button>
        <button onClick={changeData} className="buttons">
          New Data
        </button>
      </div>
      <div className="main"></div>
    </div>
  );
}

export default RecordScreen;
