"use strict";

var handleQuest = function handleQuest(e) {
    e.preventDefault();

    $("#questMessage").animate({ width: 'hide' }, 350);

    if ($("#inputQuestName").val() == '' || $("#inputQuestObjective").val() == '') {
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#questForm").attr("action"), $("#questForm").serialize(), function () {
        loadQuestsFromServer();
        $("#inputQuestName").val('');
        $("#inputQuestObjective").val('');
        $("#inputQuestDescription").val('');
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
            "div",
            null,
            React.createElement(
                "label",
                { htmlFor: "name" },
                "Name: "
            ),
            React.createElement("textarea", { id: "inputQuestName", type: "text", name: "name", placeholder: "Quest Name" })
        ),
        React.createElement(
            "div",
            null,
            React.createElement(
                "label",
                { htmlFor: "objective" },
                "Objective: "
            ),
            React.createElement("textarea", { id: "inputQuestObjective", type: "text", name: "objective", placeholder: "Quest Objective" })
        ),
        React.createElement(
            "div",
            null,
            React.createElement(
                "label",
                { htmlFor: "description" },
                "Description: "
            ),
            React.createElement("textarea", { id: "inputQuestDescription", type: "text", name: "description", placeholder: "Quest Description" })
        ),
        React.createElement(
            "div",
            null,
            React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
            React.createElement("input", { className: "makeQuestSubmit", type: "submit", value: "Make Quest" })
        )
    );
};

var csrf = {};
var loadQuestsFromServer = function loadQuestsFromServer() {
    sendAjax('GET', '/getQuests', null, function (data) {
        ReactDOM.render(React.createElement(QuestList, { csrf: csrf, quests: data.quests }), document.querySelector("#quests"));
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
        csrf = result.csrfToken;
    });
};

$(document).ready(function () {
    getToken();
});
'use strict';

var QuestListItem = function QuestListItem(props) {
    // Render Vars and Functions
    var removeQuest = function removeQuest() {
        sendAjax('GET', '/removeQuest', 'name=' + props.name + '&_csrf=' + props.csrf, function () {
            loadQuestsFromServer();
        });
    };

    var editQuest = function editQuest(e) {
        e.preventDefault();

        $("#questMessage").animate({ width: 'hide' }, 350);
        var csrf = props.csrf;
        var oldVals = 'name=' + props.name + '&_csrf=' + csrf;
        var newVals = '&newName=' + $("#editQuestName").val() + '&newObjective=' + $("#editQuestObjective").val() + '&newDescription=' + $("#editQuestDescription").val();
        var query = oldVals + newVals;
        console.log(query);
        if (!($("#editQuestName").val() == '' && $("#editQuestObjective").val() == '' && $("#editQuestDescription").val() == '')) {
            sendAjax('GET', '/updateQuest', query, function () {
                loadQuestsFromServer();
            });
        } else {
            handleError("No changes made");
            return false;
        }

        toggleEdit();
        return false;
    };

    var toggleEdit = function toggleEdit() {
        props.toggleEdit(props.name);
        loadQuestsFromServer();
    };

    // Views
    var description = props.description == "" || props.description == null ? React.createElement('div', null) : React.createElement(
        'h3',
        { className: 'questDescription' },
        ' Description: ',
        props.description,
        ' '
    );

    var renderEditView = React.createElement(
        'div',
        { className: 'quest' },
        React.createElement(
            'div',
            { className: 'editDiv' },
            React.createElement(
                'label',
                { htmlFor: 'name' },
                'Name: '
            ),
            React.createElement('textarea', { id: 'editQuestName', type: 'text', name: 'name', placeholder: props.name })
        ),
        React.createElement(
            'div',
            { className: 'editDiv' },
            React.createElement(
                'label',
                { htmlFor: 'objective' },
                'Objective: '
            ),
            React.createElement('textarea', { id: 'editQuestObjective', type: 'text', name: 'objective', placeholder: props.objective })
        ),
        React.createElement(
            'div',
            { className: 'editDiv' },
            React.createElement(
                'label',
                { htmlFor: 'description' },
                'Description: '
            ),
            React.createElement('textarea', { id: 'editQuestDescription', type: 'text', name: 'description', placeholder: props.description })
        ),
        React.createElement(
            'div',
            null,
            React.createElement(
                'button',
                { key: props.id, className: 'editQuest', type: 'text', onClick: toggleEdit },
                ' Cancel '
            ),
            React.createElement(
                'button',
                { className: 'editQuestSubmit', onClick: editQuest },
                ' Save '
            )
        )
    );

    return props.isEditing ? renderEditView : React.createElement(
        'div',
        { key: props.id, className: 'quest' },
        React.createElement(
            'h3',
            { className: 'questName' },
            ' Name: ',
            props.name,
            ' '
        ),
        React.createElement(
            'h3',
            { className: 'questObjective' },
            ' Objective: ',
            props.objective,
            ' '
        ),
        description,
        React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
        React.createElement(
            'button',
            { className: 'removeQuest', type: 'text', onClick: removeQuest },
            ' Delete '
        ),
        React.createElement(
            'button',
            { className: 'editQuest', type: 'text', onClick: toggleEdit },
            ' Edit '
        )
    );
};

var questStates = {};
var QuestList = function QuestList(props) {
    if (props.quests.length === 0) {
        return React.createElement(
            'div',
            { className: 'questList' },
            React.createElement(
                'h3',
                { className: 'emptyQuest' },
                'No Quests yet'
            )
        );
    }

    // For toggling edit state (Could use React state here in the future)
    for (var i = 0; i < props.quests.length; i++) {
        if (!questStates[props.quests[i].name]) {
            questStates[props.quests[i].name] = false;
        }
    }

    var toggleEdit = function toggleEdit(name) {
        questStates[name] = !questStates[name];
        return questStates[name];
    };

    var questNodes = props.quests.map(function (quest) {
        return React.createElement(QuestListItem, {
            csrf: props.csrf,
            id: quest._id,
            name: quest.name,
            objective: quest.objective,
            description: quest.description,
            isEditing: questStates[quest.name],
            toggleEdit: toggleEdit
        });
    });

    return React.createElement(
        'div',
        { className: 'questList' },
        questNodes
    );
};
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
