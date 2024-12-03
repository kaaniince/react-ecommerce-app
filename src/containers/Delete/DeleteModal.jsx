import React from "react";
import styles from "./style.module.css"; // CSS Modules importu

const DeleteModal = ({
  handleDeleteConfirm,
  handleDeleteCancel,
  productToDelete,
}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Are you sure you want to delete this product?</h2>
        <p>{productToDelete?.title}</p>
        <button onClick={handleDeleteConfirm}>Yes, Delete</button>
        <button onClick={handleDeleteCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteModal;
