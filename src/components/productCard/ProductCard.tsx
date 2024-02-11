import React from "react";
import { Button } from "primereact/button";
import "./ProductCard.scss";
import "../../App.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addToCartReducer, changeCount } from "../../store/slice/cart";
import { FaMinus, FaPlus } from "react-icons/fa";
const ProductCard = ({ data,cartDetails,userDetails }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const getCountById = (targetProductId: string): number => {
    if (cartDetails.body.data) {
      const cartItems = cartDetails?.body?.data;
      const item = cartItems.find(
        (cartItem: any) => cartItem.productId === targetProductId
      );
      if (item) {
        return item.count;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  const addItemToCart = async (data:any) =>{
    const body:any = {
      userId: userDetails.selectedUser.name,
      productId: data._id,
      name: data.name,
      price: data.amount,
      count: 1,
      gst : data.gst
    }
    try {
      dispatch(addToCartReducer(body));
    } catch (error:any) {
      console.error("Error adding to cart:", error.message);
    }
  }

  const changeCountValue = async (data: any,type:string) => {
    const body: any = {
      productId: data._id,
      count: 1,
      type: type,
    };
    try {
      dispatch(changeCount(body));
    } catch (error: any) {
      console.error("Error adding to cart:", error.message);
    }
  };

  return (
    <div className="productCard p-2 flex gap-2 flex-wrap justify-content-center">
      {data.length > 0 &&
        data.map((x: any, index: any) => {
          return (
            <div
              key={index}
              className="flex flex-column shadow-2 card align-items-center surface-ground "
            >
              <div className="image-cont p-2 ">
                <img src={x.photo} alt={x.name} className="" />
              </div>
              <div className="name flex justify-content-between pmy text-center p-2 w-full">
                <span className="text-sm font-semibold">{x.name}</span>
                <span className="text-sm font-semibold"> ₹ - {x.amount}</span>
              </div>
              <div className="p-0 flex justify-content-between count">
                <span className="text-center" onClick={()=> addItemToCart(x)}><FaPlus /></span>
                <span className="text-center" onClick={()=> changeCountValue(x,'decrease')}><FaMinus /></span>
                {/* {getCountById(x._id)}
                <Button label="Add to Cart" className="secondary" onClick={()=> addItemToCart(x)}/> */}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProductCard;
