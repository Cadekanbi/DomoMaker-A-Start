
/** Required Props
 * csrf (String || Number)
 */

class SignupWindow extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
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
        
        if (this.state.username == '' || this.state.password == '' || this.state.password2 == '') {
            handleError("Passwords do not match");
            return false;
        }
        
        let content = `username=${this.state.username}&password=${this.state.password}&password2=${this.state.password2}&_csrf=${this.props.csrf}`;
        sendAjax('POST', '/signup', content, redirect);
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form 
                id="signupForm" 
                name="signupForm"
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
                    { getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please re-enter your password' }],
                    }) (
                        <Input 
                            id="pass2" 
                            type="password" 
                            name="password2" 
                            placeholder="Re-Enter Password" 
                            size="large"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="formSubmit"> 
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
