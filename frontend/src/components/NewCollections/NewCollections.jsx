import React, { useEffect, useState } from "react";
import Item from "../item/Item";
import "../NewCollections/NewCollections.css";
import axios from "axios";

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);

  const fetchNewCollections = async() =>{

    axios.get( process.env.REACT_APP_SERVER + "/api/new")
    .then( ({data:{newCollections}})=>{
     setNewCollection(newCollections)
    })
    .catch(err=>console.log(err))

  }

  useEffect(()=>{
    fetchNewCollections();
  },[])

  return (
    <div className="collection">
      <div className="NewCollections">
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="NewCollections_item">
          {newCollection.map((item, index) => {
            return (
              <Item
                key={index}
                image={item.image}
                item_name={item.name}
                new_price={item.new_price}
                old_price={item.old_price}
                id={item._id}
                slug={item.slug}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewCollections;
