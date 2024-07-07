
# Prueba Tecnica


This project is a Next.js application that uses Material-UI for UI components and TypeScript for type safety. The application includes private routes protected by a higher-order component (HOC) called Authenticator. Additionally, the project follows the GitFlow branching model for version control.

## Considerations

Since this is still a client-side web application without a server-side backend, there is no data persistence. When the app is reloaded, the data reverts to its default state thanks to Redux managment.

A obviuos security breach is that the token is a constant given by the backend "xd" but again without a sever to avoid the clientSide Logic for security it's just a demostration or a demo of what de app can do.

## Practices

All requests are managed using fetch from Redux with createAsyncThunk to track and control the status of the requests.

Orders page is not a SSR because the webApp don't have implemented cookies or another Authenticator for fetch so we have to implement clientSide rendering using a constant token given by our api which it's located in our localStorage after login.  

All interfaces used in the app are located in types folder ```src/types```.

Because the proyect is so small and we dont have a design System we dont use the ```theme``` api to create a custom theme for our MUI components instead we use the propertie ```sx``` of the MUI components and modify the stlyes inside them ,But I highly recommend migrating the majority of the styles to a custom MUI theme and making better use of SCSS modules if the proyect keep growing. However, for this demo, it wasn't necessary.

## Store

Store configuration is located in ```src/lib``` if you want to create a new slice for the store you have to create a file (in mayus) in ```src/lib/features``` and inside set and export the new Slide then import the slide in ```src/lib/crateAppSlice.ts``` once your slice is in ```combineSlices``` congrats you have a new slice in the store.
```
import { AuthSlide } from "./features/Login";
import { OrdersSlide } from "./features/Orders";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(
  AuthSlide,
  OrdersSlide
);
```

Another important think to keep in mind is that all slices have their own status state this is very important because our async petitions are actions inside our reducer. 

```
    pending: (state) => {
        state.status = "pending";
    },
    fulfilled: (state, action) => {
          state.user = action.payload;
          state.status = "accepted";
          setLocalStorageItem("user", action.payload);
    },
    rejected: (state) => {
          state.user = null;
          state.status = "rejected";
    }
```
## Tech Stack

**Client:** Next.js, Redux, MUI, TypeScript ,SCSS



## Git flow

The proyect uses git flow for branches control,to install:

```bash
  brew install git-flow-avh
  git flow init
  git switch master
```
    
## Run Locally

Clone the project

```bash
  git clone https://github.com/kubson991/pruebaTecnicaGinko.git
```

Go to the project directory

```bash
  cd pruebaTecnicaGinko

```

Install dependencies

```bash
  npm install
```

Start the server locally

```bash
  npm run dev
```


## API Reference

#### Log in

```http
  GET /api/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**.|
| `password` | `string` | **Required**.|

#### Get all orders

```http
  GET /api/orders
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Token of a logged user|

#### Delete a order
```http
  DELETE /api/orders
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `order_id` | `string` | **Required**. The id of the order to delete|
| `token` | `string` | **Required**. Token of a logged user|



## creating a private Route
In the page directory you have to create a React component and then export it wrapped in WithAuth as a param (private routes can only be accesed if an user es logged in)
```javascript
import { withAuth } from "@/components/Authenticator";

const Orders = () => {

  return (
    <>
    <h1>My private Route</h1>
    </>
  );
};

export default withAuth(Orders);

```


## JSON
In our ```src/data``` are located our JSON's users for the user that can log in

```javascript
{
    "users":[
        { "userEmail": "1@papa.com", "password": "1" },
        { "userEmail": "guest@papa.com", "password": "123" },
        { "userEmail": "admin@papa.com", "password": "123" },
        { "userEmail": "xd@papa.com", "password": "345" },
        { "userEmail": "standAlotne@papa.com", "password": "345" }
    ]
}  
```
And the orders for the Orders Route 

```javascript
{
"orders":[
    {
      "id": 1,
      "date": "2024-07-10",
      "name": "John Doe",
      "shipTo": "123 Main St, Anytown, USA",
      "paymentMethod": "Credit Card",
      "saleAmount": "$150.00"
    },
    {
      "id": 2,
      "date": "2024-07-09",
      "name": "Jane Smith",
      "shipTo": "456 Oak Ave, Othertown, USA",
      "paymentMethod": "PayPal",
      "saleAmount": "$99.99"
    },
    {
      "id": 3,
      "date": "2024-07-08",
      "name": "Bob Johnson",
      "shipTo": "789 Elm St, Anycity, USA",
      "paymentMethod": "Debit Card",
      "saleAmount": "$200.50"
    },
    {
      "id": 4,
      "date": "2024-07-07",
      "name": "Emily Brown",
      "shipTo": "567 Pine Ave, Somewhere, USA",
      "paymentMethod": "Cash",
      "saleAmount": "$75.25"
    },
    {
      "id": 5,
      "date": "2024-07-06",
      "name": "Michael Johnson",
      "shipTo": "890 Cedar St, Anywhere, USA",
      "paymentMethod": "Credit Card",
      "saleAmount": "$300.00"
    },
    {
      "id": 6,
      "date": "2024-07-05",
      "name": "Sarah Davis",
      "shipTo": "345 Birch Rd, Elsewhere, USA",
      "paymentMethod": "PayPal",
      "saleAmount": "$125.50"
    },
    {
      "id": 7,
      "date": "2024-07-04",
      "name": "Chris Lee",
      "shipTo": "901 Maple Ave, Nowhere, USA",
      "paymentMethod": "Debit Card",
      "saleAmount": "$175.75"
    },
    {
      "id": 8,
      "date": "2024-07-03",
      "name": "Emma Wilson",
      "shipTo": "234 Oak St, Everywhere, USA",
      "paymentMethod": "Cash",
      "saleAmount": "$50.00"
    },
    {
      "id": 9,
      "date": "2024-07-02",
      "name": "Daniel Taylor",
      "shipTo": "678 Elm Ave, Anyplace, USA",
      "paymentMethod": "Credit Card",
      "saleAmount": "$225.30"
    },
    {
      "id": 10,
      "date": "2024-07-01",
      "name": "Olivia Martinez",
      "shipTo": "123 Pine Rd, Somewheretown, USA",
      "paymentMethod": "PayPal",
      "saleAmount": "$180.20"
    },
    {
      "id": 11,
      "date": "2024-06-30",
      "name": "James Garcia",
      "shipTo": "456 Cedar Ave, Otherplace, USA",
      "paymentMethod": "Debit Card",
      "saleAmount": "$95.99"
    },
    {
      "id": 12,
      "date": "2024-06-29",
      "name": "Ava Rodriguez",
      "shipTo": "789 Birch Rd, Anotherplace, USA",
      "paymentMethod": "Cash",
      "saleAmount": "$120.75"
    }
  ]
}  
```
## Routes

We only have 2 routes for this demo, since the Login is the main route of the app is located in ```/``` Route and ```/Orders``` is the protected Route that need a token in the localStorage if not will be redirected to ```/```

`/`

`/Orders`

