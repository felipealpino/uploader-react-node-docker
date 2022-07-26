import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

interface IUploaderContainer {
  children: ReactNode;
}

const UploaderContainer: React.FC<IUploaderContainer> = ({ children }) => {
  return <div className={styles.uploadContainer}>{children}</div>;
};

export { UploaderContainer };
