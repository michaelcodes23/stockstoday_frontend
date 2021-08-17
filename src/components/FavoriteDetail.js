import React from 'react';
import Axios from 'axios';
import * as VsIcons from 'react-icons/vsc';


//Financial Modeling Prep Variables
const {REACT_APP_KEY} = process.env
const url = 'https://financialmodelingprep.com/api/v3/';
const limit = '&limit=6';
const news = 'stock_news?tickers='
const grade = 'grade/'
const historical = 'historical-price-full/'

const FavDetails = () => {
    //State
    const [showData, setShowData] = React.useState([])
    //Get date range for historical data
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    // console.log(today.getMonth())
    // console.log(today)
    today = yyyy + '-' + mm + '-' + dd
    const today_5ago = (yyyy - 5) + '-' + mm + '-' + dd


    
    React.useEffect(()=> {
        // show_update(localStorage.stockDetail)
        const show_update = async () => {
            const query = localStorage.stockDetail
            let details_array = []
            const profile_response = await Axios.get(
                `${url}profile/${query}?apikey=${REACT_APP_KEY}`
            )
            console.log('testing index_update')
            details_array.push({"Profile": profile_response.data, "Press_Release": "Great", "Stock_Grade": "None", "Historical_Price": [],"Net": 0})
            // console.log(profile_response.data[0].companyName)
            const news_response = await Axios.get(
                `${url}${news}${query}${limit}&apikey=${REACT_APP_KEY}`
            )
    
            const grade_response = await Axios.get(
                `${url}${grade}${query}?limit=5&apikey=${REACT_APP_KEY}`
            )
            const historical_response = await Axios.get(
                `${url}${historical}${query}?from=${today_5ago}&apikey=${REACT_APP_KEY}`
            )
    
            // console.log(grade_response.data[0])
            // console.log(historical_response.data.historical[0],historical_response.data.historical[historical_response.data.historical.length - 1])
            
            details_array[0].Press_Release = news_response.data
            details_array[0].Stock_Grade = grade_response.data[0]
            details_array[0].Historical_Price.push(historical_response.data.historical[0],historical_response.data.historical[historical_response.data.historical.length - 1])
            details_array[0].Net = historical_response.data.historical[0].close - historical_response.data.historical[historical_response.data.historical.length - 1].close
            console.log(details_array)
            setShowData(details_array)
        }
        show_update()
    }, [])
    // Things to do
    // Show data
    // Update CSS on all pages
    // Show Stock Grade
    // Show Possible return if investment 100 stocks a few years ago in a company
    // Create Edit page to edit amount of investment from 1000 to 100
    return (
        <div className = 'showdetails'>
            <h1>Stock Details</h1>
            {showData.length > 0 ? <>
                <div className = "details-left">
                    <h2>Company Name: {showData[0].Profile[0].companyName}</h2>
                    <p><strong>Industry:</strong> {showData[0].Profile[0].industry}</p>
                    <img  className = "stock-image" src = {showData[0].Profile[0].image} alt = {showData[0].Profile[0].companyName + " Logo"}/>
                    <p><strong>CEO: </strong>{showData[0].Profile[0].ceo}</p>
                </div>
                <br/>
                <div className = "details-right">
                    <h2>Ticker: {showData[0].Profile[0].symbol}</h2>
                    <p><strong>Currency: </strong>{showData[0].Profile[0].currency}</p>
                    <p><strong>Stock Price: </strong>${showData[0].Historical_Price[0].close} <span className="details-italic">(As of {showData[0].Historical_Price[0].label})</span></p>
                    <p><strong>High: </strong>${showData[0].Historical_Price[0].high}</p>
                    <p><strong>Low: </strong>${showData[0].Historical_Price[0].low}</p>
                    <p><strong>Gain / loss for 100 stocks invested 5 years ago: </strong>
                    {showData[0].Net > 0 ?
                    <span className = "details-netPositive">${Math.round(showData[0].Net * 100).toLocaleString("en-US")}</span>
                    : <span className = 'details-netNegative'>${Math.round(showData[0].Net*100).toLocaleString("en-US")}</span>
                    }</p>
                    <p className = "details-italic">(Stock Price on {showData[0].Historical_Price[1].label}: ${showData[0].Historical_Price[1].close.toFixed(2)})</p>
                    <p><strong>Stock Grade: </strong>{showData[0].Stock_Grade.newGrade} <span className = "details-italic"></span>(Source: {showData[0].Stock_Grade.gradingCompany})</p>
                </div>
                <br/>
                <div className = "details-news">
                {showData[0].Press_Release[0] ? <>
                            <h2>News</h2>
                            {showData[0].Press_Release.map((value, index)=>{
                                return(
                                    <div className = "details-news-card" key = {index}>
                                        <h3>{value.title}</h3>
                                        <p style={{fontStyle: "italic"}} >Published Date: {value.publishedDate.substring(0,10)}</p>
                                        <a href = {value.url}><img  className = "news-image" src = {value.image} alt = "Article"/></a>
                                        <p className = 'card-news-body'>{value.text}</p>
                                    </div>
                                )
                                
                            })}
                        
                        </> : <h3>It appears no news articles were available for this company at the moment <VsIcons.VscSmiley/></h3>}
                </div>
              
                
                </> : <h2>No company details gathered. Please make sure you are logged in and click details on a saved stock via the 'Favorite Stocks' page.</h2>
            }
        </div>

    )

   
};

export default FavDetails;