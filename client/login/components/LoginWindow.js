
// Custom Styling
const styles = reactStyles();

/** Props
 * csrf (String || Number)
 * toggleView (Function)
 */

class LoginWindow extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
			error: false,
            username: '',
			password: '',
			rememberUser: false,
			width: styles.getDesiredFormWidth(),
		};

		$(window).resize(() => {
			this.setState({
				width: styles.getDesiredFormWidth(),
			});
		});

        this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleCheckbox = this.toggleCheckbox.bind(this);
		this.onClose = this.onClose.bind(this);
		this.changeView = this.changeView.bind(this);
    }

	changeView () {
		this.props.toggleView(this.props.csrf);
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
        sendAjax('POST', '/login', content, redirect, () => {
			this.setState({
				error: true,
			});
		});
	};
	
	toggleCheckbox (e) {
		this.setState({
			rememberUser: e.target.checked
		});
	}

	onClose() {
		this.setState({
			error: false,
		});
	}

    render() {
		const { getFieldDecorator } = this.props.form;
		styles.form.width = this.state.width;
		
		if (styles.form.width == '100%') {
			styles.form.maxWidth = '100%';
			styles.form.height = '100%';
		} else {
			styles.form.maxWidth = '400px';
			styles.form.height = 'auto';
		}
 		
        return (
			<div style={styles.form}>
				<h1 style={styles.loginHeader}>Login</h1>
				<p style={styles.loginText}>Enter your credentials</p>
				{!this.state.error ? <span></span> : 
					<Alert
						message="Your username or password are incorrect. Please try again."
						type="error"
						closable
						showIcon
						style={styles.error}
						afterClose={this.onClose}
					/>
				}
				<Form 
					id="loginForm" 
					name="loginForm"
					onSubmit={this.handleSubmit}
					onChange={this.handleChange}
				>
					<Row style={{margin: '0', marginTop: '0px', height: '60px'}}>
						<Form.Item>
							{ getFieldDecorator('username', {
								rules: [{ required: true, message: 'Please enter a username' }],
							}) (
								<Input 
									id="user" 
									class="formInput"
									type="text" 
									name="username" 
									style={styles.input}
									placeholder="Username" 
									size="large"
								/>
							)}
						</Form.Item>
					</Row>
					<Row style={{margin: '0', height: '60px'}}>
						<Form.Item>
							{ getFieldDecorator('password', {
								rules: [{ required: true, message: 'Please enter a password' }],
							}) (
								<Input.Password
									id="pass" 
									class="formInput"
									type="password" 
									name="password"
									style={styles.input}
									placeholder="Password" 
									size="large"
								/>
							)}
						</Form.Item>
					</Row>
					<Row>
						<p style={{fontSize: '.8em', float: 'right', marginRight: '5px'}}><a id="resetPassword">Forgot Password</a></p>
					</Row>
					<Row style={{marginTop: '20px'}}>
						<Checkbox style={{fontSize: '.9em'}} onChange={this.toggleCheckbox}>
							Remember me
						</Checkbox>
					</Row>
					<Row style={{height: '50px', marginTop: '10px'}}>
						<Form.Item>
							<Button block type="primary" htmlType="submit" size="large" style={styles.signInButton}> 
								Sign in
							</Button>
						</Form.Item>
					</Row>
					<Row style={{fontSize: '.8em', float: 'right', marginTop: '0px', marginBottom: '-10px'}}>
						<p>Don't have an account? <a id="signupLink" onClick={this.changeView}>Sign up.</a></p>
					</Row>
				</Form>
			</div>
        );
    }
}
