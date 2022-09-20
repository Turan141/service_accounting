// Core
import * as React from 'react';
import classNames from 'classnames';
//import { useSelector } from "react-redux"

// Components
import { Link, H5 } from 'react-lib';
import User from '@components/User';

// Assets
import logo from '@assets/images/logo_white.svg';

// Styles
import styles from './Header.module.scss';
import { Title } from '@mantine/core';

export interface HeaderProps {
  className?: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ className, title }) => {
  return (
    <header className={classNames(styles.root, className)}>
      <Link className={styles.logo} to='#'>
        <img src={logo} alt='UTG Aviation Services' />
      </Link>
      <Title order={6} className={styles.title}>
        {title}
      </Title>
      <User className={styles.user} />
    </header>
  );
};

// Exports
export default React.memo(Header);
