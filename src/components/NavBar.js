import React from 'react';
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
    const navStyle = {
        display: "flex",
        padding: '8px',
        width: "100%",
        margin: "auto"
        // id_ed25519.pub
    }
    //Reload page when clicking on Sign In
    return(
        <header>
             <nav style={navStyle} className="top-bar">
                <Link  to ="/">
                <img  src="https://i.imgur.com/o2y3phL.png" alt = "Logo of Market News Today" className='logo-img'/>
                    {/* <h1 className = 'nav-link'>Home</h1> */}
                </Link>

                {
                    localStorage.SessionEmail ? 
                    <>
                        <Link  to ="/show">
                            <h1 className = 'nav-link'>Favorite Stocks</h1>
                        </Link>
                        {/* <Link  to ="/Edit">
                            <h1 className = 'nav-link'>Edit Sample Investment</h1>
                        </Link> */}
                    </> : <></>
                }
                <div className='session-comp' >
                    <GoogleAuth />
                </div>


            </nav>
        </header>
    )
}

export default NavBar