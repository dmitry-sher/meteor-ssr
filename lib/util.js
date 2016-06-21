import cookie from 'react-cookie';

export var compat = {
	remMode: false,
	remModes: {
		Width: 1,
		Height: 2,
		1: 'width',
		2: 'height'
	},
};

export const params = {
	uploadTimeout: 120000
};

export const defaultMapProps = {
	center: {lat: 59.938043, lng: 30.337157},
	centerFull: {latitude: 59.938043, longitude: 30.337157},
	scrollwheel: false,
	panControl: false,
	mapTypeControl: false,
	zoom: 16
};

var _first = true;
var _remHtml, _remInt;
var _ratio = 9/16;
export function ensureRem() {
	_remHtml = $('html');
	const updatePads = function() {
		var correctSize, fontSize, height, padStr, padding, screenHeight, screenWidth, width;
		if (compat.onScreenKeyboard) {
			return;
		}
		screenHeight = _remHtml.height();
		screenWidth = _remHtml.width();
		// fontSize = _remHtml.css('font-size').match(/[\d.]+/)[0];
		if (screenWidth / screenHeight > _ratio) {
			compat.remMode = compat.remModes.Height;
			correctSize = screenHeight * _ratio / 100;
			// padding = (screenWidth - 100 * correctSize) / 2;
			// if (padding > 0) {
			// 	height = 100 * correctSize / _ratio;
			// 	mh = $('#render-target').height();
			// 	// console.log('[updatePads] height = ', height, ', mh = ', mh);
			// 	height = Math.max(height, mh);
			// 	width = 100 * correctSize;
			// 	padStr = '0 ' + padding + 'px 0 ' + padding + 'px';

			// }
		} else {
			correctSize = _remHtml.width() / 100;
			compat.remMode = compat.remModes.Width;
		}
		if (fontSize !== correctSize || isNan(fontSize)) {
			return _remHtml.css('font-size', correctSize + 'px');
		}
	};
	updatePads();
	return _remInt = setInterval(updatePads, 300);
};

export function cancelRem() {
	clearInterval(_remInt);
	_remHtml.css('font-size', '12px');
};

export function getRem() {
	return +$('html').css('font-size').match(/[\d.]+/)[0];
}

export function ensureIE10() {
	if (Function('/*@cc_on return document.documentMode===10@*/')()) {
		$('body').addClass('ie10');
		compat.ie10 = true;
	}
};

export function ensureIE11() {
	if (!!window.MSInputMethodContext && !!document.documentMode) {
		$('body').addClass('ie11');
		compat.ie11 = true;
	}
};

export function ensureAndroid() {
	if (isAndroid()) {
		$('body').addClass('android');
		compat.android = true;
	}
};

export function ensureAndroid42() {
	var getAndroidVersion;
	getAndroidVersion = function(ua) {
		var match;
		ua = (ua || navigator.userAgent).toLowerCase();
		match = ua.match(/android\s([0-9\.]*)/);
		if (match) {
			return match[1];
		} else {
			return false;
		}
	};
	if (parseFloat(getAndroidVersion()) <= 4.3) {
		compat.android42 = true;
		$('body').addClass('android42');
	}
};

export function ensureIphone() {
	var match, ua;
	ua = (ua || navigator.userAgent).toLowerCase();
	match = ua.match(/iphone/) || ua.match(/ipad/);
	if (match) {
		compat.iphone = true;
		$('body').addClass('iphone');
	}
};

export function ensureFirefox() {
	if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
		compat.firefox = true;
		$('body').addClass('firefox');
		if (navigator.userAgent.toLowerCase().indexOf('windows') > -1) {
			compat.firefoxWin = true;
			$('body').addClass('firefox-win');
		}
	}
};

export function isAndroid() {
	if (!navigator) {
		return false;
	}
	if (!navigator.userAgent) {
		return false;
	}
	if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
		return true;
	}
	if (navigator.userAgent.toLowerCase().indexOf("mozilla/5.0 (x11") > -1) {
		return true;
	}
	if (navigator.userAgent.toLowerCase().indexOf("mozilla/5.0 (linux") > -1) {
		return true;
	}
	return false;
};

_userDataLoading = true;
export function getUserMeteorData() {
	if (Meteor.isClient) {
		var user, loggingIn;
		user = Meteor.user();
		loggingIn = Meteor.loggingIn();
		if (!user && !loggingIn && _userDataLoading) {
			var userId = cookie.load('meteor_user_id');
			var token = cookie.load('meteor_token');
			if (userId && token) {
				setTimeout( () => {
					_userDataLoading = false;
				}, 250);
				return {user: false, loggingIn: true};
			}
		}
		return {user, loggingIn};
	}
	if (Meteor.isServer) {
		var userId = cookie.load('meteor_user_id');
		var token = cookie.load('meteor_token');
		if (!userId || !token)
			return {user: false, loggingIn: false};
		// var user = Meteor.users.findOne({
		// 	_id: userId,
		// 	'services.resume.loginTokens.hashedToken' : Accounts._hashLoginToken(token)
		// });
		// console.log('[util.getUserMeteorData] userId = ', userId, ', toke = ', token, ', user = ', user, ', hashed token = ', Accounts._hashLoginToken(token));
		var user = Meteor.call('find_user', userId, token);
		// console.log('[util.getUserMeteorData] user2 = ', user2);
		return {user, loggingIn: false};
	}
	return {user: false, loggingIn: false};
}

// export function curryDataFunc(func) {
// 	return function() {
// 		data = getUserMeteorData();
// 		data2 = func();
// 		for (i in data2)
// 			data[i] = data2[i];
// 		return data;
// 	}
// }
//
export function getImageLink(id, store = 'thumbs') {
	return '/cfs/files/images/' + id + '?store=' + store;
}

export function errorAlert(msg, e) {
	// console.log('[errorAlert] msg = ', msg);
	// console.log('[errorAlert] e = ', e);
	showModal({
		text: msg,
		buttons: [
			{
				classes: 'red',
				text: 'OK'
			}
		]
	});

}

export function formatTime(t) {
	let diff = moment().diff(moment(t), 'minute');
	let ret = '';
	if (diff < 1)
		ret = 'just now';
	else if (diff > 60) {
		let h = Math.floor(diff/60);
		ret = h + (h > 1 ? ' hours' : ' hour');
	}
	else if (diff > 60*24) {
		let d = Math.floor(diff/60/24);
		ret = d + (d > 1 ? ' days' : ' day');
	}
	else {
		ret = diff + (diff > 1 ? ' minutes' : ' minute');
	}
	return ret;
}

export function preparePhotos(o) {
	var ret = [];
	if (o.photo1)
		ret.push(o.photo1);
	if (o.photo2)
		ret.push(o.photo2);
	if (o.photo3)
		ret.push(o.photo3);
	return ret;
}

_app = false;
export function registerAppComponent(app) {
	_app = app;
}

export function showModal(options) {
	if (!_app) {
		alert('failed to show modal');
		return;
	}
	_app.showModal(options);
	// alert(options.text);
}

export function showLightbox(options) {
	if (!_app) {
		alert('failed to show lightbox');
		return;
	}
	_app.showLightbox(options);
	// alert(options.text);
}