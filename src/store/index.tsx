import { configureStore } from "@reduxjs/toolkit"
import { createBrowserHistory } from "history"
import { routerMiddleware } from "connected-react-router"
import { createLogger } from "redux-logger"
import createSagaMiddleware from "redux-saga"

//Bus
import { rootReducer, rootSaga } from "../bus/index"

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const loggerMiddleware = createLogger({
    duration: true,
    collapsed: true,
    colors: {
        title: () => "#139BFE",
        prevState: () => "#1C5FAF",
        action: () => "#149945",
        nextState: () => "#A47104",
        error: () => "#ff0005",
    },
})

export const store = configureStore({
    reducer: rootReducer(history),
    middleware: [routerMiddleware(history), sagaMiddleware, loggerMiddleware],
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
