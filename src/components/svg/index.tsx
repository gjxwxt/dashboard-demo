import { useMemo } from 'react';

interface propsInterface {
  name: string;
  size?: string;
  color?: string;
  profix?: string;
}

export default function SvgIcon(props: propsInterface) {
  const size = props.size ?? '36px';
  const color = props.color ?? '';
  const profix = props.profix ?? 'svg';

  const iconName = useMemo<string>(() => {
    return `#${profix}-${props.name}`;
  }, [profix, props.name]);

  return (
    <svg
      style={{ height: size, width: size }}
      fill={color}
    >
      <use
        href={iconName}
        fill="currentColor"
      />
    </svg>
  );
}
