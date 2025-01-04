import React from "react";
import new_collections from "../assets/new_collections";
import Item from "../item/Item";
import "../NewCollections/NewCollections.css";

const NewCollections = () => {
  return (
    <div className="collection">
      <div className="NewCollections">
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="NewCollections_item">
          {new_collections.map((item, index) => {
            return (
              <Item
                key={index}
                image={item.image}
                item_name={item.name}
                new_price={item.new_price}
                old_price={item.old_price}
                id={item.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewCollections;
