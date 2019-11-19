
const handleQuest = (e) => {
    e.preventDefault();

    $("#questMessage").animate({width:'hide'}, 350);

    if ($("#inputQuestName").val() == '' || $("#inputQuestObjective").val() == '') {
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#questForm").attr("action"), $("#questForm").serialize(), function() {
        loadQuestsFromServer();
        $("#inputQuestName").val('');
        $("#inputQuestObjective").val('');
        $("#inputQuestDescription").val('');
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
            <div>
                <label htmlFor="name">Name: </label>
                <textarea id="inputQuestName" type="text" name="name" placeholder="Quest Name" />
            </div>
            <div>
                <label htmlFor="objective">Objective: </label>
                <textarea id="inputQuestObjective" type="text" name="objective" placeholder="Quest Objective" />
            </div>
            <div>
                <label htmlFor="description">Description: </label>
                <textarea id="inputQuestDescription" type="text" name="description" placeholder="Quest Description" />
            </div>
            <div>
                <input type="hidden" name="_csrf" value={props.csrf} />
                <input className="makeQuestSubmit" type="submit" value="Make Quest" />
            </div>
        </form>  
    );
};

let csrf = {};
const loadQuestsFromServer = () => {
    sendAjax('GET', '/getQuests', null, (data) => {
        ReactDOM.render(
            <QuestList csrf={csrf} quests={data.quests} />, document.querySelector("#quests")
        );
    });
};

const setup = (csrf) => {
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
        csrf = result.csrfToken;
    });
};

$(document).ready(() => {
    getToken();
});
