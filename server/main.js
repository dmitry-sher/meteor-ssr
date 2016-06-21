import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Route } from 'react-router';
import {ReactRouterSSR} from 'meteor/reactrouter:react-router-ssr';
import * as util from '/lib/util';
require('/lib/accounts');
require('/lib/subscribe');
import App from '/pages/App';
import HomePage from '/pages/HomePage';
Meteor.startup(() => {
  // code to run on server at startup
  var cnt = Meteor.users.find().count();
  if (!cnt) {
  	Accounts.createUser({ username: 'test@test.com', email: 'test@test.com', password: 'test', profile: {} });
  }
});

var AppRoutes = (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
	</Route>
);
ReactRouterSSR.Run(AppRoutes, {
	props: {
		onUpdate() {
			// Notify the page has been changed to Google Analytics
			// ga('send', 'pageview');
		}
	},
	rootElement: 'render-target'
}, {
	disableSSR: false,

	preRender: function(req, res) {
		// console.log('[ReactRouterSSR.preRender] req = ', req, ', res = ', res);
		// ReactCookie.plugToRequest(req, res);
	},

});

if (Meteor.isServer) {
	console.log('[server]')
}