import './App.css';
import NavigationBar from './Components/NavigationBar';
import Products from './Pages/Products';
import { Routes,Route } from 'react-router-dom';
import Users from './Pages/Users';
import Details from './Pages/Details';
import CategoryProducts from './Pages/CategoryProducts';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';

function App() {
  return (
    <>
      
      
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/products/:id' element={<Details />} />
        <Route path='/product/:category' element={<CategoryProducts />} />
        <Route path='/users' element={ <Users/> } />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<Checkout/>} />
      </Routes>
    </>
  );
}

export default App;
