import EchartsComponent from '@/components/echarts';
import React from 'react';

const Module05: React.FC = () => {
  const yList = [61, 86, 67, 43, 52, 70];
  const colors = [
    {
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#11A6D0'
        },
        {
          offset: 1,
          color: '#11A6D0'
        },
        {
          offset: 0,
          color: '#83bac9'
        },
        {
          offset: 0,
          color: 'rgba(17,166,208,0.3)'
        }
      ]
    },
    {
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#11A6D0'
        },
        {
          offset: 1,
          color: '#11A6D0'
        },
        {
          offset: 0,
          color: '#83bac9'
        },
        {
          offset: 0,
          color: 'rgba(17,166,208,0.3)'
        }
      ]
    },
    {
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#11A6D0'
        },
        {
          offset: 1,
          color: '#11A6D0'
        },
        {
          offset: 0,
          color: '#83bac9'
        },
        {
          offset: 0,
          color: 'rgba(17,166,208,0.3)'
        }
      ]
    },
    {
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#11A6D0'
        },
        {
          offset: 1,
          color: '#11A6D0'
        },
        {
          offset: 0,
          color: '#83bac9'
        },
        {
          offset: 0,
          color: 'rgba(17,166,208,0.3)'
        }
      ]
    },
    {
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#11A6D0'
        },
        {
          offset: 1,
          color: '#11A6D0'
        },
        {
          offset: 0,
          color: '#83bac9'
        },
        {
          offset: 0,
          color: 'rgba(17,166,208,0.3)'
        }
      ]
    },
    {
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#11A6D0'
        },
        {
          offset: 1,
          color: '#11A6D0'
        },
        {
          offset: 0,
          color: '#83bac9'
        },
        {
          offset: 0,
          color: 'rgba(17,166,208,0.3)'
        }
      ]
    },
    {
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#11A6D0'
        },
        {
          offset: 1,
          color: '#11A6D0'
        },
        {
          offset: 0,
          color: '#83bac9'
        },
        {
          offset: 0,
          color: 'rgba(17,166,208,0.3)'
        }
      ]
    },
    {
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#11A6D0'
        },
        {
          offset: 1,
          color: '#11A6D0'
        },
        {
          offset: 0,
          color: '#83bac9'
        },
        {
          offset: 0,
          color: 'rgba(17,166,208,0.3)'
        }
      ]
    },
    {
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#00FFFF'
        },
        {
          offset: 0.5,
          color: '#11A6D0'
        },
        {
          offset: 1,
          color: '#11A6D0'
        },
        {
          offset: 0,
          color: '#83bac9'
        },
        {
          offset: 0,
          color: 'rgba(17,166,208,0.3)'
        }
      ]
    }
  ];
  const options = {
    backgroundColor: 'rgba(0,0,0,0)',
    grid: {
      left: '2%',
      right: '2%',
      top: '10%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      nameTextStyle: {
        color: '#00dcf1',
        padding: [0, 0, 0, 20]
      },
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      show: true,
      type: 'category',
      axisLabel: {
        // rotate: -30, // 设置文字旋转
        fontSize: 10,
        lineHeight: 24,
        fontFamily: 'siyuan',
        // fontStyle: 'italic', // 设置文字斜体
        //改变刻度字体样式
        color: '#fff'
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      show: true,
      splitNumber: 4,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#A1A7B3',
          type: 'solid',
          width: 0.3,
          opacity: 0.5
        }
      },
      axisLabel: {
        show: true,
        margin: 10,
        color: '#fff',
        fontSize: 10
      },
      axisTick: {
        //y轴刻度线
        show: false
      },
      axisLine: {
        //y轴
        show: false
      }
    },
    series: [
      {
        type: 'bar',
        barWidth: '20',
        showBackground: true,
        backgroundStyle: {
          color: 'none'
        },
        itemStyle: {
          color: function (params: { dataIndex: number }) {
            //console.log(params)
            return colors[params.dataIndex % 7];
          }
        },
        label: {
          show: false,
          position: [10.5, -25],
          color: '#fff',
          fontSize: 12,
          fontStyle: 'bold',
          align: 'center'
        },

        data: yList
      },
      {
        z: 2,
        type: 'pictorialBar',
        data: yList,
        symbol: 'diamond',
        symbolOffset: [0, '50%'],
        symbolSize: [20, 5],
        itemStyle: {
          color: function (params: { dataIndex: number }) {
            return colors[params.dataIndex % 7];
          }
        }
      },
      {
        z: 3,
        type: 'pictorialBar',
        symbolPosition: 'end',
        data: yList,
        symbol: 'diamond',
        symbolOffset: [0, '-50%'],
        symbolSize: [20, 20 * 0.25],
        itemStyle: {
          borderWidth: 0,
          color: function (params: { dataIndex: number }) {
            return colors[params.dataIndex % 7].colorStops[0].color;
          }
        }
      }
    ]
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <EchartsComponent options={options} />
    </div>
  );
};

export default Module05;
