import React from 'react';
import { Modal, ModalComponentProps } from 'react-lib';
import { ApkSearch } from './ApkSearch';
import { ApkList } from './ApkList';
import { ApkUpload } from './ApkUpload';
import styles from './MobileAppUpdate.module.scss';

export const MobileAppUpdate: React.FC<ModalComponentProps> = ({
  isOpen,
  handleClose,
}) => {
  return (
    <Modal
      className={styles.modal}
      isOpen={isOpen}
      onClose={handleClose}
      style={{
        justifyContent: 'center',
        minWidth: '50vw',
        minHeight: '550px',
      }}
    >
      <div className={styles.MainMobileApp}>
        <div className={styles.appUploadSearch}>
          <ApkUpload />
          <ApkSearch />
        </div>
        <div className={styles.viewAllApp}>
          <ApkList />
        </div>
      </div>
    </Modal>
  );
};
