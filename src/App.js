
import './App.css';
import {Route, Switch} from 'react-router-dom'
//Navigation Bar
import NavBar from './components/NavBar'
//Component
import GetSearch from './components/SearchIndex';
//Pages
import Home from './pages/index'
import Session from './pages/session'
import Show from './pages/userShow'
import Edit from './pages/edit'
function App() {
  return (
    <>
    <NavBar/>
    <Switch>
      <Route path = '/session'>
        <Session/>
      </Route>
      <Route path = '/show'>
        <Show/>
      </Route>
      <Route path = '/edit'>
        <Edit/>
      </Route>
      <Route path = '/'>
        <Home/>
      </Route>
    </Switch>
    <GetSearch/>
    </>
  );
}

export default App;
