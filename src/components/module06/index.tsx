import './index.scss';

const Module06: React.FC = () => {
  // 整体是一个table，有两个部分，上面是一个表头，下面是一个表格
  // 表头有四个部分，分别是：标题，标题，标题，标题
  // 表格就简单的展示数据即可 内容为文字表格内容
  return (
    <div className="md6">
      <div className="md6-header">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="md6-header-item"
          >
            <div className="md6-header-item-text">标题01</div>
          </div>
        ))}
      </div>
      <div className="md6-main">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="md6-main-item"
          >
            <span className="md6-main-item-text">表格内容</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Module06;
