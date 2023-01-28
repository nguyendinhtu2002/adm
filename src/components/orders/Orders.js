import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from "react-redux";
import { listStatus } from "../../Redux/Actions/statusActions";
import { deleteOrder } from "../../Redux/Actions/OrderActions";
import FilterComponent from "../Filter/FilterComponent";

const Orders = (props) => {
  const { orders } = props;
  const dispatch = useDispatch();
  const statusOrders = useSelector((state) => state.statusOrders)
  const { status } = statusOrders
  const [search, SetSearch] = useState('')
  const [data, setData] = useState(orders)
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(
    false
  );

  const arr = []
  const handlerDelete = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteOrder(id))
    }
  }

  useEffect(() => {
    dispatch(listStatus(arr.toString()))
    const result = orders.filter(idUser => {
      return idUser.user.toLowerCase().match(search.toLowerCase())
    })
    setData(result)
  }, [dispatch, search])
  const filteredItems = data?.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  const columns = [
    {
      name: "ID",
      selector: (row) => row._id
    },
    {
      name: "ID User",
      selector: (row) => row.user,
      sortable: true,
    },
    {
      name: "Service",
      selector: (row) => (arr.push(row.orderItems[0].order), row.orderItems[0].service)
    },
    {
      name: "Quality",
      selector: (row) => row.orderItems[0].quanlity,
    },
    {
      name: "Link",
      selector: (row) => row.orderItems[0].link
    },
    {
      name: "Total Price",
      selector: (row) => row.totalPrice
    }, {
      name: "Status",
      selector: (row) => row.orderStatus
    },
    {
      name: "Action",
      selector: (row) =>
        <button type="button" onClick={() => handlerDelete(row._id)} className="btn btn-primary">Delete</button>
    }
  ]
  return (

    <DataTable
      columns={columns}
      data={filteredItems}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="450px"
      progressComponent
      selectableRows
      selectableRowsHighlight
      subHeader
      subHeaderComponent={
        subHeaderComponent
      }
    />
  );
};

export default Orders;
