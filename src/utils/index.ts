// 默认传入dom节点、比例、宽度或高度来设置另一方长度，也可以不传高度和宽度，只传入比例，如果只穿入dom默认求1920 / 1080比例下如何哪一方占满屏幕
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
