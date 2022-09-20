import React, { createRef, FC, forwardRef } from 'react';
import InputMask from 'react-input-mask';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import { Icon, Input, withReduxForm } from 'react-lib';
import { TimeInput } from '@mantine/dates';
import { format, parse } from 'date-fns';
import styles from './DateTimePicker.module.scss';
import './DataPicker.css';

registerLocale('ru', ru);

interface DateTimeInputProps {
  className?: string;
  name?: string;
  isTimePicker?: boolean;
  label?: string;
  disabled?: boolean;
  error?: boolean | string | null;
  value?: number | string;
  timeIntervals?: number;
  onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: number | string | undefined) => void;
  minDate?: Date;
  endDate?: Date;
  maxDate?: Date;
  filterTime?: void;
}

const DateTimePicker: FC<DateTimeInputProps> = forwardRef(
  (
    {
      className,
      name,
      isTimePicker = false,
      label = '',
      disabled = false,
      error = false,
      value = '',
      timeIntervals = 1,
      onBlur,
      onChange,
      minDate,
      endDate,
      maxDate,
      filterTime,
      ...props
    },
    ref,
  ) => {
    const refInput = createRef<any>();
    const icon = isTimePicker ? (
      <Icon name='time' />
    ) : (
      <Icon name='calendar' />
    );
    const mask = isTimePicker ? 'HH:mm' : 'dd.MM.yyyy.HH:mm';
    const inputMask = isTimePicker ? '99:99' : '99.99.9999 99:99';

    const Component = (
      DatePicker ? DatePicker : null
    ) as React.ElementType;

    return (
      <Component
        ref={ref}
        minDate={minDate}
        endDate={endDate}
        maxDate={maxDate}
        name={name}
        disabled={disabled}
        dateFormat={mask}
        selected={value ? new Date(+value).setSeconds(0, 0) : null}
        onChange={onChange}
        locale='ru'
        //время
        shouldCloseOnSelect={false}
        showTimeInput={false}
        timeFormat='HH:mm'
        showTimeSelect={isTimePicker}
        showTimeSelectOnly={isTimePicker}
        showYearDropdown
        disabledKeyboardNavigation
        timeIntervals={timeIntervals}
        timeCaption='Время'
        onBlur={() => {
          console.log('blurred');
        }}
        customInput={
          <InputMask
            value={+value}
            // @ts-ignore
            onChange={onChange}
            mask={inputMask}
          >
            {(inputProps: any) => (
              <Input
                {...inputProps}
                className={className}
                name={name}
                label={label}
                prefix={icon}
                error={error}
              />
            )}
          </InputMask>
        }
      >
        {console.log(Date.now())}
        {!isTimePicker && (
          <div style={{ padding: 10, textAlign: 'center' }}>
            Время
            <TimeInput
              style={{ textAlign: 'center', marginTop: 10 }}
              value={new Date(+value)}
              onChange={(e) => {
                const valueDate: Date = new Date(
                  +value || Date.now(),
                );
                valueDate.setHours(e.getHours());
                valueDate.setMinutes(e.getMinutes());
                valueDate.setSeconds(0, 0);
                onChange && onChange(valueDate.valueOf());
              }}
            />
          </div>
        )}
        <input
          onFocus={(e) => {
            e.target.value = format(+value || Date.now(), 'HH:mm');
          }}
          className={styles.time}
          placeholder={''}
          onChange={(e) => {
            const parsed = parse(e.target.value, 'HH:mm', new Date());
            const valueDate = new Date(+value || Date.now());
            valueDate.setHours(parsed.getHours());
            valueDate.setMinutes(parsed.getMinutes());
            onChange && onChange(+valueDate);
          }}
          type={'time'}
        />
      </Component>
    );
  },
);
// @ts-ignore
export const DateTimePickerRedux = withReduxForm(DateTimePicker);

// @ts-ignore
export default DateTimePicker;
