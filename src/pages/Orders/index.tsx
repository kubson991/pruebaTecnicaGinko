import { withAuth } from "@/components/Authenticator";
import Layout from "@/components/Layout";
import { deleteOrder, getOrders } from "@/lib/features/Orders";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "@/styles/table.module.scss";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import Head from "next/head";
import { useEffect, useState } from "react";

const Orders = () => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      sortable: false,
      width: 70,
      flex: 0.5,
      filterable: false,
      disableColumnMenu: true,
      hideable: false,
      align: "center",
      headerAlign: "center",
      headerClassName: styles.tableHeader,
      cellClassName: styles.tableCell,
      minWidth: 80,
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      sortable: true,
      flex: 1,
      minWidth: 150,
      valueFormatter: (params) => {
        const date = new Date(params);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      },
      hideable: false,
      align: "center",
      headerAlign: "center",
      headerClassName: styles.tableHeader,
      cellClassName: styles.tableCell,
      
    },
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      flex: 1,
      hideable: false,
      align: "center",
      headerAlign: "center",
      headerClassName: styles.tableHeader,
      cellClassName: styles.tableCell,
      minWidth: 150,
    },
    {
      field: "shipTo",
      headerName: "Ship to",
      sortable: true,
      flex: 1,
      filterable: false,
      disableColumnMenu: true,
      hideable: false,
      align: "center",
      headerAlign: "center",
      headerClassName: styles.tableHeader,
      cellClassName: styles.tableCell,
      minWidth: 150,
    },
    {
      field: "paymentMethod",
      headerName: "Payment method",
      sortable: false,
      flex: 1,
      filterable: false,
      disableColumnMenu: true,
      hideable: false,
      align: "center",
      headerAlign: "center",
      headerClassName: styles.tableHeader,
      cellClassName: styles.tableCell,
      minWidth: 150,
    },
    {
      field: "saleAmount",
      headerName: "Amount",
      sortable: false,
      flex: 1,
      filterable: false,
      disableColumnMenu: true,
      hideable: false,
      align: "center",
      headerAlign: "center",
      headerClassName: styles.tableHeader,
      cellClassName: styles.tableCell,
      minWidth: 150,
    },
    {
      field: "actions",
      type: "actions",
      minWidth: 80,
      width: 100,
      align: "center",
      headerAlign: "center",
      headerClassName: styles.tableHeader,
      cellClassName: styles.tableCell,
      getActions: (data) => {
        return [
          <GridActionsCellItem
            key={"DeleteCell"}
            icon={<DeleteIcon sx={{fill:'purple',width:'1.5em',height:'1.5em'}}/>}
            label="Delete"
            sx={{
              color: "primary.main",
            }}
            onClick={() => handleRemoveElement(data)}
          />,
        ];
      },
    },
  ];

  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.Orders.orders);
  const user = useAppSelector((state) => state.AuthUser.user);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [rowIdActive, setRowIdActive] = useState<string>('')

  useEffect(() => {
    async function fetchOrders() {
      if (user) {
        await dispatch(getOrders(user));
      }
    }
    fetchOrders();
  }, []);

  function handleClose() {
    setDialogOpen(false)
    setRowIdActive('')
  }
  async function handleRemoveElement(data:GridRowParams<any>) {
    setRowIdActive(String(data.id))
    setDialogOpen(true)
  }
  async function removeElementByFetch() {
  if (user) {
    await dispatch(deleteOrder({user,orderId:rowIdActive}))
  }
  setDialogOpen(false)
  setRowIdActive('')
  }

  return (
    <>
      <Head>
        <title>Orders</title>
        <meta name="description" content="Orders Table" />
      </Head>
      <Layout>
      <Typography variant="h2" margin={3}>Table module</Typography>

      <Container
        className={styles.OrdersView}
      >

        {orders && (
          <Container component="section" sx={{ height: "70%" }}>
            <DataGrid
            sx={{maxHeight:'100%'}}
              disableColumnSelector
              autoHeight
              getRowHeight={() => 55}
              rows={orders}
              columns={columns}
              hideFooter
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 100 },
                },
              }}
            />
          </Container>
        )}
      </Container>
      <Dialog
        className={styles.dialog}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant="h4" component="h4" gutterBottom>
           Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" variant="h5" component="h5" textAlign="center" gutterBottom>
            Are you sure of deleting this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ fontSize: '1.2rem' }}>Disagree</Button>
          <Button onClick={removeElementByFetch} autoFocus sx={{ fontSize: '1.2rem' }}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      </Layout>
    </>
  );
};

export default withAuth(Orders);
