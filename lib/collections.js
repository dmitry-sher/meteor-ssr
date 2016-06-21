// import {gm} from 'cfs/'

// synthetics pubs
export const Services = new Meteor.Collection('Services');

// real pubs
export const Firms = new Mongo.Collection('Firms');
Firms.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: 'Name',
	},
	active: {
		type: Boolean,
		label: 'is active'
	},
	updatedAt: {
		type: Date,
		label: 'when it was last updated',
		autoValue: function() {
			return new Date();
		}
	},
	createdAt: {
		type: Date,
		label: 'creation date',
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			} else {
				this.unset();	// Prevent user from supplying their own value
			}
		}
	}
}));

export const Models = new Mongo.Collection('Models');
Models.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: 'Name',
	},
	firmId: {
		type: String,
		label: 'Firm id'
	},
	active: {
		type: Boolean,
		label: 'is active'
	},
	updatedAt: {
		type: Date,
		label: 'when it was last updated',
		autoValue: function() {
			return new Date();
		}
	},
	createdAt: {
		type: Date,
		label: 'creation date',
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			} else {
				this.unset();	// Prevent user from supplying their own value
			}
		}
	}
}));

export const Requests = new Mongo.Collection('Requests');
Requests.attachSchema(new SimpleSchema({
	userId: {
		type: String,
		label: 'user id'
	},
	requestTypeId: {
		type: String,
		label: 'request type id'
	},
	photos: {
		type: [String],
		label: 'photo ids',
	},
	comments: {
		type: String,
		label: 'user comments'
	},
	lat: {
		type: Number,
		decimal: true,
		label: 'latitude'
	},
	lng: {
		type: Number,
		decimal: true,
		label: 'latitude'
	},
	personalNumber: {
		type: Number,
		label: 'personal number'
	},
	active: {
		type: Boolean,
		label: 'is active'
	},
	updatedAt: {
		type: Date,
		label: 'when it was last updated',
		autoValue: function() {
			return new Date();
		}
	},
	createdAt: {
		type: Date,
		label: 'creation date',
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			} else {
				this.unset();	// Prevent user from supplying their own value
			}
		}
	},
	firmId: {
		type: String,
		label: 'firm id of car of request creator'
	},
	modelId: {
		type: String,
		label: 'model id of car of request creator'
	},
	chosenServiceId: {
		type: String,
		label: 'id of service chosen by user'
	},
	serviceData: {
		type: Object,
		blackbox: true,
		optional: true
	}
}));

export const RequestBids = new Mongo.Collection('RequestBids');
RequestBids.attachSchema(new SimpleSchema({
	requestId: {
		type: String,
		label: 'request id'
	},
	serviceId: {
		type: String,
		label: 'serivce id'
	},
	personalNumber: {
		type: Number,
		label: 'personal number'
	},
	active: {
		type: Boolean,
		label: 'is active'
	},
	comments: {
		type: String,
		label: 'user comments'
	},
	price: {
		type: Number,
		decimal: true,
		label: 'price'
	},
	seen: {
		type: Boolean,
		label: 'is seen'
	},
	updatedAt: {
		type: Date,
		label: 'when it was last updated',
		autoValue: function() {
			return new Date();
		}
	},
	createdAt: {
		type: Date,
		label: 'creation date',
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			} else {
				this.unset();	// Prevent user from supplying their own value
			}
		}
	},
	ownerId: {
		type: String,
		label: 'request owner id'
	}
}));

export const RequestTypes = new Mongo.Collection('RequestTypes');
RequestTypes.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: 'Name',
	},
	active: {
		type: Boolean,
		label: 'is active'
	},
	updatedAt: {
		type: Date,
		label: 'when it was last updated',
		autoValue: function() {
			return new Date();
		}
	},
	createdAt: {
		type: Date,
		label: 'creation date',
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			} else {
				this.unset();	// Prevent user from supplying their own value
			}
		}
	}
}));

// TODO: should it be moved to separate file?
// IMAGES collections
var createThumb = function(fileObj, readStream, writeStream) {
	gm(readStream, fileObj.name()).resize('256', '256').stream().pipe(writeStream);
};

var createMedium = function(fileObj, readStream, writeStream) {
	gm(readStream, fileObj.name()).resize('800', '800').stream().pipe(writeStream);
};

export const Images = new FS.Collection("images", {
	stores: [
		new FS.Store.GridFS("original"),
		new FS.Store.GridFS("thumbs", { transformWrite: createThumb }),
		new FS.Store.GridFS("medium", { transformWrite: createMedium })
	],
	filter: {
		maxSize: 5242880*3, // matches 15mb
		allow: {
			contentTypes: ['image/*'],
		//	 extensions: ['png', 'jpg', 'jpeg']
		},
		// deny: {
		//	 contentTypes: ['image/*'],
		//	 extensions: ['gif', 'bmp']
		// },
		onInvalid: function (message) {
			if (Meteor.isClient) {
				alert(message);
			} else {
				console.log(message);
			}
		}
	}
});

Images.deny({
	insert: function() {
		return false;
	},
	update: function() {
		return false;
	},
	remove: function() {
		return true;
	},
	download: function() {
		return false;
	}
});

Images.allow({
	insert: function() {
		return true;
	},
	update: function() {
		return true;
	},
	remove: function() {
		return false;
	},
	download: function() {
		return true;
	}
});