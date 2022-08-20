import logo from './logo.svg';
import './App.css';
import Layout from './Layout';
import Login from './Login'
import{Routes, Route, BrowserRouter} from 'react-router-dom'
function App() {
  return ( <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={ <Layout/> }/>
      </Routes>

    </div>
    </BrowserRouter>
  );
}

export default App;
