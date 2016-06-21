import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Modal from '/components/common/Modal';
import Lightbox from '/components/common/Lightbox';
import * as util from '/lib/util';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: {
				text: '',
				buttons: []
			},
			lightbox: {
				photo: ''
			}
		}
	}

	componentDidMount() {
		util.registerAppComponent(this);
		window.util = util;
	}

	showModal(options) {
		var state = {
			modal: {
				text: options.text,
				buttons: options.buttons,
				isOpen: true,
				oldScroll: window.scrollY,
				footerButtons: options.footerButtons
			}
		}
		this.setState(state, () => {
			window.scrollTo(0,0);
			$('body').addClass('modalOpen');
		});
	}

	showLightbox(options) {
		var state = {
			lightbox: {
				photo: options.photo,
				isOpen: true,
				oldScroll: window.scrollY
			}
		}
		this.setState(state, () => {
			window.scrollTo(0,0);
			$('body').addClass('modalOpen');
		});
	}

	closeModal() {
		var modal = this.state.modal;
		modal.isOpen = false;
		this.setState({modal}, () => {
			window.scrollTo(0, modal.oldScroll);
			$('body').removeClass('modalOpen');
		});
	}

	closeLightbox() {
		var lightbox = this.state.lightbox;
		lightbox.isOpen = false;
		this.setState({lightbox}, () => {
			window.scrollTo(0, lightbox.oldScroll);
			$('body').removeClass('modalOpen');
		});
	}

	render() {
		var containerClasses = ['container'];
		// if (this.state.modal.isOpen)
		// 	containerClasses.push('modalOpen');
		return (
			<div className={containerClasses.join(' ')}>
				{this.props.children}
				<Modal parent={this} {...this.state.modal} />
				<Lightbox parent={this} {...this.state.lightbox} />
			</div>
		);
	}
}