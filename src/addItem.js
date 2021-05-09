import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = ({ onSave, itemData, onUpdate }) => {
  const [editItemDetails, setEditItemDetails] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  //let isEditValues = false;
  useEffect(() => {
    //alert(editItemDetails);
    // setEditItemDetails(itemData);
    populateEditValues();
    //setName(itemData.name);
    //setDescription(itemData.description);
    //setPrice(itemData.price);
  }, [itemData]);
  const populateEditValues = () => {
    // if (itemData !== {}) {
    //   console.log("ENTERS   ", itemData.name);
    //   //console.log(itemData.name);
    // }
    // console.log(!itemData);
    setName(itemData.name);
    setDescription(itemData.description);
    setPrice(itemData.price);
    setId(itemData._id);
    //setEditItemDetails(false);
    if (itemData.name != undefined) {
      setEditItemDetails(false);
    }
  };
  const saveInventory = async () => {
    if (!(name && description && price)) {
      toast.error(" Name ,Description,Price is mandatory!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      console.log(name, "    ", description, "   ", price);
      return false;
    }
    await onSave(name, description, price);
    setName("");
    setDescription("");
    setPrice("");
    setId("");
  };
  const updateInventory = async () => {
    await onUpdate(id, name, description, price);
    setEditItemDetails(true);
    setName("");
    setDescription("");
    setPrice("");
    setId("");
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "Black",
          fontFamily: "Calibri",
          fontSize: "20px",
          color: "white",
          fontWeight: "bold",
        }}
      >
        <div style={{ marginLeft: "4em" }}>Shop Bridge</div>
      </div>
      <div
        style={{
          backgroundColor: "Transparent",
          fontFamily: "Calibri",
          fontSize: "20px",
          color: "Black",
          marginTop: "1em",
        }}
      >
        <div style={{ marginLeft: "4em" }}>
          {editItemDetails && <>Add</>}
          {!editItemDetails && <>Edit</>}
        </div>
        <div
          style={{
            marginLeft: "5em",
            marginTop: "1em",
            color: "grey",
            fontSize: "16px",
          }}
        >
          Inventory item
        </div>
        <div style={{ marginLeft: "4em", marginTop: "1em" }}>
          <TextField
            id="outlined-basic"
            label="Name*"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ marginLeft: "4em", marginTop: "1em" }}>
          <TextField
            id="outlined-basic"
            label="Description*"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div style={{ marginLeft: "4em", marginTop: "1em" }}>
          <TextField
            id="outlined-number"
            label="Price*"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={price}
            variant="outlined"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div style={{ marginLeft: "4em", marginTop: "1em" }}>
          {editItemDetails && (
            <Button variant="contained" color="primary" onClick={saveInventory}>
              Add
              {/* {editItemDetails && <>Save</>} */}
            </Button>
          )}
          {!editItemDetails && (
            <Button
              variant="contained"
              color="primary"
              onClick={updateInventory}
            >
              Save
              {/* {editItemDetails && <>Save</>} */}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Add;
