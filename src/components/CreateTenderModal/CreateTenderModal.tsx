// Core
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  change,
  destroy,
  FormName,
  getFormValues,
  initialize,
} from 'redux-form';

// Components
import {
  Modal,
  ModalComponentProps,
  Stepper,
  Step,
  Button,
  Icon,
  useModal,
} from 'react-lib';

// Styles
import styles from './CreateTenderModal.module.scss';
import ServicesList from '../../forms/ServicesList/ServicesList';
import ServicesDataForm from '../../forms/ServicesDataForm/ServicesDataForm';
import Search from './Search/Search';
import { tendersActions } from '@bus/tenders/actions';
import {
  DocumentItemDto,
  DocumentItemView,
  DocumentView,
} from '@typings/swagger/api';
import {
  DocumentItemNamesEnum,
  ReferenceCodesOfServicesEnum,
} from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard';
import { TaskStatusesEnum } from '@src/pages/Flights/components/StatusColumn/StatusColumn';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import DocumentApi from '@src/api/documentApi';
import { date } from 'yup';

// Types
export interface TenderModalProps {
  reload?: () => void;
  reloadOne?: (id: number) => void;
  data?: DocumentView;
}

// const Error = () => {
//   const { openModal } = useModal();
//   const closeModalReloadTable = () => {
//     console.log('close');
//   };
//   const cancelTenderOpen = () => {
//     openModal(ConfirmModal, {
//       mode: 'cancel',
//       buttonPressCallback: closeModalReloadTable,
//     });
//   };
//   return <></>;
// };

const CreateTenderModal: React.FC<
  ModalComponentProps & TenderModalProps
