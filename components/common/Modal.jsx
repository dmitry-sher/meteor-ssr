import React, { Component } from 'react';

export default class Modal extends Component {

	constructor(props) {
		super(props);

		this.onButtonClick = (e) => {
			e.preventDefault();
			e.stopPropagation();
			var i = $(e.currentTarget).data('i');
			var type = $(e.currentTarget).data('type');
			if (typeof(i) == 'undefined')
				return;
			var b = null;
			if (!type || type == 'main')
				b = this.props.buttons[i];
			if (type == 'footer')
				b = this.props.footerButtons[i];
			if (!b) {
				console.log('[Modal.onButtonClick] failed to find button. i = ', i, ', type = ', type, ', buttons = ', this.props.buttons, ', footerButtons = ', this.props.footerButtons);

				return;
			}
			if (b.onClick)
				b.onClick(e);
			// console.log('[Modal.onButtonClick] going to run onClick ');
			// if (type == 'footer') {
			// 	if (this.props.footerButtons[i].onClick)
			// 		this.props.footerButtons[i].onClick(e);
			// }
			// if (!type || type == 'main') {
			// 	if (this.props.buttons[i].onClick)
			// 		this.props.buttons[i].onClick(e);
			// }
			this.props.parent.closeModal();
		}

		this.onOuterClick = (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.props.parent.closeModal();
		}

		this.getGetButton = (type) =>{
			return (b,i) => {
				let key = `button-${i}`;
				let cls = ['button', 'defaultButton', 'active'];
				if (b.classes) {
					if (typeof(b.classes) == 'string')
						cls.push(b.classes);
					if (typeof(b.classes) == 'object')
						cls.push(...b.classes);
					if (typeof(b.classes) == 'function')
						cls.push(b.classes(b, i));
				}

				return (
					<div key={key} className={cls.join(' ')} data-type={type} data-i={i} onClick={this.onButtonClick}>{b.text}</div>
				);
			};
		}
	}

	render() {
		var classes = ['modalOuter'];
		if (this.props.isOpen)
			classes.push('open');
		var buttons = this.props.buttons.map(this.getGetButton('main'));
		var title = null;
		if (this.props.title)
			title = (<div className="title">{this.props.title}</div>);
		var footer = null;
		if (this.props.footerButtons) {
			let fbuttons = this.props.footerButtons.map(this.getGetButton('footer'));
			footer = (<div className="footerButtons">{fbuttons}</div>);
			classes.push('withFooter');
		}
		// console.log('[Modal.render] footer = ', footer);
		return (
			<div className={classes.join(' ')}>
				<div className="modal">
					{title}
					<div className="text defaultMessage">{this.props.text}</div>
					<div className="buttons">
						{buttons}
					</div>
					{footer}
				</div>
			</div>
		);
	}
}

Modal.propTypes = {
	parent: React.PropTypes.object.isRequired,
	text: React.PropTypes.string.isRequired,
	buttons: React.PropTypes.array.isRequired
}

Modal.contextTypes = {
	router: React.PropTypes.object
};
