
// Custom Styling
const styles = reactStyles();

/** Required Props
 * csrf (String || Number)
 * name (String)
 * objective (String)
 * tags (String[])
 * description (String)
 * refreshView (Function)
 */

class QuestListItem extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            tagInputVis: false,
            isEditing: false,
            isDeleting: false,
            newName: '',
            newObjective: '',
            newDescription: '',
            tagInput: '',
            newTags: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.editQuest = this.editQuest.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this),
        this.removeQuest = this.removeQuest.bind(this);
        this.confirmChanges = this.confirmChanges.bind(this);
        // Tag Specific bindings
        this.handleTagInputConfirm = this.handleTagInputConfirm.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showInput = this.showInput.bind(this);
        this.forMap = this.forMap.bind(this);
    }

    showInput() {
        this.setState({
            tagInputVis: true,
        }, () => this.input.focus());
    }

    handleClose(removedTag) {
        const newTags = this.state.newTags.filter(tag => tag !== removedTag);
        this.setState({
            newTags,
        });
    }

    handleTagInputConfirm() {
        const { tagInput } = this.state;
        let { newTags } = this.state;

        if (tagInput && newTags.indexOf(tagInput) == -1) {
            newTags = [...newTags, tagInput];
        }

        this.setState({
            tagInputVis: false,
            tagInput: '',
            newTags,
        });
    }

    forMap (tag) {
        const tagElem = (
            <Tag
                color="#2db7f5"
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

    // Toggle isEditing state value. If (isEditing == true) set state values to prop values
    toggleEdit() {
        if (this.state.isEditing) {
            this.setState({
                newName: this.props.name,
                newTags: this.props.tags,
                newObjective: this.props.objective,
                newDescription: this.props.description,
            });
        } else {
            $(`#editQuestName${this.props.name}`).val(this.props.name);
            console.log(`#editQuestName${this.props.name}` + this.props.name);
        }

        this.setState({
            isEditing: !this.state.isEditing,
        });
    }

    // Toggle isEditing state value and send call to server to edit the quest
    confirmChanges (e) {
        e.preventDefault();

        this.setState({
            isEditing: false,
        })
    }

    editQuest() {
        const { name, objective, description, tags, csrf } = this.props;
        const { newName, newObjective, newDescription, newTags} = this.state;

        // Array comparison
        const arraysMatch = (arr1, arr2) => {
            if (arr1.length != arr2.length) return false;

            for (let i = 0; i < arr1.lengtht; i++) {
                if (arr1[i] != arr2[i]) return false; 
            }
            return true;
        };

        // If nothing changed, exit function
        if (name == newName && objective == newObjective && description == newDescription && arraysMatch(tags, newTags)) {
            return false;
        }

        // Set up query
        const nameParam = `name=${name}`;
        const csrfParam = `&_csrf=${csrf}`;
        const newVals = `&newName=${newName}&newObjective=${newObjective}&newDescription=${newDescription}`;
        const query = nameParam + newVals + csrfParam;

        // Ajax get request
        sendAjax('GET', '/updateQuest', query, () => {
            this.props.refreshView();
        });

        return false;
    }

    toggleDelete() {
        this.setState({
            isDeleting: !this.state.isDeleting,
        });
    }

    removeQuest(e) {
        e.preventDefault();

        if (this.state.isDeleting) {
            sendAjax('GET', '/removeQuest', `name=${this.props.name}&_csrf=${this.props.csrf}`, () => {
                this.props.refreshView();
            });
        }
    }

    render() {
        const { newTags, tagInputVis } = this.state;
        const tagChildren = this.props.tags.map(this.forMap);
        const saveInputRef = input => (this.input = input);

        // generate unique ids
        const editQuestName = "editQuestName" + this.props.name;

        const displayView = (
            <div className="quest">
                <Row>
                    <h3 className="questName">{this.props.name}</h3>
                    <h3 className="questObjective">{this.props.objective}</h3>
                    <div style={{ marginLeft: '14px' }}>
                        {tagChildren}
                    </div>
                    
                    <h3 className="questDescription">{this.props.description}</h3>
                </Row>
                <Row>
                    {(this.state.isDeleting) 
                        ? (
                            <div>
                                <Button type="primary" size="large" onClick={this.toggleDelete} style={styles.cancelButton}>
                                    Cancel
                                </Button>
                                <Button type="primary" size="large" onClick={this.removeQuest} style={styles.cancelButton}>
                                    Confirm
                                </Button> 
                            </div>  
                        )
                        : (
                            <Button type="primary" size="large" onClick={this.toggleDelete} style={styles.cancelButton}>
                                Delete
                            </Button>
                        )
                    }
                    <Button type="primary" size="large" onClick={this.toggleEdit}>Edit</Button>
                </Row>
            </div>
        );

        const editView = (
            <div className="quest">
                <Row>   
                    <Row style={styles.inputRow}>              
                        <TextArea 
                            id="inputQuestName" 
                            name="name" 
                            rows={1}
                            style={styles.textArea}
                            placeholder="Enter a quest name here" 
                        />
                    </Row>
                    <Row style={styles.inputRow}>
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
                    <Row>
                        <TextArea 
                            id="inputQuestObjective" 
                            name="objective" 
                            rows={1}
                            style={styles.textArea}
                            placeholder="Enter objective here" 
                        />
                    </Row>
                    <Row style={{margin: '0', marginBottom: '10px'}}>
                        <TextArea 
                            id="inputQuestDescription" 
                            name="description" 
                            rows={4}
                            style={styles.textArea}
                            placeholder="Enter description here (optional)" 
                        />
                    </Row>
                </Row>
                <div>
                    <Button style={styles.cancelButton} key={this.props._id} className="editQuest" type="text" onClick={this.toggleEdit}> Cancel </Button>
                    <Button style={styles.signInButton} className="editQuestSubmit" onClick={this.editQuest}> Save </Button> 
                </div>
            </div>
        );

        return (
            this.state.isEditing
                ? editView
                : displayView
        );
    }
}
