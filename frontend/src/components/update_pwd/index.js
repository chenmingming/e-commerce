import React, { useState } from "react";
import { LOGIN_FORM } from "../../constants";
import MyModal from "../../common/modal";

const UpdatePwd = ({ modalVisible = false }) => {
  const [visible, setVisible] = useState({ modalVisible });

  return (
    <>
      <MyModal
        titleText={LOGIN_FORM.UPDATE_PWD}
        header={
          <p>Enter your email link, we will send you the recovery link</p>
        }
        buttonText={LOGIN_FORM.BUTTON.UPDATE_PWD}
        pwd_visible={false}
        visible={visible}
        setVisible={setVisible}
      ></MyModal>
    </>
  );
};

export default UpdatePwd;
