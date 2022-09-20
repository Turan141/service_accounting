import DictionaryApi from '@src/api/dictionaryApi';
import React from 'react';

import styles from './Reports.module.scss';
import xlsx from '../../../../assets/icons/excelicon.png';
import txt from '../../../../assets/icons/txticon.png';
import pdf from '../../../../assets/icons/pdficon.png';
import { useSelector } from 'react-redux';
import { useDebounceSelector } from 'react-lib';
import { getFormValues } from 'redux-form';

interface ISingleReport {
  nameRu: string;
  reportCode: string;
  format: string[];
  orderPresentation: string;
}

const SingleReport = ({ report }: any, handleCloseFn: any) => {
  const { nameRu, reportCode, format, orderPresentation }: ISingleReport = report;
  const filterValues: any = useDebounceSelector((state) =>
    getFormValues('applicationsFilter')(state),
  );

  return (
    <>
      <li key={orderPresentation} className={styles.reportsList}>
        <div className={styles.reportsHeaderNameDiv}>
          <div className={styles.column}>
            <p>{reportCode}</p>
          </div>
          <div className={styles.column}>
            <p>{nameRu}</p>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.row}>
            {format &&
              format.map((elem: any) => (
                <div className={styles.icon}>
                  <img
                    onClick={(e: any) => {
                      e.preventDefault();
                      DictionaryApi.getDocumentFile(
                        reportCode,
                        e.target.alt,
                        nameRu,
                        filterValues && filterValues
                      );
                      // handleCloseFn()
                    }}
                    src={
                      elem === 'xlsx'
                        ? xlsx
                        : elem === 'txt'
                        ? txt
                        : elem === 'pdf'
                        ? pdf
                        : null
                    }
                    alt={elem}
                  />
                </div>
              ))}
          </div>
        </div>
      </li>
    </>
  );
};

export default SingleReport;
