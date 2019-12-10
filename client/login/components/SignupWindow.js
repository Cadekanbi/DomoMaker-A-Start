
// Custom Styling
const styles = reactStyles();

/** Props
 * csrf (String || Number)
 * toggleView (Function)
 */

class SignupWindow extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            error: false,
            message: '',
            username: '',
            password: '',
            password2: '',
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
        
        let content = `username=${this.state.username}&password=${this.state.password}&_csrf=${this.props.csrf}`;
		sendAjax('POST', '/signup', content, redirect);
	
	};
	
	toggleCheckbox (e) {
		this.setState({
			rememberUser: e.target.checked
		});
	}

	onClose () {
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
				<h1 style={styles.loginHeader}>Sign Up</h1>
                <p style={styles.loginText}>Lets get started</p>
				{!this.state.error ? <span></span> : 
					<Alert
						message={this.state.message}
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
					<Row style={{margin: '0', marginTop: '15px', height: '60px'}}>
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
                    <Row style={{margin: '0', marginBottom: '40px', height: '60px'}}>
						<Form.Item>
							{ getFieldDecorator('password2', {
								rules: [{ required: true, message: 'Re-enter a password' }],
							}) (
								<Input.Password
									id="pass2" 
									class="formInput"
									type="password" 
									name="password2"
									style={styles.input}
									placeholder="Re-enter Password" 
									size="large"
								/>
							)}
						</Form.Item>
					</Row>
                    <Row style={{height: '40px'}}>
                        <Col span={12}>
                            <Button block type="primary" onClick={this.props.toggleView} size="large" style={styles.cancelButton}> 
								Cancel
							</Button>
                        </Col>
                        <Col span={12}>
                            <Form.Item>
                                <Button block type="primary" htmlType="submit" size="large" style={styles.signInButton}> 
                                    Sign up
                                </Button>
                            </Form.Item>
                        </Col>
					</Row>
				</Form>
			</div>
        );
    }
}
