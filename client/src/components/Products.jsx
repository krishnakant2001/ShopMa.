import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

import Product from "./Product";

import axios from "axios";
// import { popularProducts } from "../data";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?catfegory=${cat}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setfilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setfilteredProducts((prev) => {
        [...prev].sort((a, b) => a.createdAt - b.createdAt);
      });
    } else if (sort === "asc") {
      setfilteredProducts((prev) => {
        [...prev].sort((a, b) => a.price - b.price);
      });
    } else {
      setfilteredProducts((prev) => {
        [...prev].sort((a, b) => b.price - a.price);
      });
    }
  }, [sort]);
  return (
    <Container>
      {cat
        ? filteredProducts?.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            ?.map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
