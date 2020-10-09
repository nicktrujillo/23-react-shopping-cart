import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newItem, selectItems } from "./cartSlice";
import styles from "./Cart.module.css";

export function Cart() {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  console.log(items);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
}
