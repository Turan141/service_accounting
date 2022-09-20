import React, { useState } from 'react';
import { UploadToMinio } from './UploadToMinio';
import styles from './DictionaryUpload.module.scss';
import { Modal, ModalComponentProps, Tabs } from 'react-lib';
import { WorkWithArtifacts } from './WorkWithArtefacts/WorkWithArtifacts';
import { HealthCheck } from './HealthCheck';

export const DictionaryUpload: React.FC<ModalComponentProps> = ({
  isOpen,
  handleClose,
}) => {
  const [tab, setSelectedTabs] = useState(1);

  return (
    <Modal
    className={styles.modal}
      isOpen={isOpen}
      onClose={handleClose}
      style={{
        minWidth: '50%',
        height: '20rem;',
        //display: 'block',
        justifyContent: 'center',
      }}
    >
      <div className={styles.tabWrapper}>
        <Tabs
          onChange={setSelectedTabs}
          value={tab}
          className={styles.tabs}
        >
          <Tabs.Tab value={1} label='Загрузка файлов артефактов в облако' />
          <Tabs.Tab value={2} label='Артефакты' />
          <Tabs.Tab value={3} label='Healt Check' />
        </Tabs>
      </div>

      <div className={styles.tabsPanelMain}>
        <Tabs.Panel value={tab} index={1}>
          <div>
            <UploadToMinio />
          </div>
        </Tabs.Panel>

        <Tabs.Panel value={tab} index={2}>
          <WorkWithArtifacts />
        </Tabs.Panel>

        <Tabs.Panel value={tab} index={3}>
          <HealthCheck />
        </Tabs.Panel>
      </div>
    </Modal>
  );
};
