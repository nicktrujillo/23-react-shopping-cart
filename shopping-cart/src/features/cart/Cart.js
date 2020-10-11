import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from 'gsap';
import {
  removeItem,
  selectItems,
  displayCart,
  toggleCart,
  increaseTotal,
  decreaseQuantity,
  increaseQuantity,
} from "./cartSlice";
import styles from "./Cart.module.css";

export function Cart() {
  const items = useSelector(selectItems);
  const showCart = useSelector(displayCart);
  const prices = useSelector(increaseTotal);
  const dispatch = useDispatch();
  console.log(prices);

  useEffect(() => {
    gsap.from("#cartItem", {
      duration: 1,
      scale: 0.5, 
      opacity: 0, 
      ease: "elastic", 
      stagger: 0.2,
      force3D: true
    });
    gsap.from("#img", {
      duration: 0.5,
      x: 300,
      stagger: 0.2,
    })
    gsap.from("#cart", {
      duration: 0.5,
      y: -300,
    })
  }, [showCart])


  

  return (
    <div>
      <div className={styles.header}>
        <p className={styles.itemsFound}>17 Product(s) found</p>
        <div className={styles.cartIcon} onClick={() => dispatch(toggleCart())}>
          <div className={styles.quantityCircle}>{prices.length}</div>
          <i className="fas fa-shopping-cart"></i>
        </div>
      </div>
      {showCart ? (
        <div className={styles.shoppingCart} id="cart">
          <h1 className={styles.cartTitle}>Your Cart</h1>
          {items.length == 0 ? (
            <p className={styles.noItems}>no items in cart 😞</p>
          ) : null}
          {items.map((item) => (
            <div id="cartItem" className={styles.cartItem} key={item.sku}>
              <img id="img" className={styles.itemThumb} src={item.img.thumb}></img>
              <div className={styles.descSection}>
                <p>{item.title}</p>
                <div className={styles.sizeFlex}>
                  <p className={styles.size}>{item.availableSizes[0]}</p>
                  <p>{item.style}</p>
                </div>
                <p className={styles.quantity}>Quantity: {item.quantity}</p>
              </div>
              <div className={styles.priceSection}>
                <p
                  className={styles.deleteItem}
                  onClick={() => dispatch(removeItem(item))}
                >
                  X
                </p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
                <div>
                  <button
                    className={styles.quantityButtons}
                    disabled={item.quantity <= 1 ? true : false}
                    onClick={() => dispatch(decreaseQuantity(item))}
                  >
                    -
                  </button>
                  <button
                    className={styles.quantityButtons}
                    onClick={() => dispatch(increaseQuantity(item))}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.subtotalFlex}>
            <div className={styles.totalPriceFlex}>
              <h3 className={styles.subtotal}>Subtotal</h3>
              <h2 className={styles.totalPrice}>
                ${Number(prices.reduce((a, b) => a + b.price, 0)).toFixed(2)}
              </h2>
            </div>
            <button className={styles.checkout}>CHECKOUT</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
