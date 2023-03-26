import React from 'react';

function Filter({ filter, handleNewFilter }) {
  return (
    <div> 
      Filter shown with: 
      <input value={filter} onChange={handleNewFilter}/>
    </div>
  )
}

export default Filter;
