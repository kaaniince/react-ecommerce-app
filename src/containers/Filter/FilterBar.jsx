import React from "react";
import FilterCategory from "./FilterCategory";
import FilterPrice from "./FilterPrice";
import styles from "./style.module.css";

const FilterBar = ({
  categories,
  selectedCategories,
  onCategoryChange,
  minPrice,
  maxPrice,
  handleMinPriceChange,
  handleMaxPriceChange,
  validatePriceRange,
}) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const newCategories = checked
      ? [...selectedCategories, value]
      : selectedCategories.filter((cat) => cat !== value);

    onCategoryChange(newCategories);
  };

  return (
    <div className={styles.filterBar}>
      <FilterPrice
        minPrice={minPrice}
        maxPrice={maxPrice}
        handleMinPriceChange={handleMinPriceChange}
        handleMaxPriceChange={handleMaxPriceChange}
        validatePriceRange={validatePriceRange}
      />
      <FilterCategory
        categories={categories}
        selectedCategories={selectedCategories}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};

export default FilterBar;
