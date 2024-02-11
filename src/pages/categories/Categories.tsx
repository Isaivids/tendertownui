import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import AddPopup from "./AddPopup";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory, getCategory } from "../../store/slice/category";
import { AppDispatch } from "../../store/store";

const Categories = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const categoryDetails = useSelector((state: any) => state.categoryDetals);
  const dispatch = useDispatch<AppDispatch>();
  const [mode, setMode] = useState("");
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState({});

  const customBase64Uploader = async (event: any) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      selectedFile.type === "application/vnd.ms-excel"
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64data: any = reader.result;
        // setfile({ ...file, file: base64data, name: selectedFile.name });
      };

      reader.readAsDataURL(selectedFile);
    } else {
      event.target.value = null;
      // setfile({ ...file, error: "Upload only Excel file" });
    }
  };

  const deleteProductOne = async(options:any) =>{
    console.log(options._id)
    try {
      const rs = await dispatch(deleteCategory({id : options._id}));
      if (rs.payload.status && !categoryDetails.body.loading) {
        setData(rs.payload.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ActionsTemplate = (options: any) => {
    return (
      <div className="flex ">
        <span className="text-teal-600 text-xl cursor-pointer">
          <MdEditDocument onClick={(e: any) => showDialog("update", options)} />
        </span>
        <span className="text-red-500	text-xl cursor-pointer">
          <RiDeleteBin6Fill onClick={() => deleteProductOne(options)}/>
        </span>
      </div>
    );
  };

  const handleSubmit = async (type: any, item: any) => {
    try {
      if (type === "add") {
        const rs: any = await dispatch(addCategory([item]));
        if (rs.payload.status && !categoryDetails.body.loading) {
          setData(rs.payload.data);
        }
      } else {
        // const rs:any = await dispatch(updateProduct(item));
        // if(rs.status){
        //   await dispatch(getProducts({ category: "" }));
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageTemplate = (options: any) => {
    return (
      <div className="flex">
        <img src={options.image} alt={options.description} width="32" />
      </div>
    );
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await dispatch(getCategory());
      setData(response.payload.data);
    };
    fetchCategories();
  }, [dispatch]);

  const DataTableComp = () => {
    return (
      <div className="py-3 w-100">
        <DataTable
          value={data}
          scrollable
          scrollHeight="80vh"
          sortMode="multiple"
          showGridlines
          paginator
          rows={5}
        >
          <Column
            field="image"
            header="Image"
            body={imageTemplate}
            sortable
          ></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="description" header="Description" sortable></Column>
          <Column field="categoryId" header="Category ID" sortable></Column>
          <Column
            field="actions"
            header="Actions"
            body={ActionsTemplate}
          ></Column>
        </DataTable>
      </div>
    );
  };

  const showDialog = (type: string, options: any) => {
    setEdit(options);
    setMode(type);
    setPopupVisible(true);
  };
  return (
    <div className="w-full p-3">
      {categoryDetails.loading ? (
        "Loading"
      ) : (
        <div>
          <div className="flex justify-content-between">
            <Button
              label="Add Category"
              severity="success"
              onClick={() => showDialog("add", {})}
            />
          </div>
          <AddPopup
            popupVisible={popupVisible}
            setPopupVisible={setPopupVisible}
            mode={mode}
            handleSubmit={handleSubmit}
            edit={edit}
          />
          <DataTableComp />
        </div>
      )}
    </div>
  );
};

export default Categories;
