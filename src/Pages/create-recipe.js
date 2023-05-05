import React, { useState } from "react";
import "./create.css";
import axiso from "axios";
import { useNavigate } from "react-router-dom";
import useGetUserID from "../hook/useGetUserID";
const CreateRecipes = () => {
  const navigate = useNavigate();
  const userID = useGetUserID();
  const [recipe, setRecipe] = useState({
    name: " ",
    ingredients: [],
    instruction: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };
  const addIngredients = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };
  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiso.post("http://localhost:5001/recipes", recipe);
      alert("Recipe created Successful");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  console.log(recipe);
  return (
    <div className="create-recipe">
      <h2>CreateRecipes</h2>
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => {
          return (
            <input
              key={idx}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, idx)}
            />
          );
        })}
        <button onClick={addIngredients} type="button">
          Add Ingredients
        </button>
        <label htmlFor="instruction">Instruction</label>
        <textarea
          id="instruction"
          name="instruction"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">ImageUrl</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time(minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        <button type="submit">Create recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipes;
