import React, { useState } from 'react';
import { Icon } from 'react-lib';
import styles from './DropDownList.module.scss';

export const DropDownList = ({
  dataArray,
  haveNest,
  dataForNest,
}: any) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.DropDownMain}>
      {dataArray[0]?.header ? (
        <div
          onClick={() => setIsVisible((prev) => !prev)}
          className={styles.DropDown__header}
        >
          {isVisible ? (
            <Icon name='chevronUp' />
          ) : (
            <Icon name='chevronDown' />
          )}
          <p>{dataArray[0]?.header}</p>
        </div>
      ) : null}
      {isVisible ? (
        <div className={styles.DropDown__children}>
          <ul className={styles.innerUl}>
            <li className={styles.innerNestedLi}>
              {haveNest && dataForNest.length ? (
                <>
                  {dataForNest?.map((elem: any) => (
                    <DropDownList dataArray={elem} />
                  ))}
                </>
              ) : null}
            </li>
            {dataArray?.length &&
              dataArray?.map((elem: any) => (
                <li>
                  <p>{elem?.name}</p>
                  <p>{elem?.value}</p>
                </li>
              ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
