import React, { useCallback, useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./Cart.scss";
import { Button } from "primereact/button";
import "../../App.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  changeCount,
  clearCart,
  getCartItems,
  removeOneItem,
} from "../../store/slice/cart";
import { IoClose } from "react-icons/io5";

const Cart = () => {
  const [data, setData] = useState<any>([]);
  const cartDetails = useSelector((state: any) => state.cartDetails);
  const dispatch = useDispatch<AppDispatch>();
  const fetchData = useCallback(async () => {
    try {
      const cart = await dispatch(getCartItems({ userId: "user123" }));
      setData(cart.payload?.data);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const changeCountValue = async (data: any, type: string) => {
    const body: any = {
      productId: data.productId,
      count: 1,
      type: type,
    };
    try {
      dispatch(changeCount(body));
    } catch (error: any) {
      console.error("Error adding to cart:", error.message);
    }
  };

  const deleteOneCartItemFromCart = async (payload: any) => {
    const body: any = {
      productId: payload.productId,
    };
    try {
      dispatch(removeOneItem(body));
    } catch (error: any) {
      console.error("Error deleting the cart:", error.message);
    }
  };

  const clearCartData = async () => {
    try {
      dispatch(clearCart());
    } catch (error: any) {
      console.error("Error deleting the cart:", error.message);
    }
  };

  useEffect(() => {
    const fetchDataAndLog = async () => {
      await fetchData();
    };
    fetchDataAndLog();
  }, [fetchData]);

  useEffect(() => {
    if (cartDetails.body.data) {
      setData(cartDetails.body.data);
    }
  }, [cartDetails]);

  return (
    <div className="cart">
      {cartDetails.loading && "Loadingg"}
      {cartDetails.error && "error in loading data"}
      <div className="h-full content">
        <div className="pmy flex p-3 gap-1 justify-content-center">
          <span className="font-bold text-center text-lg">Bill</span>
        </div>
        <div className="overflow-container">
          <div className="flex justify-content-center gap-1">
          <Button
            severity="danger"
            label="Clear"
            onClick={() => clearCartData()}
          />
          <Button label="Checkout" severity="secondary" />
          </div>
          {data &&
            data.length > 0 &&
            data.map((item: any, index: any) => (
              <div
                key={index}
                className="flex m-3 align-items-center gap-2 p-2 surface-0 flex-column mb-3 shadow-1"
              >
                <span className="text-color	">{item.name} - <b>₹{item.price * item.count}</b></span>
                <div className="flex gap-3">
                  <FaMinus
                    className="btn"
                    onClick={() => changeCountValue(item, "decrease")}
                  />
                  <input
                    type="text"
                    style={{ width: "30px" }}
                    value={item.count}
                    disabled
                  />
                  <FaPlus
                    className="btn"
                    onClick={() => changeCountValue(item, "increase")}
                  />
                  <IoClose className="text-danger"  onClick={() => deleteOneCartItemFromCart(item)}/>
                </div>
              </div>
            ))}
        </div>
        <div className="bg-primary flex p-3 gap-1 justify-content-center">
          <span className="font-bold text-center text-lg">
            ₹{cartDetails.total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
