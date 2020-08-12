import { h } from 'preact'
import './search-bar.css'

const SearchBar = ({ value, onInput }) => (
  <div class="search input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">
        <i class="fas fa-search" />
      </span>
    </div>
    <input
      type="text"
      class="form-control"
      placeholder="Search..."
      value={value}
      onInput={onInput}
      ref={input => input && input.focus()}
    />
  </div>
)

export default SearchBar
