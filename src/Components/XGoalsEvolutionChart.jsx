import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
HC_more(Highcharts);

const XGoalsEvolutionChart = ({ title, data }) => {
  const chartOptions = {
    chart: {
      type: "arearange",
      zoomType: "x",
      height: 500,
      scrollablePlotArea: {
        minWidth: 600,
        scrollPositionX: 1,
      },
    },
    credits: { enabled: false },
    title: {
      text: title,
    },

    xAxis: {
      type: "category",
      categories: data.venues,
      plotBands: data.results,
    },

    yAxis: {
      title: {
        text: null,
      },
    },

    tooltip: {
      crosshairs: true,
      shared: true,
      valueSuffix: "xGoals",
      valueDecimals: 2,
    },

    legend: {
      enabled: true,
    },

    series: [
      {
        name: "XGoals For",
        data: data.for,
        color: "red",
        type: "line",
      },
      {
        name: "XGoals Against",
        data: data.against,
        color: "green",
        type: "line",
      },
    ],
  };
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
};

export default XGoalsEvolutionChart;
