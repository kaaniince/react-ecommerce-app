import { fetchProduct } from "../../services";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./style.module.css";

const ProductDetail = () => {
  const [product, setProduct] = useState("");
  //   const params = useParams();
  const { productId } = useParams();

  const getData = async () => {
    try {
      const res = await fetchProduct(productId);
      setProduct(res.data);
      console.log(res);
    } catch {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.productDetail}>
      <div className={styles.backLink}>
        <Link to="/" className={styles.backLinkButton}>
          <i className="fas fa-arrow-left"></i> Back to Products
        </Link>
      </div>
      <div className={styles.productImageContainer}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>{product.title}</h2>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>${product.price}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
