import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArrowRight, faCircle, faSortDown } from '@fortawesome/free-solid-svg-icons'

const TransactionList = () => {
    const [input, setInput] = useState("")
    const [dataObj, setDataObj] = useState({})
    let [dataSort, setDataSort] = useState([])

    useEffect(() => {
         const getData = async () => {
             await axios.get('https://nextar.flip.id/frontend-test')
                .then(response => {
                    // handle success
                    setDataObj(response.data)
                    setDataSort(Object.values(response.data))
                    // console.log(dataSort);
                })
                .catch(error => {
                    // handle error
                    console.log(error);
                })
        }
        getData()
    }, [])

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            let nameFilter = Object.values(dataObj).filter((e) => e.beneficiary_name.toLowerCase().includes(input.toLowerCase()) || e.beneficiary_bank.toLowerCase().includes(input.toLowerCase()) || e.sender_bank.toLowerCase().includes(input.toLowerCase()))
            // let bankFilter = Object.values(dataObj).filter((e) => e.beneficiary_bank.toLowerCase().includes(input.toLowerCase()))
            // let filterResult = [...nameFilter, ...bankFilter]

            if(input !== ""){
                setDataSort(nameFilter)
            }else{
                setDataSort(Object.values(dataObj))
            }
            // console.log(dataSort);
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [input]);

    const onSort = (value) => {
        let sortResult
        switch (value) {
            case "1":
                sortResult = Object.values(dataObj).sort((a, b) => a.beneficiary_name.localeCompare(b.beneficiary_name))
                break;
            case "2":
                sortResult = Object.values(dataObj).sort((a, b) => b.beneficiary_name.localeCompare(a.beneficiary_name))
                break;
            case "3":
                sortResult = Object.values(dataObj).sort((a, b) => {
                    a.completed_at.localeCompare(b.completed_at)
                })
                break;
            case "4":
                sortResult = Object.values(dataObj).sort((a, b) => {
                    b.completed_at.localeCompare(a.completed_at)
                })
                break;

            default:
                break;
        }
        document.getElementById("myDropdown").classList.toggle("show");
        setDataSort(sortResult)
    }

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

    const onShow = () => {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    return (
        <div className="container-list">
            <div className="search">
                <FontAwesomeIcon className="icon" icon={faSearch} />
                <input className='input' placeholder="Cari nama atau bank" type="text" value={input} onChange={e => setInput(e.target.value)}/>
                {/* <div className="select_box">
                    <select className="select" onChange={(e) => onSort(e.target.value)}>
                        <option id="opt"  value="" disabled selected hidden>URUTKAN</option>
                        <option id="opt"  value="1">Nama A-Z</option>
                        <option id="opt" value="2">Nama Z-A</option>
                        <option id="opt"  value="3">Tanggal terbaru</option>
                        <option id="opt" value="4">Tanggal terlama</option>
                    </select>
                </div> */}

                <div className="dropdown">
                    <button onClick={() => onShow()} className="dropbtn">
                        URUTKAN <span><FontAwesomeIcon className="icon-sort" icon={faSortDown} /></span>
                    </button>
                    <div id="myDropdown" className="dropdown-content">
                        <a href="#" onClick={() => onSort("1")}>Nama A-Z</a>
                        <a href="#" onClick={() => onSort("2")}>Nama Z-A</a>
                        <a href="#" onClick={() => onSort("3")}>Tanggal Terbaru</a>
                        <a href="#" onClick={() => onSort("4")}>Tanggal Terlama</a>
                    </div>
                </div>
            </div>

            {
                dataSort.map((data) => {
                    return(
                        <Link className="link" key={data.id} 
                        to={{ 
                            pathname: `/transactoin-detail/${data.id}`, 
                            state: dataObj
                        }}
                        >
                            <div className={data.status === "PENDING" ? "list border-pending" : "list border-done"}>
                                <div>
                                    <strong>
                                        {data.sender_bank.length < 5 ? data.sender_bank.toUpperCase() : data.sender_bank.charAt(0).toUpperCase() + data.sender_bank.slice(1)} <FontAwesomeIcon className="icon-arrow" icon={faArrowRight} /> {data.beneficiary_bank.length < 5 ? data.beneficiary_bank.toUpperCase() : data.beneficiary_bank.charAt(0).toUpperCase() + data.beneficiary_bank.slice(1)}</strong>
                                    <div>{data.beneficiary_name.toUpperCase()}</div>
                                    <div>Rp.{changeNumber(data.amount)} <FontAwesomeIcon className="icon-dot" icon={faCircle} /> {formatDate(data.completed_at)}</div>
                                </div>
                                <button className={data.status === "PENDING" ? "btn btn-pending" : "btn btn-done"}>{data.status === "PENDING" ? "Pengecekan" : "Berhasil"}</button>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default TransactionList
