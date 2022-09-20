// Core
import { put, call, select } from 'redux-saga/effects';

// Actions
import { tendersActions } from './actions';

// Api
import DictionaryApi from '@api/dictionaryApi';
import DocumentApi from '@api/documentApi';
import { DocumentDto, DocumentItemView } from '@typings/swagger/api';
import dayjs from 'dayjs';
import {
  DocumentItemNamesEnum,
  ReferenceCodesOfServicesEnum,
} from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard';
import { TaskStatusesEnum } from '@pages/Flights/components/StatusColumn/StatusColumn';
import AttachmentApi from '@api/attachmentApi';

export function* getServices(action: any) {
  yield put(tendersActions.fetchServicesRequest());

  const { search } = action.payload;

  const { result, total, error } = yield call(
    DictionaryApi.getDictionaryItems,
    'Services',
    { isService: 'true' },
    search,
    1,
  );

  if (result) {
    yield put(tendersActions.fetchServicesSuccess({ result, total }));
  } else {
    yield put(tendersActions.fetchServicesFailure(error));
  }
}

export function* getTenders(action: any) {
  yield put(tendersActions.fetchTendersRequest());
  const { filter, setIsLoading } = action.payload;
  setIsLoading(true);
  const { result, total, error } = yield call(
    DocumentApi.getTendersTable,
    filter,
  );

  if (result) {
    yield setIsLoading(false);
    yield put(tendersActions.fetchTendersSuccess({ result, total }));
  } else {
    yield put(tendersActions.fetchServicesFailure(error));
  }
}

export function* getTenderStatusHistory(action: any) {
  yield put(tendersActions.fetchTenderStatusHistoryRequest());

  const { filter, documentId } = action.payload;

  const { data, error } = yield call(
    DictionaryApi.getTenderStatusHistory,
    filter,
    documentId,
  );

  if (data) {
    yield put(
      tendersActions.fetchTenderStatusHistorySuccess({
        result: data,
        total: 0,
      }),
    );
  } else {
    yield put(tendersActions.fetchTenderStatusHistoryFailure(error));
  }
}

export function* getTenderEditLog(action: any) {
  yield put(tendersActions.fetchTenderEditLogRequest());

  const { filter, documentId } = action.payload;

  const { data, error } = yield call(
    DictionaryApi.getTenderEditLog,
    filter,
    documentId,
  );

  if (data) {
    yield put(
      tendersActions.fetchTenderEditLogSuccess({
        result: data,
        total: 0,
      }),
    );
  } else {
    yield put(tendersActions.fetchTenderEditLogFailure(error));
  }
}

