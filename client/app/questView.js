
const QuestListItem = (props) => {
    // Render Vars and Functions
    const removeQuest = () => {
        sendAjax('GET', '/removeQuest', `name=${props.name}&_csrf=${props.csrf}`, function() {
            loadQuestsFromServer();
        });
    };   

    const editQuest = (e) => {
        e.preventDefault();
    
        $("#questMessage").animate({width:'hide'}, 350);
        const csrf = props.csrf;
        const oldVals = `name=${props.name}&_csrf=${csrf}`;
        const newVals = `&newName=${$("#editQuestName").val()}&newObjective=${$("#editQuestObjective").val()}&newDescription=${$("#editQuestDescription").val()}`;
        const query = oldVals + newVals;
        console.log(query);
        if (!($("#editQuestName").val() == '' && $("#editQuestObjective").val() == '' && $("#editQuestDescription").val() == '')) {
            sendAjax('GET', '/updateQuest', query, function() {
                loadQuestsFromServer();
            });
        } else {
            handleError("No changes made");
            return false;
        }
        
        toggleEdit();
        return false;
    };    

    const toggleEdit = () => {
        props.toggleEdit(props.name);
        loadQuestsFromServer();
    };

    // Views
    const description = (props.description == "" || props.description == null)
        ? <div></div>
        : <h3 className="questDescription"> Description: {props.description} </h3>;

    const renderEditView = (
        <div className="quest">
            <div className="editDiv">
                <label htmlFor="name">Name: </label>
                <textarea id="editQuestName" type="text" name="name" placeholder={props.name} />
            </div>
            <div className="editDiv">
                <label htmlFor="objective">Objective: </label>
                <textarea id="editQuestObjective" type="text" name="objective" placeholder={props.objective} />
            </div>
            <div className="editDiv">
                <label htmlFor="description">Description: </label>
                <textarea id="editQuestDescription" type="text" name="description" placeholder={props.description} />
            </div>
            <div>
                <button key={props.id} className="editQuest" type="text" onClick={toggleEdit}> Cancel </button>
                <button className="editQuestSubmit" onClick={editQuest}> Save </button> 
            </div>
        </div>
    );

    return (
        props.isEditing
        ? renderEditView
        : (
            <div key={props.id} className="quest">
                <h3 className="questName"> Name: {props.name} </h3>
                <h3 className="questObjective"> Objective: {props.objective} </h3>
                {description}
                <input type="hidden" name="_csrf" value={props.csrf} />
                <button className="removeQuest" type="text" onClick={removeQuest}> Delete </button>
                <button className="editQuest" type="text" onClick={toggleEdit}> Edit </button>
            </div>
        )
    );
};

let questStates = {};
const QuestList = (props) => {
    if (props.quests.length === 0) {
        return (
            <div className="questList">
                <h3 className="emptyQuest">No Quests yet</h3>
            </div>
        );
    }

    // For toggling edit state (Could use React state here in the future)
    for (let i = 0; i < props.quests.length; i++) {
        if (!questStates[props.quests[i].name]) {
            questStates[props.quests[i].name] = false;
        }
    }
    
    const toggleEdit = (name) => {
        questStates[name] = !questStates[name];
        return questStates[name];
    };

    const questNodes = props.quests.map((quest) => {
        return (
            <QuestListItem
                csrf={props.csrf}
                id={quest._id}
                name={quest.name}
                objective={quest.objective}
                description={quest.description}
                isEditing={questStates[quest.name]}
                toggleEdit={toggleEdit}
            />
        );
    });

    return (
        <div className="questList">
            {questNodes}
        </div>
    );
};
