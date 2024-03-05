import React from 'react'

const SearchByTitle = (props) => {
  return (
    <div className='search-by-title'>
        <input type="text" id="inputTitle" placeholder='Search by title' value={props.searchValue} 
            onChange={(event)=> {
                props.setSearchValue(event.target.value)
            }}
        />
      </div>
  )
}

export default SearchByTitle