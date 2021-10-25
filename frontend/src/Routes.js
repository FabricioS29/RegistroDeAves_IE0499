import React from "react";
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './core/Home';
import Signup from './core/Signup';
import Signin from './core/Signin';
import AddBird from './core/AddBird';
import Bird from './core/Bird';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/bird/:birdId' exact component={Bird}/>
                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/addbird' exact component={AddBird} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;