export function* createTender(action: any): any {
  const {
    data,
    file,
    reload,
    started,
    completed,
    sign,
    onError,
    onClose,
    setErrorResp,
    openTenderModalOnExisting,
    vehicleGarageNumber,
  } = action.payload;
  let response;

  const parsedData: DocumentDto = {
    status: data.status,
    properties: {
      customer: data.customer.masterCode,
      aircraft: data.aircraft.masterCode,
      aircraftType: data.aircraftType,
      ...(data.parking && { parking: data.parking }),
      ...(data.vehicleGarageNumber && { parking: data.parking }),
      company: data.company,
      service: data.service,
      additionalInfo: data.additionalInfo,
      // startPlan: dayjs(data.startPlan).valueOf().toString(),
      ...(data.startPlan
        ? { startPlan: dayjs(data.startPlan).valueOf().toString() }
        : { startPlan: dayjs().valueOf().toString() }),
      ...(data.endPlan
        ? { endPlan: dayjs(data.endPlan).valueOf().toString() }
        : { endPlan: dayjs(data.startPlan).valueOf().toString() }),
      ...(started && { started: started }),
      ...(completed && { completed: completed }),
    },
    items: [],
  };

  switch (data.service) {
    case ReferenceCodesOfServicesEnum.AnyService:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.AnyServiceFlight,
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.TieDownStraps:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.TieDownStraps,
        properties: {
          kitsCount: data.kitsCount,
        },
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      break;

    case ReferenceCodesOfServicesEnum.CompressedGas:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.CompressedGas,
        referenceMasterCode: data.compressedGas,
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      if (vehicleGarageNumber) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
          additionalInfo: vehicleGarageNumber,
        });
      }
      break;

    case ReferenceCodesOfServicesEnum.MaintanceKit:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.MaintanceKit,
        referenceMasterCode: data.maintanceKit,
        properties: {
          maintanceKitFrom: data.maintanceKitFrom,
          maintanceKitTo: data.maintanceKitTo,
          numberseats: data.numberseats,
          weight: data.weight,
        },
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      break;

    case ReferenceCodesOfServicesEnum.LaddersProvision:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.LaddersProvision,
        properties: {
          laddersSerial: data.ladderSerial.masterCode,
        },
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      if (vehicleGarageNumber) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
          additionalInfo: vehicleGarageNumber,
        });
      }
      break;

    case ReferenceCodesOfServicesEnum.PersonnelForAdditionalWork:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.PersonnelForAdditionalWork,
        referenceMasterCode: data.workDetail,
        properties: {
          personnelCount: data.personnelCount,
        },
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.GroundPowerUnit:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.GroundPowerUnit,
        referenceMasterCode: data.groundpowerunit,
        additionalInfo:
          data[
            'additionalInfo_' + DocumentItemNamesEnum.GroundPowerUnit
          ],
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      if (vehicleGarageNumber) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
          additionalInfo: vehicleGarageNumber,
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.ProvisioningEscortVehicle:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.ProvisioningEscortVehicle,
        properties: {
          routeFrom: data.routeFrom,
          routeTo: data.routeTo,
        },
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      if (vehicleGarageNumber) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
          additionalInfo: vehicleGarageNumber,
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.DrainContainer:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.DrainContainer,
        referenceMasterCode: data.fluidType,
        properties: {
          litersCount: data.litersCount,
        },
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      if (vehicleGarageNumber) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
          additionalInfo: vehicleGarageNumber,
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.ProvisionOfSpecialMachinery:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.ProvisionOfSpecialMachinery,
        referenceMasterCode: data.jobType,
        properties: {
          machineryCount: data.machineryCount,
        },
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      if (vehicleGarageNumber) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
          additionalInfo: vehicleGarageNumber,
        });
      }
      break;

    case ReferenceCodesOfServicesEnum.SanitaryInspection:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.SanitaryInspection,
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.ProvisionOfProcessWater:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.ProvisionOfProcessWater,
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      if (vehicleGarageNumber) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
          additionalInfo: vehicleGarageNumber,
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.ProvidingAnExtensionCord:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.ProvidingAnExtensionCord,
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.ProvidingAirLaunchDevice:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.ProvidingAirLaunchDevice,
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      if (vehicleGarageNumber) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
          additionalInfo: vehicleGarageNumber,
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.DriverProviding:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.DriverProviding,
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      if (vehicleGarageNumber) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
          additionalInfo: vehicleGarageNumber,
        });
      }
      break;

    case ReferenceCodesOfServicesEnum.Heating:
      if (
        Array.isArray(data.heatingPointsMasterCodes) &&
        data.heatingPointsMasterCodes.length
      ) {
        data.heatingPointsMasterCodes.forEach((item: string) => {
          parsedData.items?.push({
            type: DocumentItemNamesEnum.HeatingPoint,
            referenceMasterCode: item,
          });
        });
        if (data.flight) {
          parsedData.items?.push({
            type: DocumentItemNamesEnum.AnyServiceFlight,
            additionalInfo: data.flight,
          });
        }
        if (vehicleGarageNumber) {
          parsedData.items?.push({
            type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
            additionalInfo: vehicleGarageNumber,
          });
        }
      }
      break;

    case ReferenceCodesOfServicesEnum.Lavatory:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.Lavatory,
        referenceMasterCode: data.lavatoryType,
        additionalInfo: data.additionalInfoLavatoryType,
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      if (vehicleGarageNumber) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
          additionalInfo: vehicleGarageNumber,
        });
      }
      break;

    case ReferenceCodesOfServicesEnum.ProvisioningMinibus:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.ProvisioningMinibuses,
        properties: {
          ...(data?.parkingFrom
            ? {
                parkingFrom: data.parkingFrom,
              }
            : {
                parkingFrom:
                  'EE47EA3C-84F9-4B87-8686-AA7B2662F454_briefing',
              }),
          ...(data?.parkingTo
            ? {
                parkingTo: data.parkingTo,
              }
            : {
                parkingTo:
                  'EE47EA3C-84F9-4B87-8686-AA7B2662F454_briefing',
              }),
          passengersCategory: data.passengersCategory,
          passengersCount: data.passengersCount,
          transportNumber: data.transportNumber,
        },
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }

      break;

    case ReferenceCodesOfServicesEnum.WaterSystemMaintenance:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.WaterSystemMaintenance,
        referenceMasterCode:
          data[DocumentItemNamesEnum.WaterSystemMaintenance],
        additionalInfo:
          data[
            'additionalInfo_' +
              DocumentItemNamesEnum.WaterSystemMaintenance
          ],
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      if (vehicleGarageNumber) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
          additionalInfo: vehicleGarageNumber,
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.AircraftCooling:
      parsedData.items?.push({
        type: DocumentItemNamesEnum.AircraftCooling,
      });
      if (data.flight) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.AnyServiceFlight,
          additionalInfo: data.flight,
        });
      }
      if (vehicleGarageNumber) {
        parsedData.items?.push({
          type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
          additionalInfo: vehicleGarageNumber,
        });
      }
      break;
  }

  response = yield call(DocumentApi.createTender, parsedData);

  if (response?.response) {
    if (response.response.data.status === 'completedFromDispatcher') {
      yield (response.response.data.started = data.startPlan);
      yield (response.response.data.completed = data.endPlan);
    }
    if (sign) {
      yield call(
        DocumentApi.addTenderItems,
        response.response.data.id,
        [
          {
            type: 'dispatcherSign',
            properties: { dispatcherComment: sign },
          },
        ],
      );
    }
    if (file) {
      AttachmentApi.addTenderAttachment(
        response.response.data.id,
        file,
      );
    }
    if (response?.response && reload && onClose) {
      console.log('reloading');
      yield reload();
      yield onClose();
    }
    if (
      response?.response &&
      reload &&
      onClose &&
      openTenderModalOnExisting
    ) {
      console.log('settingStep');
      yield reload();
      yield onClose();
      yield openTenderModalOnExisting();
    }
  } else {
    let idFromDB = response?.error?.response?.data?.Message.replace(
      /[^\d]/g,
      '',
    );
    yield call(DocumentApi.decrementTenderId, idFromDB);
    yield setErrorResp(response);
    yield onError();
  }
}

