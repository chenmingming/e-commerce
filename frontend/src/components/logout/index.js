import React, { useState } from "react";
import { LOGIN_FORM } from "../../constants";
import { Button } from "antd";
import MyModal from "../../common/modal";

const Logout = ({ handleLogout = () => {} }) => {
  return (
    <>
      <Button type="primary" onClick={handleLogout}>
        {LOGIN_FORM.LOGOUT}
      </Button>
    </>
  );
};

export default Logout;
