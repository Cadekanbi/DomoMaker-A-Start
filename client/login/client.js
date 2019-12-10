// Imports
const Alert = antd.Alert;
const Form = antd.Form;
const Input = antd.Input;
const { TextArea } = Input;
const Button = antd.Button;
const Checkbox = antd.Checkbox;
const Tag = antd.Tag;
const Icon = antd.Icon;
const Row = antd.Row;
const Col = antd.Col;

// Windows
const createLoginWindow = (csrf) => {
  const Login = Form.create()(LoginWindow);
  ReactDOM.render(
    <Login csrf={csrf} toggleView={createSignupWindow} />,
    document.querySelector("#content")
  );
};

const createSignupWindow = (csrf) => {
  const Signup = Form.create()(SignupWindow);
  ReactDOM.render(
    <Signup csrf={csrf} toggleView={createLoginWindow} />,
    document.querySelector("#content")
  );
};

// Initialization
const setup = (csrf) => {
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
