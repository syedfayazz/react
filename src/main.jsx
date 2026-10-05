import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './components/App.jsx'
import EmployeeListing from './components/EmployeeListing.jsx'
import AddEmployee from './components/AddEmployee.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/employees" element={<EmployeeListing />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
