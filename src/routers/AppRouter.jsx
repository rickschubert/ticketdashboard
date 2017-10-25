import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Header from "./../components/Header.jsx"
import BugsAndTickets from "./../components/BugsAndTickets.jsx"
import WorkingTimes from "./../components/WorkingTimes.jsx"

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={BugsAndTickets} exact={true} />
                <Route path="/Times" component={WorkingTimes} />
            </Switch>
        </div>      
    </BrowserRouter>
)

export default AppRouter