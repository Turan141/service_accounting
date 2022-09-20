// Core
import Flights from "@pages/Flights/Flights"
import * as React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { book } from "./book"
import RestrictedPage from "@pages/RestrictedPage";
import {checkAccess} from "@helpers/utils";

const App = () => {

    return (
        <Switch>
            {checkAccess(['0','1','4','5','6']) && (
                <>
                    <Route path={book.flights} component={Flights} />
                    <Redirect to={book.flights} />
                </>
            )}
            <Route path={book.restricted} component={RestrictedPage} />
            <Redirect to={book.restricted} />
        </Switch>
    )
}

// Exports
export default App
