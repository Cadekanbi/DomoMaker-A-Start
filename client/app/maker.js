
const handleQuest = (e) => {
    e.preventDefault();

    $("#questMessage").animate({width:'hide'}, 350);

    if ($("#questName").val() == '' || $("#questObjective").val() == '') {
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#questForm").attr("action"), $("#questForm").serialize(), function() {
        loadQuestsFromServer();
    });

    return false;
};

const QuestForm = (props) => {
    return (
        <form id="questForm"
            onSubmit={handleQuest}
            name="questForm"
            action="/maker"
            method="POST"
            className="questForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="questName" type="text" name="name" placeholder="Quest Name" />
            
            <label htmlFor="objective">Objective: </label>
            <input id="questObjective" type="text" name="objective" placeholder="Quest Objective" />

            <label htmlFor="description">Description: </label>
            <input id="questDescription" type="text" name="description" placeholder="Quest Description" />

            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeQuestSubmit" type="submit" value="Make Quest" />
        </form>  
    );
};

const QuestListItem = (props) => {
    const description = (props.description == "" || props.description == null)
        ? <div></div>
        : <h3 className="questDescription"> Description: {props.description} </h3>;
    
    const removeQuest = () => {
        sendAjax('GET', '/removeQuest', `name=${props.name}&_csrf=${props.csrf}`, function() {
            loadQuestsFromServer();
        });
    };        

    return (
        <div key={props.id} className="quest">
            <h3 className="questName"> Name: {props.name} </h3>
            <h3 className="questObjective"> Objective: {props.objective} </h3>
            {description}
            <input type="hidden" name="_csrf" value={props.csrf} />
            <button key={props.id} className="removeQuest" type="text" onClick={removeQuest}> Delete </button>
        </div>
    );
};

const QuestList = (props) => {
    if (props.quests.length === 0) {
        return (
            <div className="questList">
                <h3 className="emptyQuest">No Quests yet</h3>
            </div>
        );
    }

    const questNodes = props.quests.map((quest) => {
        return (
            <QuestListItem
                id={quest._id}
                name={quest.name}
                objective={quest.objective}
                description={quest.description}
            />
        );
    });

    return (
        <div className="questList">
            {questNodes}
        </div>
    );
};

const loadQuestsFromServer = () => {
    sendAjax('GET', '/getQuests', null, (data) => {
        ReactDOM.render(
            <QuestList quests={data.quests} />, document.querySelector("#quests")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <QuestForm csrf={csrf} />, document.querySelector("#makeQuest")
    );
    
    ReactDOM.render(
        <QuestList csrf={csrf} quests={[]} />, document.querySelector("#quests")
    );

    loadQuestsFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});
