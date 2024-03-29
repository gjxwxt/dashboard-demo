import EchartsComponent from '@/components/echarts';
import React from 'react';

const MyComponent: React.FC = () => {
  const options = {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    grid: {
      left: '2%',
      right: '2%',
      top: '10%',
      bottom: '5%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: 'rgba(50, 216, 205, 1)'
        }
      }
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          show: false
        },
        axisLabel: {
          color: '#fff',
          fontSize: 10
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '',
        padding: 5,
        // max: 1000,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#A1A7B3',
            type: 'solid',
            width: 0.3,
            opacity: 0.5
          }
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 10,
          textStyle: {
            color: '#fff',
            fontSize: 10
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '今日',
        type: 'line',
        smooth: true,
        stack: '总量',
        symbolSize: 5,
        showSymbol: false,
        itemStyle: {
          normal: {
            color: '#23D0C4',
            lineStyle: {
              color: '#23D0C4',
              width: 2
            }
          }
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.5,
                color: '#00b890' // 100% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(57, 196, 166, 0.1)' //   0% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        data: [320, 352, 421, 234, 290, 330, 310, 201, 154, 190, 330, 410]
      }
    ]
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <EchartsComponent options={options} />
    </div>
  );
};

export default MyComponent;
