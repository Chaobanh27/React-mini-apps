import React, { useState } from 'react'

export const Square = ({value,onSquareClick}) => {

  return (
    <>
        <div className='square btn btn-light' onClick={onSquareClick} >
          <div>{value}</div>
        </div>
    </>
  )
}
