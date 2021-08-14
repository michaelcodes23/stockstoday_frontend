import { React, useEffect, useState } from 'react'

const FavStocks = ({name, ticker_data}) => {
    
    //Sample Loop Through Array Below
    const [tickers, setTickers] = useState([])
    console.log(name)
    console.log(ticker_data)


    const searchAPI = async (ticker) => { //<------- INCLUDE async 
    // console.log(ticker)
    const response = await fetch(
        `https://financialmodelingprep.com/api/v3/search?query=${ticker}&limit=1&exchange=NASDAQ&apikey=4ce17515280c1c44fabfbd11465b01a6`
    )
    const data = await response.json()
    console.log(data)
    setTickers(tickers => [...tickers,  data]) //SPREAD OPERATOR, pass each call of data into the array tickers
    }

    const grabProfile = async (ticker) => {
        const response = await fetch (
            
        )
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