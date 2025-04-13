import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Item from "../components/item/Item";
import "./CSS/ShopCategory.css";
import all_products from "../components/assets/all_product"
// import axios from "axios";

const ShopCategory = (props) => {

  const filtered_products = all_products.filter((product)=> product.category === props.category )
  console.log(filtered_products)

  const [ sortby , setSort ] = useState("")
  // const [filtered_products, setFilterProducts] = useState([])
  const [nbProducts, setNbProducts] = useState();
  // const { all_products} = useContext(ShopContext);

  const handleSort = (e) =>{
  // const option = e.target.value;
  // setSort(option)
  }

  // const fetchFilteredProducts = async() =>{

  //   await axios
  //   .get("http://localhost:5000/api/filter",{
  //     params:{sortby, category: props.category}
  //   })
  //   .then(({data: {filteredProduct, nbHits}}) => {
  //    setFilterProducts(filteredProduct)
  //    setNbProducts(nbHits)
  //   })
  //   .catch((err) => console.log(err));

  // }
  

  // useEffect(()=>{
    
  //   fetchFilteredProducts();
  // },[props.category, sortby])

  return (
    <div className="ShopCategory">
      <div className="banner">
        <img src={props.banner} alt="" />
      </div>
      <div className="text">
        <div>
          <span style={{ fontWeight: 600 }}>Showing {nbProducts} </span>out of {all_products.length} products
        </div>
        <form action="">
          <label htmlFor="sort">Sort by: </label>
          <select name="sort_by" value={sortby} id="sort" onChange={handleSort}>
            <option value="">Best match</option>
            <option value="low_to_high">Low to high</option>
            <option value="high_to_low">High to low</option>
          </select>
        </form>
      </div>
      <div className="products">

        {filtered_products.map((item, index) => (
          <Item
            key={index}
            image={item.image}
            item_name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
            id={item.id}
            slug={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
