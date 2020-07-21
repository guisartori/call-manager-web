import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Projects from './pages/Projects'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Projects} path="/projects" />
        </BrowserRouter>
    )
}

export default Routes