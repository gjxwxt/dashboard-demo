import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

type EchartsProps = {
  // 定义echarts options
  options: any;
};

const EchartsComponent: React.FC<EchartsProps> = ({ options }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      // 使用 Echarts 渲染图表
      const myChart = echarts.init(chartRef.current);
      myChart.setOption(options);
    }
  }, [options]);

  //创建一个resize事件
  const echartsResize = () => {
    chartRef.current && echarts.init(chartRef.current).resize();
  };

  //页面卸载，销毁监听
  useEffect(() => {
    window.addEventListener('resize', echartsResize);
    return () => window.removeEventListener('resize', echartsResize);
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default EchartsComponent;
