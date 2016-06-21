import { Accounts } from 'meteor/accounts-base';

if (Accounts.ui)
	Accounts.ui.config({
	  passwordSignupFields: 'USERNAME_ONLY',
	});