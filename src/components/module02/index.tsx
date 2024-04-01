import EchartsComponent from '@/components/echarts';

const Module02: React.FC = () => {
  const options = {
    label: {
      // {a|{c}}{l|个}\n{per|{b}}\n{sq|一}{per|占比}{b|{d}%}
      formatter: '{a|{a}}\n{b|{b}}',
      rich: {
        a: {
          color: 'rgb(36, 216, 207)',
          fontSize: 16,
          align: 'left'
        },
        b: {
          color: 'white',
          fontSize: 14,
          align: 'center'
        }
      }
    },

    series: [
      {
        name: 'xxxxxx区',
        type: 'pie',
        selectedMode: 'single',
        radius: ['50%', '60%'],
        label: {
          show: false
        },
        data: [
          {
            value: 67,
            name: 'xx.xx%',
            itemStyle: {
              color: 'rgba(102, 204, 255, .6)'
            }
          },
          {
            value: 10,
            name: 'xx.xx%',
            itemStyle: {
              color: 'rgba(51, 255, 187, .6)'
            }
          },
          {
            value: 6,
            name: 'xx.xx%',
            itemStyle: {
              color: 'rgba(255, 236, 140, .6)'
            }
          }
        ]
      },
      {
        name: 'xxxxxx区',
        type: 'pie',
        radius: ['59%', '75%'],
        data: [
          {
            value: 67,
            name: 'xx.xx%',
            itemStyle: {
              color: 'rgba(102, 204, 255, 1)'
            }
          },
          {
            value: 10,
            name: 'xx.xx%',
            itemStyle: {
              color: 'rgba(51, 255, 187, 1)'
            }
          },
          {
            value: 6,
            name: 'xx.xx%',
            itemStyle: {
              color: 'rgba(255, 236, 140, 1)'
            }
          }
        ]
      },

      {
        type: 'gauge',
        center: ['50%', '50%'],
        radius: '45%',
        startAngle: 0,
        endAngle: 360,

        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          distance: 50
        },
        axisLine: {
          lineStyle: {
            width: 2,
            color: [[1, 'rgba(6, 191, 255, 1)']]
          }
        },
        pointer: {
          show: false
        },
        detail: {
          valueAnimation: true,
          width: '100%',
          lineHeight: 30,
          offsetCenter: [0, 0],
          fontSize: 34,
          fontWeight: 'normal',
          color: 'rgba(102, 255, 255, 1)',
          formatter: '{b|总数}\n{a|xxx}',
          rich: {
            a: {
              fontSize: 25,
              fontWeight: 'normal'
            },
            b: {
              fontSize: 15,
              color: '#fff'
            }
          }
        },
        data: [
          {
            value: 89
          }
        ]
      }
    ]
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <EchartsComponent options={options} />
    </div>
  );
};

export default Module02;
