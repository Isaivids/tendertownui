import React from "react";
import { Link } from "react-router-dom";
import beverage from "../../assets/juice.svg";
import "./SideBar.scss";
const SideBar = () => {
  const data = [
    {
      image: beverage,
      text: "Juice",
    },
    {
      image: beverage,
      text: "Ice",
    },
    {
      image: beverage,
      text: "Mojito",
    },
    {
      image: beverage,
      text: "Snacks",
    },
    {
      image: beverage,
      text: "Waffle",
    },
    {
      image: beverage,
      text: "Sandwich",
    },
    {
      image: beverage,
      text: "Maggie",
    },
    {
      image: beverage,
      text: "Hot Drinks",
    },
  ];
  return (
    <div className="left-sidebar">
      {data.length > 0 &&
        data.map((x: any, index: number) => {
          return (
            <div key={index} className="flex flex-column mb-3">
              <img src={x.image} alt={x.text} />
              <Link to="/" className="text-center	">
                {x.text}
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default SideBar;
