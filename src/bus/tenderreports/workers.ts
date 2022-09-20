import { put, call } from '@redux-saga/core/effects';
import { tenderReportsActions } from './actions';
import reportsApi from '@api/reportsApi';
import DictionaryApi from '@src/api/dictionaryApi';

export function* fetchTenderReports() {
  yield put(tenderReportsActions.fetch_tender_reports_request());

  const { response, error } = yield call(
    DictionaryApi.getTenderReports,
    'Reports',
  );

  if (response) {
    console.log(response);
    yield put(
      tenderReportsActions.fetch_tender_reports_success(
        response,
      ),
    );
  }
  if (error) {
    console.log('error');
    yield put(
      tenderReportsActions.fetch_tender_reports_failed(error),
    );
  }
}
