
// Imports
const Layout = antd.Layout;
const Menu = antd.Menu
const { Sider, Header, Content } = Layout;
const { SubMenu } = Menu;
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

const setup = (csrf) => {
    const RunApp = Form.create()(App);
    ReactDOM.render(
        <RunApp csrf={csrf} />, 
        document.querySelector("#content")
    );
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(() => {
    getToken();
});
