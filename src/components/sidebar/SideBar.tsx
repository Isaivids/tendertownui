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
    <div className="left-sidebar p-3">
      {data.length > 0 &&
        data.map((x: any, index: number) => {
          return (
            <div key={index} className="flex p-2 surface-0 flex-column mb-3 shadow-1 border-round-md">
              <img src={x.image} alt={x.text} />
              <Link to={`/list/${x.text}`} className="text-center	">
                {x.text}
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default SideBar;
