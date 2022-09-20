// Core
import React from 'react';
import classNames from 'classnames';

// Components
import { Badge, P } from 'react-lib';
import Avatar from './Avatar';
import UserMenu from './UserMenu';

// Styles
import styles from './User.module.scss';

import KC from '@src/index';

export interface UserProps {
  className?: string;
}

export interface UserInterface extends React.FC<UserProps> {
  Avatar: typeof Avatar;
}

const User: UserInterface = ({ className }) => (
  <div className={classNames(styles.root, className)}>
    {/* <Badge className={styles.badge} content={0}>
      <Avatar className={styles.avatar} src={image} alt="avatar" />
    </Badge> */}

    <P className={styles.name} color="light" size="medium">
      {KC.getUsername()}
    </P>

    <UserMenu />
  </div>
);

User.Avatar = Avatar;

// Exports
export default User;
