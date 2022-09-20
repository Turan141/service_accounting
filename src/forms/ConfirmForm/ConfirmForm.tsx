import styles from '@components/ConfirmModal/ConfirmModal.module.scss';
import { Button, H2, Input, Textarea } from 'react-lib';
import AttentionAlert from '@components/AttentionAlert';
import React from 'react';
import { reduxForm } from 'redux-form';

export interface ConfirmFormProps {
  mode:
    | 'sign'
    | 'cancel'
    | 'completeWithoutPerformer'
    | 'completeFromDispatcher'
    | 'unlock'
    | 'errorOnCreate';
  errorLog: any;
}

const ConfirmForm: React.FC<ConfirmFormProps> = ({
  mode,
  errorLog,
}) => {
  return (
    <>
      {mode === 'errorOnCreate' && (
        <div className={styles.root}>
          <H2 className={styles.header}>Произошла ошибка!</H2>
          <AttentionAlert
            text={
              'Внимание! Произошла непредвиденная ошибка, обратитесь в службу поддержки.'
            }
            className={styles.alert}
          />
          <AttentionAlert
            text={`
            Код ошибки:  ${errorLog.error?.response?.status} 
            Тип ошибки: ${errorLog.error?.response?.statusText} 
            Путь запроса: ${errorLog.error.response.request.responseURL} 
            Доп информация: ${errorLog.error?.response?.data?.Message}
            `}
          />
        </div>
      )}

      {mode === 'cancel' && (
        <div className={styles.root}>
          <H2 className={styles.header}>Отменить</H2>
          <AttentionAlert
            text={'Вы действительно хотите отменить заявку?'}
            className={styles.alert}
          />
          <Textarea.Redux
            name='serviceCancellationReason'
            placeholder={'Укажите причину отмены заявки'}
            label='Дополнительная информация'
            className={styles.info}
          />
        </div>
      )}

      {mode === 'unlock' && (
        <div className={styles.root}>
          <H2 className={styles.header}>Разблокировка заявки.</H2>
          <AttentionAlert
            text={
              ' Внимание! Внесенные изменения в заявку предыдущим пользователем не сохраняться, продолжить?'
            }
            className={styles.alert}
          />
        </div>
      )}

      {mode === 'completeWithoutPerformer' && (
        <div className={styles.root}>
          <H2 className={styles.header}>Завершить</H2>
          <AttentionAlert
            text={
              'Вы действительно хотите создать, завершить и перейти к результату?'
            }
            className={styles.alert}
          />
        </div>
      )}

      {mode === 'completeFromDispatcher' && (
        <div className={styles.root}>
          <H2 className={styles.header}>Завершить</H2>
          <AttentionAlert
            text={
              'Вы действительно хотите завершить и перейти к результату?'
            }
            className={styles.alert}
          />
        </div>
      )}

      {mode === 'sign' && (
        <div className={styles.root}>
          <H2 className={styles.header}>Подписать</H2>
          <Textarea.Redux
            name='dispatcherComment'
            label='Дополнительная информация'
            placeholder={'Где получено подтверждение подписания'}
            className={styles.info}
          />
        </div>
      )}
    </>
  );
};

export default reduxForm<ConfirmFormProps, ConfirmFormProps>({
  form: 'TenderConfirmationForm',
  initialValues: {},
  destroyOnUnmount: true,
})(ConfirmForm);
