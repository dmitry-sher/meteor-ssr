import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import * as util from '/lib/util';
import cookie from 'react-cookie';

class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			error: false,
			login: '',
			pass: '',
			validated: false
		}

		this.onSubmit = (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (!this.state.validated)
				return;
			// var user = this.refs.login.value, pass = this.refs.pass.value;
			var user = this.state.login, pass = this.state.pass;
			// if (!user) {
			// 	this.setState({error: 'Пользователь не указан'});
			// 	return;
			// }
			// if (!pass) {
			// 	this.setState({error: 'Пароль не указан'});
			// 	return;
			// }

			this.setState({error: false});
			Meteor.loginWithPassword(user, pass, (err, res) => {
				if (err) {
					this.setState({error: err.message});
					return;
					// this.refs.
				}

				cookie.save("meteor_user_id", Meteor.userId(), { path: '/' });
				cookie.save("meteor_token", localStorage.getItem("Meteor.loginToken"), { path: '/' });
				this.context.router.push('/');
				// console.log('[LoginForm.onSubmit callback] err = ', err, ', res = ', res);
			});
		}

		this.onLoginChange = (e) => {
			this.setState({login: e.target.value}, this.validate);
		}

		this.onPassChange = (e) => {
			this.setState({pass: e.target.value}, this.validate);
		}

		this.validate = () => {
			this.setState({validated: this.state.login && this.state.pass})
		}
	}

	render() {
		var errClasses = ['err', 'fontH3', 'red'];
		if (!this.state.error)
			errClasses.push('hidden');
		var submitClasses = ['submit', 'defaultButton'];
		if (this.state.validated)
			submitClasses.push('active');
		return (
			<div className="loginForm paddedContent">
				<form onSubmit={this.onSubmit}>
					<input type="text" name="email" ref="login" placeholder="Ваш Email" className="login defaultInput" onChange={this.onLoginChange} onKeyUp={this.onLoginChange} />
					<input type="password" name="pass" ref="pass" placeholder="Введите пароль" className="pass defaultInput" onChange={this.onPassChange} onKeyUp={this.onPassChange} />
					<input type="submit" className={submitClasses.join(' ')} value="Войти" />
					<div className={errClasses.join(' ')} ref="msg">{this.state.error}</div>
				</form>
			</div>
		);
	}
}

LoginForm.contextTypes = {
	router: React.PropTypes.object
};

export default createContainer(util.getUserMeteorData, LoginForm);