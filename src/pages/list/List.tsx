import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { getProducts } from "../../store/slice/products";
import ProductCard from "../../components/productCard/ProductCard";

const List = () => {
  const params: any = useParams();
  const [pageName, setPageName] = useState<any>();
  const [data, setData] = useState<any>([]);
  const productDetails = useSelector((state: any) => state.productDetaild);
  const dispatch = useDispatch<AppDispatch>();
  const cartDetails = useSelector((state: any) => state.cartDetails);

  const fetchData = useCallback(async () => {
    try {
      const categories = await dispatch(getProducts({ category: "" }));
      setData(categories.payload?.data);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    setPageName(params.id);
    const fetchDataAndLog = async () => {
      await fetchData();
    };
    fetchDataAndLog();
  }, [fetchData, params.id]);
  
  return (
    <div>
      {productDetails.loading && "Loadingg"}
      {productDetails.error && "error in loading data"}
      Here's your {pageName}
      {!productDetails.loading && !productDetails.error && !cartDetails.loading && !cartDetails.error && (
        <ProductCard data={data} cartDetails={cartDetails}/>
      )}
    </div>
  );
};

export default List;
