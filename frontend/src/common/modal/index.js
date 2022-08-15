import React, { useState } from "react";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { LOGIN_FORM } from "../../constants";
import "./index.css";
import TextInput from "../input/textInput";

const MyModal = ({
  titleText = "",
  header = "",
  buttonText = "",
  pwd_visible = true,
  footer = "",
  visible = false,
  setVisible = () => {},
  handleButtonClick = () => {},
}) => {
  const [email, setEmail] = useState({
    value: "",
    errorMessage: "",
  });
  const [password, setPassword] = useState({
    value: "",
    errorMessage: "",
  });

  return (
    <>
      <Modal
        width={400}
        closeIcon={<CloseCircleOutlined />}
        title={<div className="modal-title">{titleText}</div>}
        visible={visible}
        footer={null}
        onCancel={() => {
          setVisible(false);
        }}
      >
        {header}
        <TextInput
          value={email.value}
          label={LOGIN_FORM.EMAIL.LABEL}
          placeholder={LOGIN_FORM.EMAIL.PLACE_HOLDER}
          infoMessage={LOGIN_FORM.EMAIL.INFO_MESSAGE}
          errorMessage={email.errorMessage}
          onChange={(e) => setEmail({ ...email, value: e.target.value })}
        />
        {pwd_visible ? (
          <TextInput
            value={password.value}
            label={LOGIN_FORM.PASSWORD.LABEL}
            errorMessage={password.errorMessage}
            onChange={(e) =>
              setPassword({ ...password, value: e.target.value })
            }
          />
        ) : (
          ""
        )}

        <Button className="modal-button" onClick={handleButtonClick}>
          {buttonText}
        </Button>
        {footer}
      </Modal>
    </>
  );
};

export default MyModal;
