import React, { CSSProperties, useCallback, useRef, useState } from 'react';
import styles from './styles.module.scss';

export interface ITooltip {
  text: string;
  children?: React.ReactNode;
}

type ITooltipDisplay = 'none' | 'block';

const Tooltip: React.FC<ITooltip> = ({ text, children }) => {
  const [boxDisplay, setBlockDisplay] = useState<ITooltipDisplay>('none');
  const tooltipBoxStyles = useRef<CSSProperties>({});

  const handleOnMouseEnter = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setBlockDisplay('block');
    tooltipBoxStyles.current = { ...tooltipBoxStyles.current, top: event.clientY };
    tooltipBoxStyles.current = { ...tooltipBoxStyles.current, left: event.clientX };
  }, []);

  return (
    <div className={`${styles['tooltip-container']}`}>
      <div style={{ ...tooltipBoxStyles.current, display: boxDisplay }} className={`${styles['tooltip-box']}`}>
        {text}
      </div>
      <div onMouseLeave={() => setBlockDisplay('none')} onMouseEnter={event => handleOnMouseEnter(event)}>
        {children}
      </div>
    </div>
  );
};

export { Tooltip };
