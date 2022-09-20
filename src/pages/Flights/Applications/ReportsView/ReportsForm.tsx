// Core
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { Button, Form, Icon } from 'react-lib';
import SingleReport from './SingleReport';

// Styles
import styles from './Reports.module.scss';

// Api
import DictionaryApi from '@api/dictionaryApi';
import { tenderReportsActions } from '@src/bus/tenderreports/actions';
import { getTenderReports } from '@src/bus/tenderreports/selectors';

export interface FilterProps {
  handleClose: any;
}

const ReportsForm: React.FC<FilterProps> = ({ handleClose }) => {
  const dispatch = useDispatch();
  const handleCloseFn = handleClose
  console.log(handleCloseFn)

  useEffect(() => {
    dispatch(
      tenderReportsActions.fetch_tender_reports_async('Reports'),
    );
  }, []);

  const reports =
    useSelector(getTenderReports).data?.data?.result?.items;

  interface requiredObjectValuesFromDB {
    format: string[];
    nameRu: string;
    reportCode: string;
    orderPresentation: string;
  }

  const locallyModifiedArrayFromDB: requiredObjectValuesFromDB[] = [];

  const requiredObjBuilder = () => {
    reports &&
      reports.length &&
      reports.forEach((reportFile: any) => {
        const index = locallyModifiedArrayFromDB.findIndex(
          (object) => {
            return (
              object.reportCode === reportFile.properties.reportCode
            );
          },
        );
        if (index !== -1) {
          return locallyModifiedArrayFromDB[index].format.push(
            reportFile?.properties?.format,
          );
        }
        locallyModifiedArrayFromDB.push({
          format: [reportFile.properties.format],
          nameRu: reportFile?.properties.nameRu,
          reportCode: reportFile.properties.reportCode,
          orderPresentation: reportFile.orderPresentation,
        });
      });
    console.log(locallyModifiedArrayFromDB);
    return locallyModifiedArrayFromDB;
  };

  requiredObjBuilder();

  return (
    <Form className={styles.form}>
      {locallyModifiedArrayFromDB.length ? (
        locallyModifiedArrayFromDB.map((report: any) => (
          <SingleReport
            report={report}
            handleCloseFn={handleCloseFn}
            key={report.orderPresentation}
          />
        ))
      ) : (
        <div className={styles.loader}></div>
      )}
      <div className={styles.buttons}>
        <Button
          icon={<Icon name='done' />}
          onClick={() => handleClose()}
        >
          Закрыть
        </Button>
      </div>
    </Form>
  );
};

export default ReportsForm;