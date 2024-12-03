import { Link } from "react-router-dom";
import styles from "./style.module.css";

const ProductCard = ({ product, handleRemove, handleEdit }) => {
  return (
    <div className={styles.productCard}>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <p>{product.title}</p>
        <p>$ {product.price}</p>
      </Link>
      <div className={styles.buttonContainer}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleRemove(product.id);
          }}
        >
          Delete
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleEdit(product.id);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
