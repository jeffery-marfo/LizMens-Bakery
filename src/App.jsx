import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import  RootLayouts  from './layouts/RootLayouts'
import Landing from './pages/Landing'




function App() {
  

  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<RootLayouts/>}>
    <Route index={true} element={<Landing/>} />



    </Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App
