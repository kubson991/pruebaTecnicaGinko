import { withAuth } from "@/components/Authenticator";
import { deleteOrder, getOrders } from "@/lib/features/Orders";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "@/styles/table.module.scss";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography,Stack } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

const Orders = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.Orders.orders);
  const user = useAppSelector((state) => state.AuthUser.user);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [rowIdActive, setRowIdActive] = useState<string>('')

  function handleClose() {
    setDialogOpen(false)
    setRowIdActive('')
  }
  async function handleRemoveElement(data: any) {
    setRowIdActive(data.id)
    setDialogOpen(true)
  }
async function removeElementByFetch() {
  if (user) {
    await dispatch(deleteOrder({user,orderId:rowIdActive}))
  }
  setDialogOpen(false)
  setRowIdActive('')
}
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
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      sortable: true,
      flex: 1,
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
    },
    {
      field: "actions",
      type: "actions",

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
            onClick={() => handleRemoveElement(data as object)}
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    async function fetchOrders() {
      if (user) {
        await dispatch(getOrders(user));
      } else {
        router.push("/login"); // Redirige al usuario a la página de login si no está autenticado
      }
    }
    fetchOrders();
  }, []);

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
        <DialogTitle id="alert-dialog-title">
        <Typography mt={2} variant="h4" component="h4" gutterBottom>Delete</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
        <Typography variant="h5" component="h4" textAlign="center" gutterBottom>
            Are you sure of deleting this order?
            </Typography>
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
