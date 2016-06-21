import React, { Component } from 'react';
import ReactMixin from 'react-mixin';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import * as util from '/lib/util';
import LoginForm from '/components/accounts/LoginForm';

@ReactMixin(ReactMeteorData)
class HomePage extends Component {

	constructor(props) {
		super(props);

		this.onLogout = (e) => {
			Meteor.logout();
		}
	}

	componentDidMount() {
		if (this.props.user)
			this.context.router.push('/profile');
	}

	render() {
		if (this.props.loggingIn || !this.props.user)
			return (
				<LoginForm />
			);
		if (this.props.user) {
			return (
				<div className="index" style={{padding: '5rem 7.5rem'}}>
					<div className="defaultMessage">
						hello, {this.props.user.username}
					</div>
					<button className="defaultButton active" onClick={this.onLogout}>Logout</button>
				</div>
			);
		};
		return null;
	}
}

HomePage.contextTypes = {
	router: React.PropTypes.object
};

export default createContainer(util.getUserMeteorData, HomePage);