import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Company from './Pages/Company/Company';
import AddCompany from './Pages/Company/add/AddCompany';
import Layout from './Layout/Layout';
import {Provider} from 'react-redux';
import store from './store';
import CompanyDetail from './Pages/Company/id/CompanyDetail';
import Teams from './Pages/Teams/Teams';
import TeamsDetail from './Pages/Teams/id/TeamsDetail';
import AddTeam from './Pages/Teams/add/AddTeam';
import AddProject from './Pages/Company/Projects/AddProject';
import AddChoices from './Pages/Choices/add/AddChoices';
import Choices from './Pages/Choices/Choices';
import SelectFinalChoice from './Pages/Choices/selectFinalChoice/SelectFinalChoice';
import ConsideredChoices from './Pages/Choices/ConsideredChoices';

function App() {
  return (
    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/company' element={<Company/>}/>
                    <Route path='/company/add' element={<AddCompany/>}/>
                    <Route path='/company/:companiesId' element={<CompanyDetail/>}/>
                    <Route path='/company/:companyId/project/add' element={<AddProject/>}/>
                    <Route path='/teams' element={<Teams/>}/>
                    <Route path='/teams/:teamId' element={<TeamsDetail/>}/>
                    <Route path='/teams/add' element={<AddTeam/>}/>
                    <Route path='/team/:teamId/choices/add' element={<AddChoices/>}/>
                    <Route path='/final/choices' element={<Choices/>}/>
                    <Route path='/final/choices/considered' element={<ConsideredChoices/>}/>
                    <Route path='/final/choices/:choiceId' element={<SelectFinalChoice/>}/>
                </Routes>
            </Layout>
        </Router>
    </Provider>
  );
};

export default App;