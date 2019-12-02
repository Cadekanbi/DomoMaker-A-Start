
/** Required Props
 * csrf (String || Number)
 */

class LoginWindow extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: e.target.value
        });
    };

    handleSubmit (e) {
        e.preventDefault();

        if (this.state.username == '' || this.state.password == '') {
          return false;
        }      

        let content = `username=${this.state.username}&password=${this.state.password}&_csrf=${this.props.csrf}`;
        sendAjax('POST', '/login', content, redirect);
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form 
                id="loginForm" 
                name="loginForm"
                className="mainForm"
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
            >
                <Form.Item>
                    { getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please enter a username' }],
                    }) (
                        <Input 
                            id="user" 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            size="large"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    { getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please enter a password' }],
                    }) (
                        <Input 
                            id="pass" 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            size="large"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="formSubmit"> 
                        Sign in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
