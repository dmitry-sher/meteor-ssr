import * as collections from '/lib/collections';

if (Meteor.isClient) {
	Meteor.subscribe('Firms');
	Meteor.subscribe('Models');
	Meteor.subscribe('RequestTypes');
	Meteor.subscribe('Requests');
	Meteor.subscribe('Images');
	Meteor.subscribe('Services');
	Meteor.subscribe('RequestBids');

	window.collections = collections;
}