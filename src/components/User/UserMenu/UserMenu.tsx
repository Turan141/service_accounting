// Core
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { Menu, P } from 'react-lib';
//import { ProfileSwitch } from '@common/index';

// Actions
//import { authenticateActions } from '@bus/authenticate/actions';

//import { getCombinedPositions } from '@bus/profile/selectors';

// Styles
import styles from './UserMenu.module.scss';
import classNames from 'classnames';

import KC from '@src/index'

const UserMenu: React.FC = () => {
    const dispatch = useDispatch();
    //const otherPositionsList = useSelector(getCombinedPositions);
    const trigger = React.useMemo(() => <i className="icon-angle-down" />, []);

    const handleLogout = React.useCallback(() => {
        KC.logout()
    }, []);

    return (
        <div className={styles.mainDiv}>
        <Menu
            className={styles.root}
            trigger={trigger}
            position={'bottom right'}
            offsetY={20}
        >
            <div
                className={classNames(styles.profiles, {
                    // [styles.disabled]:
                    //     otherPositionsList && otherPositionsList.length === 0,
                })}
            >
                {/* <ProfileSwitch profiles={otherPositionsList} /> */}
            </div>
            <Menu.Item
                icon={<i className="icon-message" />}
                onClick={handleLogout}
            >
                <P size="medium">Выход</P>
            </Menu.Item>
        </Menu>
        </div>
    );
};

// Exports
export default UserMenu;
