import React, { useCallback, useState } from 'react';
import { Button, Icon, Modal, ModalComponentProps } from 'react-lib';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ConfirmModal.module.scss';
import { tendersActions } from '@bus/tenders/actions';
import { getFormValues } from 'redux-form';
import ConfirmForm from '@src/forms/ConfirmForm/ConfirmForm';
import { DocumentItemView, DocumentView } from '@typings/swagger/api';
import { TaskStatusesEnum } from '@pages/Flights/components/StatusColumn/StatusColumn';

export interface ConfirmModalProps extends ModalComponentProps {
  mode:
    | 'sign'
    | 'cancel'
    | 'completeWithoutPerformer'
    | 'completeFromDispatcher'
    | 'errorOnCreate';
  status: string;
  documentId: string;
  buttonPressCallback?: () => void;
  reload: () => void;
  errorLog?: any;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  handleClose,
  isOpen,
  mode,
  buttonPressCallback,
  status,
  documentId,
  reload,
  errorLog
}) => {
  const dispatch = useDispatch();

  const formValues = useSelector(
    (state) => getFormValues('TenderConfirmationForm')(state),
    () => false,
  ) as DocumentView & {
    dispatcherComment: string;
    serviceCancellationReason: string;
  };

  const tenderForm = useSelector(
    (state) => getFormValues('TenderForm')(state),
    () => false,
  ) as DocumentView;

  const submitHandler = () => {
    if (mode === 'sign') {
      dispatch(
        tendersActions.signTender({
          documentId: tenderForm.id,
          dispatcherComment: formValues.dispatcherComment,
          reload: buttonPressCallback,
        }),
      );
    } else if (mode === 'cancel') {
      dispatch(
        tendersActions.editTenderStatusAsync({
          documentId: tenderForm.id,
          status: TaskStatusesEnum.Canceled,
          properties: {
            serviceCancellation: 'true',
            serviceCancellationReason:
              formValues.serviceCancellationReason,
          },
          reload: buttonPressCallback,
        }),
      );
    } else if (mode === 'completeWithoutPerformer') {
      dispatch(
        tendersActions.createTenderAsync({
          data: { ...tenderForm, status },
          ...(tenderForm?.uploadedFile && {
            file: tenderForm.uploadedFile,
          }),
          ...(tenderForm?.started && { started: tenderForm.started }),
          ...(tenderForm?.completed && {
            completed: tenderForm.completed,
          }),
          ...(tenderForm?.signFormInCreateModal && {
            sign: tenderForm.signFormInCreateModal,
          }),
          reload,
        }),
      );
    } else if (mode === 'completeFromDispatcher') {
      dispatch(
        tendersActions.completeFromDispatcher({
          documentId: documentId,
          data: { ...tenderForm },
          ...(tenderForm?.started && { started: tenderForm.started }),
          ...(tenderForm?.completed && {
            completed: tenderForm.completed,
          }),
        }),
      );
    } else if (mode === 'errorOnCreate') {
      buttonPressCallback && buttonPressCallback();
      handleClose();
      return;
    } else if (mode === 'unlock') {
      buttonPressCallback && buttonPressCallback();
      handleClose();
      return;
    }
    buttonPressCallback && buttonPressCallback();
  };

  return (
    <Modal
      style={{
        width: 520,
        borderRadius: 12,
      }}
      className={styles.modal}
      onClose={handleClose}
      isOpen={isOpen}
    >
      <ConfirmForm mode={mode} errorLog={errorLog}/>
      <div className={styles.buttonContainer}>
        {mode === 'errorOnCreate' ? (
          <Button
            icon={<Icon name='done' />}
            className={styles.buttonMarginLeft}
            onClick={submitHandler}
          >
            Закрыть
          </Button>
        ) : (
          <Button
            icon={<Icon name='done' />}
            className={styles.buttonMarginLeft}
            onClick={submitHandler}
          >
            Подтвердить
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ConfirmModal;
