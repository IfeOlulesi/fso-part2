import React from 'react'

const Filter = (props) => {
  return (
    <div>
      Filter shown with:
      <input 
        onChange = {props.onChange}
        placeholder = {props.placeholder}
        value = {props.value}
        />
    </div>
  )
}

export default Filter;