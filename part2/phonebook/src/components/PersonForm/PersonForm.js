import React from 'react';

function PersonForm({ handleSubmit, newName, handleNewName, newPhone, handleNewPhone }) {
  return (
    <form onSubmit={handleSubmit} >
      <div>
        name:
        <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number:
        <input value={newPhone} onChange={handleNewPhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;
