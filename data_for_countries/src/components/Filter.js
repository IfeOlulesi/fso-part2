import React from 'react'

const Filter = (props) => {
  return (
    <div>
      {props.preText}
      <input 
        onChange = {props.onChange}
        placeholder = {props.placeholder}
        value = {props.value}
        />
    </div>
  )
}

export default Filter;