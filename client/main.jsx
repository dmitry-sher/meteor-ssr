import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import 'normalize.css';
import * as util from '../lib/util';
require('../lib/accounts');
require('../lib/subscribe');
import { IndexRoute, Route } from 'react-router';
import {ReactRouterSSR} from 'meteor/reactrouter:react-router-ssr';
import App from '../pages/App';
import HomePage from '../pages/HomePage';

Meteor.startup(() => {
	util.ensureRem();
	util.ensureIE10();
	util.ensureIE11();
	util.ensureAndroid();
	util.ensureAndroid42();
	util.ensureIphone();
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

if (Meteor.isClient) {
  // // Load Google Analytics
  // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  // (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  // m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  // })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  // ga('create', 'UA-XXXXXXXX-X', 'auto');
  // ga('send', 'pageview');
}