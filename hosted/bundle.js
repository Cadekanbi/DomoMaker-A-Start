"use strict";

var handleQuest = function handleQuest(e) {
    e.preventDefault();

    $("#questMessage").animate({ width: 'hide' }, 350);

    if ($("#questName").val() == '' || $("#questObjective").val() == '') {
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#questForm").attr("action"), $("#questForm").serialize(), function () {
        loadQuestsFromServer();
    });

    return false;
};

var QuestForm = function QuestForm(props) {
    return React.createElement(
        "form",
        { id: "questForm",
            onSubmit: handleQuest,
            name: "questForm",
            action: "/maker",
            method: "POST",
            className: "questForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "questName", type: "text", name: "name", placeholder: "Quest Name" }),
        React.createElement(
            "label",
            { htmlFor: "objective" },
            "Objective: "
        ),
        React.createElement("input", { id: "questObjective", type: "text", name: "objective", placeholder: "Quest Objective" }),
        React.createElement(
            "label",
            { htmlFor: "description" },
            "Description: "
        ),
        React.createElement("input", { id: "questDescription", type: "text", name: "description", placeholder: "Quest Description" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeQuestSubmit", type: "submit", value: "Make Quest" })
    );
};

var QuestListItem = function QuestListItem(props) {
    var description = props.description == "" || props.description == null ? React.createElement("div", null) : React.createElement(
        "h3",
        { className: "questDescription" },
        " Description: ",
        props.description,
        " "
    );

    var removeQuest = function removeQuest() {
        sendAjax('GET', '/removeQuest', "name=" + props.name + "&_csrf=" + props.csrf, function () {
            loadQuestsFromServer();
        });
    };

    return React.createElement(
        "div",
        { key: props.id, className: "quest" },
        React.createElement(
            "h3",
            { className: "questName" },
            " Name: ",
            props.name,
            " "
        ),
        React.createElement(
            "h3",
            { className: "questObjective" },
            " Objective: ",
            props.objective,
            " "
        ),
        description,
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement(
            "button",
            { key: props.id, className: "removeQuest", type: "text", onClick: removeQuest },
            " Delete "
        )
    );
};

var QuestList = function QuestList(props) {
    if (props.quests.length === 0) {
        return React.createElement(
            "div",
            { className: "questList" },
            React.createElement(
                "h3",
                { className: "emptyQuest" },
                "No Quests yet"
            )
        );
    }

    var questNodes = props.quests.map(function (quest) {
        return React.createElement(QuestListItem, {
            id: quest._id,
            name: quest.name,
            objective: quest.objective,
            description: quest.description
        });
    });

    return React.createElement(
        "div",
        { className: "questList" },
        questNodes
    );
};

var loadQuestsFromServer = function loadQuestsFromServer() {
    sendAjax('GET', '/getQuests', null, function (data) {
        ReactDOM.render(React.createElement(QuestList, { quests: data.quests }), document.querySelector("#quests"));
    });
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(QuestForm, { csrf: csrf }), document.querySelector("#makeQuest"));

    ReactDOM.render(React.createElement(QuestList, { csrf: csrf, quests: [] }), document.querySelector("#quests"));

    loadQuestsFromServer();
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#questMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#questMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
