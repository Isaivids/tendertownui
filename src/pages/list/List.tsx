import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { getProducts } from "../../store/slice/products";
import ProductCard from "../../components/productCard/ProductCard";
import { Message } from "primereact/message";
import { Paginator } from "primereact/paginator";
import { ProgressBar } from "primereact/progressbar";

const List = () => {
  const params: any = useParams();
  const [data, setData] = useState<any>([]);
  const productDetails = useSelector((state: any) => state.productDetaild);
  const userDetails = useSelector((state: any) => state.userDetails);
  const dispatch = useDispatch<AppDispatch>();
  //pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0)
  const onPageChange = (event:any) => {
      setPage(event.page);
      setFirst(event.first);
      setRows(event.rows);
  };

  const fetchData = useCallback(async () => {
    try {
      const products = await dispatch(getProducts({ category: params.id === 'all' ? '' : params.id, page : page, rows:rows }));
      setData(products.payload?.data);
      setTotalPage(products.payload.pagination.totalItems)
    } catch (error) {
      console.log('err',error)
    }
  }, [dispatch, page, params.id, rows]);

  useEffect(() => {
    const fetchDataAndLog = async () => {
      await fetchData();
    };
    fetchDataAndLog();
  }, [fetchData, params.id]);

  return (
    <div>
      {!userDetails.selectedUser.name && <Message className="m-2 w-full text-center" severity="error" text="Select a table to get Data" />}
      {productDetails.loading && <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>}
      {productDetails.error && <Message severity="error" text="Unable to fetch Data" />}
      {(!productDetails.loading && !productDetails.error && userDetails.selectedUser.name) && (  
        <>
          <ProductCard data={data} userDetails={userDetails}/>
          <Paginator first={first} rows={rows} totalRecords={totalPage} onPageChange={onPageChange} />
        </>
      )}
    </div>
  );
};

export default List;
