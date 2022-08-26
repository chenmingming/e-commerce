import React, { useEffect, useReducer } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import Product from "../components/Product";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  const [{ loading, error, products, pages }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  // Use axios to get backend data.
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `/api/product?page=${page}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, [order, page]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const sortOrder = filter.order || order;
    return `/?page=${filterPage}&order=${sortOrder}`;
  };

  // Use React fetch API to fetch data from backend
  //   const [products, setProducts] = useState([]);
  //   useEffect(() => {
  //     fetch("/productlist")
  //       .then((res) => res.json())
  //       .then((data) => setProducts(data));
  //   }, []);

  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <Row className="justify-content-between mb-3">
        <Col>
          <h1>Featured Products</h1>
        </Col>
        <Col className="text-end mt-3">
          Sort by{" "}
          <select
            value={order}
            onChange={(e) => {
              navigate(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </Col>
      </Row>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <div>
              {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                  key={x + 1}
                  className="mx-1"
                  to={getFilterUrl({ page: x + 1 })}
                >
                  <Button
                    className={Number(page) === x + 1 ? "text-bold" : ""}
                    variant="light"
                  >
                    {x + 1}
                  </Button>
                </LinkContainer>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
