import React, { useState } from "react";
import { LOGIN_FORM } from "../../constants";
import { Button } from "antd";
import "./index.css";
import MyModal from "../../common/modal";

const Signin = ({
  modalVisible = false,
  handleLogin = () => {},
  popSignup = () => {},
  popUpdatePwd = () => {},
}) => {
  const [visible, setVisible] = useState({ modalVisible });

  const handleSignup = () => {
    popSignup();
  };

  const handleUpdatePwd = () => {
    popUpdatePwd();
  };

  const handleButtonClick = () => {
    handleLogin();
    setVisible(false);
  };

  return (
    <>
      <MyModal
        titleText={LOGIN_FORM.SIGNIN}
        buttonText={LOGIN_FORM.BUTTON.SIGNIN}
        footer={
          <p>
            Don't have an account? <a onClick={handleSignup}>Sign up</a>
            <a className="footer-forgot-pwd" onClick={handleUpdatePwd}>
              Forgot password?
            </a>
          </p>
        }
        visible={visible}
        setVisible={setVisible}
        handleButtonClick={handleButtonClick}
      ></MyModal>
    </>
  );
};

export default Signin;
