import React from "react";
import styles from "./style.module.css";

const FilterPrice = ({
  minPrice,
  maxPrice,
  handleMinPriceChange,
  handleMaxPriceChange,
  validatePriceRange,
}) => {
  return (
    <div className={styles.filterPrice}>
      <label>
        Min Price:{" "}
        <input
          type="number"
          value={minPrice}
          min="0"
          max="10000"
          step="1"
          onChange={handleMinPriceChange}
          onBlur={validatePriceRange}
        />
      </label>
      <label>
        Max Price:{" "}
        <input
          type="number"
          value={maxPrice}
          min="0"
          max="10000"
          step="1"
          onChange={handleMaxPriceChange}
          onBlur={validatePriceRange}
        />
      </label>
    </div>
  );
};

export default FilterPrice;
