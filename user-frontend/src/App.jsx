import './App.css'
import UserSystem from './UserSystem'
import { ListUserComponent } from './components/ListUserComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserComponent from './components/UserComponent'

// Base-level (root) component
function App() {
  return (
    <>
    <BrowserRouter>
      <UserSystem/>
        <Routes>
          {/* http://localhost:3000 */}
          <Route path='/' element={<ListUserComponent/>}> </Route>
          {/* http://localhost:3000/users */}
          <Route path='/users' element={<ListUserComponent/>}> </Route>
          {/* http://localhost:3000/add-user */}
          <Route path='/add-user' element={<UserComponent/>}> </Route>
           {/* http://localhost:3000/users/edit-user/1 */}
         <Route path='/edit-user/:id' element={<UserComponent/>}> </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
