import React, { useState } from "react";
import "antd/dist/antd.css";
import Account from "../components/account";
import Logout from "../components/logout";
import ProductList from "../components/product/ProductList";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {/* {isLoggedIn ? (
        <Logout handleLogout={() => setIsLoggedIn(false)} />
      ) : (
        <Account handleLogin={() => setIsLoggedIn(true)} />
      )} */}

      <ProductList />
    </>
  );
}

export default Home;
