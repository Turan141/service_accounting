// Core
import * as React from 'react';

// Components
import { Icon, Sidebar } from 'react-lib';
import Header from '@components/Header';

// Helpers
import { useRouter } from 'react-lib';

// Styles
import styles from './Layout.module.scss';
import useLocalStorage from '@src/helpers/useLocalStorage';

export interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  sidebar?: (
    | {
        id: string;
        icon?: React.ReactNode;
        title: string;
        mainTitle?: string;
        to: string;
        hidden?: boolean;
      }
    | false
  )[];
  visibleForRole?: number[];
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title: titleProp = '',
  sidebar,
}) => {
  const [title, setTitle] = React.useState(titleProp);
  const { pathname } = useRouter();

  const changeTitle = React.useCallback(() => {
    const matchedTitle = sidebar?.find((item) => {
      const regexpParams = /:[A-Za-z0-9]+/;
      const regexpId = /[0-9]+/;
      if (item)
        return (
          pathname.replace(regexpId, '') ===
          item.to.replace(regexpParams, '')
        );
    });

    if (matchedTitle) {
      if (matchedTitle.mainTitle) setTitle(matchedTitle.mainTitle);
      else setTitle(matchedTitle.title);
    } else {
      setTitle(titleProp);
    }
  }, [titleProp, sidebar, pathname]);

  const [expanded, setExpanded] = useLocalStorage('expanded', false);

  React.useEffect(changeTitle, [changeTitle]);

  return (
    <div className={styles.root}>
      <Header title={title} className={styles.header} />

      <div className={styles.wrapper}>
        <Sidebar
          className={
            expanded === false
              ? styles.sidebarHidden
              : styles.sidebarExpanded
          }
        >
          <div
            className={
              expanded
                ? styles.hamburgerExpanded
                : styles.hamburgerHidden
            }
            onClick={() =>
              setExpanded((prevVal: boolean) => !prevVal)
            }
          >
            {expanded ? (
              <Icon name={'arrowLeft'} />
            ) : (
              <Icon name={'menu'} />
            )}
          </div>
          {sidebar?.map(
            (item) =>
              item &&
              !item.hidden && (
                <Sidebar.Item
                  key={item.id}
                  to={item.to}
                  icon={item.icon}
                >
                  {item.title}
                </Sidebar.Item>
              ),
          )}
        </Sidebar>

        <main className={styles.main}>
          <div className={styles.block}>{children}</div>
        </main>
      </div>
    </div>
  );
};

// Exports
export default Layout;
