import React from 'react'

const SearchByGenre = (props) => {

    const options = [
        { id: 1, value: '28', label: 'Action' },
        { id: 2, value: '12', label: 'Adventure' },
        { id: 3, value: '16', label: 'Animation' },
        { id: 4, value: '35', label: 'Comedy' },
        { id: 5, value: '80', label: 'Crime' },
        { id: 6, value: '99', label: 'Documentary' },
        { id: 7, value: '18', label: 'Drama' },
        { id: 8, value: '10751', label: 'Family' },
        { id: 9, value: '14', label: 'Fantasy' },
        { id: 10, value: '36', label: 'History' },
        { id: 11, value: '27', label: 'Horror' },
        { id: 12, value: '10402', label: 'Music' },
        { id: 13, value: '9648', label: 'Mystery' },
        { id: 14, value: '10749', label: 'Romance' },
        { id: 15, value: '878', label: 'Science Fiction' },
        { id: 16, value: '10770', label: 'TV Movie' },
        { id: 17, value: '53', label: 'Thriller' },
        { id: 18, value: '10752', label: 'War' },
        { id: 19, value: '37', label: 'Western' },
    ];

    return (
        <>
        <div className='search-by-genre'>
            <select name='selectedGenre' value={props.optionValue} onChange={(e) => props.setOptionValue(e.target.value)}>
                <option value="" disabled selected>Search by genre</option>
                {options.map((option) => (
                    <option key={option.id} value={option.value}>
                    {option.label}
                    </option>
                ))}
            </select>
        </div>
        </>
    )
}

export default SearchByGenre