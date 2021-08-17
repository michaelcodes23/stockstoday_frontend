
import './App.css';
import {Route, Switch} from 'react-router-dom'
//Navigation Bar
import NavBar from './components/NavBar'
//Pages
import Home from './pages/index'
import Session from './pages/session'
import Show from './pages/userShow'
import Edit from './pages/edit'
import ShowDetails from './pages/show_details'

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
      <Route path = '/show_details'>
        <ShowDetails/>
      </Route>
      <Route path = '/'>
        <Home/>
      </Route>
    </Switch>

    </>
  );
}

export default App;
