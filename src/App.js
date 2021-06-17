import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Transaction from './component/Transaction';
import TransactionList from './component/TransactionList';

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

const Home = () => (
  <Fragment>
    <div className="content-header">
      <h2>Halo Kak!</h2>
      <h3>Kamu telah melakukan transaksi sebesar <span>Rp.5.000.000</span> sejak menggunakan Flip.</h3>
    </div>

    <TransactionList/>
  </Fragment>
)


export default App;
