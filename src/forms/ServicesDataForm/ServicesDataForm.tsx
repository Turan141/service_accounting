import React from 'react';
import ServiceCard from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard';
import {
  change,
  clearFields,
  formValues,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';
import styles from './ServicesDataForm.module.scss';
import { Dispatch } from 'redux';
import _ from 'lodash';
import { Tabs } from 'react-lib';
import TenderStatusHistory from '@components/TenderModal/TenderStatusHistory/TenderStatusHistory';
import TenderEditLog from '@components/TenderModal/TenderEditLog/TenderEditLog';
import { DictionaryModel } from '@src/types/dictionaries';
import { useSelector } from 'react-redux';
import {
  getTenderEditLog,
  getTenderStatusHistory,
} from '@bus/tenders/selectors';
import moment from 'moment';

const onChange = (
  values: any,
  dispatch: Dispatch,
  __: any,
  prevValues: any,
) => {
  if (!_.isEmpty(prevValues)) {
    if (
      prevValues.customer?.masterCode !==
        values.customer?.masterCode &&
      values.customer?.masterCode &&
      prevValues.customer?.masterCode
    ) {
      console.log(0);
      dispatch(
        clearFields(
          'TenderForm',
          true,
          false,
          'company',
          'aircraft',
          'aircraftType',
        ),
      );
    }
    if (prevValues.parkingToType !== values.parkingToType) {
      dispatch(clearFields('TenderForm', true, false, 'parkingTo'));
    }

    if (prevValues.parkingFromType !== values.parkingFromType) {
      dispatch(clearFields('TenderForm', true, false, 'parkingFrom'));
    }

    if (!prevValues.completeUrgently && values.completeUrgently) {
      dispatch(change('TenderForm', 'started', values?.startPlan));
      dispatch(change('TenderForm', 'completed', values?.endPlan));
    }

    if (prevValues.customer && !values.customer) {
      console.log(1);
      dispatch(change('TenderForm', 'aircraft', null));
      dispatch(change('TenderForm', 'company', null));
    }

    if (prevValues.company && !values.company) {
      console.log(2);
      dispatch(change('TenderForm', 'aircraft', null));
      dispatch(change('TenderForm', 'customer', null));
    }

    if (
      !prevValues?.company &&
      !prevValues?.aircraftType &&
      values?.aircraft
    ) {
      console.log(3);
      dispatch(
        change(
          'TenderForm',
          'aircraftType',
          values?.aircraft?.properties?.type?.toUpperCase(),
        ),
      );
      dispatch(
        change(
          'TenderForm',
          'company',
          values?.aircraft?.properties?.company,
        ),
      );
    }

    if (values.aircraft && prevValues.aircraft !== values.aircraft) {
      console.log(4);
      dispatch(change('TenderForm', 'aircraftType', null));
      dispatch(
        change(
          'TenderForm',
          'aircraftType',
          values?.aircraft?.properties?.type?.toUpperCase(),
        ),
      );
    }
    if (!values.aircraft) {
      console.log(5);
      dispatch(change('TenderForm', 'aircraftType', null));
    }
    if (
      values.ladderSerial &&
      prevValues.ladderType !== values.ladderType
    ) {
      console.log(6);
      dispatch(
        clearFields('TenderForm', true, false, 'ladderSerial'),
      );
    }
    if (values.startPlan && !values.endPlan) {
      dispatch(
        change(
          'TenderForm',
          'endPlan',
          new Date(moment(values.startPlan).add(1, 'm').toDate()),
        ),
      );
    }
  }
};

const ServicesDataForm: React.FC<InjectedFormProps> = ({
  initialValues,
}) => {
  const [tab, setTab] = React.useState(1);
  console.log(initialValues);
  const tenderStatusHistory: DictionaryModel[] =
    useSelector(getTenderStatusHistory).data?.result || [];
  const tenderEditLog: DictionaryModel[] =
    useSelector(getTenderEditLog).data?.result || [];

  return (
    <div className={styles.root}>
      {_.isEmpty(initialValues) ? (
        <ServiceCard />
      ) : (
        <>
          <div className={styles.row}>
            <Tabs
              className={styles.tabs}
              onChange={setTab}
              value={tab}
            >
              <Tabs.Tab label='Информация' value={1} />
              <Tabs.Tab
                label='История изменения статусов задачи'
                value={2}
              />
              <Tabs.Tab label='История изменения' value={3} />
            </Tabs>
          </div>

          <Tabs.Panel value={tab} index={1}>
            <ServiceCard />
          </Tabs.Panel>

          <Tabs.Panel value={tab} index={2}>
            <TenderStatusHistory statuses={tenderStatusHistory} />
          </Tabs.Panel>

          <Tabs.Panel value={tab} index={3}>
            <TenderEditLog log={tenderEditLog} />
          </Tabs.Panel>
        </>
      )}
    </div>
  );
};

export default reduxForm({
  form: 'TenderForm',
  initialValues: {},
  destroyOnUnmount: false,
  onChange: onChange,
  keepValues: true,
})(ServicesDataForm);