export function* lockUnlockTender(action: any): any {
  const { id, lock, reload } = action.payload;

  let response;

  response = yield call(DocumentApi.updateTender, {
    documentId: id,
    document: {
      lockState: lock,
    },
  });

  if (response.response) return reload;

  if (response.error) return;
}

export function* editTender(action: any): any {
  const {
    data,
    reload,
    started,
    completed,
    sign,
    properties,
    status,
    vehicleGarageNumber,
  } = action.payload;

  let response;

  response = yield call(DocumentApi.updateTender, {
    documentId: data.id,
    document: {
      customer: data.customer.masterCode,
      aircraft: data.aircraft.masterCode,
      aircraftType: data.aircraftType,
      parking: data.parking,
      company: data.company,
      service: data.service,
      ...(data?.additionalInfo?.length
        ? {
            additionalInfo: data.additionalInfo,
          }
        : {
            additionalInfo: ' ',
          }),
      startPlan: data.startPlan,
      endPlan: data.endPlan,
      startedFixed: data.startedFixed,
      completedFixed: data.completedFixed,
      ...(started && { started: started }),
      ...(completed && { completed: completed }),
    },
  });

  if (response.error) return;

  switch (data.service) {
    case ReferenceCodesOfServicesEnum.Heating:
      if (data?.heatingPoints) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: data?.heatingPoints?.map(
            (item: DocumentItemView) => item.id,
          ),
        });
      }
      if (
        data?.items?.find(
          (item: any) => item.type === 'anyServiceFlight',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) => item.type === 'anyServiceFlight',
            )?.id,
          ],
        });
      }
      if (
        data?.items?.find(
          (item: any) =>
            item.type === 'garageNumberOfSpecialEquipment',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) =>
                item.type === 'garageNumberOfSpecialEquipment',
            )?.id,
          ],
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.Lavatory:
      response = yield call(DocumentApi.removeTenderItemsByIds, {
        documentId: data.id,
        itemIds: [
          data.items.find(
            (item: DocumentItemView) =>
              item.type === DocumentItemNamesEnum.Lavatory,
          ).id,
        ],
      });
      if (
        data?.items?.find(
          (item: any) => item.type === 'anyServiceFlight',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) => item.type === 'anyServiceFlight',
            )?.id,
          ],
        });
      }
      if (
        data?.items?.find(
          (item: any) =>
            item.type === 'garageNumberOfSpecialEquipment',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) =>
                item.type === 'garageNumberOfSpecialEquipment',
            )?.id,
          ],
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.ProvisioningMinibus:
      response = yield call(DocumentApi.removeTenderItemsByIds, {
        documentId: data.id,
        itemIds: [
          data.items.find(
            (item: DocumentItemView) =>
              item.type ===
              DocumentItemNamesEnum.ProvisioningMinibuses,
          ).id,
        ],
      });
      if (
        data?.items?.find(
          (item: any) => item.type === 'anyServiceFlight',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) => item.type === 'anyServiceFlight',
            )?.id,
          ],
        });
      }
      break;

    case ReferenceCodesOfServicesEnum.GroundPowerUnit:
      response = yield call(DocumentApi.removeTenderItemsByIds, {
        documentId: data.id,
        itemIds: [
          data.items.find(
            (item: DocumentItemView) =>
              item.type === DocumentItemNamesEnum.GroundPowerUnit,
          ).id,
        ],
      });
      if (
        data?.items?.find(
          (item: any) => item.type === 'anyServiceFlight',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) => item.type === 'anyServiceFlight',
            )?.id,
          ],
        });
      }
      if (
        data?.items?.find(
          (item: any) =>
            item.type === 'garageNumberOfSpecialEquipment',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) =>
                item.type === 'garageNumberOfSpecialEquipment',
            )?.id,
          ],
        });
      }
      break;

    case ReferenceCodesOfServicesEnum.MaintanceKit:
      response = yield call(DocumentApi.removeTenderItemsByIds, {
        documentId: data.id,
        itemIds: [
          data.items.find(
            (item: DocumentItemView) =>
              item.type === DocumentItemNamesEnum.MaintanceKit,
          ).id,
        ],
      });
      if (
        data?.items?.find(
          (item: any) => item.type === 'anyServiceFlight',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) => item.type === 'anyServiceFlight',
            )?.id,
          ],
        });
      }
      break;

    case ReferenceCodesOfServicesEnum.CompressedGas:
      response = yield call(DocumentApi.removeTenderItemsByIds, {
        documentId: data.id,
        itemIds: [
          data.items.find(
            (item: DocumentItemView) =>
              item.type === DocumentItemNamesEnum.CompressedGas,
          ).id,
        ],
      });
      if (
        data?.items?.find(
          (item: any) => item.type === 'anyServiceFlight',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) => item.type === 'anyServiceFlight',
            )?.id,
          ],
        });
      }
      if (
        data?.items?.find(
          (item: any) =>
            item.type === 'garageNumberOfSpecialEquipment',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) =>
                item.type === 'garageNumberOfSpecialEquipment',
            )?.id,
          ],
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.WaterSystemMaintenance:
      response = yield call(DocumentApi.removeTenderItemsByIds, {
        documentId: data.id,
        itemIds: [
          data.items.find(
            (item: DocumentItemView) =>
              item.type ===
              DocumentItemNamesEnum.WaterSystemMaintenance,
          ).id,
        ],
      });
      if (
        data?.items?.find(
          (item: any) => item.type === 'anyServiceFlight',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) => item.type === 'anyServiceFlight',
            )?.id,
          ],
        });
      }
      if (
        data?.items?.find(
          (item: any) =>
            item.type === 'garageNumberOfSpecialEquipment',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) =>
                item.type === 'garageNumberOfSpecialEquipment',
            )?.id,
          ],
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.DrainContainer:
      response = yield call(DocumentApi.removeTenderItemsByIds, {
        documentId: data.id,
        itemIds: [
          data?.items?.find(
            (item: DocumentItemView) =>
              item.type === DocumentItemNamesEnum.DrainContainer,
          )?.id,
        ],
      });

      if (
        data?.items?.find(
          (item: any) => item.type === 'anyServiceFlight',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) => item.type === 'anyServiceFlight',
            )?.id,
          ],
        });
      }
      if (
        data?.items?.find(
          (item: any) =>
            item.type === 'garageNumberOfSpecialEquipment',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) =>
                item.type === 'garageNumberOfSpecialEquipment',
            )?.id,
          ],
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.PersonnelForAdditionalWork:
      response = yield call(DocumentApi.removeTenderItemsByIds, {
        documentId: data.id,
        itemIds: [
          data?.items?.find(
            (item: DocumentItemView) =>
              item.type ===
              DocumentItemNamesEnum.PersonnelForAdditionalWork,
          )?.id,
        ],
      });

      if (
        data?.items?.find(
          (item: any) => item.type === 'anyServiceFlight',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) => item.type === 'anyServiceFlight',
            )?.id,
          ],
        });
      }
      break;

    case ReferenceCodesOfServicesEnum.LaddersProvision:
      response = yield call(DocumentApi.removeTenderItemsByIds, {
        documentId: data.id,
        itemIds: [
          data?.items?.find(
            (item: DocumentItemView) =>
              item.type === DocumentItemNamesEnum.LaddersProvision,
          )?.id,
        ],
      });

      if (
        data?.items?.find(
          (item: any) => item.type === 'anyServiceFlight',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) => item.type === 'anyServiceFlight',
            )?.id,
          ],
        });
      }
      if (
        data?.items?.find(
          (item: any) =>
            item.type === 'garageNumberOfSpecialEquipment',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) =>
                item.type === 'garageNumberOfSpecialEquipment',
            )?.id,
          ],
        });
      }
      break;

    case ReferenceCodesOfServicesEnum.TieDownStraps:
      response = yield call(DocumentApi.removeTenderItemsByIds, {
        documentId: data.id,
        itemIds: [
          data?.items?.find(
            (item: DocumentItemView) =>
              item.type === DocumentItemNamesEnum.TieDownStraps,
          )?.id,
        ],
      });

      if (
        data?.items?.find(
          (item: any) => item.type === 'anyServiceFlight',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) => item.type === 'anyServiceFlight',
            )?.id,
          ],
        });
      }
      break;

    case ReferenceCodesOfServicesEnum.ProvisionOfSpecialMachinery:
      response = yield call(DocumentApi.removeTenderItemsByIds, {
        documentId: data.id,
        itemIds: [
          data?.items?.find(
            (item: DocumentItemView) =>
              item.type ===
              DocumentItemNamesEnum.ProvisionOfSpecialMachinery,
          )?.id,
        ],
      });

      if (
        data?.items?.find(
          (item: any) => item.type === 'anyServiceFlight',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) => item.type === 'anyServiceFlight',
            )?.id,
          ],
        });
      }
      if (
        data?.items?.find(
          (item: any) =>
            item.type === 'garageNumberOfSpecialEquipment',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) =>
                item.type === 'garageNumberOfSpecialEquipment',
            )?.id,
          ],
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.ProvisioningEscortVehicle:
      response = yield call(DocumentApi.removeTenderItemsByIds, {
        documentId: data.id,
        itemIds: [
          data?.items?.find(
            (item: DocumentItemView) =>
              item.type ===
              DocumentItemNamesEnum.ProvisioningEscortVehicle,
          )?.id,
        ],
      });

      if (
        data?.items?.find(
          (item: any) => item.type === 'anyServiceFlight',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) => item.type === 'anyServiceFlight',
            )?.id,
          ],
        });
      }
      if (
        data?.items?.find(
          (item: any) =>
            item.type === 'garageNumberOfSpecialEquipment',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) =>
                item.type === 'garageNumberOfSpecialEquipment',
            )?.id,
          ],
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.AnyService:
    case ReferenceCodesOfServicesEnum.SanitaryInspection:
    case ReferenceCodesOfServicesEnum.ProvisionOfProcessWater:
    case ReferenceCodesOfServicesEnum.ProvidingAnExtensionCord:
    case ReferenceCodesOfServicesEnum.ProvidingAirLaunchDevice:
    case ReferenceCodesOfServicesEnum.DriverProviding:
      if (
        data?.items?.find(
          (item: any) => item.type === 'anyServiceFlight',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) => item.type === 'anyServiceFlight',
            )?.id,
          ],
        });
      }
      if (
        data?.items?.find(
          (item: any) =>
            item.type === 'garageNumberOfSpecialEquipment',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) =>
                item.type === 'garageNumberOfSpecialEquipment',
            )?.id,
          ],
        });
      }
      break;
    case ReferenceCodesOfServicesEnum.AircraftCooling:
      if (
        data?.items?.find(
          (item: any) => item.type === 'anyServiceFlight',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) => item.type === 'anyServiceFlight',
            )?.id,
          ],
        });
      }
      if (
        data?.items?.find(
          (item: any) =>
            item.type === 'garageNumberOfSpecialEquipment',
        )
      ) {
        response = yield call(DocumentApi.removeTenderItemsByIds, {
          documentId: data.id,
          itemIds: [
            data?.items?.find(
              (item: any) =>
                item.type === 'garageNumberOfSpecialEquipment',
            )?.id,
          ],
        });
      }
      break;
  }

  console.log('delete items', response);
  if (response.error) return;

  switch (data.service) {
    case ReferenceCodesOfServicesEnum.AircraftCooling:
      if (data?.flight?.length) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.AnyServiceFlight,
            additionalInfo: data.flight,
          },
        ]);
      }
      if (vehicleGarageNumber) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
            additionalInfo: vehicleGarageNumber,
          },
        ]);
      }
      break;

    case ReferenceCodesOfServicesEnum.AnyService:
    case ReferenceCodesOfServicesEnum.SanitaryInspection:
    case ReferenceCodesOfServicesEnum.ProvisionOfProcessWater:
    case ReferenceCodesOfServicesEnum.ProvidingAnExtensionCord:
    case ReferenceCodesOfServicesEnum.ProvidingAirLaunchDevice:
    case ReferenceCodesOfServicesEnum.DriverProviding:
      if (data?.flight?.length) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.AnyServiceFlight,
            additionalInfo: data.flight,
          },
        ]);
      }
      if (vehicleGarageNumber) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
            additionalInfo: vehicleGarageNumber,
          },
        ]);
      }
      if (vehicleGarageNumber) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
            additionalInfo: vehicleGarageNumber,
          },
        ]);
      }
      break;
    case ReferenceCodesOfServicesEnum.Heating:
      if (data.heatingPointsMasterCodes.length) {
        response = yield call(
          DocumentApi.addTenderItems,
          data.id,
          data.heatingPointsMasterCodes.map((item: string) => ({
            type: DocumentItemNamesEnum.HeatingPoint,
            referenceMasterCode: item,
          })),
        );
      }
      if (data?.flight?.length) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.AnyServiceFlight,
            additionalInfo: data.flight,
          },
        ]);
      }
      if (vehicleGarageNumber) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
            additionalInfo: vehicleGarageNumber,
          },
        ]);
      }
      break;
    case ReferenceCodesOfServicesEnum.Lavatory:
      response = yield call(DocumentApi.addTenderItems, data.id, [
        {
          type: DocumentItemNamesEnum.Lavatory,
          referenceMasterCode: data.lavatoryType,
          additionalInfo: data.additionalInfoLavatoryType,
        },
      ]);
      if (data?.flight?.length) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.AnyServiceFlight,
            additionalInfo: data.flight,
          },
        ]);
      }
      if (vehicleGarageNumber) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
            additionalInfo: vehicleGarageNumber,
          },
        ]);
      }
      break;
    case ReferenceCodesOfServicesEnum.ProvisioningMinibus:
      response = yield call(DocumentApi.addTenderItems, data.id, [
        {
          type: DocumentItemNamesEnum.ProvisioningMinibuses,
          properties: {
            ...(data?.parkingFrom
              ? {
                  parkingFrom: data.parkingFrom,
                }
              : {
                  parkingFrom:
                    'EE47EA3C-84F9-4B87-8686-AA7B2662F454_briefing',
                }),
            ...(data?.parkingTo
              ? {
                  parkingTo: data.parkingTo,
                }
              : {
                  parkingTo:
                    'EE47EA3C-84F9-4B87-8686-AA7B2662F454_briefing',
                }),
            passengersCategory: data.passengersCategory,
            passengersCount: data.passengersCount,
            transportNumber: data.transportNumber,
          },
        },
      ]);
      if (data?.flight?.length) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.AnyServiceFlight,
            additionalInfo: data.flight,
          },
        ]);
      }
      break;
    case ReferenceCodesOfServicesEnum.WaterSystemMaintenance:
      response = yield call(DocumentApi.addTenderItems, data.id, [
        {
          type: DocumentItemNamesEnum.WaterSystemMaintenance,
          referenceMasterCode:
            data[DocumentItemNamesEnum.WaterSystemMaintenance],
          additionalInfo:
            data[
              'additionalInfo_' +
                DocumentItemNamesEnum.WaterSystemMaintenance
            ],
        },
      ]);
      if (data?.flight?.length) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.AnyServiceFlight,
            additionalInfo: data.flight,
          },
        ]);
      }
      if (vehicleGarageNumber) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
            additionalInfo: vehicleGarageNumber,
          },
        ]);
      }
      break;

    case ReferenceCodesOfServicesEnum.MaintanceKit:
      response = yield call(DocumentApi.addTenderItems, data.id, [
        {
          type: DocumentItemNamesEnum.MaintanceKit,
          referenceMasterCode: data.maintanceKit,
          properties: {
            maintanceKitFrom: data.maintanceKitFrom,
            maintanceKitTo: data.maintanceKitTo,
            numberseats: data.numberseats,
            weight: data.weight,
          },
          additionalInfo:
            data[
              'additionalInfo_' + DocumentItemNamesEnum.MaintanceKit
            ],
        },
      ]);
      if (data?.flight?.length) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.AnyServiceFlight,
            additionalInfo: data.flight,
          },
        ]);
      }
      break;

    case ReferenceCodesOfServicesEnum.CompressedGas:
      response = yield call(DocumentApi.addTenderItems, data.id, [
        {
          type: DocumentItemNamesEnum.CompressedGas,
          referenceMasterCode: data.compressedGas,
          additionalInfo:
            data[
              'additionalInfo_' + DocumentItemNamesEnum.CompressedGas
            ],
        },
      ]);
      if (data?.flight?.length) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.AnyServiceFlight,
            additionalInfo: data.flight,
          },
        ]);
      }
      if (vehicleGarageNumber) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
            additionalInfo: vehicleGarageNumber,
          },
        ]);
      }
      break;

    case ReferenceCodesOfServicesEnum.GroundPowerUnit:
      response = yield call(DocumentApi.addTenderItems, data.id, [
        {
          type: DocumentItemNamesEnum.GroundPowerUnit,
          referenceMasterCode:
            data[DocumentItemNamesEnum.GroundPowerUnit],
          additionalInfo:
            data[
              'additionalInfo_' +
                DocumentItemNamesEnum.GroundPowerUnit
            ],
        },
      ]);
      if (data?.flight?.length) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.AnyServiceFlight,
            additionalInfo: data.flight,
          },
        ]);
      }
      if (vehicleGarageNumber) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
            additionalInfo: vehicleGarageNumber,
          },
        ]);
      }
      break;

    case ReferenceCodesOfServicesEnum.LaddersProvision:
      response = yield call(DocumentApi.addTenderItems, data.id, [
        {
          type: DocumentItemNamesEnum.LaddersProvision,
          properties: {
            laddersSerial: data.ladderSerial,
          },
          additionalInfo:
            data[
              'additionalInfo_' +
                DocumentItemNamesEnum.LaddersProvision
            ],
        },
      ]);
      if (data?.flight?.length) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.AnyServiceFlight,
            additionalInfo: data.flight,
          },
        ]);
      }
      if (vehicleGarageNumber) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
            additionalInfo: vehicleGarageNumber,
          },
        ]);
      }
      if (vehicleGarageNumber) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
            additionalInfo: vehicleGarageNumber,
          },
        ]);
      }
      break;

    case ReferenceCodesOfServicesEnum.DrainContainer:
      response = yield call(DocumentApi.addTenderItems, data.id, [
        {
          type: DocumentItemNamesEnum.DrainContainer,
          referenceMasterCode: data.fluidType,
          properties: {
            litersCount: data.litersCount,
          },
          additionalInfo:
            data[
              'additionalInfo_' + DocumentItemNamesEnum.DrainContainer
            ],
        },
      ]);
      if (data?.flight?.length) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.AnyServiceFlight,
            additionalInfo: data.flight,
          },
        ]);
      }
      if (vehicleGarageNumber) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
            additionalInfo: vehicleGarageNumber,
          },
        ]);
      }
      break;

    case ReferenceCodesOfServicesEnum.PersonnelForAdditionalWork:
      response = yield call(DocumentApi.addTenderItems, data.id, [
        {
          type: DocumentItemNamesEnum.PersonnelForAdditionalWork,
          referenceMasterCode: data.workDetail,
          properties: {
            personnelCount: data.personnelCount,
          },
          additionalInfo:
            data[
              'additionalInfo_' +
                DocumentItemNamesEnum.PersonnelForAdditionalWork
            ],
        },
      ]);
      if (data?.flight?.length) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.AnyServiceFlight,
            additionalInfo: data.flight,
          },
        ]);
      }
      break;

    case ReferenceCodesOfServicesEnum.TieDownStraps:
      response = yield call(DocumentApi.addTenderItems, data.id, [
        {
          type: DocumentItemNamesEnum.TieDownStraps,
          properties: {
            kitsCount: data.kitsCount,
          },
          additionalInfo:
            data[
              'additionalInfo_' + DocumentItemNamesEnum.TieDownStraps
            ],
        },
      ]);
      if (data?.flight?.length) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.AnyServiceFlight,
            additionalInfo: data.flight,
          },
        ]);
      }
      break;
    case ReferenceCodesOfServicesEnum.ProvisionOfSpecialMachinery:
      response = yield call(DocumentApi.addTenderItems, data.id, [
        {
          type: DocumentItemNamesEnum.ProvisionOfSpecialMachinery,
          referenceMasterCode: data.jobType,
          properties: {
            machineryCount: data.machineryCount,
          },
          additionalInfo:
            data[
              'additionalInfo_' +
                DocumentItemNamesEnum.ProvisionOfSpecialMachinery
            ],
        },
      ]);
      if (data?.flight?.length) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.AnyServiceFlight,
            additionalInfo: data.flight,
          },
        ]);
      }
      if (vehicleGarageNumber) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
            additionalInfo: vehicleGarageNumber,
          },
        ]);
      }
      break;
    case ReferenceCodesOfServicesEnum.ProvisioningEscortVehicle:
      response = yield call(DocumentApi.addTenderItems, data.id, [
        {
          type: DocumentItemNamesEnum.ProvisioningEscortVehicle,
          properties: {
            routeFrom: data.routeFrom,
            routeTo: data.routeTo,
          },
          additionalInfo:
            data[
              'additionalInfo_' +
                DocumentItemNamesEnum.ProvisioningEscortVehicle
            ],
        },
      ]);
      if (data?.flight?.length) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.AnyServiceFlight,
            additionalInfo: data.flight,
          },
        ]);
      }
      if (vehicleGarageNumber) {
        response = yield call(DocumentApi.addTenderItems, data.id, [
          {
            type: DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
            additionalInfo: vehicleGarageNumber,
          },
        ]);
      }
      break;
  }
  console.log('add items again', response);

  if (response.response) {
    console.log('reload triggered');
    if (sign) {
      console.log(response);
      console.log('signed in edit');
      yield call(
        DocumentApi.addTenderItems,
        response.response.data.result.id,
        [
          {
            type: 'dispatcherSign',
            properties: { dispatcherComment: sign },
          },
        ],
      );
      yield call(
        DocumentApi.changeDocumentStatus,
        'Requests',
        data.id,
        status,
        properties,
      );
    }

    yield reload && reload();
  } else {
    console.log('Произошла ошибка!', response.error);
  }
}

