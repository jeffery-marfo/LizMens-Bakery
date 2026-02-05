import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import  RootLayouts  from './layouts/RootLayouts'
import Landing from './pages/Landing'
import Menu from './pages/Menu'
import Order from './pages/Order'
import Delivery from './pages/Delivery'




function App() {
  

  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<RootLayouts/>}>
    <Route index={true} element={<Landing/>} />
    <Route path='/menu' element={<Menu/>} />
    <Route path='/order' element={<Order/>} />
    <Route path='/delivery' element={<Delivery/>} />



    </Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App
