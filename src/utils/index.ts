// 默认传入dom节点、比例、宽度或高度来设置另一方长度，也可以不传高度和宽度，只传入比例，
// 如果type是width，就根据已有的宽度和比例设置高度
// 如果type是height，就根据已有的高度和比例设置宽度
// 如果只穿入dom会根据当前视口的比例来设置保持比例的情况下，哪一方占满
export const setSizeByScale = (dom: HTMLElement, scale?: number, type?: 'width' | 'height') => {
  if (!dom) return;
  // 获取元素的宽高
  const { width, height } = dom.getBoundingClientRect();

  if (type === 'width' && scale) {
    dom.style.height = `${width / scale}px`;
  } else if (type === 'height' && scale) {
    dom.style.width = `${height * scale}px`;
  } else {
    const currentRadio = document.documentElement.clientWidth / document.documentElement.clientHeight;

    if (currentRadio > 1920 / 1080) {
      dom && (dom.style.height = '100vh'); // 此时clientHeight = 100vh  x / clientHeight = 1920 / 1080
      dom && (dom.style.width = `${(1920 / 1080) * document.documentElement.clientHeight}px`);
    } else if (currentRadio < 1920 / 1080) {
      dom && (dom.style.width = '100vw'); // 此时clientWidth = 100vw  clientWidth / x = 1920 / 1080
      dom && (dom.style.height = `${(1080 / 1920) * document.documentElement.clientWidth}px`);
    } else {
      dom && (dom.style.width = '100vw');
      dom && (dom.style.height = '100vh');
    }
  }
};

// 通过scale来实现响应式
// 需要先设置相应dom的初始宽高为默认值，等于dw和dh或者默认值
export const resetScreenSize = (dw?: number, dh?: number) => {
  const init = () => {
    const _el = document.getElementById('root');
    const hScale = window.innerHeight / (dh || 1080);
    const wScale = window.innerWidth / (dw || 1920);
    _el && (_el.style.transform = 'scaleX(' + wScale + ') scaleY(' + hScale + ')');
  };

  let lazyFun: NodeJS.Timeout;

  //窗口大小发送改变时自动调整
  window.addEventListener('resize', () => {
    clearTimeout(lazyFun);
    lazyFun = setTimeout(() => {
      init();
    }, 200);
  });

  init();
};
