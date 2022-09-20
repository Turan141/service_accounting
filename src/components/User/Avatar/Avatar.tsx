// Core
import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './Avatar.module.scss';

export interface AvatarProps {
  className?: string;
  size?: number;
  src: string;
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ className, src, alt, size }) => {
  const style: React.CSSProperties = size?
    {width: `${size}px`, height: `${size}px`}
    : {};

  return (
    <div className={classNames(styles.root, className)} style={style}>
      <img className={styles.image} alt={alt} src={src} />
    </div>
  );
};

// Exports
export default Avatar;
