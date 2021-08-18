import { React, useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'
import Axios from 'axios';

const FavStocks = ({name, ticker_data, session_id}) => {
    //Backend API Call to Delete Stock

    const deleteStock = async (data) => {
        await Axios.patch(`http://localhost:4000/user/${session_id}`,{
            ticker: data
        })
        window.location.reload()
    }
    
    //Financial Model API Info
    let history = useHistory();
    const url = 'https://financialmodelingprep.com/api/v3/';
    const {REACT_APP_KEY} = process.env
    //Sample Loop Through Array Below
    const [tickers, setTickers] = useState([])



    const grabProfile = async (ticker) => {
        console.log('Testing grabbing profile api')
        const response = await fetch (
            `${url}profile/${ticker}?apikey=${REACT_APP_KEY}`
        )
        const data = await response.json()
        // console.log(data)
        setTickers(tickers => [...tickers, data]) //SPREAD OPERATOR, pass each call of data into the array tickers
    }
    const profileLoop = () => {
        ticker_data.forEach(element => {
            grabProfile(element)
        })
    }
    const navtoDetails = (symbol) =>{
        history.push('/show_details')
        console.log(symbol)
        localStorage.setItem('stockDetail', symbol)
        console.log(localStorage)
    }
    useEffect(() => {
    //IN THIS EXAMPLE, I AM DECLARING profileLoop() INSIDE useEffect() TO REMOVE THE WARNING
        profileLoop()
    }, [])// <-------------- WITHOUT ", []" useEffect() WOULD CAUSE AN INFINITE LOOP! ", []" TELLS
        //                 useEffect() TO RUN ONLY ON THE INITIAL RENDER

    const tickersList = tickers.map((element, i) => {
        // console.log(element)
        let stock_symbol = element[0].symbol
    return (

        <div className="show-fav card" key = {i}>
            <h3 key={i} className = 'fav-title'>{element[0].companyName}</h3>
            <img  className = "fav-stock-image" src = {element[0].image} alt = {element[0].companyName + " Logo"}/>
            <p className="fav-ticker">Ticker: {element[0].symbol}</p>
            <button className = "button is-info fav-button" onClick={()=>{navtoDetails(stock_symbol)}} >View Details</button>
            <button className = "button is-danger fav-button" onClick={()=>{deleteStock(stock_symbol)}}>Delete Stock</button>
        </div>

    )
    })
    return (
        <div className = "container fav-stock-container">
            <h1>Welcome, {name}</h1>
            <h2>Please see your favorite stocks below <AiIcons.AiOutlineStock/></h2>
            <div className="fav-container card">
                {tickersList}

            </div>
        </div>
 
    )
};

export default FavStocks;