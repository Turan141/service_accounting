import { AsyncSelect } from 'react-lib';
import DictionaryApi from '@api/dictionaryApi';
import { DocumentItemNamesEnum } from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard';
import React from 'react';


type parkingTypeProps = {
  parkingType?: '0' | '1' | '2' | '3'
  nameOfField?: 'parkingFrom' | 'parkingTo'
  label?: 'Маршрут с' | 'Маршрут на'
}

export const ParkingTypeList = ({parkingType, nameOfField, label}: parkingTypeProps) => {
  return (
    <AsyncSelect.Redux
      fetch={DictionaryApi.getDictionaryItems.bind(
        null,
        DocumentItemNamesEnum.AircraftParkings,
        { parking: parkingType },
      )}
      fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
        null,
        DocumentItemNamesEnum.AircraftParkings,
      )}
      dataToValue={(x: any) => x.masterCode}
      dataToRender={(x: any) => x.name}
      name={nameOfField}
      label={label}
    />
  )
}