import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

function SearchBar({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) {
  const categories = [
    { id: "All", label: "All Items", icon: "🍽️" },
    { id: "Fast Food", label: "Fast Food", icon: "🍔" },
    { id: "Italian", label: "Italian", icon: "🍝" },
    { id: "Asian", label: "Asian", icon: "🍜" },
    { id: "Beverages", label: "Beverages", icon: "🥤" },
  ];

  return (
    <div className="search-filter-section">
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for delicious dishes, drinks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="clear-search" onClick={() => setSearchQuery("")}>
            &times;
          </button>
        )}
      </div>

      <div className="categories-container">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-pill ${selectedCategory === category.id ? "active" : ""}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-emoji">{category.icon}</span>
            <span className="category-label">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;