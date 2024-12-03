import { FaUserCircle } from "react-icons/fa";
import { RiRefreshLine } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./style.module.css";

const Header = ({ search, handleSearch, setLoading }) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <FaUserCircle className={styles.icon} style={{ color: "#212121" }} />
      </div>

      <div className={styles.center}>
        <button
          onClick={() => setLoading(true)}
          className={styles.refreshButton}
        >
          <RiRefreshLine
            className={styles.icon}
            style={{ marginRight: "20px" }}
          />
          Refresh Data
        </button>
      </div>

      <div className={styles.right}>
        <div className={styles.searchBox}>
          <AiOutlineSearch className={styles.icon} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
