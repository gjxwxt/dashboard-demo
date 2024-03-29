import './index.scss';
const Module03: React.FC = () => {
  return (
    <div className="md3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="md3-item"
        >
          <div className="md3-item-name">
            <span>仓库1</span>
          </div>
          <div className="md3-item-progress">
            <div className="md3-item-progress-bar">
              <div
                className="md3-item-progress-bar-inner"
                style={{ width: `${10 * 1.7 * (6 - index)}%` }}
              ></div>
            </div>
          </div>
          <div className="md3-item-num">
            <span>{`${10 * 1.7 * (6 - index)}`}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Module03;
