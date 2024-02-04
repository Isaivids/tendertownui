import React, { useCallback, useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./Cart.scss";
import { Button } from 'primereact/button';
import "../../App.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { changeCount, clearCart, getCartItems, removeOneItem} from "../../store/slice/cart";
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


  const changeCountValue = async (data:any,type:string) =>{
    const body:any = {
      productId: data.productId,
      count: 1,
      type : type
    }
    try {
      dispatch(changeCount(body));
    } catch (error:any) {
      console.error("Error adding to cart:", error.message);
    }
  }

  const deleteOneCartItemFromCart = async(payload:any) =>{
    const body:any = {
      productId : payload.productId,
    }
    try {
      dispatch(removeOneItem(body));
    } catch (error:any) {
      console.error("Error deleting the cart:", error.message);
    }
  }

  const clearCartData = async() =>{
    try {
      dispatch(clearCart());
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
        <Button severity="danger" label="Clear Cart" onClick={() => clearCartData()}/>
      </div>
      {cartDetails.loading && "Loadingg"}
      {cartDetails.error && "error in loading data"}
      <span>{cartDetails.total}</span>
      <div>
        {data && data.length>0 && data.map((item:any, index:any) => (
          <div
            key={index}
            className="flex m-3 align-items-center gap-2 p-2 surface-0 flex-column mb-3 shadow-1 border-round-md"
          >
            {item.name} - ₹ {item.price * item.count}
            <Button rounded  severity="danger" onClick={() => deleteOneCartItemFromCart(item)}><IoMdRemoveCircleOutline /></Button>
            <div className="flex">
            <button onClick={() => changeCountValue(item,'decrease')}><FaMinus /></button>
            <input
              type="text"
              style={{ width: "30px" }}
              value={item.count}
              disabled
            />
            <button onClick={() => changeCountValue(item,'increase')}><FaPlus /></button>
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
