// Core
import React, {  } from 'react';
import {
  reduxForm,
  destroy,
  getFormValues,
  clearFields,
  change,
} from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

// Components
import {
  AsyncSelect,
  Button,
  Form,
  Icon,
  Input,
  MultiSelect,
} from 'react-lib';
import { DateTimePickerRedux } from '@components/DateTimePicker/DateTimePicker';

// Styles
import styles from './Filter.module.scss';

// Api
import DictionaryApi from '@api/dictionaryApi';
import { checkAccess } from '@helpers/utils';
import {
  statuses,
} from '@pages/Flights/Applications/data';
import { Dispatch } from 'redux';

export interface FilterProps {
  handleClose: () => void;
}

const onChange = (
  values: any,
  dispatch: Dispatch,
  __: any,
  prevValues: any,
) => {
  if (!_.isEmpty(prevValues)) {
    if (
      prevValues.customer?.masterCode !== values.customer?.masterCode
    ) {
      dispatch(
        clearFields(
          'applicationsFilter',
          false,
          false,
          'company',
          'aircraft',
          'aircraftType',
          'parking',
        ),
      );
    }
    if (prevValues.company !== values.company) {
      dispatch(
        clearFields('applicationsFilter', false, false, 'aircraft'),
      );
    }
    if (values.company === null) {
      dispatch(change('applicationsFilter', 'company', ''));
    }
    if (values.service === null) {
      dispatch(change('applicationsFilter', 'service', ''));
    }
    if (values.aircraft === null) {
      dispatch(change('applicationsFilter', 'aircraft', ''));
    }
    if (values.customer === null) {
      dispatch(change('applicationsFilter', 'customer', ''));
    }
  }
};

