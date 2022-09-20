import styles from './ServiceCard.module.scss';
import React, { useCallback, useEffect, useState } from 'react';
import {
  AsyncSelect,
  FileInput,
  H1,
  H2,
  Icon,
  Input,
  Switch,
} from 'react-lib';
import Textarea from '@components/Textarea';
import DictionaryApi, { DictionaryFilter } from '@api/dictionaryApi';

import { TaskStatusesEnum } from '@pages/Flights/components/StatusColumn/StatusColumn';
import { useDispatch, useSelector } from 'react-redux';
import {
  change,
  clearFields,
  destroy,
  getFormValues,
} from 'redux-form';
import {
  DocumentItemView,
  DocumentView,
  ReferenceView,
} from '@typings/swagger/api';
import { DateTimePickerRedux } from '@components/DateTimePicker/DateTimePicker';
import AttachmentApi from '@api/attachmentApi';
import HeatingItems from '@src/forms/TenderSpecificItems/HeatingItems';
import ToiletItems from '@src/forms/TenderSpecificItems/ToiletItems';
import ProvisioningMinibus from '@src/forms/TenderSpecificItems/ProvisioningMinibus';
import WaterSystemMaintenance from '@src/forms/TenderSpecificItems/WaterSystemMaintenance';
import AircraftCooling from '@src/forms/TenderSpecificItems/AircraftCooling';
import { GarageNumberOfSpecialEquipment } from './GarageNumberOfSpecialEquipment/VehicleGarageNumber';
import { FlightNumber } from '@src/forms/TenderCommonItems/FlightNumber';
import AnyService from '@src/forms/TenderSpecificItems/AnyService';
import { checkAccess } from '@helpers/utils';
import { FixedTimeForm } from '@src/forms/TenderCommonItems/FixedTimeForm';
import { PerformerName } from '@src/forms/TenderCommonItems/PerformerName';
import DriverProviding from '@src/forms/TenderSpecificItems/DriverProviding';
import ProvidingAirLaunchDevice from '@src/forms/TenderSpecificItems/ProvidingAirLaunchDevice';
import ProvidingAnExtensionCord from '@src/forms/TenderSpecificItems/ProvidingAnExtensionCord';
import SanitaryInspection from '@src/forms/TenderSpecificItems/SanitaryInspection';
import ProvisionOfProcessWater from '@src/forms/TenderSpecificItems/ProvisionOfProcessWater';
import { useModal } from 'react-lib';
import TieDownStraps from '@src/forms/TenderSpecificItems/TieDownStraps';
import PersonnelForAdditionalWork from '@src/forms/TenderSpecificItems/PersonnelForAdditionalWork';
import ProvisionOfSpecialMachinery from '@src/forms/TenderSpecificItems/ProvisionOfSpecialMachinery';
import DrainContainer from '@src/forms/TenderSpecificItems/DrainContainer';
import ProvisioningEscortVehicle from '@src/forms/TenderSpecificItems/ProvisioningEscortVehicle';
import classNames from 'classnames';
import GroundPowerUnit from '@src/forms/TenderSpecificItems/GroundPowerUnit';
import LaddersProvision from '@src/forms/TenderSpecificItems/LaddersProvision';
import CompressedGas from '@src/forms/TenderSpecificItems/CompressedGas';
import MaintanceKit from '@src/forms/TenderSpecificItems/MaintanceKit';
import ProvidingLiftingTruck from '@src/forms/TenderSpecificItems/ProvidingLiftingTruck';
import TenderSignature from '@src/components/TenderModal/TenderSignature/TenderSignature';
import servicesApi from '@src/api/servicesApi';

