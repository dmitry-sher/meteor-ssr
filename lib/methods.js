import {Meteor} from 'meteor/meteor';

Meteor.methods({
	find_user: function(userId, token) {
		return Meteor.users.findOne({
			_id: userId,
			'services.resume.loginTokens.hashedToken' : Accounts._hashLoginToken(token)
		});
	}
});