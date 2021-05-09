import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Add from "./addItem";
import { BASE_URL } from "./utils/endpoint";
import { api } from "./API/apiconfiguration";
import SampleTable from "./table";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Inventory = () => {
  const [addedList, setAddedList] = useState([]);
  const [editItem, setEditItem] = useState({});

  useEffect(async () => {
    const URL = `${BASE_URL}`;
    const getSavedData = await api.get(URL);
    setAddedList(getSavedData.data);
    console.log(getSavedData.data);
  }, []);

  const addItemToInventory = async (name, description, price) => {
    const URL = `${BASE_URL}`;
    const body = {
      name,
      description,
      price,
    };
    const addItem = await api.post(URL, { body });
    toast.success("Inventory saved sucessfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
    });
    const getItem = await api.get(URL);
    setAddedList(getItem.data);
  };

  const deleteItemInventory = async (id) => {
    const deleteUrl = `${BASE_URL}/${id}`;
    const getUrl = `${BASE_URL}`;
    const deleteItem = await api.delete(deleteUrl);
    toast.success("Inventory deleted sucessfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
    });
    const getItem = await api.get(getUrl);
    setAddedList(getItem.data);
  };

  const editItemInventory = async (id) => {
    // alert("edit     ", id);
    const editUrl = `${BASE_URL}/${id}`;
    const getItem = await api.get(editUrl);
    setEditItem(getItem.data);
    console.log({ getItem });
  };
  const updateInventoryItem = async (id, name, description, price) => {
    const updateUrl = `${BASE_URL}/${id}`;
    const body = {
      name,
      description,
      price,
    };
    const updateInventory = await api.put(updateUrl, { body });
    const getUrl = `${BASE_URL}`;
    const getItem = await api.get(getUrl);
    setAddedList(getItem.data);
    setEditItem({});
    toast.success("Inventory updated sucessfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
    });
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      {/* Same as */}
      <Add
        onSave={addItemToInventory}
        itemData={editItem}
        onUpdate={updateInventoryItem}
      ></Add>
      <div style={{ padding: "2em" }}>
        <SampleTable
          list={addedList}
          onDelete={deleteItemInventory}
          onEdit={editItemInventory}
        ></SampleTable>
      </div>
    </div>
  );
};
ReactDOM.render(<Inventory />, document.getElementById("root"));
