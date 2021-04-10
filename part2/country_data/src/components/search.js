import React from 'react'

const Search = ({ value, handler }) => (
    <form>
        find countries<input value={value} onChange={handler}/>
    </form>
)

export default Search