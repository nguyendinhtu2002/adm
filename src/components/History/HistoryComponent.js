import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUser } from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import DataTable from 'react-data-table-component'
import moment from "moment";
import axios from "axios";
import { getBalance } from "../../Redux/Actions/WalletAction";
import { deleteCashFLow } from "../../Redux/Actions/CashFlowAction";
import { URL } from "../../Redux/Url";

const HistoryComponents = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState('')
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const getWalletBalance = useSelector((state) => state.getWalletBalance);
    const { balance } = getWalletBalance
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;
    const [data, setData] = useState([])
    const [tempData, setTempData] = useState([])
    const [search, SetSearch] = useState('')
    const [Balance, setBalance] = useState([])
    const format1 = "YYYY-MM-DD HH:mm:ss"

    // const [Data, setData] = useState([]);
    const handlerDelete = (id) => {
        if (window.confirm("Are you sure??")) {
            dispatch(deleteCashFLow(id))
            window.location.reload();
        }
    }
    // const filterData = (id)=>{
    //   const result = Balance.filter(idUser => {
    //     return idUser._id.match(id)
    //   })
    //   return result[0]?.balance
    // }
    // // console.log(Balance)
    // console.log(filterData('634443f77766722401bb9f85'))
    // useEffect(() => {
    //   // dispatch(getBalance())
    //   const fetchData = async () => {
    //     try {
    //       const res = await axios.get("http://localhost:5000/api/Waller/balance")
    //         .then(data => {
    //           setBalance(data.data)
    //         })
    //     } catch (err) {
    //       console.log(err.message);
    //     }
    //   }

    //   // call the function
    //   fetchData();
    // }, [dispatch])
    function formatCash(str) {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }
    const columns = [
        {
            name: "ID",
            selector: (row) => (row._id)
        },
        {
            name: "User",
            selector: (row) => row.user
        },
        {
            name: "Type",
            selector: (row) => row.type
        },
        {
            name: "Spending",
            selector: (row) => formatCash(row.spending.toString())
        },
        {
            name: "RemainingMoney",
            selector: (row) => (row.remainingMoney.toFixed(2))
        },
        {
            name: "CreateAt",
            selector: (row) => moment(row.createdAt).format(format1)
        },
        {
            name: "updatedAt",
            selector: (row) => moment(row.updatedAt).format(format1)
        },
        {
            name: "Action",
            selector: (row) => <>
                <div className="d-flex justify-content-around">
                    <button type="button" onClick={() => handlerDelete(row._id)} className="btn ">Delete</button>
                    {/* <Link to={`/editHistory/${row._id}`} className="text-success">
                        <button type="button" className="btn ">Edit</button>

                    </Link> */}
                </div>

            </>
        }
    ]
    useEffect(() => {
        // dispatch(listUser());
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        axios.get(`${URL}/api/cashFlow/all`)
            .then(data => {
                setData(data.data);
                setTempData(data.data);
                // update state with response
                // console.log(data.data)
                // const arr = data.data.map((items) => (items.orderItems[0].order))
                // dispatch(listStatus(arr.toString()))
            })
            .catch(error => {
            })

    }, [dispatch]);
    useEffect(() => {
        const result = data.filter(idUser => {
            return idUser._id.toLowerCase().match(search.toLowerCase())
        })
        setTempData(result)
    }, [search])


    return (
        <section className="content-main">

            {/* Card */}
            <div className="card-body">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                ) : (
                    <DataTable
                        columns={columns}
                        data={tempData}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="450px"
                        progressComponent
                        selectableRows
                        selectableRowsHighlight
                        subHeader
                        subHeaderComponent={
                            <input type="text" placeholder="Search here" className="w-25 form-control" value={search} onChange={(e) => { SetSearch(e.target.value) }} />
                        }

                    />
                )}

            </div>
        </section>
    );
};

export default HistoryComponents;
