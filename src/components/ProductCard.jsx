import React, { useState } from "react";
import { Button, NumberInput, Tile } from "carbon-components-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from 'react-toastify';
import "../styles/card.css"
import "../styles/NumberInput.css"
const ProductCard = ({ id, name, model, manufacturer, cost }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
 
  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, quantity }));
    toast.success(`${quantity} ${name} added to the basket!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    /**creating card */
    <div className="card-container">
      <Tile className="custom-tile">
        <h3 className="card-title">{name}</h3>
        <p className="card-description">
          <p className="fs-6">Model: {model}</p>
          <p>Manufacturer: {manufacturer}</p>
          <p>Cost: {cost === "unknown" ? "Unknown" : `${cost} credits`}</p>
        </p>
        
        {/**Displaying input */}
        <NumberInput
          id={`quantity-${id}`} // Ensures each input has a unique ID
          className="custom-number-input"
          hideSteppers
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          hideLabel
        />
        
        {/**create button for buy */}
        <Button 
          kind="primary" 
          className="card-button buy-button"
          onClick={handleAddToCart}
        >
          Buy Now
        </Button>
      </Tile>
    </div>
  );
};

export default ProductCard;
