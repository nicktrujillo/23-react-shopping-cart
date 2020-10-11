import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, selectProducts } from "./productsSlice";
import styles from "./Products.module.css";
import { addItem, displayCart } from "../cart/cartSlice.js";

export function Products() {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  let installation = (price, installments) => {
    return (price / installments).toFixed(2);
  };

  return (
    <div className={styles.productPage}>
      <div className={styles.productGrid}>
        {products.map((item) => (
          <div
            className={styles.productSquare}
            onClick={() => dispatch(addItem(item))}
            key={item.sku}
          >
            {item.isFreeShipping ? (
              <div className={styles.shipping}>free shipping</div>
            ) : null}
            <img className={styles.productImage} src={item.img.normal}></img>
            <p>{item.title}</p>
            <p className={styles.underscore}>____</p>
            <p className={styles.price}>${item.price.toFixed(2)}</p>
            {item.installments !== 0 ? (
              <p className={styles.installments}>
                or {item.installments} x $
                {installation(item.price, item.installments)}
              </p>
            ) : (
              <p></p>
            )}
            <button className={styles.addToCart}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