export enum DocumentItemNamesEnum {
  AnyServiceFlight = 'AnyServiceFlight',
  ForcedDownTime = 'forcedDownTime',
  GarageNumberOfSpecialEquipment = 'garageNumberOfSpecialEquipment',
  ProvisioningMinibuses = 'provisioningminibuses',
  WaterSystemMaintenance = 'watersystemmaintenance',
  AircraftCooling = 'aircraftcooling',
  HeatingPoint = 'heatingPoint',
  Lavatory = 'lavatory',
  CustomerSign = 'customerSign',
  DispatcherSign = 'dispatcherSign',
  AircraftParkings = 'AircraftParkings',
  PassengerCategories = 'PassengerCategories',
  AircraftsType = 'AircraftsType',
  ProvidingAirLaunchDevice = 'providingAirLaunchDevice',
  SanitaryInspection = 'sanitaryInspection',
  DriverProviding = 'driverProviding',
  ProvisionOfProcessWater = 'ProvisionOfProcessWater',
  ProvidingAnExtensionCord = 'providingAnExtensionCord',
  TieDownStraps = 'tiedownstraps',
  PersonnelForAdditionalWork = 'personnelforadditionalwork',
  ProvisionOfSpecialMachinery = 'provisionofspecialmachinery',
  DrainContainer = 'draincontainer',
  ProvisioningEscortVehicle = 'provisioningescortvehicle',
  GroundPowerUnit = 'groundpowerunit',
  LaddersProvision = 'laddersprovision',
  CompressedGas = 'refuelingwithcompressedgas',
  MaintanceKit = 'maintancekit',
  ProvidingLiftingTruck = 'providingliftingtruck',
}

export enum ReferenceCodesOfDictionariesEnum {
  ProvisioningEscortVehicle,
}

export interface AttachmentView {
  name: 'attachments';
  mimeType: string;
  url: string;
  created: number;
}

export enum ReferenceCodesOfServicesEnum {
  Heating = '70',
  Lavatory = '75',
  ProvisioningMinibus = '71',
  WaterSystemMaintenance = '80',
  AircraftCooling = '73',
  AnyService = 'anyService',
  ProvidingAirLaunchDevice = '74',
  SanitaryInspection = '76',
  DriverProviding = '77',
  ProvisionOfProcessWater = '78',
  ProvidingAnExtensionCord = '79',
  TieDownStraps = '88',
  PersonnelForAdditionalWork = '85',
  ProvisionOfSpecialMachinery = '84',
  DrainContainer = '82',
  ProvisioningEscortVehicle = '83',
  GroundPowerUnit = '81',
  LaddersProvision = '72',
  CompressedGas = '89',
  MaintanceKit = '86',
  ProvidingLiftingTruck = '87',
}

