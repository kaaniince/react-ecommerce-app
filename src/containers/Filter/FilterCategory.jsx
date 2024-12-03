import React from "react";
import styles from "./style.module.css";

const FilterCategory = ({
  categories,
  selectedCategories,
  handleCheckboxChange,
}) => {
  return (
    <div className={styles.filterCategory}>
      {categories.map((category) => (
        <div key={category}>
          <label>
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleCheckboxChange}
            />
            {category}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FilterCategory;
