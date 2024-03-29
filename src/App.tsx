// import { useState } from 'react';
import title from '@/assets/title.png';
import Module01 from '@/components/module01';
import Module02 from '@/components/module02';
import Module03 from '@/components/module03';
import Module04 from '@/components/module04';
import Module05 from '@/components/module05';
import Module06 from '@/components/module06';

import SvgMap from '@/components/weifangMap';
import { Suspense, useEffect, useRef, useState } from 'react';
import './App.scss';

function App() {
  const titleRef = useRef<HTMLDivElement>(null); // header图

  const [isShow, setIsShow] = useState(false); // 是否显示模块

  const onSecondPlay = () => {
    titleRef.current?.setAttribute('style', 'opacity: 1');
    setIsShow(true);
  };

  const modules = [
    { title: '大屏可视化小模块标题01', body: Module01 },
    { title: '大屏可视化小模块标题02', body: Module02 },
    { title: '大屏可视化小模块标题03', body: Module03 },
    { title: '大屏可视化小模块标题04', body: Module04 },
    { title: '大屏可视化小模块标题05', body: Module05 },
    { title: '大屏可视化小模块标题06', body: Module06 }
  ];

  // 修改rem
  function onResize() {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 120 + 'px';
  }

  useEffect(() => {
    titleRef.current?.setAttribute('style', 'opacity: 0');
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="container">
      <SvgMap
        onReadyPlay={() => console.log('ready')}
        onSecondPlay={onSecondPlay}
      ></SvgMap>
      <div
        className="box-title"
        ref={titleRef}
      >
        <img
          className="box-title-img"
          src={title}
        ></img>
      </div>
      {isShow &&
        modules.map((module, index) => (
          <div
            key={index}
            className={`box-title-item box-title-item_${index + 1}`}
          >
            <div className="box-title-item_header">
              <span data-text={module.title}>{module.title}</span>
            </div>
            <div className="box-title-item_body">
              <Suspense fallback={<div>Loading...</div>}>{module.body && <module.body />}</Suspense>
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;
