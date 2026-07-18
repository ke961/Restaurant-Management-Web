import "./SearchBar.css";

function SearchBar() {
  return (
   <div className="search-container">
      <input
        type="text"
        placeholder="Search Food..."
      />
    </div>
  );
}

export default SearchBar;