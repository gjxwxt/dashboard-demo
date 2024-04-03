import '@/components/weifangMap/index.css';
import React, { useEffect, useRef, useState } from 'react';

import { setSizeByScale } from '@/utils';

type SvgMapOptions = {
  // 开始播放，第二个开始播放，视频列表，地图svg，
  onReadyPlay?: () => void;
  onSecondPlay?: () => void;
  onPathClick?: (data: HTMLOrSVGElement) => void;
  pathHoverStyle?: React.CSSProperties; // svg path 鼠标移入后的样式
  videoList: string[]; // 视频列表，每个元素是视频的路径
  children: React.ReactNode; // slot, 地图svg，抛出点击事件，参数是地区信息
};

const SvgMap: React.FC<SvgMapOptions> = ({
  onSecondPlay,
  onReadyPlay,
  onPathClick,
  videoList,
  pathHoverStyle,
  children
}) => {
  const [playVideoTag, setPlayVideoTag] = useState(true); // class 控制video显示隐藏
  const [video1CanPlay, setVideo1CanPlay] = useState<boolean>(false); // 第一个视频准备好播放
  const [video2CanPlay, setVideo2CanPlay] = useState<boolean>(false); // 第二个视频准备好播放
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBacRef = useRef<HTMLVideoElement>(null);
  const svgRef = useRef<HTMLDivElement>(null); // 地图svg
  const svgNameRef = useRef<HTMLDivElement>(null); // 地图标记svg

  // 修改svgRef的宽高，并将svgNameRef的宽高也等于它
  const initSize = () => {
    svgRef.current && setSizeByScale(svgRef.current);
    svgNameRef.current && setSizeByScale(svgNameRef.current);
  };

  // 先加载视频等待、svg添加鼠标事件
  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.oncanplaythrough = () => {
          setVideo1CanPlay(true);
          videoRef.current?.pause();
        };
      }
      if (videoBacRef.current) {
        videoBacRef.current.oncanplaythrough = () => {
          setVideo2CanPlay(true);
          videoBacRef.current?.pause();
        };
        // 第二个视频循环播放
        videoBacRef.current.ontimeupdate = () => {
          // 如果该播放而且被暂停了，继续播放
          if (videoBacRef.current?.paused) {
            videoBacRef.current?.play();
          }
        };
      }
    };

    const heightLight = () => {
      const svg = svgRef.current?.children[0];
      if (svg) {
        const paths = svg.querySelectorAll('path');
        paths.forEach((path: SVGPathElement) => {
          path.style.cursor = 'pointer';
          path.style.fill = 'rgba(255,255,255,0)';
          path.onmouseover = () => {
            pathHoverStyle &&
              Object.keys(pathHoverStyle).forEach(key => {
                // @ts-expect-error Explanation: xxx
                path.style[key] = pathHoverStyle[key];
              });
          };
          path.onmouseleave = () => {
            path.style.fill = 'rgba(255,255,255,0)';
          };
          path.onclick = () => onPathClick?.(path);
        });
      }
    };

    heightLight(); // 地图svg移入移除和点击事件
    playVideo();
    initSize();
    window.addEventListener('resize', initSize);
    return () => window.removeEventListener('resize', initSize);
  }, []);

  // 可以开始播放后开始播放
  useEffect(() => {
    // 开始播放
    if (video1CanPlay && video2CanPlay) {
      onReadyPlay?.();
      videoRef.current?.play();
    }
  }, [video1CanPlay, video2CanPlay]);

  // 第二个视频开始播放
  const handleEnded = () => {
    setPlayVideoTag(false);
    onSecondPlay?.();
    videoBacRef.current?.play();
  };

  return (
    <>
      <video
        ref={videoRef}
        className={`banner-inner-video ${!playVideoTag ? 'video-hide' : ''}`}
        onEnded={handleEnded}
        autoPlay
        muted
        src={videoList[0]}
      ></video>
      <video
        ref={videoBacRef}
        className={`banner-inner-video ${playVideoTag ? 'video-hide' : ''}`}
        autoPlay
        muted
        src={videoList[1]}
      ></video>
      <div
        className={`map-svg-box ${playVideoTag ? 'video-hide' : ''}`}
        ref={svgRef}
      >
        {children}
      </div>
      <div
        className={`map-svg-box  map-svg-box-name ${playVideoTag ? 'animation-paused' : ''}`}
        ref={svgNameRef}
      >
        <svg
          version="1.1"
          id="图层_1"
          x="0px"
          y="0px"
          viewBox="0 0 595.3 419.5"
          className="map-svg"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs id="defs187" />
          <g id="g10">
            <path
              className="st0"
              d="M267.9,159.9h-1l1.4-2.7h1L267.9,159.9z M269.3,155.4v1.7h-1v-1.7H269.3z M268.9,159.1l2.2-0.3l-0.2,0.8   l-2.2,0.3L268.9,159.1z M269.7,153.6v1.7h-1v-1.7H269.7z M269.7,156l0.1-0.3l1.1-2.1h0.8l-1.2,2.2h0.3l0.7-1.2h0.8l-1,1.7l-0.2,0.2   l-1,1.1h1l-0.2,0.8h-2.1l0.2-0.8l0.9-1h-0.6L269.7,156z M273,153.7h0.9l-0.5,0.9h2.1l-0.2,0.8h-0.7l-0.2,0.7h0.7l-0.2,0.8h-0.7   l-0.2,0.7h0.7l-0.2,0.8h-0.7l-0.2,0.8h0.7l-0.2,0.8H271l0.9-3.2h-0.5L273,153.7z M272.8,159.1l0.2-0.8h-0.7l-0.2,0.8H272.8z    M273.2,157.6l0.2-0.7h-0.7l-0.2,0.7H273.2z M273.6,156.1l0.2-0.7h-0.7l-0.2,0.7H273.6z M275,153.6v0.9h-0.9v-0.9H275z"
              id="path4"
            />
            <path
              className="st0"
              d="M275.1,158.8l0.5-0.1l0.7-2.5h-0.5l0.2-0.8h0.5l0.5-1.9h1.1l-0.5,1.9h0.5l-0.2,0.8h-0.5l-0.6,2.4l0.5-0.1   l-0.2,0.8l-2.1,0.2L275.1,158.8z M282.1,154.3h0.4v-0.7h0.7v0.7h0.3l-0.2,0.8h-1.2v1.8l1.1-1.1l-0.3,1l-0.9,0.8v2.3h-1.1v-1.2   l-0.8,0.7l0.3-1l0.5-0.5v-2.8h-1.4l-0.4,1.2h1.5l-0.9,3.3h-1.4l0.2-0.7h0.5l0.5-1.8H279l-0.9,2.9H277l1.8-5.6h2.2v-0.7h1.1V154.3z"
              id="path6"
            />
            <path
              className="st0"
              d="M291.1,154.6h-5.2l-1.2,4.5h5.4l-0.2,0.8h-6.5l1.6-6.1h6.4L291.1,154.6z M287.2,156.8l-1.1-1.7h1.4l0.6,1   l1.1-1h1.4l-2,1.7l1.2,1.9h-1.4l-0.7-1.1l-1.3,1.1H285L287.2,156.8z"
              id="path8"
            />
          </g>
          <g id="g18">
            <path
              className="st0"
              d="M306.8,157.8h3.1l0.1-0.5h-2.5l0.2-0.7h2.5l0.1-0.4h1.1l-0.1,0.4h2.5l-0.2,0.7h-2.5l-0.1,0.5h3.1l-0.2,0.7   h-7.3L306.8,157.8z M312.1,152.8h3.1l-0.2,0.7h-1.2l1,1.2h-1.5l-0.4-0.4l-0.2,0.7h-1.1l-0.1,0.4h3l-0.2,0.7h-7.1l0.2-0.7h3l0.1-0.4   h-1.1l0.1-0.5l-0.4,0.3h-1.6l1.8-1.2H308l0.2-0.7h2.2l0.8-0.6h1.6L312.1,152.8z M310.9,154.2l0.1-0.4h1.1l-0.1,0.4h1l-0.6-0.7H311   l-1.1,0.7H310.9z"
              id="path12"
            />
            <path
              className="st0"
              d="M323,153.7h-0.8l-0.6,2.1l-2.1,1.2l2.1,1.6h-1.8l-1.3-1.1l-1.9,1.1h-1.9l3-1.6l-1.5-1.2l0.6-2.1H316l0.2-0.8h3   v-0.6h1.1v0.6h2.9L323,153.7z M318.8,156.4l1.9-1l0.4-1.6h-3.3l-0.4,1.6L318.8,156.4z"
              id="path14"
            />
            <path
              className="st0"
              d="M330.9,153.3h-5.2l-1.2,4.5h5.4l-0.2,0.8h-6.5l1.6-6.1h6.4L330.9,153.3z M327,155.5l-1.1-1.7h1.4l0.6,1l1.1-1   h1.4l-2,1.7l1.2,1.9h-1.4l-0.7-1.1l-1.3,1.1h-1.4L327,155.5z"
              id="path16"
            />
          </g>
          <linearGradient
            id="SVGID_1_"
            gradientUnits="userSpaceOnUse"
            x1="278.9"
            y1="161.4213"
            x2="278.9"
            y2="171.6099"
          >
            <stop
              offset="0.1359"
              style={{ stopColor: '#2776F9' }}
              id="stop20"
            />
            <stop
              offset="1"
              style={{ stopColor: '#47E9FA' }}
              id="stop22"
            />
          </linearGradient>
          <path
            className="st1"
            d="M276,168.6c-1.6-1.6-1.6-4.2,0-5.8s4.2-1.6,5.8,0s1.6,4.2,0,5.8l-2.9,2.9L276,168.6L276,168.6z M280.1,167  c0.7-0.7,0.7-1.8,0-2.5s-1.8-0.7-2.5,0s-0.7,1.8,0,2.5C278.3,167.7,279.4,167.7,280.1,167z"
            id="path25"
          />
          <linearGradient
            id="SVGID_2_"
            gradientUnits="userSpaceOnUse"
            x1="318.7"
            y1="160.4828"
            x2="318.7"
            y2="170.8271"
          >
            <stop
              offset="0.1359"
              style={{ stopColor: '#2776F9' }}
              id="stop27"
            />
            <stop
              offset="1"
              style={{ stopColor: '#47E9FA' }}
              id="stop29"
            />
          </linearGradient>
          <path
            className="st2"
            d="M315.8,168.2c-1.6-1.6-1.6-4.2,0-5.8s4.2-1.6,5.8,0s1.6,4.2,0,5.8l-2.9,2.9L315.8,168.2L315.8,168.2z   M319.9,166.6c0.7-0.7,0.7-1.8,0-2.5s-1.8-0.7-2.5,0s-0.7,1.8,0,2.5C318.1,167.2,319.2,167.2,319.9,166.6z"
            id="path32"
          />
          <g id="g40">
            <path
              className="st0"
              d="M214.3,114.7h4.2l-0.2,0.8h-4.4l-0.2,0.4h4.3l-0.2,0.7h-4.5L213,117h4.9l-0.2,0.8h-5.1l-0.2,0.4h3.4l0.1-0.3   h1.1l-0.1,0.3h0.8l-0.2,0.7h-0.8l-0.5,1.8h-2l0.2-0.8h0.9l0.3-1H212l0.1-0.2l-1.1,2h-1.1l1.6-2.9h-0.8l0.2-0.8h1.1l0.2-0.4h-0.8   l0.2-0.7h1l0.2-0.4h-1.3l0.2-0.8h1.5l0.2-0.4h1.1L214.3,114.7z M213.6,119.2l0.2,1.5h-1.1l-0.2-1.5H213.6z"
              id="path34"
            />
            <path
              className="st0"
              d="M222.9,116.8h2.8l-0.2,0.8h-1.8l-0.6,2.3h1.9l-0.2,0.8h-3l0.8-3.1h-1l-2,3.1h-1.2l2-3.1h-1.6l0.2-0.8h2.8   l0.7-2.5h1.1L222.9,116.8z M221.1,114.6l-0.1,1.9h-1l0.1-1.9H221.1z M224.8,114.6h1.1l-1,1.9h-1.1L224.8,114.6z"
              id="path36"
            />
            <path
              className="st0"
              d="M232.5,120.1h-2.1l0.2-0.8h1l0.5-1.9h-1.4l-0.9,3.3h-1.1l0.9-3.3h-1.4l-0.7,2.7h-1.1l0.9-3.5h2.5l0.2-0.8h-2.9   l0.2-0.8h3v-0.7h1v0.7h3l-0.2,0.8h-3l-0.2,0.8h2.6L232.5,120.1z"
              id="path38"
            />
          </g>
          <linearGradient
            id="SVGID_3_"
            gradientUnits="userSpaceOnUse"
            x1="221.9"
            y1="123.4108"
            x2="221.9"
            y2="132.6103"
          >
            <stop
              offset="0.1359"
              style={{ stopColor: '#2776F9' }}
              id="stop42"
            />
            <stop
              offset="1"
              style={{ stopColor: '#47E9FA' }}
              id="stop44"
            />
          </linearGradient>
          <path
            className="st3"
            d="M219,130.3c-1.6-1.6-1.6-4.2,0-5.8c1.6-1.6,4.2-1.6,5.8,0s1.6,4.2,0,5.8l-2.9,2.9L219,130.3L219,130.3z   M223.1,128.7c0.7-0.7,0.7-1.8,0-2.5s-1.8-0.7-2.5,0s-0.7,1.8,0,2.5S222.4,129.4,223.1,128.7z"
            id="path47"
          />
          <g id="g55">
            <path
              className="st0"
              d="M302.9,97.6h2.9l-0.3,1.2H305l-0.1,0.5h-1.2l-0.1,0.3h1.1l-0.2,0.6h-1.1l-0.1,0.3h1.8l-0.2,0.7h-1l0.8,0.9   h-1.4l-0.8-0.9H300l-1.3,0.9h-1.3l1.3-0.9h-0.9l0.2-0.7h1.7l0.1-0.3h-1.1l0.2-0.6h1.1l0.1-0.3H299l0.1-0.5h-0.5l0.3-1.2h2.9v-0.3   h1.1L302.9,97.6z M298.9,102.5l4.1,0.4l-0.2,0.7l-4.1-0.4L298.9,102.5z M300.3,98.7l0.1-0.3h1.1l-0.1,0.3h1.4l0.1-0.2h1.1l-0.1,0.2   h0.6l0.1-0.4h-4.7l-0.1,0.4H300.3z M299.9,101.5l2.8,0.3l-0.2,0.7l-2.8-0.3L299.9,101.5z M302.2,100.6l0.1-0.3h-1.4l-0.1,0.3H302.2   z M302.5,99.7l0.1-0.3h-1.4l-0.1,0.3H302.5z"
              id="path49"
            />
            <path
              className="st0"
              d="M305.9,100.5h7.2l-0.3,1.2H312l-0.1,0.4h-2.2l-0.4,1.5h-2.5l0.2-0.7h1.4l0.2-0.8h-2.3l0.1-0.4h-0.8   L305.9,100.5z M312.7,100.2h-6.2l0.5-1.7h6.2L312.7,100.2z M306.7,97.7h3v-0.3h1.1v0.3h3.1l-0.2,0.7h-7.2L306.7,97.7z M311.7,101.5   l0.1-0.3h-5l-0.1,0.3H311.7z M311.8,99.6l0.1-0.3h-4l-0.1,0.3H311.8z"
              id="path51"
            />
            <path
              className="st0"
              d="M321.3,98.4H316l-1.2,4.5h5.4l-0.2,0.8h-6.5l1.6-6.1h6.4L321.3,98.4z M317.4,100.6l-1.1-1.7h1.4l0.6,1l1.1-1   h1.4l-2,1.7l1.2,1.8h-1.4l-0.7-1.1l-1.3,1.1h-1.4L317.4,100.6z"
              id="path53"
            />
          </g>
          <linearGradient
            id="SVGID_4_"
            gradientUnits="userSpaceOnUse"
            x1="309.1"
            y1="106.5172"
            x2="309.1"
            y2="115.6229"
          >
            <stop
              offset="0.1359"
              style={{ stopColor: '#2776F9' }}
              id="stop57"
            />
            <stop
              offset="1"
              style={{ stopColor: '#47E9FA' }}
              id="stop59"
            />
          </linearGradient>
          <path
            className="st4"
            d="M306.2,113.3c-1.6-1.6-1.6-4.2,0-5.8c1.6-1.6,4.2-1.6,5.8,0s1.6,4.2,0,5.8l-2.9,2.9L306.2,113.3L306.2,113.3z   M310.4,111.7c0.7-0.7,0.7-1.8,0-2.5s-1.8-0.7-2.5,0s-0.7,1.8,0,2.5C308.6,112.3,309.7,112.3,310.4,111.7z"
            id="path62"
          />
          <g id="g70">
            <path
              className="st0"
              d="M379.5,134H373l0.9-3.1h6.5L379.5,134z M375,127.7h5.8l-0.8,2.9h-5.8L375,127.7z M378.6,133.2l0.1-0.5h-4.3   l-0.1,0.5H378.6z M378.9,132.1l0.1-0.5h-4.3l-0.1,0.5H378.9z M379.1,129.8l0.1-0.4h-3.6l-0.1,0.4H379.1z M379.4,128.9l0.1-0.4h-3.6   l-0.1,0.4H379.4z"
              id="path64"
            />
            <path
              className="st0"
              d="M387.6,132.6h-5.2l-0.2,0.6h5.6l-0.2,0.8h-6.7l1-3.8h6.3L387.6,132.6z M382.9,127.8h5.7l-0.6,2.1h-5.7   L382.9,127.8z M384,131.8l0.2-0.9h-1.5l-0.2,0.9H384z M387.1,129.2l0.2-0.6h-3.5l-0.2,0.6H387.1z M386.7,131.8l0.2-0.9h-1.6   l-0.2,0.9H386.7z"
              id="path66"
            />
            <path
              className="st0"
              d="M395.3,133.4h-2.1l0.2-0.8h1l0.5-1.9h-1.5l-0.9,3.3h-1.1l0.9-3.3H391l-0.7,2.7h-1.1l0.9-3.5h2.5l0.2-0.8h-2.9   l0.2-0.8h3v-0.7h1v0.7h3l-0.2,0.8h-3l-0.2,0.8h2.5L395.3,133.4z"
              id="path68"
            />
          </g>
          <linearGradient
            id="SVGID_5_"
            gradientUnits="userSpaceOnUse"
            x1="384.7"
            y1="136.4564"
            x2="384.7"
            y2="146.7956"
          >
            <stop
              offset="0.1359"
              style={{ stopColor: '#2776F9' }}
              id="stop72"
            />
            <stop
              offset="1"
              style={{ stopColor: '#47E9FA' }}
              id="stop74"
            />
          </linearGradient>
          <path
            className="st5"
            d="M381.8,143.6c-1.6-1.6-1.6-4.2,0-5.8s4.2-1.6,5.8,0s1.6,4.2,0,5.8l-2.9,2.9L381.8,143.6L381.8,143.6z   M385.9,142c0.7-0.7,0.7-1.8,0-2.5s-1.8-0.7-2.5,0s-0.7,1.8,0,2.5C384.1,142.6,385.2,142.6,385.9,142z"
            id="path77"
          />
          <g id="g85">
            <path
              className="st0"
              d="M351.4,182.7l0.8-0.1l0.8-3h-0.8l0.2-0.8h0.8l0.4-1.6h1.1l-0.4,1.6h0.7l-0.2,0.8h-0.7l-0.8,2.9l0.8-0.1   l-0.2,0.8l-2.7,0.2L351.4,182.7z M357.8,180.5h-1.4l-1.2,3.1h-1.1l2-4.9h-0.9l0.2-0.8h1.7l0.1-0.6h1.1l-0.1,0.6h1.8l-0.2,0.8h-2.6   l-0.4,1.1h2.4l-1,3.8h-2l0.2-0.8h1L357.8,180.5z"
              id="path79"
            />
            <path
              className="st0"
              d="M363.1,180.7h-3.2l0.2-0.8h3.2l0.1-0.4l1.8-1.2h-3.8l0.2-0.8h5.5L367,178l-2.5,1.7v0.2h3l-0.2,0.8h-3l-0.8,2.9   h-2.2l0.2-0.8h1.1L363.1,180.7z"
              id="path81"
            />
            <path
              className="st0"
              d="M375.4,178.2h-5.2l-1.2,4.5h5.4l-0.2,0.8h-6.5l1.6-6.1h6.4L375.4,178.2z M371.5,180.4l-1.1-1.7h1.4l0.6,1   l1.1-1h1.4l-2,1.7l1.2,1.9h-1.4l-0.7-1.1l-1.3,1.1h-1.4L371.5,180.4z"
              id="path83"
            />
          </g>
          <linearGradient
            id="SVGID_6_"
            gradientUnits="userSpaceOnUse"
            x1="363.3"
            y1="185.8232"
            x2="363.3"
            y2="195.7627"
          >
            <stop
              offset="0.1359"
              style={{ stopColor: '#2776F9' }}
              id="stop87"
            />
            <stop
              offset="1"
              style={{ stopColor: '#47E9FA' }}
              id="stop89"
            />
          </linearGradient>
          <path
            className="st6"
            d="M360.4,193.2c-1.6-1.6-1.6-4.2,0-5.8s4.2-1.6,5.8,0s1.6,4.2,0,5.8l-2.9,2.9L360.4,193.2L360.4,193.2z   M364.5,191.5c0.7-0.7,0.7-1.8,0-2.5s-1.8-0.7-2.5,0s-0.7,1.8,0,2.5S363.8,192.2,364.5,191.5z"
            id="path92"
          />
          <g
            className="st7"
            id="g100"
          >
            <path
              className="st0"
              d="M241.9,200.2h-6.4l0.8-3.1h6.4L241.9,200.2z M237.5,193.9h5.8l-0.8,2.9h-5.8L237.5,193.9z M241,199.4l0.1-0.5   h-4.3l-0.1,0.5H241z M241.3,198.3l0.1-0.5h-4.3l-0.1,0.5H241.3z M241.6,196l0.1-0.4h-3.6L238,196H241.6z M241.8,195l0.1-0.4h-3.6   l-0.1,0.4H241.8z"
              id="path94"
            />
            <path
              className="st0"
              d="M244.7,197.6h1.1l-1.4,2.6h-1.1L244.7,197.6z M250.9,194.6l-4.7,0.2l-0.7,1.7h1.6l0.3-1.3h1.1l-0.3,1.3h2.5   l-0.2,0.8H248l-0.8,2.9h-2.1l0.2-0.7h1l0.6-2.2h-2.8l1.3-3.2l5.7-0.2L250.9,194.6z M249.9,197.6v2.6h-1.1v-2.6H249.9z"
              id="path96"
            />
            <path
              className="st0"
              d="M257.9,197.6h0.9l-0.2,0.8h-4.9l-0.7,1h3.5v-0.8h1.2l0.1,1.6h-6.2l0.2-0.8l0.8-1h-1l0.2-0.8h0.9l1-3.7h5.3   L257.9,197.6z M256.8,197.6l0.1-0.5h-3.1l-0.1,0.5H256.8z M257.1,196.4l0.1-0.5h-3.1l-0.1,0.5H257.1z M257.5,195.1l0.1-0.5h-3.1   l-0.1,0.5H257.5z"
              id="path98"
            />
          </g>
          <linearGradient
            id="SVGID_7_"
            gradientUnits="userSpaceOnUse"
            x1="247.1"
            y1="203.0922"
            x2="247.1"
            y2="212.9686"
          >
            <stop
              offset="0.1359"
              style={{ stopColor: '#2776F9' }}
              id="stop102"
            />
            <stop
              offset="1"
              style={{ stopColor: '#47E9FA' }}
              id="stop104"
            />
          </linearGradient>
          <path
            className="st8"
            d="M244.2,209.8c-1.6-1.6-1.6-4.2,0-5.8s4.2-1.6,5.8,0s1.6,4.2,0,5.8l-2.9,2.9L244.2,209.8L244.2,209.8z   M248.3,208.1c0.7-0.7,0.7-1.8,0-2.5s-1.8-0.7-2.5,0s-0.7,1.8,0,2.5C246.6,208.8,247.6,208.8,248.3,208.1z"
            id="path107"
          />
          <g id="g115">
            <path
              className="st0"
              d="M142.5,167.9h-2.4l0.2-0.7h1.2l0.1-0.4H138l-0.3,1.1h-1.1l0.9-3.3h5.9L142.5,167.9z M137.2,163.5h3l0.1-0.3   h-2.5l0.1-0.5h2.5l0.1-0.3h-2.7l0.2-0.7h2.7l0.1-0.2h1.1l-0.1,0.2h2.7l-0.2,0.7h-2.7l-0.1,0.3h2.5l-0.1,0.5h-2.5l-0.1,0.3h2.9   l-0.2,0.7h-7L137.2,163.5z M141.9,166.3l0.1-0.3h-3.7l-0.1,0.3H141.9z M142.1,165.4l0.1-0.3h-3.7l-0.1,0.3H142.1z"
              id="path109"
            />
            <path
              className="st0"
              d="M145.3,163.4h0.6l-0.8,2.2h-0.6L145.3,163.4z M145.7,167.9h-1.1l2.2-6.3h1.1L145.7,167.9z M148.1,163.3   l-0.4,2.2h-0.6l0.4-2.2H148.1z M149,161.8h1.1l-1.6,6.1h-1.1L149,161.8z M150.5,163.3l-0.4,2.2h-0.6l0.4-2.2H150.5z M151.4,161.5   h1.1l-1.7,6.3h-1.1L151.4,161.5z"
              id="path111"
            />
            <path
              className="st0"
              d="M158.7,167.2h-2.1l0.2-0.8h1l0.5-1.9h-1.4l-0.9,3.3h-1.1l0.9-3.3h-1.4l-0.7,2.7h-1.1l0.9-3.5h2.5l0.2-0.8h-2.9   l0.2-0.8h3v-0.7h1v0.7h3l-0.2,0.8h-3l-0.2,0.8h2.6L158.7,167.2z"
              id="path113"
            />
          </g>
          <linearGradient
            id="SVGID_8_"
            gradientUnits="userSpaceOnUse"
            x1="148"
            y1="169.3988"
            x2="148"
            y2="179.6912"
          >
            <stop
              offset="0.1359"
              style={{ stopColor: '#2776F9' }}
              id="stop117"
            />
            <stop
              offset="1"
              style={{ stopColor: '#47E9FA' }}
              id="stop119"
            />
          </linearGradient>
          <path
            className="st9"
            d="M145.1,177.5c-1.6-1.6-1.6-4.2,0-5.8s4.2-1.6,5.8,0s1.6,4.2,0,5.8l-2.9,2.9L145.1,177.5L145.1,177.5z   M149.2,175.8c0.7-0.7,0.7-1.8,0-2.5s-1.8-0.7-2.5,0s-0.7,1.8,0,2.5S148.6,176.5,149.2,175.8z"
            id="path122"
          />
          <g id="g130">
            <path
              className="st0"
              d="M162.2,217.4h1l-1.4,5.1h-1L162.2,217.4z M163.2,223.2h-1.1l1.7-6.3h1.1L163.2,223.2z M164.5,219.8h4l-0.9,3.4   h-4L164.5,219.8z M165.8,216.8h1.1l-0.3,0.6h2.6l-0.2,0.8h-1l0.1,1.2H167l-0.1-1.2h-0.7l-0.6,1.2h-1.1L165.8,216.8z M165.4,222.4   l0.5-1.8h-0.6l-0.5,1.8H165.4z M166.8,222.4l0.5-1.8h-0.6l-0.5,1.8H166.8z"
              id="path124"
            />
            <path
              className="st0"
              d="M171.3,223.2h-1.4l0.2-0.8h0.4l0.3-1.1H170l-0.6,1.9h-1l1.9-6.1h2.6L171.3,223.2z M171,220.5l0.3-1h-0.7   l-0.3,1H171z M171.5,218.8l0.3-1h-0.6l-0.3,1H171.5z M172.7,219h2.3l-0.8,2.8H172L172.7,219z M173.6,216.8h1.1l-0.3,0.6h2.6   l-1.6,5.7h-2.1l0.2-0.8h1l1.1-4.2H174l-0.3,0.5h-1.1L173.6,216.8z M173.6,221.1l0.3-1.2h-0.5l-0.3,1.2H173.6z"
              id="path126"
            />
            <path
              className="st0"
              d="M183.3,220.6h0.9l-0.2,0.8h-5l-0.7,1h3.6v-0.8h1.2l0.1,1.6H177l0.2-0.8l0.8-1h-1l0.2-0.8h0.9l1-3.7h5.3   L183.3,220.6z M182.2,220.6l0.1-0.5h-3.1l-0.1,0.5H182.2z M182.5,219.4l0.1-0.5h-3.1l-0.1,0.5H182.5z M182.9,218.2l0.1-0.4h-3.1   l-0.1,0.4H182.9z"
              id="path128"
            />
          </g>
          <linearGradient
            id="SVGID_9_"
            gradientUnits="userSpaceOnUse"
            x1="172.5"
            y1="225.2415"
            x2="172.5"
            y2="235.9999"
          >
            <stop
              offset="0.1359"
              style={{ stopColor: '#2776F9' }}
              id="stop132"
            />
            <stop
              offset="1"
              style={{ stopColor: '#47E9FA' }}
              id="stop134"
            />
          </linearGradient>
          <path
            className="st10"
            d="M169.6,232.8c-1.6-1.6-1.6-4.2,0-5.8s4.2-1.6,5.8,0s1.6,4.2,0,5.8l-2.9,2.9L169.6,232.8L169.6,232.8z   M173.7,231.1c0.7-0.7,0.7-1.8,0-2.5s-1.8-0.7-2.5,0s-0.7,1.8,0,2.5S173,231.8,173.7,231.1z"
            id="path137"
          />
          <g id="g145">
            <path
              className="st0"
              d="M302.8,235.1h-1.1l-0.3,1l-1.5,0.8l2.1,1.2h-2.1l-1.2-0.7l-1.5,0.7h-2.3l2.8-1.2l-1.3-0.8l0.3-1h-1.1l0.2-0.8   h1.1l0.1-0.4h1.1l-0.1,0.4h2.9l0.1-0.4h1.1l-0.1,0.4h1.1L302.8,235.1z M296.7,232.1h2.6v-0.4h1.4v0.4h2.6l-0.5,1.7h-1.1l0.2-0.9   h-4.4l-0.2,0.9h-1.1L296.7,232.1z M298.8,236.4l1.6-0.8l0.1-0.5h-2.9l-0.1,0.6L298.8,236.4z"
              id="path139"
            />
            <path
              className="st0"
              d="M310.9,232.5l-4.9,0.2l-0.3,1.1h5.1l-0.2,0.8h-1.3l-0.7,2.6h1.4l-0.2,0.8h-7.2l0.2-0.8h0.9l1.4-5.3l6-0.2   L310.9,232.5z M307.6,237.2l0.7-2.6h-2.7l-0.7,2.6H307.6z"
              id="path141"
            />
            <path
              className="st0"
              d="M317.5,237.4h-2.1l0.2-0.8h1l0.5-1.9h-1.5l-0.9,3.3h-1.1l0.9-3.3h-1.4l-0.7,2.7h-1.1l0.9-3.5h2.5l0.2-0.8H312   l0.2-0.8h3v-0.7h1v0.7h3l-0.2,0.8h-3l-0.2,0.8h2.5L317.5,237.4z"
              id="path143"
            />
          </g>
          <linearGradient
            id="SVGID_10_"
            gradientUnits="userSpaceOnUse"
            x1="306.8"
            y1="240.6335"
            x2="306.8"
            y2="250.9094"
          >
            <stop
              offset="0.1359"
              style={{ stopColor: '#2776F9' }}
              id="stop147"
            />
            <stop
              offset="1"
              style={{ stopColor: '#47E9FA' }}
              id="stop149"
            />
          </linearGradient>
          <path
            className="st11"
            d="M303.9,247.6c-1.6-1.6-1.6-4.2,0-5.8s4.2-1.6,5.8,0s1.6,4.2,0,5.8l-2.9,2.9L303.9,247.6L303.9,247.6z M308,246  c0.7-0.7,0.7-1.8,0-2.5s-1.8-0.7-2.5,0s-0.7,1.8,0,2.5C306.2,246.6,307.4,246.6,308,246z"
            id="path152"
          />
          <g id="g160">
            <path
              className="st0"
              d="M363,283.4h1.7l-1.1,4.1h0.5l-0.2,0.8h-1.6l1.1-4.1h-0.6L363,283.4z M364.9,282l-0.2,1.2h-1l0.2-1.2H364.9z    M368.5,288.3h-4.1l0.5-1.9h-0.6l1.1-1.7h-0.5l0.2-0.8h1.9l0.2-0.6h-1.6l0.2-0.8h1.6l0.1-0.5h1.1l-0.1,0.5h0.5l-0.2,0.8h-0.5   l-0.2,0.6h0.4l0.9-1.6h1.1l-0.9,1.6h0.5l-0.2,0.8h-3.3l-0.3,0.4h3.1L368.5,288.3z M367.6,287.5l0.1-0.5h-1.9l-0.1,0.5H367.6z    M368,286.4l0.1-0.5h-1.9l-0.1,0.5H368z"
              id="path154"
            />
            <path
              className="st0"
              d="M369.8,287.2l0.5-0.1l0.7-2.5h-0.5l0.2-0.8h0.5l0.5-1.9h1.1l-0.5,1.9h0.5l-0.2,0.8h-0.5l-0.6,2.4h0.5l-0.2,0.8   l-2.1,0.2L369.8,287.2z M376.8,282.7h0.4V282h0.7v0.7h0.3l-0.2,0.8h-1.2v1.8l1.1-1l-0.3,1l-0.9,0.8v2.3h-1.1v-1.2l-0.8,0.7l0.3-1   l0.5-0.5v-2.8h-1.4l-0.4,1.2h1.5l-0.9,3.3H373l0.2-0.7h0.5l0.5-1.8h-0.6l-0.9,2.9h-1.1l1.8-5.6h2.2v-0.7h1.1L376.8,282.7z"
              id="path156"
            />
            <path
              className="st0"
              d="M384.4,287.7h-2.1l0.2-0.8h1l0.5-1.9h-1.5l-0.9,3.3h-1.1l0.9-3.3H380l-0.7,2.7h-1.1l0.9-3.5h2.5l0.2-0.8h-2.9   l0.2-0.8h3v-0.7h1v0.7h3l-0.2,0.8h-3l-0.2,0.8h2.5L384.4,287.7z"
              id="path158"
            />
          </g>
          <linearGradient
            id="SVGID_11_"
            gradientUnits="userSpaceOnUse"
            x1="373.7"
            y1="291.0326"
            x2="373.7"
            y2="300.6717"
          >
            <stop
              offset="0.1359"
              style={{ stopColor: '#2776F9' }}
              id="stop162"
            />
            <stop
              offset="1"
              style={{ stopColor: '#47E9FA' }}
              id="stop164"
            />
          </linearGradient>
          <path
            className="st12"
            d="M370.8,297.9c-1.6-1.6-1.6-4.2,0-5.8s4.2-1.6,5.8,0s1.6,4.2,0,5.8l-2.9,2.9L370.8,297.9L370.8,297.9z   M374.9,296.3c0.7-0.7,0.7-1.8,0-2.5s-1.8-0.7-2.5,0s-0.7,1.8,0,2.5S374.2,297,374.9,296.3z"
            id="path167"
          />
          <g id="g175">
            <path
              className="st0"
              d="M436.5,223.2h-2l0.1-0.4h-2.7l0.5-1.7h3.1l-0.4,1.5h0.5l0.5-1.8H432l-0.7,2.4h-1.1l0.9-3.1h6.3L436.5,223.2z    M431.6,217.2h2.9v-0.4h1.1v0.4h2.8l-0.2,0.7h-6.7L431.6,217.2z M432.2,218.2h5.1l-0.4,1.5h-5.1L432.2,218.2z M435.9,219.2l0.1-0.4   h-2.9l-0.1,0.4H435.9z M434.3,222.1l0.1-0.4h-1.3l-0.1,0.4H434.3z"
              id="path169"
            />
            <path
              className="st0"
              d="M439.3,222.4h1.7l0.4-1.3h1.1l-0.4,1.3h1.7l0.3-1.1h1.1l-0.5,1.9H438l0.5-1.9h1.1L439.3,222.4z M438.6,220.3   l1.9-0.4l0.4-1.5h1.1l-0.3,1.1l0.9-0.3v-0.8h0.9v0.5l1.1-0.4l-0.2,0.8l-2.5,0.8h2.4l-0.2,0.8h-3.8l0.1-0.3l-1.9,0.4L438.6,220.3z    M439.4,219h0.9l-0.5,1h-0.9L439.4,219z M439.5,217.3h2.8v-0.4h1.1v0.4h2.9l-0.4,1.6h-1.1l0.2-0.8h-4.6l-0.2,0.8h-1.1L439.5,217.3z    M445.5,219.3l-0.2,1.5h-0.9l0.2-1.5H445.5z"
              id="path171"
            />
            <path
              className="st0"
              d="M452.5,222.6h-2.1l0.2-0.8h1l0.5-1.9h-1.5l-0.9,3.3h-1.1l0.9-3.3h-1.4l-0.7,2.7h-1.1l0.9-3.5h2.5l0.2-0.8H447   l0.2-0.8h3v-0.7h1v0.7h3l-0.2,0.8h-3l-0.2,0.8h2.5L452.5,222.6z"
              id="path173"
            />
          </g>
          <linearGradient
            id="SVGID_12_"
            gradientUnits="userSpaceOnUse"
            x1="441.8"
            y1="225.4292"
            x2="441.8"
            y2="235.1502"
          >
            <stop
              offset="0.1359"
              style={{ stopColor: '#2776F9' }}
              id="stop177"
            />
            <stop
              offset="1"
              style={{ stopColor: '#47E9FA' }}
              id="stop179"
            />
          </linearGradient>
          <path
            className="st13"
            d="M438.9,232.8c-1.6-1.6-1.6-4.2,0-5.8s4.2-1.6,5.8,0s1.6,4.2,0,5.8l-2.9,2.9L438.9,232.8L438.9,232.8z   M443,231.1c0.7-0.7,0.7-1.8,0-2.5s-1.8-0.7-2.5,0s-0.7,1.8,0,2.5C441.3,231.8,442.4,231.8,443,231.1z"
            id="path182"
          />
        </svg>
      </div>
    </>
  );
};

export default SvgMap;
