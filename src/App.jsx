
import './App.css'
import MenuHeader from './Component/MenuHaeder'
import AppFooter from './Component/AppFooter'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Component/Common/Home'
import Contact from './Component/Common/Contact'
import About from './Component/Common/About'
import Dashboard from './Component/Admin/Dashboard'
import Profile from './Component/Admin/Profile'
import Settings from './Component/Admin/Settings'
import Employeelisting from './Component/Employee/Employeelisting'
import Addemployee from './Component/Employee/AddEmployee'
import EmployeeCards from './Component/Employee/EmployeeCards'
import EmployeeDetails from './Component/Employee/EmployeeDetails'
import '../node_modules/react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
      <BrowserRouter>
      <ToastContainer
      position='top-right'
      // hideProgressBar={true}
      theme='colored'
      autoClose={false}
      ></ToastContainer>
      <MenuHeader></MenuHeader>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/dashboard' element={<Dashboard/>}>
             <Route path='profile' element={<Profile/>}></Route>
             <Route path='profile/:id' element={<Profile/>}></Route>
             <Route path='profile/:id/:area' element={<Profile/>}></Route>
             <Route path='setting' element={<Settings/>}></Route>
          </Route>
          <Route path='/employee' element={<Employeelisting/>}></Route>
          <Route path='/employeecards' element={<EmployeeCards/>}></Route>
          <Route path='/employee/view/:id' element={<EmployeeDetails/>}></Route>
          <Route path='/addemployee' element={<Addemployee/>}></Route>
          <Route path='/editemployee/:id' element={<Addemployee/>}></Route>
          <Route path='*' element={<h2>No page found</h2>}></Route>
        </Routes>
         <AppFooter></AppFooter>
      </BrowserRouter>

  )
}

export default App
