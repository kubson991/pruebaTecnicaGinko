import { getOrders } from "@/lib/features/Orders";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    Container
} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Head from "next/head";
import { useEffect } from "react";

export default function Orders() {
  const dispatch = useAppDispatch();
  const statusOrders = useAppSelector((state) => state.Orders.status);
  const orders = useAppSelector((state) => state.Orders.orders);
  const user = useAppSelector((state) => state.AuthUser.user);


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id',sortable: false, width: 70,flex:0.5 ,filterable: false,disableColumnMenu: true},
    { field: 'date', headerName: 'Date',type:'date',sortable: true,flex:1},
    { field: 'name', headerName: 'Name',sortable: true, flex:1},
    {
      field: 'shipTo',
      headerName: 'Ship to',
      sortable: true,flex:1,filterable: false,disableColumnMenu: true
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment method',
      sortable: false,flex:1,filterable: false,disableColumnMenu: true
    },
    {
      field: 'saleAmount',
      headerName: 'Amount',
      sortable: false,flex:1,filterable: false,disableColumnMenu: true
    },
  ];
  useEffect(() => {
    async function fetchOrders() {
        if (user) {
          await dispatch(getOrders(user));
        }
      }
    fetchOrders();
  },[]);

  useEffect(() => {
    if (statusOrders === "accepted") {
    } else if (statusOrders === "rejected") {
    }
  }, [statusOrders]);

  return (
    <>
      <Head>
        <title>Orders</title>
        <meta name="description" content="Orders Table" />
      </Head>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {orders && (
            <Container component="section" sx={{height:'70%'}}>
      <DataGrid
      
      rows={orders}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
    />
    </Container>
        )}
      </Container>
    </>
  );
}
