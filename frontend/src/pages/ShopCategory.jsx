import React, { useEffect, useState } from "react";
// import { ShopContext } from "../Context/ShopContext";
import Item from "../components/item/Item";
import "./CSS/ShopCategory.css";
import dropdown_icon from "../components/assets/dropdown_icon.png";
import axios from "axios";

const ShopCategory = (props) => {

  // const { all_products } = useContext(ShopContext);
  const [filtered_products, setFilterProducts] = useState([])
  // const filtered_products = all_products.filter((item) => item.category === props.category );

  const fetchFilteredProducts = async() =>{

    await axios
    .get("http://localhost:5000/api/filter",{
      params:{category: props.category}
    })
    .then(({data: {filteredProduct}}) => {
     setFilterProducts(filteredProduct)
    })
    .catch((err) => console.log(err));

  }
  

  useEffect(()=>{
    
    fetchFilteredProducts();
  },[props.category])

  return (
    <div className="ShopCategory">
      <div className="banner">
        <img src={props.banner} alt="" />
      </div>
      <div className="text">
        <div>
          <span style={{ fontWeight: 600 }}>Showing 1-12 </span>out of 36
          products
        </div>
        <div className="sort_button">
          <button>
            Sort by <img src={dropdown_icon} alt="" />
          </button>
        </div>
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
            slug={item.slug}
            rating={item.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