export function* signTender(action: any): any {
  const { documentId, dispatcherComment, reload } = action.payload;
  let response;

  response = yield call(DocumentApi.addTenderItems, documentId, [
    {
      type: 'dispatcherSign',
      properties: { dispatcherComment },
    },
  ]);

  if (response.error) return;

  response = yield call(
    DocumentApi.changeDocumentStatus,
    'Requests',
    documentId,
    TaskStatusesEnum.Completed,
  );

  if (response.response) {
    yield reload && reload();
  } else {
    console.log(response.error);
  }
}

export function* editTenderStatus(action: any) {
  const { properties, status, documentId, reload } = action.payload;

  const { response, error } = yield call(
    DocumentApi.changeDocumentStatus,
    'Requests',
    documentId,
    status,
    properties,
  );

  if (response) {
    console.log(response);
    yield reload && reload();
  } else {
    console.log(error);
  }
}

export function* addTenderItems(action: any) {
  const { items, documentId, reload } = action.payload;
  console.log('starting adding');
  const { response, error } = yield call(
    DocumentApi.addTenderItems,
    documentId,
    items,
  );
  console.log('resp ', response);
  if (response.response) {
    yield reload && reload();
  } else {
    console.log(error);
  }
}

export function* completeFromDispatcher(action: any): any {
  const {
    data,
    documentId,
    properties,
    reload,
    signFormInCreateModal,
  } = action.payload;

  let response;

  response = yield call(DocumentApi.updateTender, {
    documentId: documentId,
    document: {
      customer: data.customer.masterCode,
      aircraft: data.aircraft.masterCode,
      aircraftType: data.aircraftType,
      parking: data.parking,
      company: data.company,
      service: data.service,
      additionalInfo: data.additionalInfo,
      startPlan: data.startPlan,
      endPlan: data.endPlan,
      ...(data?.started && { started: data.started }),
      ...(data?.completed && { completed: data.completed }),
      ...(!data?.completed && { completed: data.endPlan }),
      ...(!data?.started && { started: data.startPlan }),
    },
  });

  if (response.error) return;

  response = yield call(
    DocumentApi.changeDocumentStatus,
    'Requests',
    data.id,
    TaskStatusesEnum.CompletedFromDispatcher,
    properties,
  );

  if (response.response && response) {
    yield reload && reload();
  } else {
    console.log(response.error);
  }
}

export function* confirmOrReject(action: any): any {
  const { data, properties, status, reload } = action.payload;

  let response;

  response = yield call(DocumentApi.updateTender, {
    documentId: data.id,
    document: {
      customer: data.customer.masterCode,
      aircraft: data.aircraft.masterCode,
      aircraftType: data.aircraftType,
      parking: data.parking,
      company: data.company,
      service: data.service,
      additionalInfo: data.additionalInfo,
      startPlan: data.startPlan,
      endPlan: data.endPlan,
      startedFixed: data.startedFixed,
      completedFixed: data.completedFixed,
    },
  });

  if (response.error) return;

  response = yield call(
    DocumentApi.changeDocumentStatus,
    'Requests',
    data.id,
    status,
    properties,
  );

  if (response.response && response) {
    console.log('reload triggered');
    yield reload && reload();
  } else {
    console.log(response.error);
  }
}
