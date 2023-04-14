import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ScatterChart = ({ data }) => {
  const options = {
    chart: {
      type: "scatter",
      width: 800,
      height: 500,
    },
    title: {
      text: "Arsenal Invincible Season - xG Plot",
    },
    xAxis: {
      title: {
        text: "Distance from goal",
      },
      min: 0,
      max: 100,
      tickInterval: 10,
    },
    yAxis: {
      title: {
        text: "Distance from left post",
      },
      min: 0,
      max: 70,
      tickInterval: 10,
    },
    legend: {
      enabled: true,
    },

    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function () {
        return (
          "<b>" +
          this.point.player +
          "</b><br/>" +
          "xG: " +
          this.point.xG.toFixed(2) +
          "<br/>" +
          "Type: " +
          this.point.type +
          "<br/>" +
          "Outcome: " +
          this.point.outcome
        );
      },
    },
    plotOptions: {
      scatter: {
        turboThreshold: 0,
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.point.player;
          },
          style: {
            textOutline: false,
            fontWeight: "normal",
            fontSize: "12px",
            color: "#ffffff",
          },
        },
      },
    },
    series: [
      {
        name: "Shots",
        data: data,
        color: "red",
        marker: {
          // symbol: function () {
          //   if (this.options.type === "Penalty") {
          //     return "triangle-down";
          //   } else if (this.options.type === "Header") {
          //     return "triangle";
          //   } else {
          //     return "circle";
          //   }
          // },
        },
      },
      // {
      //   name: "Pitch",
      //   type: "scatter",
      //   data: [{ x: 50, y: 60 }],
      //   marker: {
      //     symbol: "square",
      //     width: 800,
      //     height: 500,
      //     fillColor: {
      //       pattern: {
      //         path: "M 0 0 L 20 0 L 20 20 L 0 20 Z",
      //         width: 20,
      //         height: 20,
      //         color: "#ffffff",
      //         fillColor: "#5e6a7e",
      //       },
      //     },
      //   },
      // },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default ScatterChart;
