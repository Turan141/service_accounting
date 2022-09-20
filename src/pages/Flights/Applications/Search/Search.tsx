// Core
import React from 'react';
import { change, getFormValues, reduxForm } from 'redux-form';
import styles from '../Applications.module.scss';

// Components
import { Button, Icon, SearchField } from 'react-lib';
import { useDispatch, useSelector } from 'react-redux';

interface SearchProps {
  className?: string;
}

const Search: React.FC<SearchProps> = ({ className }) => {
  const dispatch = useDispatch();
  const tendersSearch: any = useSelector((state) =>
    getFormValues('tendersSearch')(state),
  );
  console.log(tendersSearch)

  return (
    <div className={styles.searchDiv}>
      {tendersSearch.search && 
      //@ts-ignore
       <Button
       className={styles.clearInputSearchBtn}
       icon={
         <Icon
           className={styles.clearInputSearch}
           name='deleteIcon'
         />
       }
       onClick={() => {
         dispatch(
           change('tendersSearch', 'search', '', false, false),
         );
       }}
     ></Button>
      }
     
      <SearchField.Redux
        name='search'
        placeholder='Поиск по номеру или наименованию'
        className={styles.searchField}
      />
    </div>
  );
};

export default reduxForm<SearchProps, SearchProps>({
  form: 'tendersSearch',
  initialValues: {},
  destroyOnUnmount: false,
})(Search);
