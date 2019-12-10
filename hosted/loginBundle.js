"use strict";

// Imports
var Alert = antd.Alert;
var Form = antd.Form;
var Input = antd.Input;
var TextArea = Input.TextArea;

var Button = antd.Button;
var Checkbox = antd.Checkbox;
var Tag = antd.Tag;
var Icon = antd.Icon;
var Row = antd.Row;
var Col = antd.Col;

// Windows
var createLoginWindow = function createLoginWindow(csrf) {
  var Login = Form.create()(LoginWindow);
  ReactDOM.render(React.createElement(Login, { csrf: csrf, toggleView: createSignupWindow }), document.querySelector("#content"));
};

var createSignupWindow = function createSignupWindow(csrf) {
  var Signup = Form.create()(SignupWindow);
  ReactDOM.render(React.createElement(Signup, { csrf: csrf, toggleView: createLoginWindow }), document.querySelector("#content"));
};

// Initialization
var setup = function setup(csrf) {
  createLoginWindow(csrf); // default view
};

// CSRF Token
var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Custom Styling
var styles = reactStyles();

/** Props
 * csrf (String || Number)
 * toggleView (Function)
 */

var LoginWindow = function (_React$Component) {
	_inherits(LoginWindow, _React$Component);

	function LoginWindow(props) {
		_classCallCheck(this, LoginWindow);

		var _this = _possibleConstructorReturn(this, (LoginWindow.__proto__ || Object.getPrototypeOf(LoginWindow)).call(this, props));

		_this.state = {
			error: false,
			username: '',
			password: '',
			rememberUser: false,
			width: styles.getDesiredFormWidth()
		};

		$(window).resize(function () {
			_this.setState({
				width: styles.getDesiredFormWidth()
			});
		});

		_this.handleChange = _this.handleChange.bind(_this);
		_this.handleSubmit = _this.handleSubmit.bind(_this);
		_this.toggleCheckbox = _this.toggleCheckbox.bind(_this);
		_this.onClose = _this.onClose.bind(_this);
		_this.changeView = _this.changeView.bind(_this);
		return _this;
	}

	_createClass(LoginWindow, [{
		key: 'changeView',
		value: function changeView() {
			this.props.toggleView(this.props.csrf);
		}
	}, {
		key: 'handleChange',
		value: function handleChange(e) {
			var target = e.target;
			var name = target.name;

			this.setState(_defineProperty({}, name, e.target.value));
		}
	}, {
		key: 'handleSubmit',
		value: function handleSubmit(e) {
			var _this2 = this;

			e.preventDefault();

			if (this.state.username == '' || this.state.password == '') {
				return false;
			}

			var content = 'username=' + this.state.username + '&password=' + this.state.password + '&_csrf=' + this.props.csrf;
			sendAjax('POST', '/login', content, redirect, function () {
				_this2.setState({
					error: true
				});
			});
		}
	}, {
		key: 'toggleCheckbox',
		value: function toggleCheckbox(e) {
			this.setState({
				rememberUser: e.target.checked
			});
		}
	}, {
		key: 'onClose',
		value: function onClose() {
			this.setState({
				error: false
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var getFieldDecorator = this.props.form.getFieldDecorator;

			styles.form.width = this.state.width;

			if (styles.form.width == '100%') {
				styles.form.maxWidth = '100%';
				styles.form.height = '100%';
			} else {
				styles.form.maxWidth = '400px';
				styles.form.height = 'auto';
			}

			return React.createElement(
				'div',
				{ style: styles.form },
				React.createElement(
					'h1',
					{ style: styles.loginHeader },
					'Login'
				),
				React.createElement(
					'p',
					{ style: styles.loginText },
					'Enter your credentials'
				),
				!this.state.error ? React.createElement('span', null) : React.createElement(Alert, {
					message: 'Your username or password are incorrect. Please try again.',
					type: 'error',
					closable: true,
					showIcon: true,
					style: styles.error,
					afterClose: this.onClose
				}),
				React.createElement(
					Form,
					{
						id: 'loginForm',
						name: 'loginForm',
						onSubmit: this.handleSubmit,
						onChange: this.handleChange
					},
					React.createElement(
						Row,
						{ style: { margin: '0', marginTop: '0px', height: '60px' } },
						React.createElement(
							Form.Item,
							null,
							getFieldDecorator('username', {
								rules: [{ required: true, message: 'Please enter a username' }]
							})(React.createElement(Input, {
								id: 'user',
								'class': 'formInput',
								type: 'text',
								name: 'username',
								style: styles.input,
								placeholder: 'Username',
								size: 'large'
							}))
						)
					),
					React.createElement(
						Row,
						{ style: { margin: '0', height: '60px' } },
						React.createElement(
							Form.Item,
							null,
							getFieldDecorator('password', {
								rules: [{ required: true, message: 'Please enter a password' }]
							})(React.createElement(Input.Password, {
								id: 'pass',
								'class': 'formInput',
								type: 'password',
								name: 'password',
								style: styles.input,
								placeholder: 'Password',
								size: 'large'
							}))
						)
					),
					React.createElement(
						Row,
						null,
						React.createElement(
							'p',
							{ style: { fontSize: '.8em', float: 'right', marginRight: '5px' } },
							React.createElement(
								'a',
								{ id: 'resetPassword' },
								'Forgot Password'
							)
						)
					),
					React.createElement(
						Row,
						{ style: { marginTop: '20px' } },
						React.createElement(
							Checkbox,
							{ style: { fontSize: '.9em' }, onChange: this.toggleCheckbox },
							'Remember me'
						)
					),
					React.createElement(
						Row,
						{ style: { height: '50px', marginTop: '10px' } },
						React.createElement(
							Form.Item,
							null,
							React.createElement(
								Button,
								{ block: true, type: 'primary', htmlType: 'submit', size: 'large', style: styles.signInButton },
								'Sign in'
							)
						)
					),
					React.createElement(
						Row,
						{ style: { fontSize: '.8em', float: 'right', marginTop: '0px', marginBottom: '-10px' } },
						React.createElement(
							'p',
							null,
							'Don\'t have an account? ',
							React.createElement(
								'a',
								{ id: 'signupLink', onClick: this.changeView },
								'Sign up.'
							)
						)
					)
				)
			);
		}
	}]);

	return LoginWindow;
}(React.Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Custom Styling
var styles = reactStyles();

/** Props
 * csrf (String || Number)
 * toggleView (Function)
 */

var SignupWindow = function (_React$Component) {
	_inherits(SignupWindow, _React$Component);

	function SignupWindow(props) {
		_classCallCheck(this, SignupWindow);

		var _this = _possibleConstructorReturn(this, (SignupWindow.__proto__ || Object.getPrototypeOf(SignupWindow)).call(this, props));

		_this.state = {
			error: false,
			message: '',
			username: '',
			password: '',
			password2: '',
			width: styles.getDesiredFormWidth()
		};

		$(window).resize(function () {
			_this.setState({
				width: styles.getDesiredFormWidth()
			});
		});

		_this.handleChange = _this.handleChange.bind(_this);
		_this.handleSubmit = _this.handleSubmit.bind(_this);
		_this.toggleCheckbox = _this.toggleCheckbox.bind(_this);
		_this.onClose = _this.onClose.bind(_this);
		return _this;
	}

	_createClass(SignupWindow, [{
		key: 'handleChange',
		value: function handleChange(e) {
			var target = e.target;
			var name = target.name;

			this.setState(_defineProperty({}, name, e.target.value));
		}
	}, {
		key: 'handleSubmit',
		value: function handleSubmit(e) {
			e.preventDefault();

			if (this.state.username == '' || this.state.password == '' || this.state.password2 == '') {
				this.setState({
					error: true,
					message: "Missing a field"
				});
				return false;
			}
			if (this.state.password != this.state.password2) {
				this.setState({
					error: true,
					message: "Passwords do not match"
				});
				return false;
			}

			var content = 'username=' + this.state.username + '&password=' + this.state.password + '&_csrf=' + this.props.csrf;
			sendAjax('POST', '/signup', content, redirect);
		}
	}, {
		key: 'toggleCheckbox',
		value: function toggleCheckbox(e) {
			this.setState({
				rememberUser: e.target.checked
			});
		}
	}, {
		key: 'onClose',
		value: function onClose() {
			this.setState({
				error: false
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var getFieldDecorator = this.props.form.getFieldDecorator;

			styles.form.width = this.state.width;

			if (styles.form.width == '100%') {
				styles.form.maxWidth = '100%';
				styles.form.height = '100%';
			} else {
				styles.form.maxWidth = '400px';
				styles.form.height = 'auto';
			}

			return React.createElement(
				'div',
				{ style: styles.form },
				React.createElement(
					'h1',
					{ style: styles.loginHeader },
					'Sign Up'
				),
				React.createElement(
					'p',
					{ style: styles.loginText },
					'Lets get started'
				),
				!this.state.error ? React.createElement('span', null) : React.createElement(Alert, {
					message: this.state.message,
					type: 'error',
					closable: true,
					showIcon: true,
					style: styles.error,
					afterClose: this.onClose
				}),
				React.createElement(
					Form,
					{
						id: 'loginForm',
						name: 'loginForm',
						onSubmit: this.handleSubmit,
						onChange: this.handleChange
					},
					React.createElement(
						Row,
						{ style: { margin: '0', marginTop: '15px', height: '60px' } },
						React.createElement(
							Form.Item,
							null,
							getFieldDecorator('username', {
								rules: [{ required: true, message: 'Please enter a username' }]
							})(React.createElement(Input, {
								id: 'user',
								'class': 'formInput',
								type: 'text',
								name: 'username',
								style: styles.input,
								placeholder: 'Username',
								size: 'large'
							}))
						)
					),
					React.createElement(
						Row,
						{ style: { margin: '0', height: '60px' } },
						React.createElement(
							Form.Item,
							null,
							getFieldDecorator('password', {
								rules: [{ required: true, message: 'Please enter a password' }]
							})(React.createElement(Input.Password, {
								id: 'pass',
								'class': 'formInput',
								type: 'password',
								name: 'password',
								style: styles.input,
								placeholder: 'Password',
								size: 'large'
							}))
						)
					),
					React.createElement(
						Row,
						{ style: { margin: '0', marginBottom: '40px', height: '60px' } },
						React.createElement(
							Form.Item,
							null,
							getFieldDecorator('password2', {
								rules: [{ required: true, message: 'Re-enter a password' }]
							})(React.createElement(Input.Password, {
								id: 'pass2',
								'class': 'formInput',
								type: 'password',
								name: 'password2',
								style: styles.input,
								placeholder: 'Re-enter Password',
								size: 'large'
							}))
						)
					),
					React.createElement(
						Row,
						{ style: { height: '40px' } },
						React.createElement(
							Col,
							{ span: 12 },
							React.createElement(
								Button,
								{ block: true, type: 'primary', onClick: this.props.toggleView, size: 'large', style: styles.cancelButton },
								'Cancel'
							)
						),
						React.createElement(
							Col,
							{ span: 12 },
							React.createElement(
								Form.Item,
								null,
								React.createElement(
									Button,
									{ block: true, type: 'primary', htmlType: 'submit', size: 'large', style: styles.signInButton },
									'Sign up'
								)
							)
						)
					)
				)
			);
		}
	}]);

	return SignupWindow;
}(React.Component);
"use strict";

var redirect = function redirect(response) {
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success, errorFunc) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr) {
            var messageObj = JSON.parse(xhr.responseText);
            errorFunc(messageObj.error);
        }
    });
};
