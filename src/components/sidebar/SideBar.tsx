import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import beverage from "../../assets/juice.svg";
import "./SideBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../store/slice/category";
import { AppDispatch } from "../../store/store";
const SideBar = () => {
  // const data = [
  //   {
  //     image: beverage,
  //     text: "Juice",
  //   },
  //   {
  //     image: beverage,
  //     text: "Ice",
  //   },
  //   {
  //     image: beverage,
  //     text: "Mojito",
  //   },
  //   {
  //     image: beverage,
  //     text: "Snacks",
  //   },
  //   {
  //     image: beverage,
  //     text: "Waffle",
  //   },
  //   {
  //     image: beverage,
  //     text: "Sandwich",
  //   },
  //   {
  //     image: beverage,
  //     text: "Maggie",
  //   },
  //   {
  //     image: beverage,
  //     text: "Hot Drinks",
  //   },
  // ];
  const [data, setData] = useState([])
  const categoryDetails = useSelector((state: any) => state.categoryDetals);
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = useCallback(async () => {
    try {
      const categories = await dispatch(getCategory());
      setData(categories.payload?.data);
    } catch (error) {
      console.log(error)
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchDataAndLog = async () => {
      await fetchData();
    };
    fetchDataAndLog()
  }, [fetchData]);

  return (
    <div className="left-sidebar p-3">
    {(categoryDetails.loading) && 'Loading'}
    {(categoryDetails.error) && 'Error'}
      {data.length > 0 &&
        data.map((x: any, index: number) => {
          return (
            <div
              key={index}
              className="flex p-2 surface-0 flex-column mb-3 shadow-1 border-round-md"
            >
              <img src={x.image || beverage} alt={x.name} />
              <Link to={`/list/${x.name}`} className="text-center	">
                {x.name}
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default SideBar;
