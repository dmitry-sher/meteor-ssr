import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import * as util from '/lib/util';

export default class Lightbox extends Component {
	constructor(props) {
		super(props);

		this.onClick = (e) => {
			e.preventDefault();
			e.stopPropagation();

			this.props.parent.closeLightbox();
		}

	}

	render() {
		var clses = ['lightbox'];
		if (this.props.classes)
			clses.push(this.props.classes);
		if (this.props.isOpen)
			clses.push('open');
		var style = {
			backgroundImage: 'url('+this.props.photo+')'
		}
		return (
			<div className={clses.join(' ')}>
				<div className="close fontH1" onClick={this.onClick}>X</div>
				<div className="button defaultButton active" onClick={this.onClick}>Закрыть</div>
				<div className="photo" style={style}></div>
			</div>
		);
				// <MapPoint lat={place.latitude} lng={place.longitude} place={place} />
	}
};

Lightbox.contextTypes = {
	router: React.PropTypes.object
};
