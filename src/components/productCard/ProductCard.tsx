import React from "react";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import "./ProductCard.scss";
import "../../App.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addToCart, addToCartReducer } from "../../store/slice/cart";
const ProductCard = ({ data,cartDetails }: any) => {
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
      userId: "user123",
      productId: data._id,
      name: data.name,
      price: data.amount,
      count: 1
    }
    try {
      dispatch(addToCartReducer(body));
    } catch (error:any) {
      console.error("Error adding to cart:", error.message);
    }
  }

  return (
    <div className="productCard p-2 flex gap-2 flex-wrap justify-content-between">
      {data.length > 0 &&
        data.map((x: any, index: any) => {
          return (
            <div
              key={index}
              className="flex flex-column card align-items-center pmy border-round-lg"
            >
              <div className="image-cont p-2 border-round-lg">
                <img src={x.photo} alt={x.name} className="border-round-lg" />
              </div>
              <div className="name surface-hover text-center p-2 w-full">
                <span className="text-xl font-semibold">{x.name}</span>
              </div>
              <div className="details surface-50 w-full text-center p-2">
                <span> ₹ - {x.amount}</span>
              </div>
              <div className="button p-2">
                <Button label="Add to Cart" className="secondary" onClick={()=> addItemToCart(x)}/>
                {getCountById(x._id) !== 0 && (
                  <Badge
                    value={getCountById(x._id)}
                    className="p-badge-secondary"
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProductCard;
