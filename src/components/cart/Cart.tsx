import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./Cart.scss";
import { Button } from "primereact/button";
import "../../App.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  addMultipleItems,
  changeCount,
  clearCart,
  getCartItems,
  removeOneItem,
} from "../../store/slice/cart";
import { IoClose } from "react-icons/io5";
import { Dialog } from "primereact/dialog";
import { ImPrinter } from "react-icons/im";
import ReactToPrint from "react-to-print";
import Shimmer from "../shimmer/Shimmer";
import { Message } from "primereact/message";

const Cart = () => {
  const [data, setData] = useState<any>([]);
  const cartDetails = useSelector((state: any) => state.cartDetails);
  const userDetails = useSelector((state: any) => state.userDetails);
  const dispatch = useDispatch<AppDispatch>();
  const [visible, setVisible] = useState(false);
  const companyDetails = {
    companyName: "Pollachi Tender Town",
    address:
      "114D/170, Mount Poonamallee Road,MP Road, Porur, Chennai - 600116",
    gst: "33BWDPV3834K1Z7",
    phone: "+91 9940124094",
  };
  const [billNumber, setBillNumber]: any = useState();

  const fetchData = useCallback(async () => {
    try {
      const cart = await dispatch(
        getCartItems({ userId: userDetails.body.data.table })
      );
      setData(cart.payload?.data);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, userDetails.body.data.table]);

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
  const invoiceRef: any = useRef();
  const Header = () => {
    return (
      <div className="flex gap-2 align-items-center">
        Receipt
        <ReactToPrint
          trigger={() => <ImPrinter className="cursor-pointer" />}
          content={() => invoiceRef.current} // Use ref here
        />
      </div>
    );
  };

  const getRandomBillNumber = () => {
    const userId = userDetails.body.data.table;
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const combinedValue = timestamp + userId;
    setBillNumber(combinedValue);
  };

  const makeDialogVisible = () => {
    getRandomBillNumber();
    setVisible(true);
  };

  const BasicDemo = () => {
    return (
      <div className="card flex justify-content-center">
        <Dialog
          header={<Header />}
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <div ref={invoiceRef} className="p-2 border-1">
            <div>
              <h4>{companyDetails.companyName}</h4>
              <p>ADDRESS : {companyDetails.address}</p>
              <p>GST : {companyDetails.gst}</p>
              <p>PHONE : {companyDetails.phone}</p>
              <p>BILL NUMBER : {billNumber}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.count}</td>
                    <td>₹ {item.price.toFixed(2)}</td>
                    <td>₹ {(item.count * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <strong>Total Amount:</strong> ₹ {cartDetails.total}
            </div>
          </div>
        </Dialog>
      </div>
    );
  };

  const handleMultipleSave = async () => {
    try {
      const propertyToRemove = "userId";
      const newArray = data.map(function ({
        [propertyToRemove]: _,
        ...rest
      }: any) {
        return rest;
      });
      const body = {
        userId: userDetails.body.data.table.toString(),
        products: newArray,
      };
      const cart = await dispatch(addMultipleItems(body));
      setData(cart.payload?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart">
      {visible && <BasicDemo />}
      {(cartDetails.loading || cartDetails.aLoading) && <Shimmer count={6} />}
      {(cartDetails.error || cartDetails.aError) && (
        <Message severity="error" text="Unable to fetch Data" />
      )}
      {!cartDetails.loading &&
        !cartDetails.aLoading &&
        !cartDetails.error &&
        !cartDetails.aError && (
          <div className="h-full content">
            <div className="pmy flex p-3 gap-1 justify-content-center">
              <span className="font-bold text-center text-lg">Bill</span>
            </div>
            <div className="overflow-container">
              <div className="flex justify-content-center gap-1">
                <Button
                  severity="danger"
                  label="Clear"
                  disabled={data.length < 1}
                  onClick={() => clearCartData()}
                />
                <Button
                  label="Checkout"
                  severity="secondary"
                  disabled={data.length < 1}
                  onClick={makeDialogVisible}
                />
                <Button label="+" onClick={handleMultipleSave} />
              </div>
              {data &&
                data.length > 0 &&
                data.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="flex m-3 align-items-center gap-2 p-2 surface-0 flex-column mb-3 shadow-1"
                  >
                    <span className="text-color	">
                      {item.name} - <b>₹{item.price * item.count}</b>
                    </span>
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
                      <IoClose
                        className="text-danger"
                        onClick={() => deleteOneCartItemFromCart(item)}
                      />
                    </div>
                  </div>
                ))}
            </div>
            <div className="bg-primary flex p-3 gap-1 justify-content-center">
              <span className="font-bold text-center text-lg">
                ₹{data.length > 0 ? cartDetails.total : 0}
              </span>
            </div>
          </div>
        )}
    </div>
  );
};

export default Cart;
