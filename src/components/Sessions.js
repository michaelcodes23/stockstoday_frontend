import React from 'react';
import {GoogleLogin} from 'react-google-login'
import {GoogleLogout} from 'react-google-login'
import {useHistory} from 'react-router-dom'

const GoogleAuth = () => {
    const [refreshTest, setRefreshTest] = React.useState(false)
    const clickRefresh = () => {
        setRefreshTest(!refreshTest)
        console.log(refreshTest)
        console.log('testing')
    }
	let history = useHistory();
	console.log(localStorage.getItem('SessionEmail'))

	const responseGoogle = (response) => {

		console.log(response);
		console.log(response.profileObj)
		localStorage.setItem('SessionEmail', response.profileObj.email)
		localStorage.setItem('SessionName', response.profileObj.name)
        // The useHistory hook gives you access to the history instance that you may use to navigate.
		history.push('/show')
        window.location.reload()
	}

    const pageReload = () => {
        window.location.reload()
    }




	const responseGoogleFail = (response) => {
		console.log(response);
        
	}

	// const logoutSucesss = () => {
	// 	console.log(localStorage.getItem('SessionEmail'))
	// 	localStorage.removeItem('SessionEmail');
	// 	console.log('logged our successfully')

	// }
	const logoutGoogle = () => {
		console.log('logout was succcessful')
		localStorage.removeItem('SessionEmail')
        localStorage.removeItem('SessionName')
		history.push('/')
        window.location.reload()
		
	}
return (
	<div>


	{localStorage.getItem('SessionEmail') === null ? <>
	<GoogleLogin
	clientId = "233320979060-eihl14o55ip4gmfqj5lpm7hdauflm761.apps.googleusercontent.com"
	onSuccess={responseGoogle}
	onFailure={responseGoogleFail}
    buttonText="Sign In"
	/>     </>
	:
	<GoogleLogout
	clientId = "233320979060-eihl14o55ip4gmfqj5lpm7hdauflm761.apps.googleusercontent.com"
	buttonText="Sign Out"
	onLogoutSuccess={logoutGoogle}

	/> 
	}
	</div>
);
}

export default GoogleAuth