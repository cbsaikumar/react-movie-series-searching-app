import React, { useState } from "react";
import Item from "./Item";
import ItemModal from "./ItemModal";
import "./Items.css";

function Items({ items, type }) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const handleClick = (item) => {
    setOpen(true);
    setSelectedItem(item);
  };
  return (
    <>
      <div className="items-container">
        <div className="list">
          {items &&
            items.map((item) => (
              <div key={item.id} onClick={() => handleClick(item)}>
                <Item type={type} id={item.id} item={item} />
              </div>
            ))}
        </div>
      </div>
      <ItemModal
        open={open}
        setOpen={setOpen}
        id={selectedItem?.id}
        type={selectedItem?.media_type || type}
      />
    </>
  );
}

export default Items;
