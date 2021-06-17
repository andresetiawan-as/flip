import React, {useState,} from 'react';
import './index.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom';

const Transaction = (props) => {
    const [dataObj, setDataObj] = useState({})
    let {id} = useParams()
    let data = props.location.state[id]

    const formatDate = (d) => {
        let date = new Date(d)
        let dd = date.getDate();
        let month = date.toLocaleString('default', { month: 'long' });
        let yyyy = date.getFullYear();

        let result = dd + ' ' + month + ' ' + yyyy
        return result
    }

    const changeNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <div>
            <div className="search">
                <h3>ID TRANSAKSI: #{id}</h3>
                {
                    data.status === "PENDING" ?
                        <button className="btn btn-pending">Pengecekan</button>
                    : 
                        <button className="btn btn-done">Berhasil</button>
                }
            </div>

            <div className="content-detail">
                <FontAwesomeIcon className="icon-inbox" icon={faInbox}/>
                <div>
                    <div className="detail-list">
                        <strong>PENGIRIM</strong>
                        <span>{data.sender_bank.length < 5 ? data.sender_bank.toUpperCase() : data.sender_bank.charAt(0).toUpperCase() + data.sender_bank.slice(1)}</span>
                    </div>
                    <div className="detail-list">
                        <strong>PENERIMA</strong>
                        <span>{data.beneficiary_bank.length < 5 ? data.beneficiary_bank.toUpperCase() : data.beneficiary_bank.charAt(0).toUpperCase() + data.beneficiary_bank.slice(1)}</span>
                        <span>{data.account_number}</span>
                        <span>{data.beneficiary_name}</span>
                    </div>
                    <div className="detail-list">
                        <strong>NOMINAL</strong>
                        <span>Rp.{changeNumber(data.amount)}</span>
                        <span><strong>Kode Unik: </strong>{data.unique_code}</span>
                    </div>
                    <div className="detail-list">
                        <strong>CATATAN</strong>
                        <span>{data.remark}</span>
                    </div>
                    <div className="detail-list">
                        <strong>WAKTU DIBUAT</strong>
                        <span>{formatDate(data.created_at)}</span>
                    </div>
                </div>
            </div>

            <div className="btn-container">
                <Link to="/" className="btn btn-pending">Kembali</Link>
            </div>
        </div>
    )
}

export default Transaction
