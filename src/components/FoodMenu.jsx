import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMenu } from "../slices/menuSlice";

const FoodMenu = () => {

    const dispatch=useDispatch();
    const [foodMenu,setFoodMenu]=useState({
        foodName:'',
        foodCategory:'',
        isVeg:false,
        isNonVeg:false,
        price:'',
        description:'',
        imageFile:null

    })

    const handleSubmitMenu=(e)=>{
        e.preventDefault();
        dispatch(addMenu(foodMenu));
    }


  return (
    <div>
      <form onSubmit={handleSubmitMenu}>
        <label htmlFor="foodName">Item Name: </label>
        <input type="text" id="foodName" value={foodMenu.foodName} onChange={(e) => setFoodMenu({...foodMenu,foodName:e.target.value})} />

        <label htmlFor="foodCategory">Item Category:</label>
        <input type="text" id="foodCategory" value={foodMenu.foodCategory} onChange={(e)=>setFoodMenu({...foodMenu,foodCategory:e.target.value})} />

        <label htmlFor="isVeg">Item Type:</label>
        <input type="checkbox" id="isVeg" checked={foodMenu.isVeg} onChange={(e)=>setFoodMenu({...foodMenu,isVeg:e.target.checked})} />
        <label htmlFor="isVeg">Veg</label>

        <input type="checkbox" id="isNonVeg" checked={isNonVeg} onChange={(e)=>e.target.checked} />
        <label htmlFor="isNonVeg">Non-Veg</label>

        <label htmlFor="price">Price:</label>
        <input type="text" id="price" value={price} onChange={(e)=>e.target.value} />

        <label htmlFor="description">Description:</label>
        <input type="text" id="description" value={description} onChange={(e)=>e.target.value} />

        <label htmlFor="imageFile">Upload File:</label>
        <input type="file" id="imageFile" onChange={(e)=>e.target.files[0]}/>

        <button type="button">Submit</button>
      </form>
    </div>
  );
};

export default FoodMenu;
