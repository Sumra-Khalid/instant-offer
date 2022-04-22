import React, { Component } from 'react';
import './App.css';
import {
  Routes,
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Header from './components/partitials/Header';
import Footer from './components/partitials/Footer';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Header/>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home/>  }/>
            </Routes>
          </div>
        </div>
        <Footer/>
      </HashRouter>
    );
  }
}

export default App;
