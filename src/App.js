import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Home from './component/Home'
import Transaction from './component/Transaction';

function App() {
  return (
    <Router>
      <div className="content">
        <div className="container">
          <div>
            <h1>Daftar Transaksi</h1>
          </div>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/transactoin-detail/:id' component={Transaction}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;