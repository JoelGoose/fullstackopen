const Filter = ({ searchTerm, handleSearchChange }) => (
    <input
        value={searchTerm}
        onChange={handleSearchChange}
    />
)

export default Filter