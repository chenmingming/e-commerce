import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";

const SigninModal = ({ show = false, setShow = () => {} }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>
            <div className="mb-3">
              <Button type="submit">Sign In</Button>
            </div>
          </Form>
          <Modal.Footer>
            <div className="mb-3">
              New customer?{" "}
              {/* <Link to={`/signup?redirect=${redirect}`}>Create your account</Link> */}
            </div>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SigninModal;
