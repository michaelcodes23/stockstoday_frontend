import React from 'react';
import FavStocks from '../components/FavoriteStocks';
import * as FaIcons from 'react-icons/fa';
import ReactLoading from 'react-loading';
import Axios from 'axios';

const Show = () => {
    //Backend Link
    const backend_url = 'https://marketnewstoday-backend.herokuapp.com/user' || 'http://localhost:4000/user/'

    //State
    const [sessionData, setSessionData] = React.useState([])
    //Loader
    const [done, setDone] = React.useState(undefined)
    console.log(localStorage)
    if(localStorage.SessionEmail){
        console.log(localStorage.SessionEmail)
    } else console.log('No user is logged in')
    //Get data from django backend
    const djangoBackendData = async () => {
        if(localStorage.getItem('SessionEmail') !== null){
            const data = await Axios.get(
                `http://localhost:8000/api/users/`
            )
            console.log('django_backend', data)
            const session_info = []
            console.log(localStorage.getItem('SessionEmail'))
            data.data.forEach((value)=>{
                if(value.email === localStorage.SessionEmail){
                    session_info.push(value)
                }
            })
            console.log(session_info)
            if(session_info.length >= 1){
                setSessionData(session_info)
                setDone(true)
            } else {
                console.log('There is not a logged in user. Please log in')
            }
        }

        
    }
 
    React.useEffect(()=>{

            setTimeout(()=>{
                // getAllData()
                djangoBackendData()
            }, 1000)

        
    },[])
    return (
        <div>
            {localStorage.getItem('SessionEmail') ? 
            <>
                {
                    !done ?
                        <ReactLoading type = {'spin'} color = {'#377fb3'} height={'10%'} width={'10%'} className="Loader"/>
                    : 
                    <div className="show-body">
                        {sessionData.length > 0 ?
                            <>
                            {console.log(sessionData[0])}
                            {/* Pass props for name and ticker data to component */}
                            <FavStocks name = {localStorage.getItem('SessionName')} ticker_data = {sessionData} /> 
                            </> 
                :
                            <>
                            <h3>It appears you are not signed in or have not saved any company / stocks as your favorite</h3>
                            <br/>
                            <p>Please sign up for an account, log in, or save favorite company / stocks to see a list of saved items <FaIcons.FaThumbsUp/></p>
                            </>
                        }

                    </div>
                }
            </>
            
            
            : 
            
            
            alert('There is logged in user. Please log in / register :) ')}
            
        </div>
        

    )
};

export default Show;