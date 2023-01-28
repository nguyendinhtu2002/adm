import { DELETE_BALANCE_FAIL, DELETE_BALANCE_REQUEST, DELETE_BALANCE_SUCCESS, GETDETAILS_BALANCE_FAIL, GETDETAILS_BALANCE_REQUEST, GETDETAILS_BALANCE_SUCCESS, GET_BALANCE_FAIL, GET_BALANCE_REQUEST, GET_BALANCE_SUCCESS, UPDATE_BALANCE_FAIL, UPDATE_BALANCE_REQUEST, UPDATE_BALANCE_SUCCESS } from "../Constants/WalletContants";
import axios from "axios";
import { URL } from './../Url'
import { logout } from "./userActions";

export const getBalance = () => async (dispatch) => {
    try {

        dispatch({ type: GET_BALANCE_REQUEST });

        const { data } = await axios.get(`${URL}/api/Waller/balance`);
        dispatch({ type: GET_BALANCE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_BALANCE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
// GET WALLET DETAILS
export const getWalletDetails = (id) => async (dispatch,getState) => {
    try {
      dispatch({ type: GETDETAILS_BALANCE_REQUEST });
      const {
        userLogin: { userInfo },
    } = getState();

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
        },
    };
      const { data } = await axios.get(`${URL}/api/Waller/${id}/balance`,config);
      dispatch({ type: GETDETAILS_BALANCE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: GETDETAILS_BALANCE_FAIL,
        payload: message,
      });
    }
  };
// UPDATE Wallet
export const updateWallet = (wallet) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_BALANCE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `${URL}/api/Waller/${wallet._id}`,
            wallet,
            config
        );

        dispatch({ type: UPDATE_BALANCE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: UPDATE_BALANCE_FAIL,
            payload: message,
        });
    }
};

export const deleteWallet = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: DELETE_BALANCE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(
        `${URL}/api/Waller/${id}`,
        config
      );
      dispatch({ type: DELETE_BALANCE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: DELETE_BALANCE_FAIL,
        payload: message,
      });
    }
  };