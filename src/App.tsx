import title from '@/assets/title.png';
import Module01 from '@/components/module01';
import Module02 from '@/components/module02';
import Module03 from '@/components/module03';
import Module04 from '@/components/module04';
import Module05 from '@/components/module05';
import Module06 from '@/components/module06';
import SvgIcon from '@/components/svg';
import { useFullscreen } from 'ahooks';

import SvgMap from '@/components/weifangMap';
import { setSizeByScale } from '@/utils';
import { Suspense, useEffect, useRef, useState } from 'react';
import './App.scss';

function App() {
  const titleRef = useRef<HTMLDivElement>(null); // header图

  const [isShow, setIsShow] = useState(false); // 是否显示模块
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.getElementsByTagName('body')[0]); // 是否全屏
  const [iconShow, setIconShow] = useState(false); // 是否显示顶部icon

  const boxContent = useRef<HTMLDivElement>(null); // 内容区域
  const moduleContent = useRef<HTMLDivElement>(null); // 模块内容区域

  const onSecondPlay = () => {
    titleRef.current?.setAttribute('style', 'opacity: 1');
    moduleContent.current?.setAttribute('style', 'display: block');
    initSize();

    setIsShow(true);
  };

  const modules = [
    { title: '大屏可视化小模块标题01', body: Module01 },
    { title: '大屏可视化小模块标题02', body: Module02, isEcharts: true },
    { title: '大屏可视化小模块标题03', body: Module03 },
    { title: '大屏可视化小模块标题04', body: Module04, isEcharts: true },
    { title: '大屏可视化小模块标题05', body: Module05, isEcharts: true },
    { title: '大屏可视化小模块标题06', body: Module06 }
  ];

  function initSize() {
    // 修改rem
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 120 + 'px';
    // 设置模块内容区域大小，为了实现根据当前浏览器视口比例，来实现比例不变，尽可能占满屏幕
    boxContent.current && setSizeByScale(boxContent.current);
  }

  useEffect(() => {
    titleRef.current?.setAttribute('style', 'opacity: 0');
    moduleContent.current?.setAttribute('style', 'display: none');
    window.addEventListener('resize', initSize);
    // resetScreenSize();
    return () => window.removeEventListener('resize', initSize);
  }, []);

  return (
    <div className="container">
      <SvgMap
        onReadyPlay={() => setIconShow(true)}
        onSecondPlay={onSecondPlay}
      ></SvgMap>
      <div
        className="box"
        ref={boxContent}
      >
        <div
          className="box-content"
          ref={moduleContent}
        >
          <div
            className="box-title"
            ref={titleRef}
          >
            <img
              className="box-title-img"
              src={title}
            ></img>
          </div>
          {modules.map((module, index) => (
            <div
              key={index}
              className={`box-title-item box-title-item_${index + 1}`}
            >
              <div className="box-title-item_header">
                <span data-text={module.title}>{module.title}</span>
              </div>
              <div className="box-title-item_body">
                {/* 如果不是echarts，先渲染出来是为了提前加载静态资源，避免加载时出现跳动 */}
                {(!module.isEcharts || isShow) && (
                  <Suspense fallback={<div>Loading...</div>}>{module.body && <module.body />}</Suspense>
                )}
              </div>
            </div>
          ))}
        </div>
        {iconShow && (
          <div
            className="box-fullscreen"
            onClick={toggleFullscreen}
          >
            <SvgIcon
              name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'}
              size="24px"
            ></SvgIcon>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
