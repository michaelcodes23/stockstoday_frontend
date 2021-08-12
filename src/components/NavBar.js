import React from 'react';
import {Link} from 'react-router-dom'
function NavBar () {
    const navStyle = {
        display: "flex",
        justifyContent: "space-around",
        padding: '8px',
        width: "100%",
        margin: "auto"
    }
    return(
        <header>
             <nav style={navStyle} className="top-bar">
                <Link  to ="/">
                <img src="https://i.imgur.com/o2y3phL.png" alt = "Logo of Market News Today" className='logo-img'/>
                    {/* <h1 className = 'nav-link'>Home</h1> */}
                </Link>
                <Link  to ="/show">
                    <h1 className = 'nav-link'>Favorite Stocks</h1>
                </Link>
                <Link  to ="/Edit">
                    <h1 className = 'nav-link'>Edit Sample Investment Amount</h1>
                </Link>
                <Link  to ="/Session">
                    <h1 className = 'nav-link'>Signin</h1>
                </Link>
            </nav>
        </header>
    )
}

export default NavBar