import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Incidents from './pages/Incidents';
import NewIncident from './pages/NewIncident';

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Logon} />
				<Route path="/register" component={Register} />
				<Route path="/incidents" component={Incidents} />
				<Route path="/incident/new" component={NewIncident} />
			</Switch>
		</BrowserRouter>
	);
}
