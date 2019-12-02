
/** Required Props
 * csrf (String || Number)
 * name (String)
 * objective (String)
 * tags (String)
 * description (String)
 */

class QuestListItem extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            editing: false,
            deleting: false,
            newName: '',
            newObjective: '',
            newDescription: '',
        };
    }

    render() {
        return (
            <form 
                id="loginForm" 
                name="loginForm"
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
                action="/login"
                method="POST"
                className="mainForm"
            >
                <input id="user" type="text" name="user" placeholder="Username" />
                <input id="pass" type="password" name="pass" placeholder="Password" />
                <input type="hidden" name="_csrf" value={this.props.csrf} />
                <input className="formSubmit" type="submit" value="Sign in" />
            </form>
        );
    }
}
