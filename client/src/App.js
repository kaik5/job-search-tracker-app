import styled from "styled-components"
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { Dashboard, Register, Landing, Error, ProtectedRoute } from "./pages"
import {AllJobs, Profile, Stats, SharedLayout, AddJob} from "./pages/dashboard"
const Button = styled.button`
    background: red;
    color:white;
    font-size: 1rem;
`

function App() {
    return (
        <BrowserRouter>
            {/* <nav>
            <Link to='/home'> Home </Link>
            <Link to='/register'> Register </Link>
            <Link to='/'> Dashboard </Link>
               
            </nav> */}
            <Routes>
                <Route path = '/' element={
                <ProtectedRoute>
                    <SharedLayout />
                </ProtectedRoute>}>
                     <Route index element = {<Stats />}></Route>
                     <Route path = "add-job" element = {<AddJob />}></Route>
                     <Route path = "all-jobs" element = {<AllJobs />}></Route>
                     <Route path = "profile" element = {<Profile />}></Route>
                </Route>
                <Route path = '/register' element={<Register />}> </Route>
                <Route path = '/home' element={<Landing />}> </Route>
                <Route path = '/*' element={<Error />}> </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;