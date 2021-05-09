import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Table, Tag, Space } from "antd";
import "antd/dist/antd.css";

const SampleTable = ({ list, onDelete, onEdit }) => {
  const tableData = {
    bordered: false,
    loading: false,
    size: "middle",
    ColumnGroup: { title: <h1>Hello, world</h1> },
    scroll: undefined,
    top: "none",
  };
  const deleteInventory = (id) => {
    //alert(id);
    onDelete(id);
  };
  const editInventory = (id) => {
    //alert("table    ", id);
    onEdit(id);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 80,
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 150,
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 50,
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (text, record) => (
        <Space size="middle">
          <div
            onClick={() => editInventory(record._id)}
            style={{ color: "blue" }}
          >
            <EditIcon></EditIcon>
          </div>
          <a
            onClick={() => deleteInventory(record._id)}
            style={{ color: "red" }}
          >
            <DeleteIcon></DeleteIcon>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ marginLeft: "4em" }}>
      <div
        style={{
          backgroundColor: "Transparent",
          fontFamily: "Calibri",
          fontSize: "20px",
          color: "Black",
          marginTop: "1em",
        }}
      >
        <div>List</div>
        <div
          style={{
            marginTop: "1em",
            color: "grey",
            fontSize: "16px",
          }}
        >
          Inventory items
        </div>
      </div>
      <div style={{ marginTop: "1em" }}>
        <Table
          {...tableData}
          columns={columns}
          dataSource={list}
          bordered={true}
          pagination={{ pageSize: 4 }}
        />
      </div>
    </div>
  );
};
export default SampleTable;
//ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);