const FilterForm: React.FC<FilterProps> = ({ handleClose }) => {
  const dispatch = useDispatch();

  const filterValues: any = useSelector((state) =>
    getFormValues('applicationsFilter')(state),
  );

  const renderFormDependingOnRole = () => {
    if (checkAccess(['1']))
      return (
        <div className={styles.form}>
          <div className={styles['form-row']}>
            <div className={styles['form-control-division']}>
              <AsyncSelect.Redux
                fetch={DictionaryApi.getDictionaryItems.bind(
                  null,
                  'Services',
                  { isService: 'true' },
                )}
                fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                  null,
                  'Services',
                )}
                dataToValue={(x: any) => x.masterCode}
                dataToRender={(x: any) => x.name}
                name='service'
                label='???????????????????????? ????????????'
              />
            </div>
          </div>

          <div className={styles['form-row']}>
            <div className={styles['form-control-from']}>
              <DateTimePickerRedux
                label='???????????? ????????????. ????'
                name='startPlan'
              />
            </div>
            <div className={styles['form-control-before']}>
              <DateTimePickerRedux label='????' name='endPlan' />
            </div>
          </div>

          <div className={styles['form-row']}>
            <div className={styles['form-control-position']}>
              <AsyncSelect.Redux
                // fetch={DictionaryApi.getDictionaryItems.bind(null, 'Companies')}
                // fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                //   null,
                //   'Companies',
                // )}
                dataToValue={(x: any) => x.masterCode}
                dataToRender={(x: any) => x.name}
                name='position'
                label='??????????????????'
              />
            </div>
          </div>
        </div>
      );
    /////////////////////////////////////////////////////////////////////////////////////////////////
    if (checkAccess(['0', '4', '6']))
      return (
        <div className={styles.form}>
          <div className={styles['form-row']}>
            <div className={styles['form-control-from']}>
              <Input.Redux label={'??? ????????????'} name='number' />
            </div>
            <div className={styles['form-control-from']}>
              <AsyncSelect.Redux
                fetch={DictionaryApi.getDictionaryItems.bind(
                  null,
                  'Services',
                  { isService: 'true' },
                )}
                fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                  null,
                  'Services',
                )}
                dataToValue={(x: any) => x.masterCode}
                dataToRender={(x: any) => x.name}
                name='service'
                label='????????????????????????'
              />
            </div>
          </div>

          <div className={styles['form-row']}>
            <div className={styles['form-control-from']}>
            <AsyncSelect.Redux
              fetch={DictionaryApi.getDictionaryItems.bind(
                null,
                'Customers',
                {
                  airline: filterValues?.company,
                },
              )}
              fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                null,
                'Customers',
              )}
              dataToValue={(x: any) => x.masterCode}
              dataToRender={(x: any) => x?.properties?.nameRu}
              name='customer'
              label='????????????????'
            />
            </div>
            <div className={styles['form-control-from']}>
              <AsyncSelect.Redux
                fetch={DictionaryApi.getDictionaryItems.bind(
                  null,
                  'Companies',
                  {
                    name: filterValues?.customer?.properties?.airline,
                  },
                )}
                fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                  null,
                  'Companies',
                )}
                dataToValue={(x: any) => x.masterCode}
                dataToRender={(x: any) => x?.properties?.nameRu}
                name='company'
                label='????????????????????????'
              />
            </div>
          </div>

          <div className={styles['form-row']}>
            <div className={styles['form-control-from']}>
              <AsyncSelect.Redux
                fetch={DictionaryApi.getDictionaryItems.bind(
                  null,
                  'Transports',
                  {
                    company: filterValues?.company,
                  },
                )}
                fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                  null,
                  'Transports',
                )}
                dataToValue={(x: any) => x.masterCode}
                dataToRender={(x: any) => x.name}
                name='aircraft'
                label='???????????????? ??????????'
              />
            </div>
            {/* <div className={styles['form-control-from']}>
              <AsyncSelect.Redux
                fetch={DictionaryApi.getDictionaryItems.bind(
                  null,
                  'Performer',
                )}
                fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                  null,
                  'Performer',
                )}
                dataToValue={(x: any) => x.masterCode}
                dataToRender={(x: any) => x.name}
                name='performer'
                label='?????????????????????? (??????????!)'
                disabled={true}
              />
            </div> */}
          </div>

          <div className={styles['form-row']}>
            <div className={styles['form-control-from']}>
              <DateTimePickerRedux
                label='???????????? (????????)'
                name='startPlan'
              />
            </div>
            <div className={styles['form-control-from']}>
              <DateTimePickerRedux
                label='?????????????????? (????????)'
                name='endPlan'
              />
            </div>
          </div>
          <div className={styles['form-row']}>
            <div className={styles['form-control-from']}>
              <DateTimePickerRedux
                label='???????????? (????????)'
                name='started'
              />
            </div>

            <div className={styles['form-control-from']}>
              <DateTimePickerRedux
                label='?????????????????? (????????)'
                name='completed'
              />
            </div>
          </div>

          <div className={styles['form-row']}>
            <div className={styles['form-control-division']}>
              <MultiSelect.Redux
                label='????????????'
                name='statuses'
                onOpen={() => console.log('opened')}
                onClose={() => console.log('opened')}
                onChange={() => console.log('opened')}
              >
                {statuses.result.map((item) => {
                  return (
                    <MultiSelect.Option
                      key={item.name}
                      value={item.name}
                      label={item.description}
                    />
                  );
                })}
              </MultiSelect.Redux>
            </div>
          </div>
        </div>
      );
  };

  return (
    <div className={styles.searchDiv}>
    <Form className={styles.form}>
      {renderFormDependingOnRole()}
      <div className={styles.buttons}>
        <Button
          onClick={() => {
            handleClose();
            dispatch(destroy('applicationsFilter'));
          }}
          variant='text'
        >
          ???????????????? ????????????
        </Button>
        <Button
          icon={<Icon name='done' />}
          onClick={() => handleClose()}
        >
          ??????????????
        </Button>
      </div>
    </Form>
    </div>
  );
};

export default reduxForm<FilterProps, FilterProps>({
  form: 'applicationsFilter',
  onChange: onChange,
  initialValues: {},
  destroyOnUnmount: false,
})(FilterForm);
