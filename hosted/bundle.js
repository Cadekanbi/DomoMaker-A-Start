"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Custom Styling
var styles = reactStyles();

/** Required Props
 * csrf (String || Number)
 */

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            collapsed: false
        };

        _this.toggle = _this.toggle.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: "toggle",
        value: function toggle() {
            this.setState({
                collapsed: !this.state.collapsed
            });
        }
    }, {
        key: "render",
        value: function render() {
            var QuestView = Form.create()(QuestList);

            return React.createElement(
                Layout,
                { style: styles.appLayout },
                React.createElement(
                    Sider,
                    { trigger: null, collapsible: true, collapsed: this.state.collapsed },
                    React.createElement("div", { style: styles.logo }),
                    React.createElement(
                        Menu,
                        { theme: "dark", mode: "inline", defaultSelectedKeys: ['1'] },
                        React.createElement(
                            Menu.Item,
                            { key: "1" },
                            React.createElement(Icon, { theme: "filled", type: "compass" }),
                            React.createElement(
                                "span",
                                null,
                                "Quest Maker"
                            )
                        ),
                        React.createElement(
                            Menu.Item,
                            { key: "2" },
                            React.createElement(Icon, { theme: "filled", type: "control" }),
                            React.createElement(
                                "span",
                                null,
                                "Coming Soon"
                            )
                        )
                    )
                ),
                React.createElement(
                    Layout,
                    null,
                    React.createElement(
                        Header,
                        { style: { background: '#ccceff', padding: 0 } },
                        React.createElement(Icon, {
                            style: styles.menuIcon,
                            type: this.state.collapsed ? 'menu-unfold' : 'menu-fold',
                            onClick: this.toggle
                        })
                    ),
                    React.createElement(
                        Content,
                        {
                            style: {
                                margin: '24px 16px',
                                padding: 24
                            }
                        },
                        React.createElement(QuestView, {
                            csrf: this.props.csrf
                        })
                    )
                )
            );
        }
    }]);

    return App;
}(React.Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Custom Styling
var styles = reactStyles();

/** Required Props
 * csrf (String || Number)
 */

var QuestList = function (_React$Component) {
    _inherits(QuestList, _React$Component);

    function QuestList(props) {
        _classCallCheck(this, QuestList);

        var _this = _possibleConstructorReturn(this, (QuestList.__proto__ || Object.getPrototypeOf(QuestList)).call(this, props));

        _this.state = {
            tagInputVis: false,
            newQuest: false,
            name: '',
            objective: '',
            description: '',
            tagInput: '',
            tags: [],
            quests: []
        };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.getQuests = _this.getQuests.bind(_this);
        _this.toggleNewQuest = _this.toggleNewQuest.bind(_this);
        // Tag Specific bindings
        _this.handleTagInputConfirm = _this.handleTagInputConfirm.bind(_this);
        _this.handleClose = _this.handleClose.bind(_this);
        _this.showInput = _this.showInput.bind(_this);
        _this.forMap = _this.forMap.bind(_this);

        _this.getQuests();
        return _this;
    }

    _createClass(QuestList, [{
        key: 'getQuests',
        value: function getQuests() {
            var _this2 = this;

            sendAjax('GET', '/getQuests', null, function (data) {
                _this2.setState({
                    quests: data.quests
                });
            });
        }
    }, {
        key: 'toggleNewQuest',
        value: function toggleNewQuest() {
            this.setState({
                newQuest: !this.state.newQuest
            });
        }
    }, {
        key: 'showInput',
        value: function showInput() {
            var _this3 = this;

            this.setState({
                tagInputVis: true
            }, function () {
                return _this3.input.focus();
            });
        }
    }, {
        key: 'handleClose',
        value: function handleClose(removedTag) {
            var tags = this.state.tags.filter(function (tag) {
                return tag !== removedTag;
            });
            this.setState({
                tags: tags
            });
        }
    }, {
        key: 'handleTagInputConfirm',
        value: function handleTagInputConfirm() {
            var tagInput = this.state.tagInput;
            var tags = this.state.tags;


            if (tagInput && tags.indexOf(tagInput) == -1) {
                tags = [].concat(_toConsumableArray(tags), [tagInput]);
            }

            console.log(this.state.tags);
            this.setState({
                tagInputVis: false,
                tagInput: '',
                tags: tags
            });
        }
    }, {
        key: 'forMap',
        value: function forMap(tag) {
            var _this4 = this;

            var tagElem = React.createElement(
                Tag,
                {
                    closable: true,
                    onClose: function onClose(e) {
                        e.preventDefault();
                        _this4.handleClose(tag);
                    }
                },
                tag
            );

            return React.createElement(
                'span',
                { key: tag, style: { display: 'inline-block' } },
                tagElem
            );
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var target = e.target;
            var name = target.name;

            this.setState(_defineProperty({}, name, e.target.value));
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            var _this5 = this;

            e.preventDefault();
            console.log('here');
            var _state = this.state,
                name = _state.name,
                objective = _state.objective,
                description = _state.description,
                tags = _state.tags;


            if (this.state.name == '' || this.state.objective == '') {
                return false;
            }

            var content = '_csrf=' + this.props.csrf + '&name=' + name + '&objective=' + objective + (description != '' ? '&description=' + description : '') + (tags.length != 0 ? '&tags=' + tags.toString() : '');

            sendAjax('POST', "/app", content, function () {
                // error check call props error func
                _this5.toggleNewQuest();
                _this5.getQuests();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var getFieldDecorator = this.props.form.getFieldDecorator;
            var _state2 = this.state,
                tags = _state2.tags,
                tagInputVis = _state2.tagInputVis;

            var tagChildren = tags.map(this.forMap);
            var saveInputRef = function saveInputRef(input) {
                return _this6.input = input;
            };

            var questNodes = this.state.quests.map(function (quest) {
                console.log(quest);
                var questTags = quest.tags ? quest.tags.split(',') : [];
                if (questTags.length == 1 && questTags[0] == '') {
                    questTags = [];
                }

                return React.createElement(
                    Row,
                    null,
                    React.createElement(QuestListItem, {
                        csrf: _this6.props.csrf,
                        id: quest._id,
                        name: quest.name,
                        objective: quest.objective,
                        tags: questTags,
                        description: quest.description,
                        refreshView: _this6.getQuests,
                        style: styles.questItem
                    })
                );
            });

            return React.createElement(
                'div',
                { className: 'questView' },
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Button,
                        { type: 'primary', size: 'large', onClick: this.getQuests, style: styles.button },
                        'Refresh'
                    )
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Col,
                        { span: 20, offset: 2 },
                        !this.state.newQuest ? React.createElement(
                            Button,
                            { onClick: this.toggleNewQuest, style: styles.addQuestButton },
                            React.createElement(Icon, { type: 'plus' })
                        ) : React.createElement(
                            'div',
                            { style: styles.addQuestView },
                            React.createElement(Icon, { onClick: this.toggleNewQuest, style: styles.close, type: 'close' }),
                            React.createElement(
                                Form,
                                {
                                    id: 'questForm',
                                    name: 'questForm',
                                    onSubmit: this.handleSubmit,
                                    onChange: this.handleChange
                                },
                                React.createElement(
                                    Row,
                                    { style: styles.inputRow },
                                    React.createElement(
                                        Form.Item,
                                        null,
                                        getFieldDecorator('name', {
                                            rules: [{ required: true, message: 'Please enter a quest name' }]
                                        })(React.createElement(TextArea, {
                                            id: 'inputQuestName',
                                            name: 'name',
                                            rows: 1,
                                            style: styles.textArea,
                                            placeholder: 'Enter a quest name here'
                                        }))
                                    )
                                ),
                                React.createElement(
                                    Row,
                                    null,
                                    React.createElement(
                                        'div',
                                        null,
                                        tagChildren,
                                        tagInputVis && React.createElement(Input, {
                                            ref: saveInputRef,
                                            name: 'tagInput',
                                            type: 'text',
                                            size: 'small',
                                            style: { width: 78 },
                                            onChange: this.handleChange,
                                            onBlur: this.handleTagInputConfirm,
                                            onPressEnter: this.handleTagInputConfirm
                                        }),
                                        !tagInputVis && React.createElement(
                                            Tag,
                                            { onClick: this.showInput, style: { background: '#fff', borderStyle: 'dashed' } },
                                            React.createElement(Icon, { type: 'plus' }),
                                            ' New Tag'
                                        )
                                    )
                                ),
                                React.createElement(
                                    Row,
                                    { style: { marginBottom: '-20px' } },
                                    React.createElement(
                                        Form.Item,
                                        null,
                                        getFieldDecorator('objective', {
                                            rules: [{ required: true, message: 'Please enter an objective' }]
                                        })(React.createElement(TextArea, {
                                            id: 'inputQuestObjective',
                                            name: 'objective',
                                            rows: 1,
                                            style: styles.textArea,
                                            placeholder: 'Enter objective here'
                                        }))
                                    )
                                ),
                                React.createElement(
                                    Row,
                                    { style: { margin: '0', marginBottom: '10px' } },
                                    React.createElement(
                                        Form.Item,
                                        null,
                                        getFieldDecorator('description', {
                                            rules: [{ required: true, message: 'Re-enter a password' }]
                                        })(React.createElement(TextArea, {
                                            id: 'inputQuestDescription',
                                            name: 'description',
                                            rows: 4,
                                            style: styles.textArea,
                                            placeholder: 'Enter description here (optional)'
                                        }))
                                    )
                                ),
                                React.createElement(
                                    Row,
                                    null,
                                    React.createElement(
                                        Form.Item,
                                        null,
                                        React.createElement(
                                            Button,
                                            { block: true, type: 'primary', htmlType: 'submit', size: 'large', style: styles.signInButton },
                                            React.createElement(Icon, { type: 'edit', style: { marginTop: '11px', height: '35px', width: '35px' } }),
                                            'Create'
                                        )
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'questList' },
                            questNodes
                        )
                    )
                )
            );
        }
    }]);

    return QuestList;
}(React.Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Custom Styling
var styles = reactStyles();

/** Required Props
 * csrf (String || Number)
 * name (String)
 * objective (String)
 * tags (String[])
 * description (String)
 * refreshView (Function)
 */

var QuestListItem = function (_React$Component) {
    _inherits(QuestListItem, _React$Component);

    function QuestListItem(props) {
        _classCallCheck(this, QuestListItem);

        var _this = _possibleConstructorReturn(this, (QuestListItem.__proto__ || Object.getPrototypeOf(QuestListItem)).call(this, props));

        _this.state = {
            tagInputVis: false,
            isEditing: false,
            isDeleting: false,
            newName: '',
            newObjective: '',
            newDescription: '',
            tagInput: '',
            newTags: []
        };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.editQuest = _this.editQuest.bind(_this);
        _this.toggleEdit = _this.toggleEdit.bind(_this);
        _this.toggleDelete = _this.toggleDelete.bind(_this), _this.removeQuest = _this.removeQuest.bind(_this);
        _this.confirmChanges = _this.confirmChanges.bind(_this);
        // Tag Specific bindings
        _this.handleTagInputConfirm = _this.handleTagInputConfirm.bind(_this);
        _this.handleClose = _this.handleClose.bind(_this);
        _this.showInput = _this.showInput.bind(_this);
        _this.forMap = _this.forMap.bind(_this);
        return _this;
    }

    _createClass(QuestListItem, [{
        key: 'showInput',
        value: function showInput() {
            var _this2 = this;

            this.setState({
                tagInputVis: true
            }, function () {
                return _this2.input.focus();
            });
        }
    }, {
        key: 'handleClose',
        value: function handleClose(removedTag) {
            var newTags = this.state.newTags.filter(function (tag) {
                return tag !== removedTag;
            });
            this.setState({
                newTags: newTags
            });
        }
    }, {
        key: 'handleTagInputConfirm',
        value: function handleTagInputConfirm() {
            var tagInput = this.state.tagInput;
            var newTags = this.state.newTags;


            if (tagInput && newTags.indexOf(tagInput) == -1) {
                newTags = [].concat(_toConsumableArray(newTags), [tagInput]);
            }

            this.setState({
                tagInputVis: false,
                tagInput: '',
                newTags: newTags
            });
        }
    }, {
        key: 'forMap',
        value: function forMap(tag) {
            var _this3 = this;

            var tagElem = React.createElement(
                Tag,
                {
                    color: '#2db7f5',
                    closable: true,
                    onClose: function onClose(e) {
                        e.preventDefault();
                        _this3.handleClose(tag);
                    }
                },
                tag
            );

            return React.createElement(
                'span',
                { key: tag, style: { display: 'inline-block' } },
                tagElem
            );
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var target = e.target;
            var name = target.name;

            this.setState(_defineProperty({}, name, e.target.value));
        }

        // Toggle isEditing state value. If (isEditing == true) set state values to prop values

    }, {
        key: 'toggleEdit',
        value: function toggleEdit() {
            if (this.state.isEditing) {
                this.setState({
                    newName: this.props.name,
                    newTags: this.props.tags,
                    newObjective: this.props.objective,
                    newDescription: this.props.description
                });
            } else {
                $('#editQuestName' + this.props.name).val(this.props.name);
                console.log('#editQuestName' + this.props.name + this.props.name);
            }

            this.setState({
                isEditing: !this.state.isEditing
            });
        }

        // Toggle isEditing state value and send call to server to edit the quest

    }, {
        key: 'confirmChanges',
        value: function confirmChanges(e) {
            e.preventDefault();

            this.setState({
                isEditing: false
            });
        }
    }, {
        key: 'editQuest',
        value: function editQuest() {
            var _this4 = this;

            var _props = this.props,
                name = _props.name,
                objective = _props.objective,
                description = _props.description,
                tags = _props.tags,
                csrf = _props.csrf;
            var _state = this.state,
                newName = _state.newName,
                newObjective = _state.newObjective,
                newDescription = _state.newDescription,
                newTags = _state.newTags;

            // Array comparison

            var arraysMatch = function arraysMatch(arr1, arr2) {
                if (arr1.length != arr2.length) return false;

                for (var i = 0; i < arr1.lengtht; i++) {
                    if (arr1[i] != arr2[i]) return false;
                }
                return true;
            };

            // If nothing changed, exit function
            if (name == newName && objective == newObjective && description == newDescription && arraysMatch(tags, newTags)) {
                return false;
            }

            // Set up query
            var nameParam = 'name=' + name;
            var csrfParam = '&_csrf=' + csrf;
            var newVals = '&newName=' + newName + '&newObjective=' + newObjective + '&newDescription=' + newDescription;
            var query = nameParam + newVals + csrfParam;

            // Ajax get request
            sendAjax('GET', '/updateQuest', query, function () {
                _this4.props.refreshView();
            });

            return false;
        }
    }, {
        key: 'toggleDelete',
        value: function toggleDelete() {
            this.setState({
                isDeleting: !this.state.isDeleting
            });
        }
    }, {
        key: 'removeQuest',
        value: function removeQuest(e) {
            var _this5 = this;

            e.preventDefault();

            if (this.state.isDeleting) {
                sendAjax('GET', '/removeQuest', 'name=' + this.props.name + '&_csrf=' + this.props.csrf, function () {
                    _this5.props.refreshView();
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var _state2 = this.state,
                newTags = _state2.newTags,
                tagInputVis = _state2.tagInputVis;

            var tagChildren = this.props.tags.map(this.forMap);
            var saveInputRef = function saveInputRef(input) {
                return _this6.input = input;
            };

            // generate unique ids
            var editQuestName = "editQuestName" + this.props.name;

            var displayView = React.createElement(
                'div',
                { className: 'quest' },
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        'h3',
                        { className: 'questName' },
                        this.props.name
                    ),
                    React.createElement(
                        'h3',
                        { className: 'questObjective' },
                        this.props.objective
                    ),
                    React.createElement(
                        'div',
                        { style: { marginLeft: '14px' } },
                        tagChildren
                    ),
                    React.createElement(
                        'h3',
                        { className: 'questDescription' },
                        this.props.description
                    )
                ),
                React.createElement(
                    Row,
                    null,
                    this.state.isDeleting ? React.createElement(
                        'div',
                        null,
                        React.createElement(
                            Button,
                            { type: 'primary', size: 'large', onClick: this.toggleDelete, style: styles.cancelButton },
                            'Cancel'
                        ),
                        React.createElement(
                            Button,
                            { type: 'primary', size: 'large', onClick: this.removeQuest, style: styles.cancelButton },
                            'Confirm'
                        )
                    ) : React.createElement(
                        Button,
                        { type: 'primary', size: 'large', onClick: this.toggleDelete, style: styles.cancelButton },
                        'Delete'
                    ),
                    React.createElement(
                        Button,
                        { type: 'primary', size: 'large', onClick: this.toggleEdit },
                        'Edit'
                    )
                )
            );

            var editView = React.createElement(
                'div',
                { className: 'quest' },
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Row,
                        { style: styles.inputRow },
                        React.createElement(TextArea, {
                            id: 'inputQuestName',
                            name: 'name',
                            rows: 1,
                            style: styles.textArea,
                            placeholder: 'Enter a quest name here'
                        })
                    ),
                    React.createElement(
                        Row,
                        { style: styles.inputRow },
                        React.createElement(
                            'div',
                            null,
                            tagChildren,
                            tagInputVis && React.createElement(Input, {
                                ref: saveInputRef,
                                name: 'tagInput',
                                type: 'text',
                                size: 'small',
                                style: { width: 78 },
                                onChange: this.handleChange,
                                onBlur: this.handleTagInputConfirm,
                                onPressEnter: this.handleTagInputConfirm
                            }),
                            !tagInputVis && React.createElement(
                                Tag,
                                { onClick: this.showInput, style: { background: '#fff', borderStyle: 'dashed' } },
                                React.createElement(Icon, { type: 'plus' }),
                                ' New Tag'
                            )
                        )
                    ),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(TextArea, {
                            id: 'inputQuestObjective',
                            name: 'objective',
                            rows: 1,
                            style: styles.textArea,
                            placeholder: 'Enter objective here'
                        })
                    ),
                    React.createElement(
                        Row,
                        { style: { margin: '0', marginBottom: '10px' } },
                        React.createElement(TextArea, {
                            id: 'inputQuestDescription',
                            name: 'description',
                            rows: 4,
                            style: styles.textArea,
                            placeholder: 'Enter description here (optional)'
                        })
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        Button,
                        { style: styles.cancelButton, key: this.props._id, className: 'editQuest', type: 'text', onClick: this.toggleEdit },
                        ' Cancel '
                    ),
                    React.createElement(
                        Button,
                        { style: styles.signInButton, className: 'editQuestSubmit', onClick: this.editQuest },
                        ' Save '
                    )
                )
            );

            return this.state.isEditing ? editView : displayView;
        }
    }]);

    return QuestListItem;
}(React.Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Required Props
 * csrf (String || Number)
 */

// !!! Not yet implemented !!!

var Settings = function (_React$Component) {
    _inherits(Settings, _React$Component);

    function Settings(props) {
        _classCallCheck(this, Settings);

        var _this = _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this, props));

        _this.state = {
            oldPass: '',
            oldPassVis: false,
            newPass1: '',
            newPass1Vis: false,
            newPass2: '',
            newPass2Vis: false
        };

        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(Settings, [{
        key: 'handleChange',
        value: function handleChange(e) {
            var target = e.target;
            var name = target.name;

            this.setState(_defineProperty({}, name, target.value));
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            $("#questMessage").animate({ width: 'hide' }, 350);

            if ($("#oldPass").val() == '' || $("#pass1").val() == '' || $("#pass2").val() == '') {
                handleError("Please fill out all fields");
                return false;
            }

            sendAjax('POST', $("#passChangeForm").attr("action"), $("passChangeForm").serialize());
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            // Set visibility
            var oldPassVis = this.state.oldPassVis ? 'text' : 'password';
            var newPass1Vis = this.state.newPass1Vis ? 'text' : 'password';
            var newPass2Vis = this.state.newPass2Vis ? 'text' : 'password';

            return React.createElement(
                'form',
                {
                    id: 'passChangeForm',
                    name: 'passChangeForm',
                    onSubmit: this.handleSubmit,
                    onChange: this.handleChange,
                    action: '/changePass',
                    method: 'POST',
                    className: 'mainForm'
                },
                React.createElement('input', { id: 'oldPass', type: oldPassVis, name: 'oldPass', placeholder: 'Old Password' }),
                React.createElement('input', { id: 'pass1', type: newPass1Vis, name: 'pass1', placeholder: 'New Password' }),
                React.createElement('input', { id: 'pass2', type: newPass2Vis, name: 'pass2', placeholder: 'Re-Enter New Password' }),
                React.createElement('input', { type: 'hidden', name: '_csrf', value: this.props.csrf }),
                React.createElement('input', { className: 'formSubmit', type: 'submit', value: 'Sign in' })
            );
        }
    }]);

    return Settings;
}(React.Component);
'use strict';

// Imports
var Layout = antd.Layout;
var Menu = antd.Menu;
var Sider = Layout.Sider,
    Header = Layout.Header,
    Content = Layout.Content;
var SubMenu = Menu.SubMenu;

var Alert = antd.Alert;
var Form = antd.Form;
var Input = antd.Input;
var TextArea = Input.TextArea;

var Button = antd.Button;
var Checkbox = antd.Checkbox;
var Tag = antd.Tag;
var Icon = antd.Icon;
var Row = antd.Row;
var Col = antd.Col;

var setup = function setup(csrf) {
    var RunApp = Form.create()(App);
    ReactDOM.render(React.createElement(RunApp, { csrf: csrf }), document.querySelector("#content"));
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

var redirect = function redirect(response) {
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success, errorFunc) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr) {
            var messageObj = JSON.parse(xhr.responseText);
            errorFunc(messageObj.error);
        }
    });
};
