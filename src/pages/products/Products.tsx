import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getProducts } from "../../store/slice/products";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./Product.scss";
import { getCategory } from "../../store/slice/category";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<any>([]);
  const categoryDetails = useSelector((state: any) => state.categoryDetals);
  const fetchData = useCallback(async () => {
    try {
      const data = await dispatch(getProducts({ category: "" }));
      await dispatch(getCategory());
      setData(data.payload?.data);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const imageTemplate = (options:any) => {
    return (
      <div className="flex">
        <img src={options.photo} alt={options.desc} width="32" />
      </div>
    )
  };

  const categoryTemplate = (options:any) =>{
    const category = categoryDetails.body.data.find((cat:any) => cat.categoryId === options.category);
    return category ? category.name : '';
  }

  const ActionsTemplate = (options:any) =>{
    return(
      <span>sd</span>
    )
  }

  const DataTableComp = () => {
    return (
      <div className="p-2 w-100">
        <DataTable
          value={data}
          scrollable
          scrollHeight="80vh"
          sortMode="multiple"
          showGridlines 
          paginator rows={5} 
        >
          <Column 
            field="photo" 
            header="Image" 
            body = {imageTemplate}
            style={{ width: "10%" }}
            sortable 
          ></Column>
          <Column 
            field="gst" 
            header="GST" 
            style={{ width: "10%" }}
            sortable 
          ></Column>
          <Column 
            field="name" 
            header="Name" 
            style={{ width: "20%" }}
            sortable 
          ></Column>
          <Column
            field="amount"
            header="Amount"
            style={{ width: "10%" }}
            sortable
          ></Column>
          <Column
            field="category"
            header="Category"
            body = {categoryTemplate}
            style={{ width: "30%" }}
            sortable 
          ></Column>
          <Column
            field="actions"
            header="Actions"
            body = {ActionsTemplate}
            style={{ width: "20%" }}
          ></Column>
        </DataTable>
      </div>
    );
  };

  useEffect(() => {
    const fetchDataAndLog = async () => {
      await fetchData();
    };
    fetchDataAndLog();
  }, [fetchData]);

  return (
    <div>
        {(!categoryDetails.loading && !categoryDetails.error) &&
          <DataTableComp />
        }
    </div>
  );
};

export default Products;