> = ({ handleClose, isOpen, reload, data, reloadOne }) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState<boolean>(true);

  const onClose = React.useCallback(() => {
    handleClose();
    dispatch(destroy('TenderForm'));
  }, []);

  const { openModal } = useModal();

  const [isError, showError] = useState(false);

  const [errorResponse, setErrorResp] = useState(null);

  errorResponse && console.log(errorResponse);

  const errorModal = () => {
    openModal(ConfirmModal, {
      mode: 'errorOnCreate',
      errorLog: errorResponse,
      buttonPressCallback: onClose,
    });
  };

  const [step, setStep] = React.useState(1);

  const onClick = React.useCallback((id: string) => {
    dispatch(change('TenderForm', 'service', id));
    setStep(2);
  }, []);

  const formValues = useSelector(
    (state) => getFormValues('TenderForm')(state),
    () => false,
  ) as {} as {
    service?: string;
    customer?: string;
    company?: string;
    aircraftType?: string;
    aircraft?: string;
    parking?: string;
    startPlan?: string;
    endPlan?: string;
    heatingPoints?: DocumentItemView[];
    heatingPointsMasterCodes?: string[];
    lavatoryType?: DocumentItemDto;
    passengersCategory?: DocumentItemDto;
    [DocumentItemNamesEnum.WaterSystemMaintenance]?: DocumentItemDto;
    parkingFrom: string;
    parkingTo: string;
    routeTo: string;
    routeFrom: string;
    uploadedFile: File;
    started: string;
    completed: string;
    completeUrgently: boolean;
    fluidType: string;
    litersCount: string;
    machineryCount: string;
    jobType: string;
    personnelCount: string;
    workDetail: string;
    kitsCount: string;
    signFormInCreateModal: string;
    maintanceKitFrom: string;
    maintanceKitTo: string;
    maintanceKit: string;
    compressedGas: string;
    ladderType: string;
    ladderSerial: string;
    groundpowerunit: string;
    vehicleGarageNumber: string;
  };

  const {
    service,
    customer,
    company,
    aircraftType,
    aircraft,
    heatingPointsMasterCodes,
    lavatoryType,
    passengersCategory,
    completeUrgently,
    jobType,
    workDetail,
    started,
    completed,
    signFormInCreateModal,
    maintanceKitFrom,
    maintanceKitTo,
    maintanceKit,
    compressedGas,
    ladderType,
    ladderSerial,
    fluidType,
    groundpowerunit,
    vehicleGarageNumber,
  } = formValues;

  const requiredProperties = [
    customer,
    company,
    aircraftType,
    aircraft,
    formValues.completeUrgently ? started : true,
    formValues.completeUrgently ? completed : true,
    formValues.completeUrgently ? signFormInCreateModal : true,
    formValues?.endPlan && formValues?.startPlan && !completeUrgently
      ? +formValues?.endPlan > +formValues?.startPlan
      : true,
    formValues?.completed && formValues?.started
      ? +formValues?.completed > +formValues?.started
      : true,
  ];

  const requiredPropertiesDefined = requiredProperties.every(
    (value) => !!value,
  );

  const onError = () => {
    showError(true);
  };

  useEffect(() => {
    var theBigDay = new Date();

    dispatch(
      change('TenderForm', 'startPlan', theBigDay.setSeconds(0, 0)),
    );
  }, []);

  useEffect(() => {
    (requiredPropertiesDefined &&
      ((heatingPointsMasterCodes &&
        heatingPointsMasterCodes.length) ||
        lavatoryType ||
        passengersCategory ||
        (service === '82' && formValues.fluidType) ||
        (service === '83' &&
          formValues?.routeTo &&
          formValues?.routeFrom &&
          formValues?.routeTo !== formValues?.routeFrom) ||
        jobType ||
        workDetail ||
        formValues[DocumentItemNamesEnum.WaterSystemMaintenance] ||
        service === ReferenceCodesOfServicesEnum.AircraftCooling ||
        service === ReferenceCodesOfServicesEnum.AnyService ||
        service === ReferenceCodesOfServicesEnum.DriverProviding ||
        service ===
          ReferenceCodesOfServicesEnum.ProvidingAirLaunchDevice ||
        service ===
          ReferenceCodesOfServicesEnum.ProvidingAnExtensionCord ||
        service ===
          ReferenceCodesOfServicesEnum.ProvisionOfProcessWater ||
        service === ReferenceCodesOfServicesEnum.SanitaryInspection ||
        (service === ReferenceCodesOfServicesEnum.GroundPowerUnit &&
          formValues?.groundpowerunit) ||
        service ===
          ReferenceCodesOfServicesEnum.ProvidingLiftingTruck ||
        (service === ReferenceCodesOfServicesEnum.LaddersProvision &&
          ladderSerial) ||
        service === ReferenceCodesOfServicesEnum.TieDownStraps ||
        (service === ReferenceCodesOfServicesEnum.CompressedGas &&
          compressedGas))) ||
    (service === ReferenceCodesOfServicesEnum.ProvisioningMinibus &&
      formValues?.parkingTo !== formValues?.parkingFrom &&
      formValues?.passengersCategory) ||
    formValues?.parkingTo === 'Брифинг' ||
    (service === ReferenceCodesOfServicesEnum.MaintanceKit &&
      maintanceKitFrom &&
      maintanceKitTo &&
      maintanceKitFrom !== maintanceKitTo &&
      maintanceKit &&
      (formValues.service || formValues?.completeUrgently))
      ? setDisabled(false)
      : setDisabled(true);
  }, [formValues]);

  const createTender = (status: string) => {
    dispatch(
      tendersActions.createTenderAsync({
        data: { ...formValues, status },
        ...(formValues?.uploadedFile && {
          file: formValues.uploadedFile,
        }),
        reload,
        onError,
        onClose,
        setErrorResp,
      }),
    );
    onClose();
  };

  const initialStateForCopy = {
    aircraft: formValues?.aircraft,
    //@ts-ignore
    aircraftName: formValues?.aircraft?.name,
    customer: formValues?.customer,
    customerReference: formValues?.customer,
  };

  const openTenderModalOnExisting = () => {
    dispatch(initialize('TenderForm', initialStateForCopy));
    openModal(CreateTenderModal, { data, reload });
  };

  const createTenderAndReturn = (status: string) => {
    dispatch(
      tendersActions.createTenderAsync({
        data: { ...formValues, status },
        ...(formValues?.uploadedFile && {
          file: formValues.uploadedFile,
        }),
        reload,
        onError,
        setErrorResp,
        onClose,
        openTenderModalOnExisting,
      }),
    );
  };

  const createTenderWithoutPerformer = (status: string) => {
    dispatch(
      tendersActions.createTenderAsync({
        data: { ...formValues, status },
        ...(formValues?.uploadedFile && {
          file: formValues.uploadedFile,
        }),
        ...(formValues?.vehicleGarageNumber && {
          vehicleGarageNumber: formValues.vehicleGarageNumber,
        }),
        ...(formValues?.started && { started: formValues.started }),
        ...(formValues?.completed && {
          completed: formValues.completed,
        }),
        ...(formValues?.signFormInCreateModal && {
          sign: formValues.signFormInCreateModal,
        }),
        reload,
        onError,
        onClose,
      }),
    );
    onClose();
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
      <div className={styles.root}>
        <div className={styles.navBar}>
          <Stepper visited={[1, step]} current={step}>
            <Step label='Список услуг' onClick={() => setStep(1)} />
            <Step label='Данные' onClick={() => setStep(2)} />
          </Stepper>
          <div>
            <Search
              className={step === 1 ? styles.search : styles.hide}
            />
          </div>
        </div>
        {step === 1 && <ServicesList onClick={onClick} />}

        {step === 2 && (
          <>
            <ServicesDataForm />
            {isError && errorModal()}
          </>
        )}
      </div>
      {step === 2 && (
        <div className={styles.footer}>
          <Button
            icon={<Icon name='add' />}
            disabled={formValues.completeUrgently ? true : disabled}
            // className={styles.addTenderButton}
            onClick={() => createTenderAndReturn('confirmed')}
          >
            Скопировать заявку
          </Button>
          <div className={styles.row}>
            <Button
              disabled={!disabled && completeUrgently ? false : true}
              onClick={() =>
                createTenderWithoutPerformer(
                  TaskStatusesEnum.CompletedWithoutPerformer,
                )
              }
              icon={<Icon name='check' />}
            >
              Завершить
            </Button>
            <Button
              disabled={formValues.completeUrgently ? true : disabled}
              onClick={() => createTender('confirmed')}
              icon={<Icon name='further' />}
            >
              Отправить
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CreateTenderModal;
