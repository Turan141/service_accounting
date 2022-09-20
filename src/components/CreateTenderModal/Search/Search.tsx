// Core
import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';

// Components
import { SearchField } from 'react-lib';

interface SearchProps {
  className: string;
}

const Search: React.FC<SearchProps> = ({ className }) => {
  return (
    <div>
      <SearchField.Redux
        name='search'
        placeholder='Поиск'
        className={className}
      />
    </div>
  );
};

export default reduxForm<SearchProps, SearchProps>({
  form: 'tenderOptionsSearch',
  initialValues: {},
})(Search);
