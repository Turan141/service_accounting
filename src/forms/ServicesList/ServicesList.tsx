import React, { useCallback, useEffect } from 'react';
import { Checkbox, Scrollbar, useDebounceSelector } from 'react-lib';
import styles from './ServiceList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { tendersActions } from '@bus/tenders/actions';
import { getFormValues } from 'redux-form';
import { getTenderOptions } from '@bus/tenders/selectors';
import {
  DictionaryGetResponseModel,
  DictionaryModel,
} from '@src/types/dictionaries';
import { result } from 'lodash';

interface ServicesListProps {
  onClick: (id: string) => void;
}

const ServicesList: React.FC<ServicesListProps> = ({ onClick }) => {
  const dispatch = useDispatch();

  const search: any = useDebounceSelector(
    (state) => getFormValues('tenderOptionsSearch')(state),
    undefined,
    1000,
  );
  const fetch = useCallback(() => {
    dispatch(
      tendersActions.fetchServicesAsync({ search: search.search }),
    );
  }, [search]);

  useEffect(() => {
    fetch();
  }, [search]);

  const services: DictionaryGetResponseModel<DictionaryModel> | null =
    useSelector(getTenderOptions).data;

  const sortedServices = [...(services?.result as [])];

  const firstThreeServices = sortedServices.filter(
    (elem: any) =>
      elem.masterCode === '72' ||
      elem.masterCode === '81',
  );

  const restServices = sortedServices.filter(
    (elem: any) =>
      elem.masterCode !== '72' &&
      elem.masterCode !== '81' &&
      elem.masterCode !== '87'
  );

  firstThreeServices &&
    firstThreeServices?.sort((a: any, b: any) =>
      a.name > b.name ? -1 : b.name > a.name ? 1 : 0,
    );

  restServices &&
    restServices?.sort((a: any, b: any) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
    );

  const prioritySortedServices = [
    ...firstThreeServices,
    ...restServices,
  ];

  return (
    <Scrollbar className={styles.list}>
      {services &&
        prioritySortedServices?.map((item: any) => {
          return (
            <div
              key={item.masterCode}
              onClick={() => onClick(item.masterCode)}
              className={styles.option}
            >
              <Checkbox
                name={item.masterCode}
                label={item.name}
                className={styles.checkbox}
              />
            </div>
          );
        })}
    </Scrollbar>
  );
};

export default ServicesList;
