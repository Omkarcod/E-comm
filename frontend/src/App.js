import './App.css';
import Nav from './components/Nav';
import {BrowserRouter, Route, Routes} from'react-router-dom'
;
import Footer from './components/Footer';
import Signup from './components/Signup';
import Private from './components/Private';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProducts from './components/UpdateProducts';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <h1 style={{textAlign:'center'}}> E -Dashboard</h1>
      <Routes>
        {/* <Route path='/' element={<h1> home components</h1>}/> */}
        <Route element={<Private/>}>
         <Route path='/' element={<ProductList/>}/>
        <Route path='/add' element={<AddProduct/>}/>
        <Route path='/update/:id' element={<UpdateProducts/>}/>
        <Route path='/logout' element={<h1>logout</h1>}/>
        <Route path='/profile' element={<h1> profile</h1>}/>
        
      </Route>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
    
      </Routes>

        
  
       
   

      
      
      </BrowserRouter>

      <Footer/>
      
    </div>
  );
}

export default App;
