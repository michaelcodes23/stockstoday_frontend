import { React, useEffect, useState } from 'react'
import FavStocks from '../components/FavoriteStocks'
const Show = () => {
    console.log(localStorage)
    if(localStorage.SessionEmail){
        console.log(localStorage.SessionEmail)
    } else console.log('No user is logged in')
    return (
        <FavStocks/>
    )
};

export default Show;