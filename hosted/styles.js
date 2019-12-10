
const reactStyles = () => {
    return {
        appLayout: {
            position: 'absolute',
            width: '100%',
            height: '95%',
            top: '5%',
        },
        logo: {
            height: '32px',
            background: '#ffffff33',
            margin: '16px',
        },
        menuIcon: {
            fontSize: '24px',
            lineHeight: '64px',
            padding: '0 24px',
            cursor: 'pointer',
            marginTop: '20px',
            transition: 'color 0.3s',
        },
        input: {
            // border: '0',
            // borderRadius: '0', 
            // borderBottom: '3px solid #da1919',
            // paddingLeft: '0px',
        },
        textArea: {
            height: 'auto',
            marginTop: '10px',
        },
        error: {
            marginBottom: '20px',
        },
        loginHeader: {
            textAlign: 'left',
            marginTop: '15px',
            marginBottom: '0px',
        },
        loginText: {
            textAlign: 'left',
            marginBottom: '30px',
        },
        button: {
            backgroundColor: '#2bafe4',
            border: '1px solid #af7216',
            borderRadius: '0',
        },
        signInButton: {
            backgroundColor: '#2bafe4',
            border: 'none',
            borderRadius: '0',
            margin: '0',
        },
        cancelButton: {
            backgroundColor: '#bbbbbb',
            border: 'none',
            borderRadius: '0',
            margin: '0',
        },
        addQuestButton: {
            width: '100%',
            height: '30px',
            marginTop: '30px',
            marginBottom: '10px',
            alignContent: 'center',
            borderRadius: '0px',
        },
        addQuestView: {
            width: '100%',
            minHeight: '200px',
            border: '1px solid #b8b8b8',
            marginTop: '30px',
            padding: '10px',
            paddingLeft: '30px',
            paddingRight: '30px',
            background: '#ffffff',
            boxShadow: '0px 2px 19px -8px rgba(0,0,0,0.75)',
        },
        questItem: {
            width: '100%',
            minHeight: '150px',
        },
        close: {
            position: 'absolute',
            top: '40x',
            right: '5px',
            cursor: 'pointer',
            height: '35px',
            width: '35px',
            
        },
        inputRow: {
            width: '50%',
            margin: 0,
            marginTop: '15px',
            marginBottom: '-10px',
        },
        form: {
            width: '30%',
            maxWidth: '400px',
            minWidth: '350px',
            height: 'auto',
            margin: '0',
            padding: '25px',
            position: 'absolute',
            zIndex: '1',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff',
            fontFamily: 'Exo',
            fontWeight: '500',
            // float: 'none',
        },
        getDesiredFormWidth: () => {
            if ($(window).width() <= 500)
                return '100%';
            else if ($(window).width() < screen.width / 2)
                return '50%';
            else if ($(window).width() < 3 * screen.width / 4)
                return '40%';
            else
                return '30%';
        },
    }
};
