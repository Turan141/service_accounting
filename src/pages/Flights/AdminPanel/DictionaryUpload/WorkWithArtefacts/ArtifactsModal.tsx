import { isArray } from 'lodash';
import React from 'react';
import { Modal } from 'react-lib';
import styles from './ResponseItems.module.scss';

const ResponseWindow = (item: any) => {
  return (
    <div className={styles.respItem}>
      {Object.keys(item?.item).map(function (key) {
        return (
          <div className={styles.nameValue}>
            <p>
              {key} - {item?.item[key] + ''}{' '}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export const ArtifactsModal = ({
  isOpen,
  handleClose,
  resp,
}: any) => {
  let dataFromJson = resp?.response?.data;
  let itemsFromJson = resp?.response?.data?.items;
  let propertiesFromJson = resp?.response?.data?.result;
  let propertiesItemsFromJson = resp?.response?.data?.result?.items;
  return (
    <Modal
      // className={styles.modal}
      isOpen={isOpen}
      onClose={handleClose}
      style={{
        minWidth: '30%',
        height: '20rem;',
        display: 'block',
        justifyContent: 'center',
      }}
    >
      <div className={styles.respItemDiv}>
        {itemsFromJson &&
          itemsFromJson.map((e: any) => <ResponseWindow item={e} />)}
        {propertiesItemsFromJson &&
          propertiesItemsFromJson.map((e: any) => (
            <ResponseWindow item={e} />
          ))}
        {propertiesFromJson && isArray(propertiesFromJson) &&
          propertiesFromJson.map((e: any) => (
            <ResponseWindow item={e} />
          ))}
        {!itemsFromJson &&
          !propertiesFromJson &&
          dataFromJson &&
          dataFromJson.map((e: any) => <ResponseWindow item={e} />)}
        {console.log(resp)}

        {/* {!itemsFromJson &&
          !propertiesFromJson &&
          propertiesItemsFromJson &&
          !dataFromJson &&
          propertiesItemsFromJson.map((e: any) => (
            <ResponseWindow item={e} />
          ))}
        {!propertiesFromJson &&
          !propertiesItemsFromJson &&
          !dataFromJson &&
          itemsFromJson &&
          itemsFromJson.map((e: any) => <ResponseWindow item={e} />)}
        {!itemsFromJson &&
          !propertiesItemsFromJson &&
          propertiesFromJson &&
          !dataFromJson &&
          propertiesFromJson.map((e: any) => (
            <ResponseWindow item={e} />
          ))}
        {!itemsFromJson &&
          !propertiesFromJson &&
          !propertiesItemsFromJson &&
          dataFromJson &&
          dataFromJson.map((e: any) => <ResponseWindow item={e} />)} */}
      </div>
    </Modal>
  );
};
