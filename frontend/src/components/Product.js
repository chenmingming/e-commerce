import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Rating from "./Rating";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";

export default function Product(props) {
  const { product } = props;
  const navigate = useNavigate();

  const { state, dispatch: cxtDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/product/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    cxtDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const deleteProductHandler = async (productId) => {
    try {
      await axios.delete(`/api/product/${productId}`, {
        headers: { Authorization: `${userInfo.token}` },
      });

      toast.success("Product deleted successfully");
      navigate("/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => {
              addToCartHandler(product);
            }}
          >
            Add to cart
          </Button>
        )}
        {userInfo && userInfo.isAdmin && userInfo._id === product.user ? (
          <>
            <Link to={`/admin/product/${product._id}`}>Edit</Link>
            <Button onClick={() => deleteProductHandler(product._id)}>
              <i className="fas fa-trash" />
            </Button>
          </>
        ) : (
          ""
        )}
      </Card.Body>
    </Card>
  );
}
