import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    editProduct,
    updateProduct,
} from "./../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { EditUser, updateUser } from "../../Redux/Actions/userActions";
import { getWalletDetails, updateWallet } from "../../Redux/Actions/WalletAction";
import axios from "axios";
import { URL } from "../../Redux/Url";

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const EditMoneyMain = (props) => {
    const { productId } = props;
    const dispatch = useDispatch();

    const editUser = useSelector((state) => state.editUser);
    const { user } = editUser;
    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} =userLogin
    // const getWalletByUser = useSelector((state) => state.getWalletByUser);
    // const { balance } = getWalletByUser
    const [setCheck, setCheckbox] = useState(user?.isAdmin)
    const [money, setMoney] = useState('')
    // useEffect(() => {
    //     // dispatch(EditUser(productId))
    //     dispatch(getWalletDetails(productId))
    // }, [dispatch])
    useEffect(() => {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        // console.log(userInfo.token)
        axios.get(`${URL}/api/Waller/${productId}/balance`,config)
            .then(data => {
            setMoney(data.data.balance);
            
          })
          .catch(error => {
            console.log(error)
          })
    
      }, [dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateWallet({
                _id: productId,
                amount:money,
            })
        );
    };
 
    return (
        <>
            <Toast />
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form onSubmit={submitHandler} >
                    <div className="content-header">
                        <Link to="/updates" className="btn btn-danger text-white">
                            Go to Money
                        </Link>
                        <h2 className="content-title">Update Money</h2>
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
                                        {/* <div className="mb-4">
                                            <label htmlFor="product_title" className="form-label">
                                                Name User
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Type here"
                                                className="form-control"
                                                id="product_title"
                                                value={user?.name}
                                                onChange
                                                required
                                                readonly
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="product_price" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Type here"
                                                className="form-control"
                                                // id="product_price"
                                                value={user?.email}

                                                required

                                            />
                                        </div> */}
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
                                                Money
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Type here"
                                                className="form-control"
                                                id="product_price"
                                                value={money}
                                                onChange={(e) => { setMoney(e.target.value) }}
                                                required

                                            />
                                        </div>

                                    </>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default EditMoneyMain;
