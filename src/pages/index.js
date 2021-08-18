import React from 'react';
import GetSearch from '../components/SearchIndex';
const Index = () => {
    console.log(localStorage)
    if(localStorage.SessionEmail){
        console.log(localStorage.SessionEmail)
    } else console.log('No user is logged in')
    return (
        <>
            <GetSearch/>
        </>


    )
};

export default Index;