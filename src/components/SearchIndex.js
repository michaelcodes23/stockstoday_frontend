import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import SearchBar from 'material-ui-search-bar';



const {REACT_APP_KEY_1} = process.env

function GetSearch () {
    //States
    const [indexData, setIndexData] = React.useState([])
    const [searchData, setSearchData] = React.useState([])
    const [searchQuery, setSearchQuery] = React.useState(null)
    const [value, setValue] = React.useState('')
    const [disable, setDisable] = React.useState(false)

        //Check if session is true
        // console.log(localStorage)
        // if(localStorage.SessionEmail){
        //     console.log(localStorage.SessionEmail)
        // } else console.log('No user is logged in')
    
    //function to provide search output
    const backend_api = async (query) => {
    //post to send search query to backend FMP API
        // setDisable(true)

        console.log(query)
        await Axios.post(
                `http://localhost:4000/user`, {
                    search_query: query
                }
            )  
        getbackend_data()
    
    //fetch request to get data gathered from API call above
    //when done testing uncomment line below and remove line 29
        // let response = await fetch('http://localhost:4000/user/getsearch')

        // setDisable(false)
    }
    const getbackend_data = async () => {
        
        let response = await fetch('http://localhost:4000/user')
        console.log(response)
        let data = await response.json()
        console.log(data)
        //Why doesn't the code below prevent the search from outputting previously queried data?
        if(data === searchData){
            setSearchData(null)
        } else {
            console.log(data)
            setSearchData(data)
        }
    }
    //fetch data from backend api call for index random ticker, data includes company profile and news

    const index_random = async () => {
        let response = await fetch('http://localhost:4000/user/tickerindex')
        let data = await response.json()
        console.log(data)
        setIndexData(data)

    }
    //Function to change index data
    const index_update = async (query) => {
            
        console.log(query)
        const response = await Axios.post(
            `http://localhost:4000/user/indextest`,{
                search: query
            }
        )

        console.log('test index_update')
    //fetch request to get data gathered from API call above
        // let response = await fetch('http://localhost:4000/user')
        // console.log(response)
        // let data = await respon
        
        // console.log(data)
        // setIndexData(data)
        }
    //Test if user inputs a compatible company name - currently works with bugs. Turned off at the moment
    // const test_api = () => {
    //     console.log(searchData)
    //     if(searchData.length == 0) {
    //         alert('We could not find a stock with your query, please try a new company name (i.e. Google\'s parent company is Alphabet)')
    //         // setSearchData([])
    //     }
    //     // setDisable(false)
    // }
    //Hide Index data once search is submitted - it lags a bit since backend api call has to be done
    const hide_element = async () => {
        const hide = document.getElementById("start")
        if (hide.style.display === "none"){
            hide.style.display = "block";
        } else {
            hide.style.display = "none";
        }
    }
    React.useEffect(()=> {
        index_random()
    }, [])


    // Things to do:
    // 1. Send request to backend to gather data on search
    // 2. Create output of max 5 companies for users to select
    // 3. Once user selects company, output stock, stock price, ticker, open price, closing price, icon, and 1 news article
    // 4. Add footer to ask people to sign in to have additional info on stock history / trends, more news articles, and be able to save favorite stocks
    return (
        <div className = 'container index-container'>
            <div className = "search-container">
                <h1>Welcome to Market Today</h1>
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
                    onRequestSearch={() => hide_element().then(backend_api(value))}
                />
                <p className="minor-text">Please wait ~3 seconds to submit another search. Give time for our algorithm to put in some work :)</p>
            </div>
            <div className = "index-cards">
                {/* Test if searchData has company data in it */}
                {searchData.length > 0 ? <>
                    {localStorage.SessionEmail ? <h4>Save your favorite stock from your search out below</h4>: <></>}
                    <br/>
                    {searchData.map((value,index)=>{
                        const symbol_search = value.symbol
                        // console.log(symbol_search)
                        return(
                            <div className="ind-card" key = {index} >
                                <h3>Company Name: {value.name}</h3>
                                <p>Stock Exchange: {value.exchangeShortName}</p>
                                <p>Symbol: {value.symbol}</p>
                                <p>Currency: {value.currency}</p>
                                {/* onClick={index_update(symbol_search)} ask help with including this during office hours*/}
                                <button onClick={()=>{index_update(symbol_search)}}>Update the Sample Brief Below</button>
                                {localStorage.SessionEmail ? <button>Save to Favorites</button>: <></>}
                            </div>

                        )
                    })}
                </> : 
                <p>No company stock data gathered. Please make sure you query in 
                the search bar for parent company names, i.e. Yum is the parent 
                company to KFC </p>
                }
            </div>
            <div className = "index-start" id="start">
                {indexData.length > 0 ? <>
                    <h2>Sample Company Brief:</h2>
                    <br/>
                    <p>Log in / Sign Up to save your favorite companies and view additional info such as market cap, additional news articles, industry sector, and more! </p>
                    <br/>
                    <div className = "card-left">
                        <h3>{indexData[0].Profile[0].companyName}</h3>
                        <br/>
                        <img  className = "stock-image" src = {indexData[0].Profile[0].image} alt = {indexData[0].Profile[0].companyName + " Logo"}/>
                        <br/><br/>
                        <p><strong>Ticker:</strong> {indexData[0].Profile[0].symbol}</p>
                    </div>
                    <div className = "card-right">
                        <p><strong>Price: </strong>${indexData[0].Profile[0].price}</p>
                        <p><strong>CEO: </strong>{indexData[0].Profile[0].ceo}</p>
                    </div>
                    <br/>
                    <div className = "card-news">
                        <h3>{indexData[0].Press_Release[0].title}</h3>
                        <p style={{fontStyle: "italic"}} >Published Date: {indexData[0].Press_Release[0].publishedDate.substring(0,10)}</p>
                        <a href = {indexData[0].Press_Release[0].url}><img  className = "news-image" src = {indexData[0].Press_Release[0].image} alt = "Article Image"/></a>
                        <p className = 'card-news-body'>{indexData[0].Press_Release[0].text}</p>
                    </div>
                    {/* <img src = ""/> */}
                    {/* console.log(test.substring(0, 4)) */}
                    </> : <></>
                }
            </div>

        </div>
        
    )
}

export default GetSearch