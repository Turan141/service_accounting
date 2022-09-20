// Core
import React from 'react';
import classNames from 'classnames';

// Components
import { InputBase, withReduxForm } from 'react-lib';

// Instruments

// Styles
import styles from './Textarea.module.scss';

export interface TextareaProps {
  className?: string;
  id?: string;
  name?: string;
  value?: number | string;
  label?: string;
  cols?: number;
  rows?: number;
  placeholder?: string;
  error?: boolean | string;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onFocus?: (event?: React.FormEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event?: React.FormEvent<HTMLTextAreaElement>) => void;
  onChange?: (event: React.FormEvent<any>) => void;
}

interface TextareaInterface extends React.FC<TextareaProps> {
  Redux: typeof TextareaRedux;
}

const Textarea: TextareaInterface = ({
  className,
  id,
  name,
  value,
  label,
  placeholder,
  rows,
  cols,
  error,
  disabled,
  prefix,
  suffix,
  onFocus,
  onBlur,
  onChange,
}) => (
  <InputBase
    className={classNames(styles.root, className)}
    id={id}
    value={value}
    label={label}
    placeholder={placeholder}
    disabled={disabled}
    error={error}
    prefix={prefix}
    suffix={suffix}
    onFocus={onFocus}
    onBlur={onBlur}
  >
    {({ handleFocus, handleBlur }) => (
      <textarea
        className={styles.textarea}
        id={id}
        name={name}
        value={value}
        cols={cols}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        // @ts-ignore
        onFocus={handleFocus}
        // @ts-ignore
        onBlur={handleBlur}
        onChange={onChange}
      />
    )}
  </InputBase>
);

const TextareaRedux = withReduxForm(Textarea);

Textarea.Redux = TextareaRedux;

// Exports
export default Textarea;
