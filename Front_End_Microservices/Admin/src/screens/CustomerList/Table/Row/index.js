import React, { useState } from "react";
import styles from "./Row.module.sass";
import cn from "classnames";
import Checkbox from "../../../../components/Checkbox";
import Balance from "../../../../components/Balance";

const imgUrl = process.env.IMAGE_URL || "http://localhost:3001/images/";
const Row = ({
  item,
  value,
  onChange,
  activeTable,
  setActiveTable,
  activeId,
  setActiveId,
}) => {
  const handleClick = (id) => {
    setActiveTable(true);
    setActiveId(id);
  };

  return (
    <>
      <div
        className={cn(
          styles.row,
          { [styles.selected]: activeId === item.id },
          { [styles.active]: activeTable }
        )}
      >
        <div className={styles.col}>
          <Checkbox
            className={styles.checkbox}
            value={value}
            onChange={onChange}
          />
        </div>
        <div className={styles.col}>
          <div className={styles.item} onClick={() => handleClick(item.id)}>
            <div className={styles.avatar}>
              <img src={`${imgUrl}/${item.avatar}`}  alt="Avatar" />
            </div>
            <div className={styles.details}>
              <div className={styles.displayname}>{item.displayname}</div>
              <div className={styles.username}>@{item.username}</div>
              <div className={styles.email}>{item.email}</div>
            </div>
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.email}>{item.email}</div>
        </div>
        <div className={styles.col}>
          <div className={cn("status-green-dark", styles.phone)}>
            {item.phone}
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.comments}>
            {/* <div className={styles.price}>${item.price}</div>
            <Balance className={styles.balance} value={item.balance} /> */}
          </div>
        </div>
        <div className={styles.col}>{item.likes}</div>
        <div className={styles.col}>{item.role}</div>
      </div>
    </>
  );
};

export default Row;
