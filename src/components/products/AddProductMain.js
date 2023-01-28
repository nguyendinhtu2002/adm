import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const [name, setName] = useState("");
  const [rate, setRate] = useState(0);
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState("");
  const [platform, setPlatform] = useState("");

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setCategory("");
      setPlatform("");
      setService("")
      setMin("");
      setMax("");
      setRate(0);
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct(name, rate, min, max,category,platform,service));
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Category
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Service
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={service}
                    onChange={(e) => setService(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Platform
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Rate</label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      required
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                    ></input>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Min</label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      required
                      value={min}
                      onChange={(e) => setMin(e.target.value)}
                    ></input>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Max</label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      required
                      value={max}
                      onChange={(e) => setMax(e.target.value)}
                    ></input>
                  </div>
                  {/* <div className="mb-4">
                    <label className="form-label">Type</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Type here"
                      value={image}
                      required
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
