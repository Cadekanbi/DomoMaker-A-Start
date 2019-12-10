
// Custom Styling
const styles = reactStyles();

/** Required Props
 * csrf (String || Number)
 */

class App extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            collapsed: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle () {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const QuestView = Form.create()(QuestList);

        return (
            <Layout style={styles.appLayout}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div style={styles.logo} />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon theme="filled" type="compass" />
                            <span>Quest Maker</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon theme="filled" type="control" />
                            <span>Coming Soon</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#ccceff', padding: 0 }}>
                        <Icon
                            style={styles.menuIcon}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                        }}
                    >
                        <QuestView 
                            csrf={this.props.csrf}
                        />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
