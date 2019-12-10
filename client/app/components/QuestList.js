
// Custom Styling
const styles = reactStyles();

/** Required Props
 * csrf (String || Number)
 */

class QuestList extends React.Component {

    constructor (props) {
        super(props);
        this.state = { 
            tagInputVis: false,
            newQuest: false, 
            name: '',
            objective: '',
            description: '',
            tagInput: '',
            tags: [],
            quests: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getQuests = this.getQuests.bind(this);
        this.toggleNewQuest = this.toggleNewQuest.bind(this);
        // Tag Specific bindings
        this.handleTagInputConfirm = this.handleTagInputConfirm.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showInput = this.showInput.bind(this);
        this.forMap = this.forMap.bind(this);

        this.getQuests();
    }
    
    getQuests() {
        sendAjax('GET', '/getQuests', null, (data) => {
            this.setState({
                quests: data.quests,
            });
        });
    }

    toggleNewQuest() {
        this.setState({
            newQuest: !this.state.newQuest,
        });
    }

    showInput() {
        this.setState({
            tagInputVis: true,
        }, () => this.input.focus());
    }

    handleClose(removedTag) {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({
            tags,
        });
    }

    handleTagInputConfirm() {
        const { tagInput } = this.state;
        let { tags } = this.state;

        if (tagInput && tags.indexOf(tagInput) == -1) {
            tags = [...tags, tagInput];
        }

        console.log(this.state.tags);
        this.setState({
            tagInputVis: false,
            tagInput: '',
            tags,
        });
    }

    forMap (tag) {
        const tagElem = (
            <Tag
                closable
                onClose={e => {
                    e.preventDefault();
                    this.handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        )
    }

    handleChange (e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: e.target.value
        });
    }

    handleSubmit (e) {
        e.preventDefault();
        console.log('here');
        const { name, objective, description, tags } = this.state;

        if (this.state.name == '' || this.state.objective == '') {
            return false;
        }

        let content = `_csrf=${this.props.csrf}&name=${name}&objective=${objective}` +
            (description != '' ? `&description=${description}` : '') +
            (tags.length != 0 ? `&tags=${tags.toString()}` : '');
            
        sendAjax('POST', "/app", content, () => {
            // error check call props error func
            this.toggleNewQuest();
            this.getQuests();
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { tags, tagInputVis } = this.state;
        const tagChildren = tags.map(this.forMap);
        const saveInputRef = input => (this.input = input);

        const questNodes = this.state.quests.map((quest) => {
            console.log(quest);
            let questTags = quest.tags ? quest.tags.split(',') : [];
            if (questTags.length == 1 && questTags[0] == '') {
                questTags = [];
            }

            return (
                <Row>
                    <QuestListItem
                        csrf={this.props.csrf}
                        id={quest._id}
                        name={quest.name}
                        objective={quest.objective}
                        tags={questTags}
                        description={quest.description}
                        refreshView={this.getQuests}
                        style={styles.questItem}
                    />
                </Row>
            );
        });
    
        return (
            <div className="questView">
                <Row>
                    <Button type="primary" size="large" onClick={this.getQuests} style={styles.button}>
                        Refresh
                    </Button>
                </Row>
                <Row>
                    <Col span={20} offset={2}>
                        {(!this.state.newQuest)
                            ? <Button onClick={this.toggleNewQuest} style={styles.addQuestButton}><Icon type="plus"/></Button>
                            : (
                                <div style={styles.addQuestView}>
                                    <Icon onClick={this.toggleNewQuest} style={styles.close} type="close"/>
                                    <Form 
                                        id="questForm"
                                        name="questForm"
                                        onSubmit={this.handleSubmit}
                                        onChange={this.handleChange}
                                    >
                                        <Row style={styles.inputRow}>
                                            <Form.Item>
                                                { getFieldDecorator('name', {
                                                    rules: [{ required: true, message: 'Please enter a quest name' }],
                                                }) (
                                                    <TextArea 
                                                        id="inputQuestName" 
                                                        name="name" 
                                                        rows={1}
                                                        style={styles.textArea}
                                                        placeholder="Enter a quest name here" 
                                                    />
                                                )}
                                            </Form.Item>
                                        </Row>
                                        <Row>
                                            <div>                                
                                                {tagChildren}
                                                {tagInputVis && (
                                                    <Input
                                                        ref={saveInputRef}
                                                        name="tagInput"
                                                        type="text"
                                                        size="small"
                                                        style={{ width: 78 }}
                                                        onChange={this.handleChange}
                                                        onBlur={this.handleTagInputConfirm}
                                                        onPressEnter={this.handleTagInputConfirm}
                                                    />
                                                )}
                                                {!tagInputVis && (
                                                    <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                                                        <Icon type="plus" /> New Tag
                                                    </Tag>
                                                )}
                                            </div>
                                        </Row>
                                        <Row style={{ marginBottom: '-20px' }}>
                                            <Form.Item>
                                                { getFieldDecorator('objective', {
                                                    rules: [{ required: true, message: 'Please enter an objective' }],
                                                }) (
                                                    <TextArea 
                                                        id="inputQuestObjective" 
                                                        name="objective" 
                                                        rows={1}
                                                        style={styles.textArea}
                                                        placeholder="Enter objective here" 
                                                    />
                                                )}
                                            </Form.Item>
                                        </Row>
                                        <Row style={{margin: '0', marginBottom: '10px'}}>
                                            <Form.Item>
                                                { getFieldDecorator('description', {
                                                    rules: [{ required: true, message: 'Re-enter a password' }],
                                                }) (
                                                    <TextArea 
                                                        id="inputQuestDescription" 
                                                        name="description" 
                                                        rows={4}
                                                        style={styles.textArea}
                                                        placeholder="Enter description here (optional)" 
                                                    />
                                                )}
                                            </Form.Item>
                                        </Row>
                                        <Row>
                                            <Form.Item>
                                                <Button block type="primary" htmlType="submit" size="large" style={styles.signInButton}> 
                                                    <Icon type="edit" style={{marginTop: '11px', height: '35px', width: '35px'}}/>Create
                                                </Button>
                                            </Form.Item>
                                        </Row>
				                    </Form>
                                </div>
                            )
                        }
                        <div className="questList">
                            {questNodes}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
