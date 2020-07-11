import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Projects from './pages/Projects'
import Calls from './pages/Calls'
import Home from './pages/Home'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Projects} path="/projects" />
            <Route component={Calls} path="/calls/:projectId" />
        </BrowserRouter>
    )
}

export default Routes