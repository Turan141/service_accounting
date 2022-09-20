import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import { all, call } from 'redux-saga/effects';
import { History } from 'history';

//Reducers
import { flightsReducer } from './flights/reducer';
import { flightReducer } from './flight/reducer';
import { tasksReducer } from './tasks/reducer';
import { executorsReducer } from './executors/reducer';
import { servicesReducer } from './services/reducer';
import { reportsReducer } from './reports/reducer';
import { attachmentsReducer } from '@bus/attachment/reducer';

//Watchers
import { watchFlights } from './flights/watchers';
import { watchFlight } from './flight/watchers';
import { watchTasks } from './tasks/watchers';
import { watchExecutors } from './executors/watchers';
import { watchServices } from './services/watchers';
import { watchReports } from './reports/watchers';
import { tendersReducer } from '@bus/tenders/reducer';
import { watchTenders } from './tenders/watchers';
import { watchAttachments } from '@bus/attachment/watchers';
import { watchTenderReports } from './tenderreports/watchers';
import { tenderReportsReducer } from './tenderreports/reducer';

export const rootReducer = (history: History) =>
  combineReducers({
    form: formReducer,
    router: connectRouter(history),
    flights: flightsReducer,
    flight: flightReducer,
    tasks: tasksReducer,
    executors: executorsReducer,
    tenderReports: tenderReportsReducer,
    services: servicesReducer,
    reports: reportsReducer,
    tenders: tendersReducer,
    attachments: attachmentsReducer,
  });

export function* rootSaga() {
  yield all([
    call(watchFlights),
    call(watchFlight),
    call(watchTasks),
    call(watchExecutors),
    call(watchServices),
    call(watchReports),
    call(watchTenders),
    call(watchAttachments),
    call(watchTenderReports),
  ]);
}
