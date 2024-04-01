import TopIcon1 from '@/assets/icon/01.png';
import TopIcon2 from '@/assets/icon/02.png';
import TopIcon3 from '@/assets/icon/03.png';
import footerIcon2 from '@/assets/icon/a.png';
import footerIcon1 from '@/assets/icon/b.png';
import React from 'react';
import './index.scss';

const Module01: React.FC = () => {
  return (
    <>
      <div className="md1-icon">
        <div className="md1-icon-item">
          <img
            src={TopIcon1}
            alt="标题01"
          />
          <div className="md1-icon-item-title">
            <span className="md1-icon-item-title_num1">9586</span>
            <span className="md1-icon-item-title_text">标题名称</span>
          </div>
        </div>
        <div className="md1-icon-item">
          <img
            src={TopIcon2}
            alt="标题02"
          />
          <div className="md1-icon-item-title">
            <span className="md1-icon-item-title_num2">9586</span>
            <span className="md1-icon-item-title_text">标题名称</span>
          </div>
        </div>
        <div className="md1-icon-item">
          <img
            src={TopIcon3}
            alt="标题03"
          />
          <div className="md1-icon-item-title">
            <span className="md1-icon-item-title_num3">9586</span>
            <span className="md1-icon-item-title_text">标题名称</span>
          </div>
        </div>
      </div>
      <div className="md1-main">
        <div className="md1-main-item">
          <img
            src={footerIcon1}
            alt="供电量"
          />
          <div className="md1-main-item-title">
            <span className="md1-main-item-title_text">供电量</span>
            <span className="md1-main-item-title_num1">9586</span>
          </div>
        </div>
        <div className="md1-main-item">
          <img
            src={footerIcon2}
            alt="供电量"
          />
          <div className="md1-main-item-title">
            <span className="md1-main-item-title_text">供热量</span>
            <span className="md1-main-item-title_num2">9586</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Module01;
