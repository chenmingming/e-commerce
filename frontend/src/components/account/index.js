import React, { useState } from "react";
import { LOGIN_FORM } from "../../constants";
import { Button } from "antd";
import Signin from "../signin";
import Signup from "../signup";
import UpdatePwd from "../update_pwd";

const Account = ({ handleLogin = () => {} }) => {
  const [accountState, setAccountState] = useState("OTHER");

  const handleLoginButton = () => {
    setAccountState("SIGNIN");
  };

  const popSignup = () => {
    setAccountState("SIGNUP");
  };

  const popUpdatePwd = () => {
    setAccountState("UPDATE_PWD");
  };

  const popSignin = () => {
    setAccountState("SIGNIN");
  };

  return (
    <>
      <Button type="primary" onClick={handleLoginButton}>
        {LOGIN_FORM.LOGIN}
      </Button>

      {accountState === "SIGNIN" ? (
        <Signin
          modalVisible={true}
          handleLogin={handleLogin}
          popSignup={popSignup}
          popUpdatePwd={popUpdatePwd}
        />
      ) : accountState === "SIGNUP" ? (
        <Signup modalVisible={true} popSignin={popSignin} />
      ) : accountState === "UPDATE_PWD" ? (
        <UpdatePwd modalVisible={true} />
      ) : (
        ""
      )}
    </>
  );
};

export default Account;
