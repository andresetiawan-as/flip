import React, {Fragment} from 'react'
import TransactionList from '../component/TransactionList';

const Home = () => {
    return (
        <Fragment>
            <div className="content-header">
                <h2>Halo Kak!</h2>
                <h3>Kamu telah melakukan transaksi sebesar <span>Rp.5.000.000</span> sejak menggunakan Flip.</h3>
            </div>

            <TransactionList />
        </Fragment>
    )
}

export default Home
