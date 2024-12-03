import React from "react";
import styles from "./style.module.css"; // CSS Modules importu
import { useState } from "react";

const EditModal = ({ editProduct, handleCloseModal, handleSaveModal }) => {
  if (!editProduct) return null; // Ürün yoksa modalı gösterme
  const [updatedProduct, setUpdatedProduct] = useState({
    ...editProduct,
  });

  // Input değişikliklerini kontrol eden fonksiyon
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [name]: value, // İlgili input alanını güncelliyoruz
    }));
  };
  const handleSave = () => {
    handleSaveModal(updatedProduct); // Güncellenmiş ürünü üst bileşene gönderiyoruz
    handleCloseModal(); // Modalı kapatıyoruz
  };
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Edit Product</h2>
        <p>ID: {editProduct.id}</p>

        <div>
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            name="title"
            value={updatedProduct.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="price">Price: </label>
          <input
            id="price"
            type="number"
            name="price"
            value={updatedProduct.price}
            onChange={handleInputChange}
          />
        </div>

        <button onClick={handleSave}>Save</button>
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default EditModal;