const ServiceCard: React.FC = () => {
  const [attachments, setAttachments] = useState<AttachmentView[]>(
    [],
  );
  const [serviceName, setServiceName] = useState(null);
  const [isFile, setIsFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const formValues = useSelector(
    (state) => getFormValues('TenderForm')(state),
    () => false,
  ) as DocumentView &
    DictionaryFilter & {
      heatingPoints?: DocumentItemView[];
      customerSign?: DocumentItemView;
      forcedDownTime?: DocumentItemView;
      [DocumentItemNamesEnum.GarageNumberOfSpecialEquipment]?: DocumentItemView;
      startPlan: number;
      endPlan?: number;
      customerName?: string;
      aircraftName?: string;
      customerReference?: ReferenceView;
      heatingPointsMasterCodes?: string[];
      flight?: string;
      uploadedFile: File;
      completeUrgently: boolean;
    };

  const getAttachments = useCallback(() => {
    AttachmentApi.getTenderAttachments(formValues.id)
      .then((response) => setAttachments(response))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (formValues.id) {
      getAttachments();
    }
  }, []);

  useEffect(() => {
    getServiceName();
  }, []);

  const getServiceName = async () => {
    const serviceList = await servicesApi.getServiceList();
    const currentServiceName = await serviceList.find(
      (item: any) => item?.masterCode === formValues?.service,
    );
    setServiceName(currentServiceName?.name);
  };

  const onDownloadFile = useCallback(() => {
    if (attachments[0].mimeType === 'application/pdf') {
      AttachmentApi.viewPdfInNewTabById(
        attachments[0].url,
        attachments[0].mimeType,
      ).then((r) => console.log('downloaded'));
    } else {
      AttachmentApi.getFileById(
        attachments[0].url,
        attachments[0].mimeType,
      ).then((r) => console.log('downloaded'));
    }
  }, [attachments]);

  const onDeleteDocument = useCallback(() => {
    if (attachments[0]) {
      setIsLoading(true);
      AttachmentApi.deleteTenderAttachmentsByIds(formValues.id, [
        attachments[0].url,
      ]).then((r) => {
        console.log('deleted');
        getAttachments();
        setIsLoading(false);
      });
    }
  }, [attachments]);

  const onDeleteDocumentOnCreate = () => {
    dispatch(change('TenderForm', 'uploadedFile', null));
    dispatch(clearFields('TenderForm', false, false, 'uploadedFile'));
    setIsFile((isFile) => !isFile);
    getAttachments();
  };

  const onAttachFile = useCallback((file: File) => {
    if (file !== null) {
      setIsLoading(true);
      console.log('starting adding file');
      AttachmentApi.addTenderAttachment(formValues.id, file).then(
        (resp) => {
          getAttachments();
          setIsLoading(false);
          console.log('successfully added file ', resp);
        },
      );
    }
  }, []);

  const convertMinsToHours = (endTime: string, startTime: string) => {
    let getTime = +Math.round((+endTime - +startTime) / 60000);
    console.log(getTime);
    if (getTime <= 0) {
      return 'Заявка не может быть завершена раньше начала!';
    }
    if (getTime >= 60) {
      let hours = Math.trunc(getTime / 60);
      let minutes = Math.floor(getTime % 60);
      return ` ${hours} ч ${minutes} мин`;
    } else if (getTime > 0 && getTime < 1) {
      return `${getTime} мин`;
    } else return `${getTime} мин`;
  };

  return (
    <>
      <div className={styles.root}>
        <H2>{formValues?.properties?.serviceName}</H2>
        <div className={styles.row} style={{ marginTop: 27 }}>
          <div className={styles.col}>
            {formValues?.status === undefined && (
              <p className={styles.info}>
                Поля отмеченные знаком * обязательные для заполнения
              </p>
            )}
            {formValues?.status === undefined && (
              <H2>{serviceName}</H2>
            )}
            <AsyncSelect.Redux
              fetch={DictionaryApi.getDictionaryItems.bind(
                null,
                'Customers',
                {
                  airline: formValues?.company,
                },
              )}
              fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                null,
                'Customers',
              )}
              dataToValue={(x: any) => x}
              dataToRender={(x: any) => x?.properties?.nameRu}
              name='customer'
              label='Заказчик *'
              defaultDisplayValue={
                formValues?.customerReference?.description
              }
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <AsyncSelect.Redux
              fetch={DictionaryApi.getDictionaryItems.bind(
                null,
                'Companies',
                {
                  name:
                    formValues?.customer?.properties?.airline ||
                    formValues?.airline,
                },
              )}
              fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                null,
                'Companies',
              )}
              dataToValue={(x: any) => x.masterCode}
              dataToRender={(x: any) => x.properties?.nameRu}
              name='company'
              label='Авиакомпания *'
            />
          </div>
          <div className={styles.col}>
            <AsyncSelect.Redux
              fetch={DictionaryApi.getDictionaryItems.bind(
                null,
                'Transports',
                {
                  ...(formValues?.company && {
                    company: formValues?.company?.toUpperCase(),
                  }),
                  ...(formValues?.customer?.properties?.airline && {
                    company:
                      formValues?.customer?.properties?.airline,
                  }),
                },
              )}
              fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                null,
                'Transports',
              )}
              dataToValue={(x: any) => x}
              dataToRender={(x: any) => x.name}
              name='aircraft'
              label='Бортовой номер *'
              defaultDisplayValue={formValues?.aircraftName}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <AsyncSelect.Redux
              fetch={DictionaryApi.getDictionaryItems.bind(
                null,
                DocumentItemNamesEnum.AircraftsType,
                {
                  type:
                    formValues?.aircraft?.properties?.type?.toUpperCase() ||
                    formValues?.properties?.aircraftType,
                },
              )}
              fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                null,
                DocumentItemNamesEnum.AircraftsType,
              )}
              dataToValue={(x: any) => x.masterCode}
              dataToRender={(x: any) => x.name}
              name='aircraftType'
              label={
                !formValues.aircraft
                  ? 'Тип ВС. Нужно выбрать бортовой номер!'
                  : 'Тип ВС *'
              }
              disabled={!formValues?.aircraft}
            />
          </div>

          <div className={styles.col}>
            <div className={styles.row}>
              <div className={styles.col}>
                <FlightNumber formValues={formValues} />
              </div>
              <div className={styles.col}>
                {formValues.service !==
                  ReferenceCodesOfServicesEnum.ProvisioningMinibus &&
                  formValues.service !==
                    ReferenceCodesOfServicesEnum.ProvisioningEscortVehicle &&
                  formValues.service !==
                    ReferenceCodesOfServicesEnum.MaintanceKit && (
                    <AsyncSelect.Redux
                      fetch={DictionaryApi.getDictionaryItems.bind(
                        null,
                        DocumentItemNamesEnum.AircraftParkings,
                        {},
                      )}
                      fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                        null,
                        DocumentItemNamesEnum.AircraftParkings,
                      )}
                      dataToValue={(x: any) => x.masterCode}
                      dataToRender={(x: any) => x.name}
                      name='parking'
                      label='Место стоянки'
                    />
                  )}
              </div>
            </div>
          </div>
        </div>

        {formValues.status !== undefined &&
        formValues.status !==
          TaskStatusesEnum.CompletedWithoutPerformer ? (
          <PerformerName formValues={formValues} />
        ) : null}

        {[
          ReferenceCodesOfServicesEnum.LaddersProvision,
          ReferenceCodesOfServicesEnum.GroundPowerUnit,
          ReferenceCodesOfServicesEnum.DriverProviding,
          ReferenceCodesOfServicesEnum.DrainContainer,
          ReferenceCodesOfServicesEnum.CompressedGas,
          ReferenceCodesOfServicesEnum.Lavatory,
          ReferenceCodesOfServicesEnum.WaterSystemMaintenance,
          ReferenceCodesOfServicesEnum.AircraftCooling,
          ReferenceCodesOfServicesEnum.Heating,
          ReferenceCodesOfServicesEnum.ProvisioningEscortVehicle,
          ReferenceCodesOfServicesEnum.ProvisioningMinibus,
          ReferenceCodesOfServicesEnum.ProvisionOfProcessWater,
          ReferenceCodesOfServicesEnum.ProvidingAirLaunchDevice,
          ReferenceCodesOfServicesEnum.ProvisionOfSpecialMachinery,
        ].some((value) => value === formValues.service) && (
          <div className={styles.garage}>
            <GarageNumberOfSpecialEquipment formValues={formValues} />
          </div>
        )}

        {formValues.endPlan ? (
          <div className={styles.row}>
            <div className={styles.col}>
              <DateTimePickerRedux
                onChange={() => console.log('fired')}
                maxDate={
                  formValues.startPlan !== formValues.endPlan &&
                  new Date(+formValues.endPlan)
                }
                label={
                  formValues.completeUrgently
                    ? 'Начало (план)'
                    : 'Начало (план) *'
                }
                name='startPlan'
              />
            </div>
            <div className={styles.col}>
              <DateTimePickerRedux
                minDate={
                  +formValues.startPlan &&
                  new Date(+formValues.startPlan)
                }
                label={
                  formValues.completeUrgently
                    ? 'Окончание (план)'
                    : 'Окончание (план) *'
                }
                name='endPlan'
              />
            </div>
          </div>
        ) : (
          <div className={styles.row}>
            <div className={styles.col}>
              <DateTimePickerRedux
                // minDate={Date.now()}
                label={
                  formValues.completeUrgently
                    ? 'Начало (план)'
                    : 'Начало (план) *'
                }
                name='startPlan'
              />
            </div>
            <div className={styles.col}>
              <DateTimePickerRedux
                minDate={
                  +formValues.startPlan &&
                  new Date(+formValues.startPlan)
                }
                label={
                  formValues.completeUrgently
                    ? 'Окончание (план)'
                    : 'Окончание (план) *'
                }
                name='endPlan'
                value={+formValues.startPlan + 60}
              />
            </div>
          </div>
        )}
        {[
          TaskStatusesEnum.Confirmed,
          TaskStatusesEnum.ConfirmedPerformer,
          TaskStatusesEnum.New,
          TaskStatusesEnum.Started,
          undefined,
        ].some((value) => value === formValues.status) ? (
          <div className={styles.row}>
            <div className={styles.col}>
              <Switch.Redux
                name={'completeUrgently'}
                label='Завершить досрочно?'
              />
            </div>
          </div>
        ) : null}

        {formValues.completeUrgently ||
        [
          TaskStatusesEnum.Completed,
          TaskStatusesEnum.CompletedWithoutSignature,
          TaskStatusesEnum.ManualVerification,
          TaskStatusesEnum.Verified,
          TaskStatusesEnum.Rejected,
          TaskStatusesEnum.CompletedFromDispatcher,
          TaskStatusesEnum.CompletedWithoutPerformer,
        ].some((value) => value === formValues.status) ? (
          <>
            <div className={styles.row}>
              <div className={styles.col}>
                <DateTimePickerRedux
                  label='Начало (факт) *'
                  name='started'
                  maxDate={formValues?.completed}
                  disabled={
                    formValues?.status ===
                      TaskStatusesEnum.Completed ||
                    formValues?.status ===
                      TaskStatusesEnum.ManualVerification ||
                    formValues?.status ===
                      TaskStatusesEnum.Verified ||
                    formValues?.status === TaskStatusesEnum.Rejected
                  }
                />
              </div>
              <div className={styles.col}>
                <DateTimePickerRedux
                  disabled={
                    formValues?.status ===
                      TaskStatusesEnum.Completed ||
                    formValues?.status ===
                      TaskStatusesEnum.ManualVerification ||
                    formValues?.status ===
                      TaskStatusesEnum.Verified ||
                    formValues?.status === TaskStatusesEnum.Rejected
                  }
                  label='Окончание (факт) *'
                  name='completed'
                  minDate={formValues.started && formValues.started}
                />
              </div>
            </div>
          </>
        ) : null}

        {[
          TaskStatusesEnum.ManualVerification,
          TaskStatusesEnum.Verified,
          TaskStatusesEnum.Rejected,
        ].some((value) => value === formValues.status) ? (
          <>
            {checkAccess(['6']) && (
              <FixedTimeForm formValues={formValues} />
            )}
          </>
        ) : null}

        {formValues.service ===
          ReferenceCodesOfServicesEnum.Heating && (
          <HeatingItems formValues={formValues} />
        )}
        {formValues.service ===
          ReferenceCodesOfServicesEnum.Lavatory && (
          <ToiletItems formValues={formValues} />
        )}
        {formValues.service ===
          ReferenceCodesOfServicesEnum.ProvisioningMinibus && (
          <ProvisioningMinibus formValues={formValues} />
        )}
        {formValues.service ===
          ReferenceCodesOfServicesEnum.WaterSystemMaintenance && (
          <WaterSystemMaintenance formValues={formValues} />
        )}
        {formValues.service ===
          ReferenceCodesOfServicesEnum.AircraftCooling && (
          <AircraftCooling formValues={formValues} />
        )}
        {formValues.service ===
          ReferenceCodesOfServicesEnum.AnyService && (
          <AnyService formValues={formValues} />
        )}
        {formValues.service ===
          ReferenceCodesOfServicesEnum.DriverProviding && (
          <DriverProviding formValues={formValues} />
        )}
        {formValues.service ===
          ReferenceCodesOfServicesEnum.ProvidingAirLaunchDevice && (
          <ProvidingAirLaunchDevice formValues={formValues} />
        )}
        {formValues.service ===
          ReferenceCodesOfServicesEnum.SanitaryInspection && (
          <SanitaryInspection formValues={formValues} />
        )}
        {formValues.service ===
          ReferenceCodesOfServicesEnum.ProvisionOfProcessWater && (
          <ProvisionOfProcessWater formValues={formValues} />
        )}
        {formValues.service ===
          ReferenceCodesOfServicesEnum.ProvidingAnExtensionCord && (
          <ProvidingAnExtensionCord formValues={formValues} />
        )}
        {formValues.service ===
          ReferenceCodesOfServicesEnum.TieDownStraps && (
          <TieDownStraps formValues={formValues} />
        )}

        {formValues.service ===
          ReferenceCodesOfServicesEnum.PersonnelForAdditionalWork && (
          <PersonnelForAdditionalWork formValues={formValues} />
        )}

        {formValues.service ===
          ReferenceCodesOfServicesEnum.ProvisionOfSpecialMachinery && (
          <ProvisionOfSpecialMachinery formValues={formValues} />
        )}

        {formValues.service ===
          ReferenceCodesOfServicesEnum.DrainContainer && (
          <DrainContainer formValues={formValues} />
        )}

        {formValues.service ===
          ReferenceCodesOfServicesEnum.ProvisioningEscortVehicle && (
          <ProvisioningEscortVehicle formValues={formValues} />
        )}

        {formValues.service ===
          ReferenceCodesOfServicesEnum.GroundPowerUnit && (
          <GroundPowerUnit formValues={formValues} />
        )}

        {formValues.service ===
          ReferenceCodesOfServicesEnum.LaddersProvision && (
          <LaddersProvision formValues={formValues} />
        )}

        {formValues.service ===
          ReferenceCodesOfServicesEnum.CompressedGas && (
          <CompressedGas formValues={formValues} />
        )}

        {formValues.service ===
          ReferenceCodesOfServicesEnum.MaintanceKit && (
          <MaintanceKit formValues={formValues} />
        )}

        {formValues.service ===
          ReferenceCodesOfServicesEnum.ProvidingLiftingTruck && (
          <ProvidingLiftingTruck formValues={formValues} />
        )}

        <div className={styles.col}>
          <Input
            prefix={<Icon name={'time'} />}
            label={
              formValues.startedFixed && formValues.completedFixed
                ? 'Общая продолжительность подтв. (мин.)'
                : formValues.started && formValues.completed
                ? 'Общая продолжительность факт (мин.)'
                : 'Общая продолжительность план (мин.)'
            }
            value={
              formValues?.completedFixed && formValues?.startedFixed
                ? convertMinsToHours(
                    formValues?.completedFixed,
                    formValues?.startedFixed,
                  )
                : formValues?.completed
                ? convertMinsToHours(
                    formValues?.completed,
                    formValues?.started,
                  )
                : formValues?.endPlan && formValues?.startPlan
                ? convertMinsToHours(
                    formValues?.endPlan,
                    formValues?.startPlan,
                  )
                : '0'
            }
          />
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <Textarea.Redux
              label='Дополнительная информация'
              name='additionalInfo'
            />
          </div>
        </div>

        {formValues.customerSign?.properties?.customerComments && (
          <div className={styles.row}>
            <div className={styles.col}>
              <Input
                value={
                  formValues.customerSign?.properties
                    ?.customerComments
                }
                label='Дополнительная информация представителя заказчика'
                className={styles.info}
              />
            </div>
          </div>
        )}

        {formValues.properties?.serviceCancellationReason && (
          <div className={styles.row}>
            <div className={styles.col}>
              <Input
                value={
                  formValues.properties?.serviceCancellationReason
                }
                label='Комментарий / причина отмены'
                className={styles.info}
              />
            </div>
          </div>
        )}

        {formValues.customerSign?.additionalInfo && (
          <div className={styles.row}>
            <div className={styles.col}>
              <Input
                value={formValues.customerSign?.additionalInfo}
                label='Дополнительная информация исполнителя'
                className={styles.info}
              />
            </div>
          </div>
        )}

        <div className={styles.row}>
          <div className={styles.col}>
            {isFile || attachments[0] ? (
              <FileInput.Redux
                name='uploadedFile'
                label='Документ'
                placeholder={
                  attachments[0]
                    ? attachments[0].name
                    : 'Файл отсутствует'
                }
                onChange={
                  formValues.status !== undefined
                    ? onAttachFile
                    : null
                }
                key={1}
              />
            ) : (
              <FileInput.Redux
                name='uploadedFile'
                label='Документ'
                placeholder={
                  attachments[0]
                    ? // @ts-ignore
                      attachments[0].name
                    : 'Файл отсутствует'
                }
                onChange={
                  formValues.status !== undefined
                    ? onAttachFile
                    : null
                }
                key={2}
              />
            )}
          </div>
          {isLoading ? (
            <div className={styles.loader}></div>
          ) : (
            <>
              <div className={styles.deleteButtonAndSave}>
                <span
                  className={styles.fileButton}
                  onClick={
                    formValues.status !== undefined
                      ? onDeleteDocument
                      : onDeleteDocumentOnCreate
                  }
                >
                  <Icon
                    className={styles.deleteButton}
                    name={'deleteIcon'}
                  />
                </span>
                <span
                  className={styles.fileButton}
                  onClick={onDownloadFile}
                >
                  <Icon name={'documentDownload'} />
                </span>
              </div>
              {formValues.completeUrgently && (
                <div className={styles.row}>
                  <div className={styles.col}>
                    <Input.Redux
                      name='signFormInCreateModal'
                      label='Комментарий диспетчера *'
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
