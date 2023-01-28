import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Toast from "./../LoadingError/Toast";
import { toast } from "react-toastify";

import { messagelistDetailMessage, updateMessage } from '../../Redux/Actions/MessageAction';
import { URL } from '../../Redux/Url';
const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

export default function EditMessageMain() {
    const dispatch = useDispatch()
    const location = useLocation();
    const redirect = location.pathname ? Number(location.pathname.split("/")[2]) : "";
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin
    const messageUpdate = useSelector((state) => state.messageUpdate)
    const { error } = messageUpdate
    // const obj1 = Object.assign({}, messager);
    const [Request, setRequest] = useState('');
    const [message, setMessage] = useState('');
    const [repmessage, setRepmessage] = useState('')
    const [status, setStatus] = useState('')
    const toastId = React.useRef(null);

    // useEffect(() => {
    //     dispatch((messagelistDetailMessage(redirect)))
    // }, [dispatch])
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        // console.log(userInfo.token)
        axios.get(`${URL}/api/report/${redirect}`, config)
            .then(data => {
                console.log(data.data.reportOrder[0].Request);
                setRequest(data.data.reportOrder[0].Request)
                setMessage(data.data.reportOrder[0].message)
                setRepmessage(data.data.reportOrder[0].repmessage)
                // setStatus(data.data.reportOrder[0].status)

            })
            .catch(error => {
                console.log(error)
            })

    }, [dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateMessage({
                _id: redirect,
                repmessage,
                status,
            })
        );
        if (error === undefined) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.success("Edit thành công", Toastobjects);
            }
        }
        else{
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error(error, Toastobjects);
            }
        }
    };
    return (
        <div>
            <Toast />
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form onSubmit={submitHandler} >
                    <div className="content-header">
                        <Link to="/message" className="btn btn-danger text-white">
                            Go to Message
                        </Link>
                        <h2 className="content-title">Update Product</h2>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Publish now
                            </button>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    {/* {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : ( */}
                                    <>
                                        <div className="mb-4">
                                            <label htmlFor="product_title" className="form-label">
                                                Request
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Type here"
                                                className="form-control"
                                                id="product_title"
                                                value={Request}
                                                onChange={(e) => { setRequest(e.target.value) }}
                                                required
                                                readonly
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="product_price" className="form-label">
                                                Message
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Type here"
                                                className="form-control"
                                                // id="product_price"
                                                value={message}
                                                onChange={(e) => { setMessage(e.target.value) }}

                                                required

                                            />
                                        </div>
                                        {/* <div className="mb-4">
                      <label htmlFor="product_price" className="form-label">
                        IsAdmin
                      </label>
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check1" name="option1" value={setCheck} onChange={(e)=>{setCheckbox(e.target.checked)}}/>
                        <label class="form-check-label">Admin</label>
                      </div>
                    </div> */}
                                        <div className="mb-4">
                                            <label htmlFor="product_price" className="form-label">
                                                Repmessage
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Type here"
                                                className="form-control"
                                                id="product_price"
                                                value={repmessage}
                                                onChange={(e) => { setRepmessage(e.target.value) }}
                                                required

                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="product_price" className="form-label">
                                                Status
                                            </label>
                                            <select class="form-select" aria-label="Default select example" onChange={(e) => { setStatus(e.target.value) }} >
                                                <option selected>Open this select menu</option>
                                                <option value="Close">Close</option>

                                            </select>
                                        </div>

                                    </>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}
