import React from 'react';
import FavStocks from '../components/FavoriteStocks';
import * as FaIcons from 'react-icons/fa';
import ReactLoading from 'react-loading';

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
    const getAllData = async () =>{
        if(localStorage.getItem('SessionEmail') !== null){
            let response = await fetch (`${backend_url}`)
            let data = await response.json()
    
            const session_info = []
            console.log(localStorage.getItem('SessionEmail'))
            data.forEach((value)=>{
                // console.log(value)
                // console.log(value.email)
                if(value.email === localStorage.SessionEmail){
                    session_info.push(value)
                }
            })
            // console.log(data)
            if(session_info.length >= 1){
                setSessionData(session_info)
                setDone(true)

  
            } else console.log('There is not a logged in user')

        }

    }
    React.useEffect(()=>{
        setTimeout(()=>{
            getAllData()
        }, 1000)
    
    },[])
    return (
        <div>
            {
                !done ?
                    <ReactLoading type = {'spin'} color = {'#377fb3'} height={'10%'} width={'10%'} className="Loader"/>
                 : 
                 <div className="show-body">
                    {sessionData.length > 0 &&  sessionData[0].tickerarray.length > 0?
                        <>
                        {console.log(sessionData[0])}
                        {/* Pass props for name and ticker data to component */}
                        <FavStocks name = {sessionData[0].name} ticker_data = {sessionData[0].tickerarray} session_id = {sessionData[0]._id}/> 
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
        </div>
        

    )
};

export default Show;