import React from 'react';
import Axios from 'axios';
import SearchBar from 'material-ui-search-bar';
import * as VsIcons from 'react-icons/vsc';



function GetSearch () {
    // Test Django backend call 
    const djangoBackend = async () => {
        const data = await Axios.get(
            `http://localhost:8000/api/users/`
        )
        console.log('django_backend', data)
    }

    //States
    const [indexData, setIndexData] = React.useState([])
    const [searchData, setSearchData] = React.useState([])
    const [value, setValue] = React.useState('')
    const [disable, setDisable] = React.useState(false)
    //Backend Link
    const backend_url = 'https://marketnewstoday-backend.herokuapp.com/user' || 'http://localhost:4000/user/'
    //Financial Modeling Prep Variables
    const {REACT_APP_KEY} = process.env
    const url = 'https://financialmodelingprep.com/api/v3/';
    const limit = '&limit=5';
    const news = 'stock_news?tickers='
    const api_search = 'search?query=';
    //Backend API call to submit favorite Stock data
    const addFavStocks = (symbol) =>{
        fetch(`${backend_url}/savefavorites`, {
        method: "post",
        headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: localStorage.getItem('SessionEmail'),
                name: localStorage.getItem('SessionName'),
                ticker: symbol
            }),
        });
    }

    const getSearchData = async (query) => {
            const response = await fetch(
                `${url}${api_search}${query}${limit}&apikey=${REACT_APP_KEY}`
            )
            const data = await response.json()
            console.log(data)
            setSearchData(data)
    }

    //Function to change index news
    const index_update = async (query) => {
        let indx_array = []
        const profile_response = await Axios.get(
            `${url}profile/${query}?apikey=${REACT_APP_KEY}`
        )
        console.log('testing index_update')
        indx_array.push({"Profile": profile_response.data, "Press_Release": "Great"})
        // console.log(profile_response.data[0].companyName)
        const news_response = await Axios.get(
            `${url}${news}${query}${limit}&apikey=${REACT_APP_KEY}`
        )
        console.log(news_response)
        indx_array[0].Press_Release = news_response.data
        console.log(indx_array)
        setIndexData(indx_array)
    }
    //fetch data from backend api call for index random ticker, data includes company profile and news
    // const index_random = async () => {
    //     let response = await fetch(`http://localhost:4000/user/tickerindex`)
    //     let data = await response.json()
    //     console.log(data)
    //     setIndexData(data)

    // }

    React.useEffect(()=> {
        let index_tickers = ['AAPL', 'NFLX', 'MSFT','JPM', 'AMZN']
        const rand_ticker = index_tickers[Math.floor(Math.random()* index_tickers.length)]
        index_update(rand_ticker)
        djangoBackend()
    }, [])


    return (
        <div>
            <div className = 'container index-container'>
            <div className = "search-container">
                <h1><strong>Welcome to <br/> Market News Today</strong></h1>
                <h3>Your app to keep you up to date on your favorite stocks!</h3>

                <br/><br/>
                <p>Start by searching for your favorite stock or company below and enjoy the journey
                    into current market saviness!
                </p>
                <br/> 
                <SearchBar className = 'search-bar'
                    value = {value}
                    disabled = {disable}
                    onChange = {(newValue) => setValue(newValue)}
                    onRequestSearch={() => getSearchData(value)}
                />
                <p className="minor-text">Please wait ~3 seconds to submit another search. Give time for our algorithm to put in some work :)</p>
                {localStorage.SessionEmail ? <h3>Save your favorite stock from your search out below</h3>: <></>}
            </div>
            
            <div className = "index-cards">
                {/* Test if searchData has company data in it */}
                {searchData.length > 0 ? <>
                    
                    <br/>
                    {searchData.map((value,index)=>{
                        const symbol_search = value.symbol
                        // console.log(symbol_search)
                        return(
                            <div className="ind-card card"style = {{width: "20em", margin: "2em"}} key = {index} >
                                <h3>{value.name}</h3>
                                <p>Stock Exchange: {value.exchangeShortName}</p>
                                <p>Symbol: {value.symbol}</p>
                                <p>Currency: {value.currency}</p>
                                {/* onClick={index_update(symbol_search)} ask help with including this during office hours*/}
                                <div className="buttons">
                                    <button onClick={()=>{index_update(symbol_search)}}className = "button is-link is-dark is-small">Update Sample Below</button>
                                    {localStorage.SessionEmail ? <button onClick={()=>{addFavStocks(symbol_search)}} className = "button is-info is-small">Save to Favorites</button>: <></>}
                                </div>
                               
                            </div>

                        )
                    })}
                </> : 
                <p className = "session-none card">No company stock data gathered. Please query in 
                the search bar for parent company names, i.e. Yum is the parent 
                company to KFC </p>
                }
            </div>
            <div className = "index-news card" id="start">
                {indexData.length > 0 ? <>
                    <h2>Sample Company Brief:</h2>
                    <br/>
                    {indexData[0].Profile.length > 0 ? <>
                        <div className = "card-left">
                            <p>Log in / Sign Up to save your favorite companies and view additional info such as market cap, additional news articles, industry sector, and more! </p>
                            <br/>
                            <h3><strong>{indexData[0].Profile[0].companyName}</strong></h3>
                            <br/>
                            <img  className = "stock-image" src = {indexData[0].Profile[0].image} alt = {indexData[0].Profile[0].companyName + " Logo"}/>
                            <br/><br/>
                            <p><strong>Ticker:</strong> {indexData[0].Profile[0].symbol}</p>
                        </div>
                        <div className = "card-right">
                            <p><strong>Price: </strong>${indexData[0].Profile[0].price}</p>
                            <p><strong>CEO: </strong>{indexData[0].Profile[0].ceo}</p>
                            <br/>
                        </div>
                    </> : <h3>No data found for company profile</h3>}
                    
                    <div className = "card-news">
                        {indexData[0].Press_Release[0] ? <>
                            <a href = {indexData[0].Press_Release[0].url}><h3 className="news news-title">{indexData[0].Press_Release[0].title}</h3></a>
                            <p className="news" style={{fontStyle: "italic"}} >Published Date: {indexData[0].Press_Release[0].publishedDate.substring(0,10)}</p>
                            <a className="news" href = {indexData[0].Press_Release[0].url}><img  className = "news-image" src = {indexData[0].Press_Release[0].image} alt = "Article"/></a>
                            <p className="news" className = 'card-news-body'>{indexData[0].Press_Release[0].text}</p>
                        
                        </> : <h3>It appears no news articles were available for this company at the moment. Try a different stock <VsIcons.VscSmiley/></h3>}
                    </div>
                    </> : <></>
                        }
                     </div>

        </div>
        </div>
        
        
    )
}

export default GetSearch