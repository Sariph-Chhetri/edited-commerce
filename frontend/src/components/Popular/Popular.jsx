import React from 'react'
import data_product from '../assets/data'
import Item from '../item/Item'
import "../Popular/Popular.css"

const Popular = () => {
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
      <hr/>
      <div className="popular_item">
      {data_product.map((item , index)=>{
        return <Item key={index} image = {item.image} item_name={item.name} new_price={item.new_price} old_price={item.old_price} id={item.id} />
      })}
      </div>
    </div>
  )
}

export default Popular
