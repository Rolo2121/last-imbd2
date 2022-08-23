import './App.css';
import Layout from './pages/Layout';
import CreateAccount from './pages/CreateAccount'
import Login from './pages/Login'
import Watchlist from './pages/WatchList'
import{Routes, Route, BrowserRouter} from 'react-router-dom'
import Movie from './pages/Movie'
function App() {
  return ( <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path='/createaccount' element={<CreateAccount/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={ <Layout/> }/>
        <Route path='/movie/:id' element={ <Movie/> }/>
        <Route path='/watchlist' element={ <Watchlist/> }/>
      </Routes>

    </div>
    </BrowserRouter>
  );
}

export default App;
