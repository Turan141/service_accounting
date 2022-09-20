import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/routes/App';
import { Redirect, Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ErrorBoundary, ModalProvider } from 'react-lib';
import { ReactNotifications } from 'react-notifications-component';

import { store, history } from '@src/store';

//Styles
import './index.scss';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.compat.css';

import keycloak from './keycloak';
import { Test } from './pages/Test/Test';
import Flights from './pages/Flights/Flights';
import { book } from './routes/book';

// @ts-ignore
const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <ErrorBoundary>
        <ReactNotifications />
        <Router history={history}>
          <ModalProvider>
            <App />
          </ModalProvider>
        </Router>
      </ErrorBoundary>
    </Provider>,
    document.getElementById('root'),
  );

const test = () =>
  ReactDOM.render(<Test />, document.getElementById('root'));

  // const test2 = () =>{
  //   <>
  //   <Route path={book.test} component={Test} />
  //   <Redirect to={book.test} />
  //   </>
  // }



const init = () => {
  // test();
  // test()
  // setTimeout(() => {
   
  // }, 2000);
  keycloak
  .init({
    onload: 'login-required',
  })
  .then((auth: any) => {
    if (auth) render();
    else keycloak.login();
  })
  .catch(
    (reason: any) =>
      alert(
        `Сервис авторизации временно недоступен.
      Ошибка: ${reason.error}
      Пожалуйста, повторите попытку авторизации через несколько минут.`,
      ),
    // console.log(reason)
  );
};

init();

const login = keycloak.login;
const logout = keycloak.logout;
const getToken = () => keycloak?.token;
const isLoggedIn = () => !!keycloak.token;
// const updateToken = (successCallback) =>
//   keycloak.updateToken(5)
//     .then(successCallback)
//     .catch(doLogin);
const getUsername = () => keycloak.tokenParsed?.name;
const getKeycloak = () => keycloak;
const getRoles = () =>
  keycloak?.resourceAccess
    ? keycloak?.resourceAccess['clients-front']?.roles
    : [];

const KC = {
  login,
  logout,
  getToken,
  getUsername,
  getKeycloak,
  getRoles,
};

export default KC;
