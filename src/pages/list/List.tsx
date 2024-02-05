import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { getProducts } from "../../store/slice/products";
import ProductCard from "../../components/productCard/ProductCard";
import PieLoader from "../../components/pieLoader/PieLoader";
import { Message } from "primereact/message";

const List = () => {
  const params: any = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageName, setPageName] = useState<any>();
  const [data, setData] = useState<any>([]);
  const productDetails = useSelector((state: any) => state.productDetaild);
  const dispatch = useDispatch<AppDispatch>();
  const cartDetails = useSelector((state: any) => state.cartDetails);

  const fetchData = useCallback(async () => {
    try {
      const categories = await dispatch(getProducts({ category: params.id === 'all' ? '' : params.id }));
      setData(categories.payload?.data);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    setPageName(params.id);
    const fetchDataAndLog = async () => {
      await fetchData();
    };
    fetchDataAndLog();
  }, [fetchData, params.id]);

  return (
    <div>
      {productDetails.loading && <PieLoader />}
      {productDetails.error && <Message severity="error" text="Unable to fetch Data" />}
      {!productDetails.loading && !productDetails.error && !cartDetails.loading && !cartDetails.error && (  
        <ProductCard data={data} cartDetails={cartDetails}/>
      )}
    </div>
  );
};

export default List;
