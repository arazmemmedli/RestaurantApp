import React from 'react';
import { Header, Layout, Home, OrderCreate, ViewOrders, AddOrderStep2, DetailOrder } from "./export/export";
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Login from './signin/Login';

function App() {
  const { author } = useSelector((state: RootState) => state.auth);

  const RequireAuth = ({ children }: { children: any }) => {
    return author ? children : <Navigate to={"/login"} />;
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/create-order" element={<OrderCreate />} />
          <Route path="/add-order" element={<AddOrderStep2 />} />
          <Route path="/orders" element={<ViewOrders />} />
          <Route path="/order/detail/:id" element={<DetailOrder />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
