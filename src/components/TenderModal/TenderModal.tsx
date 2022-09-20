// Core
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change, destroy, getFormValues } from 'redux-form';
import documentApi from '../../api/documentApi';
import dayjs from 'dayjs';
// Components
import {
  Button,
  H2,
  H4,
  Icon,
  Modal,
  ModalComponentProps,
  useModal,
} from 'react-lib';
import ConfirmModal from '@components/ConfirmModal/ConfirmModal';
import ServicesDataForm from '../../forms/ServicesDataForm/ServicesDataForm';
// Styles
import styles from './TenderModal.module.scss';
import classNames from 'classnames';
// Types
import { TenderModalProps } from '@components/CreateTenderModal/CreateTenderModal';
import { TaskStatusesEnum } from '@pages/Flights/components/StatusColumn/StatusColumn';
import { tendersActions } from '@bus/tenders/actions';
import TenderSignature from '@components/TenderModal/TenderSignature/TenderSignature';
import { attachmentsActions } from '@bus/attachment/actions';
import { getAttachments } from '@bus/attachment/selectors';
import { DocumentItemView, DocumentView } from '@typings/swagger/api';
import { DocumentItemNamesEnum } from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard';
import { checkAccess } from '@helpers/utils';
import { DictionaryFilter } from '@api/dictionaryApi';

const TenderModal: React.FC<
  ModalComponentProps & TenderModalProps
