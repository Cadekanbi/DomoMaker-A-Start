// Imports
const Form = antd.Form;
const Input = antd.Input;
const { TextArea } = Input;
const Button = antd.Button;
const Tag = antd.Tag;
const Icon = antd.Icon;

// Windows
const createLoginWindow = (csrf) => {
  const Login = Form.create()(LoginWindow);
  ReactDOM.render(
    <Login csrf={csrf} />,
    document.querySelector("#content")
  );
};

const createSignupWindow = (csrf) => {
  const Signup = Form.create()(SignupWindow);
  ReactDOM.render(
    <Signup csrf={csrf} />,
    document.querySelector("#content")
  );
};

// Initialization
const setup = (csrf) => {
  const loginButton = document.querySelector("#loginButton");
  const signupButton = document.querySelector("#signupButton");

  signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });

  createLoginWindow(csrf); // default view
};

// CSRF Token
const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});
