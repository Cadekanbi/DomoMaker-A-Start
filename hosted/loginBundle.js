"use strict";

// Imports
var Form = antd.Form;
var Input = antd.Input;
var TextArea = Input.TextArea;

var Button = antd.Button;
var Tag = antd.Tag;
var Icon = antd.Icon;

// Windows
var createLoginWindow = function createLoginWindow(csrf) {
  var Login = Form.create()(LoginWindow);
  ReactDOM.render(React.createElement(Login, { csrf: csrf }), document.querySelector("#content"));
};

var createSignupWindow = function createSignupWindow(csrf) {
  var Signup = Form.create()(SignupWindow);
  ReactDOM.render(React.createElement(Signup, { csrf: csrf }), document.querySelector("#content"));
};

// Initialization
var setup = function setup(csrf) {
  var loginButton = document.querySelector("#loginButton");
  var signupButton = document.querySelector("#signupButton");

  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });

  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });

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

/** Required Props
 * csrf (String || Number)
 */

// !!! Not yet implemented !!!

var AccountWindow = function (_React$Component) {
    _inherits(AccountWindow, _React$Component);

    function AccountWindow(props) {
        _classCallCheck(this, AccountWindow);

        var _this = _possibleConstructorReturn(this, (AccountWindow.__proto__ || Object.getPrototypeOf(AccountWindow)).call(this, props));

        _this.state = {
            oldPass: '',
            oldPassVis: false,
            newPass1: '',
            newPass1Vis: false,
            newPass2: '',
            newPass2Vis: false
        };

        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(AccountWindow, [{
        key: 'handleChange',
        value: function handleChange(e) {
            var target = e.target;
            var name = target.name;

            this.setState(_defineProperty({}, name, target.value));
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            $("#questMessage").animate({ width: 'hide' }, 350);

            if ($("#oldPass").val() == '' || $("#pass1").val() == '' || $("#pass2").val() == '') {
                handleError("Please fill out all fields");
                return false;
            }

            sendAjax('POST', $("#passChangeForm").attr("action"), $("passChangeForm").serialize());
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            // Set visibility
            var oldPassVis = this.state.oldPassVis ? 'text' : 'password';
            var newPass1Vis = this.state.newPass1Vis ? 'text' : 'password';
            var newPass2Vis = this.state.newPass2Vis ? 'text' : 'password';

            return React.createElement(
                'form',
                {
                    id: 'passChangeForm',
                    name: 'passChangeForm',
                    onSubmit: this.handleSubmit,
                    onChange: this.handleChange,
                    action: '/changePass',
                    method: 'POST',
                    className: 'mainForm'
                },
                React.createElement('input', { id: 'oldPass', type: oldPassVis, name: 'oldPass', placeholder: 'Old Password' }),
                React.createElement('input', { id: 'pass1', type: newPass1Vis, name: 'pass1', placeholder: 'New Password' }),
                React.createElement('input', { id: 'pass2', type: newPass2Vis, name: 'pass2', placeholder: 'Re-Enter New Password' }),
                React.createElement('input', { type: 'hidden', name: '_csrf', value: this.props.csrf }),
                React.createElement('input', { className: 'formSubmit', type: 'submit', value: 'Sign in' })
            );
        }
    }]);

    return AccountWindow;
}(React.Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Required Props
 * csrf (String || Number)
 */

var LoginWindow = function (_React$Component) {
    _inherits(LoginWindow, _React$Component);

    function LoginWindow(props) {
        _classCallCheck(this, LoginWindow);

        var _this = _possibleConstructorReturn(this, (LoginWindow.__proto__ || Object.getPrototypeOf(LoginWindow)).call(this, props));

        _this.state = {
            username: '',
            password: ''
        };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(LoginWindow, [{
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

            if (this.state.username == '' || this.state.password == '') {
                return false;
            }

            var content = 'username=' + this.state.username + '&password=' + this.state.password + '&_csrf=' + this.props.csrf;
            sendAjax('POST', '/login', content, redirect);
        }
    }, {
        key: 'render',
        value: function render() {
            var getFieldDecorator = this.props.form.getFieldDecorator;

            return React.createElement(
                Form,
                {
                    id: 'loginForm',
                    name: 'loginForm',
                    className: 'mainForm',
                    onSubmit: this.handleSubmit,
                    onChange: this.handleChange
                },
                React.createElement(
                    Form.Item,
                    null,
                    getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please enter a username' }]
                    })(React.createElement(Input, {
                        id: 'user',
                        type: 'text',
                        name: 'username',
                        placeholder: 'Username',
                        size: 'large'
                    }))
                ),
                React.createElement(
                    Form.Item,
                    null,
                    getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please enter a password' }]
                    })(React.createElement(Input, {
                        id: 'pass',
                        type: 'password',
                        name: 'password',
                        placeholder: 'Password',
                        size: 'large'
                    }))
                ),
                React.createElement(
                    Form.Item,
                    null,
                    React.createElement(
                        Button,
                        { type: 'primary', htmlType: 'submit', className: 'formSubmit' },
                        'Sign in'
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

/** Required Props
 * csrf (String || Number)
 */

var SignupWindow = function (_React$Component) {
    _inherits(SignupWindow, _React$Component);

    function SignupWindow(props) {
        _classCallCheck(this, SignupWindow);

        var _this = _possibleConstructorReturn(this, (SignupWindow.__proto__ || Object.getPrototypeOf(SignupWindow)).call(this, props));

        _this.state = {
            username: '',
            password: '',
            password2: ''
        };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
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
                handleError("Passwords do not match");
                return false;
            }

            var content = 'username=' + this.state.username + '&password=' + this.state.password + '&password2=' + this.state.password2 + '&_csrf=' + this.props.csrf;
            sendAjax('POST', '/signup', content, redirect);
        }
    }, {
        key: 'render',
        value: function render() {
            var getFieldDecorator = this.props.form.getFieldDecorator;

            return React.createElement(
                Form,
                {
                    id: 'signupForm',
                    name: 'signupForm',
                    className: 'mainForm',
                    onSubmit: this.handleSubmit,
                    onChange: this.handleChange
                },
                React.createElement(
                    Form.Item,
                    null,
                    getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please enter a username' }]
                    })(React.createElement(Input, {
                        id: 'user',
                        type: 'text',
                        name: 'username',
                        placeholder: 'Username',
                        size: 'large'
                    }))
                ),
                React.createElement(
                    Form.Item,
                    null,
                    getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please enter a password' }]
                    })(React.createElement(Input, {
                        id: 'pass',
                        type: 'password',
                        name: 'password',
                        placeholder: 'Password',
                        size: 'large'
                    }))
                ),
                React.createElement(
                    Form.Item,
                    null,
                    getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please re-enter your password' }]
                    })(React.createElement(Input, {
                        id: 'pass2',
                        type: 'password',
                        name: 'password2',
                        placeholder: 'Re-Enter Password',
                        size: 'large'
                    }))
                ),
                React.createElement(
                    Form.Item,
                    null,
                    React.createElement(
                        Button,
                        { type: 'primary', htmlType: 'submit', className: 'formSubmit' },
                        'Sign up'
                    )
                )
            );
        }
    }]);

    return SignupWindow;
}(React.Component);
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#questMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#questMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
