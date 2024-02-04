import React, { useCallback, useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./Cart.scss";
import { Button } from 'primereact/button';
import "../../App.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { deleteOneCartItem, getCartItems, removeItem, updateCount } from "../../store/slice/cart";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const Cart = () => {
  const [data, setData] = useState<any>([]);
  const cartDetails = useSelector((state: any) => state.cartDetails);
  const dispatch = useDispatch<AppDispatch>();
  const fetchData = useCallback(async () => {
    try {
      const cart = await dispatch(getCartItems({ userId : "user123" }));
      setData(cart.payload?.data);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);


  const updateCountCart = async(payload:any,type:string) =>{
    const body = {
      userId : "user123",
      productId : payload.productId,
      action : type
    }
    try {
      await dispatch(updateCount(body));
    } catch (error:any) {
      console.error("Error adding to cart:", error.message);
    }
  }

  const deleteOneCartItemFromCart = async(payload:any) =>{
    const body = {
      userId : "user123",
      productId : payload.productId,
    }
    try {
      await dispatch(deleteOneCartItem(body));
    } catch (error:any) {
      console.error("Error deleting the cart:", error.message);
    }
  }

  const clearCart = async() =>{
    const body = {
      userId : "user123",
    }
    try {
      await dispatch(removeItem(body));
    } catch (error:any) {
      console.error("Error deleting the cart:", error.message);
    }
  }

  useEffect(() => {
    const fetchDataAndLog = async () => {
      await fetchData();
    };
    fetchDataAndLog();
  }, [fetchData]);

  useEffect(() => {
    if(cartDetails.body.data){
      setData(cartDetails.body.data);
    }
  }, [cartDetails]);

  return (
    <div className="cart flex flex-column">
      <div className="flex p-3 gap-1 align-items-center">
        <span>Product Cart</span>
        <Button severity="danger" label="Clear Cart" onClick={() => clearCart()}/>
      </div>
      {cartDetails.loading && "Loadingg"}
      {cartDetails.error && "error in loading data"}
      <div>
        {data.length>0 && data.map((item:any, index:any) => (
          <div
            key={index}
            className="flex m-3 align-items-center gap-2 p-2 surface-0 flex-column mb-3 shadow-1 border-round-md"
          >
            {item.name} - ₹ {item.price * item.count}
            <Button rounded  severity="danger" onClick={() => deleteOneCartItemFromCart(item)}><IoMdRemoveCircleOutline /></Button>
            <div className="flex">
            <button onClick={() => updateCountCart(item,'decrease')}><FaMinus /></button>
            <input
              type="text"
              style={{ width: "30px" }}
              value={item.count}
              disabled
            />
            <button onClick={() => updateCountCart(item,'increase')}><FaPlus /></button>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex justify-content-center">
        <Button label="Checkout"/>
      </div>
    </div>
  );
};

export default Cart;
