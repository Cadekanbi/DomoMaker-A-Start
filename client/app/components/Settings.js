
/** Required Props
 * csrf (String || Number)
 */

// !!! Not yet implemented !!!

class Settings extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            oldPass: '',
            oldPassVis: false,
            newPass1: '',
            newPass1Vis: false,
            newPass2: '',
            newPass2Vis: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    };

    handleSubmit (e) {
        e.preventDefault();
        $("#questMessage").animate({width:'hide'},350);
      
        if ($("#oldPass").val() == '' || $("#pass1").val() == '' || $("#pass2").val() == '') {
          handleError("Please fill out all fields");
          return false;
        }
      
        sendAjax('POST', $("#passChangeForm").attr("action"), $("passChangeForm").serialize());
        return false;
      };

    render() {
        // Set visibility
        const oldPassVis = this.state.oldPassVis ? 'text' : 'password';
        const newPass1Vis = this.state.newPass1Vis ? 'text' : 'password';
        const newPass2Vis = this.state.newPass2Vis ? 'text' : 'password';

        return (
            <form 
                id="passChangeForm" 
                name="passChangeForm"
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
                action="/changePass"
                method="POST"
                className="mainForm"
            >
                <input id="oldPass" type={oldPassVis} name="oldPass" placeholder="Old Password" />
                <input id="pass1" type={newPass1Vis} name="pass1" placeholder="New Password" />
                <input id="pass2" type={newPass2Vis} name="pass2" placeholder="Re-Enter New Password" />
                <input type="hidden" name="_csrf" value={this.props.csrf} />
                <input className="formSubmit" type="submit" value="Sign in" />
            </form>
        );
    }
}
