import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./Cart.scss";
import { Button } from 'primereact/button';
import "../../App.scss";
const Cart = () => {
  const cartItems = [
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 1", quantity: 2 },
    { name: "Product 2", quantity: 1 },
    // Add more items as needed
  ];

  return (
    <div className="cart flex flex-column">
      <h2 className="p-3">Product Cart</h2>
      <div>
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex m-3 align-items-center gap-2 p-2 surface-0 flex-column mb-3 shadow-1 border-round-md"
          >
            {item.name}
            <div className="flex">
            <button><FaMinus /></button>
            <input
              type="text"
              style={{ width: "30px" }}
              value={item.quantity}
              disabled
            />
            <button><FaPlus /></button>
            </div>
          </div>
        ))}
      </div>
      <div className="cont surface-500	 flex justify-content-center">
        <Button label="Checkout"/>
      </div>
    </div>
  );
};

export default Cart;
