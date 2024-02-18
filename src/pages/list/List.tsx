import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { getProducts } from "../../store/slice/products";
import ProductCard from "../../components/productCard/ProductCard";
import { Message } from "primereact/message";

const List = () => {
  const params: any = useParams();
  const [data, setData] = useState<any>([]);
  const productDetails = useSelector((state: any) => state.productDetaild);
  const userDetails = useSelector((state: any) => state.userDetails);
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = useCallback(async () => {
    try {
      const categories = await dispatch(getProducts({ category: params.id === 'all' ? '' : params.id }));
      setData(categories.payload?.data);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    const fetchDataAndLog = async () => {
      await fetchData();
    };
    fetchDataAndLog();
  }, [fetchData, params.id]);

  return (
    <div>
      {!userDetails.selectedUser.name && <Message className="m-2 w-full text-center" severity="error" text="Select a table to get Data" />}
      {productDetails.loading && 'Loading Data. Please Wait'}
      {productDetails.error && <Message severity="error" text="Unable to fetch Data" />}
      {(!productDetails.loading && !productDetails.error && userDetails.selectedUser.name) && (  
        <ProductCard data={data} userDetails={userDetails}/>
      )}
    </div>
  );
};

export default List;
