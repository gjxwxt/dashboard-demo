function resetScreenSize(dw?: number, dh?: number) {
  const init = () => {
    const _el = document.getElementById('dataScreen');
    const hScale = window.innerHeight / (dh || 977);
    const wScale = window.innerWidth / (dw || 1918);
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
}

export default resetScreenSize;
