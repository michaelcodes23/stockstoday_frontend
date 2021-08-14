import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import GoogleAuth from '../components/Sessions'
function NavBar () {
    //Post MVP - Try to get GoogleAuth component to refresh when signed in
    // const [refreshTest, setRefreshTest] = React.useState(false)
    // const clickRefresh = () => {
    //     setRefreshTest(!refreshTest)
    //     console.log(refreshTest)
    //     console.log('testing')
    // }
    console.log(localStorage)
    if(localStorage.SessionEmail){
        console.log(localStorage.SessionEmail)
    } else console.log('No user is logged in')
    const navStyle = {
        display: "flex",
        padding: '8px',
        width: "100%",
        margin: "auto"
        // id_ed25519.pub
    }
    //Reload page when clicking on Sign In
    const pageReload = () => {
        window.location.reload()
    }
    return(
        <header>
             <nav style={navStyle} className="top-bar">
                <Link  to ="/">
                <img  src="https://i.imgur.com/o2y3phL.png" alt = "Logo of Market News Today" className='logo-img'/>
                    {/* <h1 className = 'nav-link'>Home</h1> */}
                </Link>
                <div className='session-comp' >
                    <GoogleAuth />
                </div>
                {
                    localStorage.SessionEmail ? 
                    <>
                        <Link  to ="/show">
                            <h1 className = 'nav-link'>Favorite Stocks</h1>
                        </Link>
                        <Link  to ="/Edit">
                            <h1 className = 'nav-link'>Edit Sample Investment Amount</h1>
                        </Link>
                    </> : <></>
                }



            </nav>
        </header>
    )
}

export default NavBar