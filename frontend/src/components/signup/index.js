import React, { useState } from "react";
import { LOGIN_FORM } from "../../constants";
import { Button } from "antd";
import MyModal from "../../common/modal";

const Signup = ({ modalVisible = false, popSignin = () => {} }) => {
  const [visible, setVisible] = useState({ modalVisible });

  const handleSignin = () => {
    popSignin();
  };

  return (
    <>
      <MyModal
        titleText={LOGIN_FORM.SIGNUP}
        buttonText={LOGIN_FORM.BUTTON.SIGNUP}
        footer={
          <p>
            Already have an account <a onClick={handleSignin}>Sign in</a>
          </p>
        }
        visible={visible}
        setVisible={setVisible}
      ></MyModal>
    </>
  );
};

export default Signup;
