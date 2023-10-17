import { FC } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ContactList, FormContact } from '../pages'

const AppRoutes: FC = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<ContactList />} />
                <Route path='/form' element={<FormContact />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes