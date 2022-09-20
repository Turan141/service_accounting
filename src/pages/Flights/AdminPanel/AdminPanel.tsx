import React, { useState } from 'react';
import { DictionaryUpload } from './DictionaryUpload/DictionaryUpload';
import styles from './AdminPanel.module.scss';
import { TimeZone } from './TimeZone/TimeZone';
import { MobileAppUpdate } from './MobileAppUpdate/MobileAppUpdate';

const AdminPanel = () => {
  const [viewDictionaryModal, setViewDictionaryModal] = useState<any>(
    {
      isOpen: false,
      close: () => {
        setViewDictionaryModal(false);
      },
    },
  );
  const [viewTimezoneModal, setViewTimezoneModal] = useState<any>({
    isOpen: false,
    close: () => {
      setViewTimezoneModal(false);
    },
  });

  const [viewAppUpdateModal, setViewAppUpdateModal] = useState<any>({
    isOpen: false,
    close: () => {
      setViewAppUpdateModal(false);
    },
  });

  const viewDictionaryArtefactsModal = React.useCallback(() => {
    setViewDictionaryModal({
      isOpen: true,
      close: () => {
        setViewDictionaryModal(false);
      },
    });
  }, []);

  const viewTimezoneSetModal = React.useCallback(() => {
    setViewTimezoneModal({
      isOpen: true,
      close: () => {
        setViewTimezoneModal(false);
      },
    });
  }, []);

  const viewAppUploadModal = React.useCallback(() => {
    setViewAppUpdateModal({
      isOpen: true,
      close: () => {
        setViewAppUpdateModal(false);
      },
    });
  }, []);

  return (
    <div className={styles.AdminPanel}>
      <div className={styles.OpenUploadModal}>
        <DictionaryUpload
          isOpen={viewDictionaryModal.isOpen}
          handleClose={viewDictionaryModal.close}
        />
        <button
          className={styles.button86}
          onClick={viewDictionaryArtefactsModal}
        >
          Открыть окно для выгрузки справочников
        </button>
          <MobileAppUpdate
            isOpen={viewAppUpdateModal.isOpen}
            handleClose={viewAppUpdateModal.close}
          />
          <button
            className={styles.button86}
            onClick={viewAppUploadModal}
          >
            Открыть окно для загрузки приложения МП
          </button>
      </div>
      <div className={styles.OpenUploadModal}>
        <TimeZone
          isOpen={viewTimezoneModal.isOpen}
          handleClose={viewTimezoneModal.close}
        />
        <button
          className={styles.button86}
          onClick={viewTimezoneSetModal}
        >
          Открыть окно для изменения временной зоны
        </button>
        <button style={{ color: 'gray' }} className={styles.button86}>
          (Ожидается...)
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
