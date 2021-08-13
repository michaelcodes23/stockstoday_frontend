import { React, useEffect, useState } from 'react'

const FavStocks = () => {
    //Sample Loop Through Array Below
    const [tickers, setTickers] = useState([])

    const searchAPI = async (ticker) => { //<------- INCLUDE async 
    // console.log(ticker)
    const response = await fetch(
        `https://financialmodelingprep.com/api/v3/search?query=${ticker}&limit=1&exchange=NASDAQ&apikey=4ce17515280c1c44fabfbd11465b01a6`
    )
    const data = await response.json()
    console.log(data)
    setTickers(tickers => [...tickers,  data]) //SPREAD OPERATOR, pass each call of data into the array tickers
    }

    useEffect(() => {
    //IN THIS EXAMPLE, I AM DECLARING tickerLoop() INSIDE useEffect() TO REMOVE THE WARNING
    const tickerLoop = () => {
        const arr = ['AAPL', 'GOOG', 'AMZN', 'MSFT', 'TSLA']
        arr.forEach(element => {
        searchAPI(element)
        })
    }
    tickerLoop()
    }, [])// <-------------- WITHOUT ", []" useEffect() WOULD CAUSE AN INFINITE LOOP! ", []" TELLS
        //                 useEffect() TO RUN ONLY ON THE INITIAL RENDER

    console.log(`Here is tickers: ${tickers}`)

    const tickersList = tickers.map((element, i) => {
    return <h1 key={i}>{element[0].name}</h1>
    })
    return (
        <>
            <h1>Show</h1>
            <header className="App-header">
                {tickersList}
            </header>
        </>
 
    )
};

export default FavStocks;