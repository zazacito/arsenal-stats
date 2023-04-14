import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const BarChart = ({ data, title }) => {
  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: title
    },
    xAxis: {
      categories: data.map((item) => item.name),
      title: {
        text: 'Player'
      }
    },
    yAxis: {
      title: {
        text: 'Goals'
      }
    },
    series: [{
      name: 'Goals',
      data: data.map((item) => item.goals)
    }]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>

  );
};

export default BarChart;
