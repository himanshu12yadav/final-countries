export const SearchBar = ({setQuery}) => {
    return (
        <div className="search-container">
            <i className="fa gfa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="search for a country..."
                   onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
        </div>
    )
};

export default SearchBar;
