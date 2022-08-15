import React, { useEffect, useState } from "react";
import "./index.css";

const ProductList = () => {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/productlist")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <header>
        <a href="/">Amazona</a>
      </header>
      <main>
        <h1>Featured Products</h1>
        <div className="products">
          {data.map((product) => (
            <div className="product" key={product.slug}>
              <a href={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <div className="product-info">
                <a href={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </a>
                <p>
                  <strong>${product.price}</strong>
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* {data.map((product) => {
        return <ProductItem product={product} key={product.slug} />;
      })} */}
    </div>
  );
};

export default ProductList;