> = ({ handleClose, isOpen, data, reload, reloadOne }) => {
  const dispatch = useDispatch();

  const customerSign = useSelector(getAttachments);

  const { openModal } = useModal();
  const ref = useRef<HTMLDivElement>(null);

  const closeModalReloadTable = () => {
    handleClose();
    dispatch(destroy('TenderForm'));
    reloadOne && data?.id && reloadOne(data.id);
  };

  const onClose = useCallback(() => {
    handleClose();
    dispatch(destroy('TenderForm'));
  }, []);

  const cancelTenderOpen = () => {
    openModal(ConfirmModal, {
      mode: 'cancel',
      buttonPressCallback: closeModalReloadTable,
    });
  };

  const signTenderOpen = () => {
    openModal(ConfirmModal, {
      mode: 'sign',
      buttonPressCallback: closeModalReloadTable,
    });
  };

  const changeTenderStatus = useCallback(
    (status: TaskStatusesEnum) => {
      dispatch(
        tendersActions.editTenderStatusAsync({
          documentId: data?.id,
          status: status,
          reload: closeModalReloadTable,
        }),
      );
    },
    [],
  );

  const completeFromDispatcher = () => {
    dispatch(
      tendersActions.editTendersRecordAsync({
        documentId: formValues.id,
        data: { ...formValues },
        started: formValues.started,
        completed: formValues.completed,
        sign: formValues.signFormInCreateModal,
        status: TaskStatusesEnum.CompletedFromDispatcher,
        reload: closeModalReloadTable,
      }),
    );
  };

  // openModal(ConfirmModal, {
  //   mode: 'completeFromDispatcher',
  //   documentId: formValues.id,
  //   buttonPressCallback: closeModalReloadTable,
  // });

  useEffect(() => {
    if (isOpen && data) {
      dispatch(
        tendersActions.fetchTenderStatusHistoryRecordAsync({
          filter: [],
          documentId: data?.id,
        }),
      );
      dispatch(
        tendersActions.fetchTenderEditLogRecordAsync({
          filter: [],
          documentId: data?.id,
        }),
      );
      documentApi.setLock(data);

      if (data?.items?.length) {
        const index = data.items.findIndex(
          (item) => item.type === 'customerSign',
        );
        if (index > -1) {
          dispatch(
            attachmentsActions.fetchAttachmentAsync({
              documentId: data?.id,
              // @ts-ignore
              documentItemId: data?.items[index].id,
            }),
          );
        }
      }
    }
    return function setUnlocked() {
      documentApi.setUnlock(data);
    };
  }, [isOpen, data]);

  const customerFullName = useMemo(() => {
    if (data?.items?.length) {
      const index = data.items.findIndex(
        (item) => item.type === 'customerSign',
      );
      if (index > -1) {
        return data?.items[index].properties?.fullName;
      }
    }
  }, [data]);

  const formValues = useSelector(
    (state) => getFormValues('TenderForm')(state),
    undefined,
  ) as {} as {
    customer?: string;
    company?: string;
    aircraftType?: string;
    aircraft?: string;
    parking?: string;
    startPlan?: string;
    endPlan?: string;
    heatingPoints?: DocumentItemView[];
    dispatcherSign?: DocumentItemView;
    customerSign?: DocumentItemView;
    serviceName?: string;
    completeUrgently?: boolean;
    heatingPointsMasterCodes?: string;
    compressedGas?: string;
    lavatoryType?: string;
    ladderSerial: string;
    service: string;
    vehicleGarageNumber:string;
  } & DocumentView;

  const parkingValues = useSelector(
    (state) => getFormValues('TenderForm')(state),
    () => false,
  ) as DocumentView &
    DictionaryFilter & {
      startPlan: number;
      endPlan?: number;
    };

  const updateTender = () => {
    dispatch(
      tendersActions.editTendersRecordAsync({
        data: { ...formValues },
        reload: closeModalReloadTable,
        ...(formValues?.started && { started: formValues.started }),
        ...(formValues?.completed && {
          completed: formValues.completed,
        }),
        ...(formValues?.vehicleGarageNumber && {
          vehicleGarageNumber: formValues.vehicleGarageNumber,
        }),
        ...(formValues?.signFormInCreateModal && {
          sign: formValues.signFormInCreateModal,
        }),
      }),
    );
  };

  const updateTenderAndVerifyOrReject = async (
    status: TaskStatusesEnum,
  ) => {
    dispatch(
      tendersActions.confirmOrRejectAsync({
        data: { ...formValues },
        status: status,
        reload: closeModalReloadTable,
      }),
    );
  };

  const checkIfShouldDisableModifyBtn = () => {
    if (
      (formValues?.serviceName === 'Предоставление микроавтобусов' &&
        parkingValues?.parkingTo === parkingValues?.parkingFrom) ||
      !formValues?.aircraft ||
      !formValues?.aircraftType ||
      !formValues?.company ||
      formValues?.completeUrgently ||
      (formValues?.service === '72' && !formValues?.ladderSerial) ||
      (formValues?.endPlan &&
        formValues?.startPlan &&
        +formValues?.endPlan - +formValues?.startPlan < 0) ||
      (formValues?.completed &&
        formValues?.started &&
        +formValues?.completed - +formValues?.started < 0)
    ) {
      return true;
    }
  };

  const checkIfShouldDisableCompleteBtn = () => {
    if (
      (formValues?.serviceName === 'Предоставление микроавтобусов' &&
        parkingValues?.parkingTo === parkingValues?.parkingFrom) ||
      !formValues?.aircraft ||
      !formValues?.aircraftType ||
      !formValues.company ||
      (formValues.completeUrgently &&
        (!formValues?.started || !formValues?.completed)) ||
      !formValues.signFormInCreateModal ||
      (formValues?.endPlan &&
        formValues?.startPlan &&
        +formValues?.endPlan - +formValues?.startPlan < 0) ||
      (formValues?.completed &&
        formValues?.started &&
        +formValues?.completed - +formValues?.started < 0)
    ) {
      return true;
    }
  };

  const checkIfShouldDisableAcceptRejectBtn = () => {
    if (
      formValues?.startedFixed &&
      formValues?.completedFixed &&
      +formValues?.completedFixed - +formValues?.startedFixed > 0
    ) {
      return false;
    } else return true;
  };

  return (
    <Modal
      style={{
        width: '70%',
        height: '100%',
        borderRadius: 0,
      }}
      className={styles.modal}
      onClose={onClose}
      isOpen={isOpen}
    >
      <div ref={ref} className={styles.root}>
        <div className={styles.header}>
          <H2>
            №{data?.number} {` `}
            {data?.properties?.serviceName} от {` `}
            {dayjs(data?.createdAt, undefined)
              .local()
              .format('DD.MM.YYYY HH:mm')}
          </H2>
        </div>
        <H4 className={styles.subHeader}>Информация</H4>
        <ServicesDataForm
          initialValues={{
            ...data,
            [DocumentItemNamesEnum.ForcedDownTime]: data?.items?.find(
              (item) =>
                item.type === DocumentItemNamesEnum.ForcedDownTime,
            ),
            [DocumentItemNamesEnum.GarageNumberOfSpecialEquipment]:
              data?.items?.find(
                (item) =>
                  item.type ===
                  DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
              ),
            ...(data?.items?.length && {
              heatingPointsMasterCodes: data?.items
                ?.filter(
                  (item) =>
                    item.type === DocumentItemNamesEnum.HeatingPoint,
                )
                .map((item) => item.masterCode),
            }),

            ...(data?.items?.length && {
              heatingPoints: data?.items?.filter(
                (item) =>
                  item.type === DocumentItemNamesEnum.HeatingPoint,
              ),
            }),
            lavatoryType: data?.items?.find(
              (item) => item.type === DocumentItemNamesEnum.Lavatory,
            )?.masterCode,
            customerSign: data?.items?.find(
              (item) =>
                item.type === DocumentItemNamesEnum.CustomerSign,
            ),
            dispatcherSign: data?.items?.find(
              (item) =>
                item.type === DocumentItemNamesEnum.DispatcherSign,
            ),
            airline: data?.properties?.company,
          }}
        />

        {(formValues?.customerSign ||
          formValues?.properties?.serviceCancellation) && (
          <TenderSignature
            status={formValues.status}
            completed={formValues.properties?.completed}
            signature={customerSign}
            customerFullName={customerFullName}
            dispatcherSign={formValues?.dispatcherSign}
            customerSign={formValues?.customerSign}
          />
        )}

        {formValues?.status ===
          TaskStatusesEnum.CompletedWithoutPerformer && (
          <TenderSignature
            status={formValues.status}
            completed={formValues.properties?.completed}
            signature={customerSign}
            customerFullName={customerFullName}
            dispatcherSign={formValues?.dispatcherSign}
            customerSign={formValues?.customerSign}
          />
        )}

        {formValues?.status ===
          TaskStatusesEnum.CompletedFromDispatcher && (
          <TenderSignature
            status={formValues.status}
            completed={formValues.properties?.completed}
            signature={customerSign}
            customerFullName={customerFullName}
            dispatcherSign={formValues?.dispatcherSign}
            customerSign={formValues?.customerSign}
          />
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.row}>
          <Button
            icon={<Icon name='messageProfile' />}
            className={classNames(
              styles.addTenderButton,
              styles.buttonMargin,
            )}
          >
            Написать заказчику
          </Button>
          {[
            TaskStatusesEnum.New,
            TaskStatusesEnum.Confirmed,
            TaskStatusesEnum.ConfirmedPerformer,
            TaskStatusesEnum.Started,
          ].some((value) => value === data?.status) &&
            formValues?.completeUrgently && (
              <Button
                onClick={completeFromDispatcher}
                icon={<Icon name='done' />}
                className={styles.buttonMarginLeft}
                disabled={checkIfShouldDisableCompleteBtn()}
              >
                Завершить
              </Button>
            )}
        </div>
        <div className={styles.row}>
          {[TaskStatusesEnum.New, TaskStatusesEnum.Confirmed].some(
            (value) => value === data?.status,
          ) && (
            <Button
              onClick={cancelTenderOpen}
              icon={<Icon name='close' />}
              className={classNames(
                styles.addTenderButton,
                styles.buttonMarginLeft,
              )}
            >
              Отменить
            </Button>
          )}

          {(data?.status === TaskStatusesEnum.New ||
            data?.status === TaskStatusesEnum.Confirmed ||
            data?.status ===
              TaskStatusesEnum.CompletedWithoutPerformer ||
            data?.status ===
              TaskStatusesEnum.CompletedFromDispatcher ||
            data?.status === TaskStatusesEnum.Completed) && (
            <Button
              icon={<Icon name='edit' />}
              disabled={checkIfShouldDisableModifyBtn()}
              className={
                checkIfShouldDisableModifyBtn()
                  ? styles.blocked
                  : styles.addTenderButton
              }
              onClick={updateTender}
            >
              Сохранить и Закрыть
            </Button>
          )}
          {data?.status === TaskStatusesEnum.New && (
            <>
              <Button
                onClick={changeTenderStatus.bind(
                  null,
                  TaskStatusesEnum.Confirmed,
                )}
                icon={<Icon name='done' />}
                className={styles.buttonMarginLeft}
              >
                Подтвердить
              </Button>
            </>
          )}
        </div>
        {data?.status ===
          TaskStatusesEnum.CompletedWithoutSignature && (
          <Button
            icon={<Icon name='edit' />}
            className={classNames(
              styles.addTenderButton,
              styles.buttonMarginLeft,
            )}
            onClick={signTenderOpen}
          >
            Подписать
          </Button>
        )}
        {checkAccess(['6']) && (
          <>
            {data?.status === TaskStatusesEnum.ManualVerification && (
              <>
                <div className={styles.row}>
                  <Button
                    disabled={checkIfShouldDisableAcceptRejectBtn()}
                    icon={<Icon name='statusBlock' />}
                    className={
                      !checkIfShouldDisableAcceptRejectBtn()
                        ? classNames(
                            styles.rejectedButton,
                            styles.buttonMarginLeft,
                          )
                        : styles.disabledBtn
                    }
                    onClick={updateTenderAndVerifyOrReject.bind(
                      null,
                      TaskStatusesEnum.Rejected,
                    )}
                  >
                    Отклонено
                  </Button>
                  <Button
                    disabled={checkIfShouldDisableAcceptRejectBtn()}
                    icon={<Icon name='statusDone' />}
                    className={
                      !checkIfShouldDisableAcceptRejectBtn()
                        ? classNames(
                            styles.checkedButton,
                            styles.buttonMarginLeft,
                          )
                        : styles.disabledBtn
                    }
                    onClick={updateTenderAndVerifyOrReject.bind(
                      null,
                      TaskStatusesEnum.Verified,
                    )}
                  >
                    Проверено
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default TenderModal;
