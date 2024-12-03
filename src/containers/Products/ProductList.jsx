import { fetchProducts } from "../../services";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Loading from "../Loading/Loading";
import EditModal from "../Edit/EditModal";
import styles from "./style.module.css";
import FilterBar from "../Filter/FilterBar";
import { useDebounce } from "use-debounce";
import DeleteModal from "../Delete/DeleteModal";
import Header from "../Headers/Header";
import "../../App.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [debouncedSearch] = useDebounce(search, 500);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  // Fetch products
  const getProducts = async () => {
    try {
      const res = await fetchProducts();
      setTimeout(() => {
        setProducts(res.data);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("An error occurred while fetching products. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      getProducts();
    }
  }, [loading]);

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    if (savedFilters) {
      setSearch(savedFilters.search || "");
      setSelectedCategories(savedFilters.selectedCategories || []);
      setMinPrice(savedFilters.minPrice || 0);
      setMaxPrice(savedFilters.maxPrice || 10000);
    }
    getProducts();
  }, []);

  // Apply filters function
  const applyFilters = (products) => {
    try {
      return products.filter(
        (item) =>
          item.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) && // Search by title
          (selectedCategories.length === 0 ||
            selectedCategories.includes(item.category)) && // Category filter
          item.price >= minPrice &&
          item.price <= maxPrice // Price filter
      );
    } catch (error) {
      console.error("Error applying filters:", error);
      return []; // Return empty list in case of an error
    }
  };

  const filteredProducts = applyFilters(products);

  // Search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    saveFiltersToLocalStorage({ search: value });
  };

  // Category filter
  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
    saveFiltersToLocalStorage({ selectedCategories: categories });
  };

  // Price filters

  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    setMinPrice(value);
    saveFiltersToLocalStorage({ minPrice: value });
  };

  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
    saveFiltersToLocalStorage({ maxPrice: value });
  };
  const validatePriceRange = () => {
    if (maxPrice < minPrice) {
      setMaxPrice(minPrice);
      alert(
        "Maximum price cannot be less than minimum price. It has been adjusted."
      );
      saveFiltersToLocalStorage({ maxPrice: minPrice });
    }
  };

  // Product remove
  const handleRemove = (id) => {
    try {
      const product = products.find((item) => item.id === id);
      if (!product) throw new Error("Product not found.");
      setProductToDelete(product);
      setShowDeleteConfirmModal(true);
    } catch (error) {
      console.error("Error during product removal:", error);
      alert("An error occurred while trying to remove the product.");
    }
  };

  const handleDeleteConfirm = () => {
    try {
      const remainingItems = products.filter(
        (item) => item.id !== productToDelete.id
      );
      setProducts(remainingItems);
      setShowDeleteConfirmModal(false);
    } catch (error) {
      console.error("Error confirming delete:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  const handleDeleteCancel = () => setShowDeleteConfirmModal(false);

  // Product edit
  const handleEdit = (id) => {
    try {
      const editingItems = products.find((item) => item.id === id);
      if (!editingItems) throw new Error("Product to edit not found.");
      setEditProduct(editingItems);
    } catch (error) {
      console.error("Error during edit:", error);
      alert("An error occurred while editing the product.");
    }
  };

  const handleSaveModal = (updatedProduct) => {
    try {
      const updatedProducts = products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error saving updated product:", error);
      alert("An error occurred while saving the product.");
    }
  };

  const handleCloseModal = () => setEditProduct(null);

  /*Local Storage */
  const saveFiltersToLocalStorage = (updatedFilter) => {
    const existingFilters = JSON.parse(localStorage.getItem("filters")) || {};
    const newFilters = { ...existingFilters, ...updatedFilter };
    localStorage.setItem("filters", JSON.stringify(newFilters));
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Header
            search={search}
            handleSearch={handleSearch}
            setLoading={setLoading}
          />
          <div>
            <FilterBar
              categories={[
                ...new Set(products.map((product) => product.category)),
              ]}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              minPrice={minPrice}
              maxPrice={maxPrice}
              handleMinPriceChange={handleMinPriceChange}
              handleMaxPriceChange={handleMaxPriceChange}
              validatePriceRange={validatePriceRange}
            />
          </div>
          <div className={styles.productContainer}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleRemove={handleRemove}
                handleEdit={handleEdit}
              />
            ))}
          </div>
        </div>
      )}

      {editProduct && (
        <EditModal
          editProduct={editProduct}
          handleCloseModal={handleCloseModal}
          handleSaveModal={handleSaveModal}
        />
      )}

      {showDeleteConfirmModal && (
        <DeleteModal
          handleDeleteConfirm={handleDeleteConfirm}
          handleDeleteCancel={handleDeleteCancel}
          productToDelete={productToDelete}
        />
      )}
    </div>
  );
};

export default Products;
