import {Routes, Route} from 'react-router-dom'
import Auth from '../pages/Auth'
import Home from '../pages/Home'

const RouterComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
    </Routes>
  )
}

export default RouterComponent