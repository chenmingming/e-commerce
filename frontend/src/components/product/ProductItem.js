import React from "react";

const ProductItem = ({ product }) => {
  return <div key={product.slug}>{product.name}</div>;
};

export default ProductItem;
