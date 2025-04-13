import React, { useContext, useState } from "react";
import Breadcrum from "../components/breadcrum/Breadcrum";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate, useParams } from "react-router-dom";
import star_icon from "../components/assets/star_icon.png";
import star_dull_icon from "../components/assets/star_dull_icon.png";
import Item from "../components/item/Item";
import "./CSS/Product.css";
import all_products from "../components/assets/all_product";
import toast, { Toaster } from "react-hot-toast";
// import { UserContext } from "../Context/userContext";

const Product = () => {
  let addToCart;
  // const { all_products, addToCart} = useContext(ShopContext);
  // const {user} = useContext(UserContext);
  let user;
  const { slug } = useParams();
 

  const navigate = useNavigate();

  const result = all_products.filter((e) => e.id === Number(slug));
  const product  = result[0];

  const related_products = all_products
    .filter((e) => e.category === product.category)

    console.log(related_products)

  const [quantity, setQuantity] = useState(0);

  function countDecrease() {
    // if (quantity > 0) {
    //   setQuantity((prevVal) => prevVal - 1);
    // }
  }
  function countIncrease() {
    // setQuantity((prevVal) => prevVal + 1);
  }
  return (
    <div className="product">
      <Toaster />
      <Breadcrum product={product} />
      <div className="productMain">
        <div className="mini_image">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="main_image">
          <img src={product.image} alt="" />
        </div>
        <div className="description">
          <div className="product_name">{product.name}</div>
          <div className="review_icon">
            {" "}
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
          </div>

          <p>
            <span className="old_price">${product.old_price}</span>
            <span className="new_price">${product.new_price}</span>
          </p>
          <p>description about product</p>
          <h3>Select size</h3>
          <div className="sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
          <p className="product_quantity">
            Quantity :<button onClick={countDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={countIncrease}>+</button>
          </p>

          <button
            onClick={() => {
              if(quantity < 1){
                toast.error("Select the quantity first")
              }
               else{
                if(user){
                  addToCart(product._id, quantity)
                  setQuantity(0)
                  toast.success("Product added to cart")
                }
                // if(!user){
                //   toast.error("You need to have an account to add the product!")
                //   navigate("/login")
                // }
               }
             
            }}
            className="addtocart"
          >
            Add to cart
          </button>
          <p style={{ textTransform: "capitalize" }}>
            Category: {product.category}
          </p>
          <p>Tags: Modern, Latest</p>
        </div>
      </div>
      <div className="related_products">
        <h1>Related Products</h1>
        <hr />

        <div className="related_products_item">
          {related_products.map((item, index) => {
            return (
              <Item
                key={index}
                image={item.image}
                item_name={item.name}
                new_price={item.new_price}
                old_price={item.old_price}
                id={item.id}
                slug={item.id}
              
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
