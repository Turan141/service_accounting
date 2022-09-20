import { RootState } from '@src/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DocumentView } from '@typings/swagger/api';
import { tendersActions } from '@bus/tenders/actions';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

const ROWS_PER_LOAD = 20;

export default function useInfiniteContent(
  fetch: (data: any) => void,
  selector: (state: RootState) => any,
  resetAction: ActionCreatorWithoutPayload,
  fetchOne?: (id: number) => Promise<DocumentView>,
  setIsLoadingFirst?: any,
) {
  const data = useSelector(selector);

  const dispatch = useDispatch();

  const [skip, setSkip] = useState(0);

  const fetchMore = () => {
    console.log('fetch more ', { take: ROWS_PER_LOAD, skip: skip });
    fetch({ take: ROWS_PER_LOAD, skip: skip });
    setSkip(skip + ROWS_PER_LOAD);
  };

  const reload = () => {
    console.log('reload');
    dispatch(resetAction());
    fetch({ take: ROWS_PER_LOAD, skip: 0 });
  };

  const reloadOne = async (id: number) => {
    console.log('reloading one tender id = ', id);
    const newTender = fetchOne && (await fetchOne(id));
    dispatch(tendersActions.updateOneTender(newTender));
  };

  useEffect(() => {
    console.log('useeffectreload');
    reload();
    setSkip(ROWS_PER_LOAD);
  }, [fetch]);

  let hasMore = data?.result?.length < data?.total;
  let totalItems = data?.total;
  console.log(totalItems);
  // console.log(data?.result.length, data.total);
  return {
    data: data?.result as any,
    fetchMore,
    hasMore,
    reload,
    reloadOne,
    totalItems,
  };
}
