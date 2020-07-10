import React from 'react'
// import spniner from './spinner.gif'
import loading from './loading.gif'

const Spinner = () => {
  return (
    <React.Fragment>
      <img
        src={loading}
        alt='Loading...'
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </React.Fragment>
  )
}

export default Spinner
