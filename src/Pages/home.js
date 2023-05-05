import React,{useState,useEffect} from 'react'
import axiso from "axios"
import useGetUserID from '../hook/useGetUserID'
import { useCookies} from "react-cookie"
const Home = () => {
  const [recipes,setRecipes]=useState([])
  const [savedRecipes,setSavedRecipes]=useState([])
  const [cookies,_]=useCookies(["access_token"])

  const userID=useGetUserID()
  useEffect(()=>{
  const fetchRecipe=async()=>{
    try{
   const res= await axiso.get("https://recipeappnodejs-awlz.onrender.com/recipes") 
     setRecipes(res.data)  

    }catch(err){
      console.error(err)
    }
  }
  const fetchSavedRecipe=async()=>{
 try{
  const res= await axiso.get(`https://recipeappnodejs-awlz.onrender.com/recipes/savedRecipes/ids/${userID}`)
  setSavedRecipes(res.data.savedRecipes)
 }catch(err){
  console.error(err)
 }
}
  fetchRecipe()

 if(cookies.access_token) fetchSavedRecipe();
  },[])

   const saveRecipe=async(recipeID)=>{
    try{
      const res= await axiso.put("https://recipeappnodejs-awlz.onrender.com/recipes",{
        recipeID,
        userID
      },
      {headers:{Authorization:cookies.access_token}})
       setSavedRecipes(res.data.savedRecipes)
   
       }catch(err){
         console.error(err)
       }
   }
const isRecipesSaved=(id)=>savedRecipes?.includes(id)

  return (
    <div>
  <h2>Recipes</h2>
  <ul>
    {recipes.map((recipe)=>{
      return(
        <li key={recipe._id}>
          {savedRecipes?.includes(recipe._id) && <h1>All ready saved</h1>}
          <div>
            <h2>{recipe.name}</h2>
            <button onClick={()=>saveRecipe(recipe._id)} 
            disabled={isRecipesSaved(recipe._id)}
            >{isRecipesSaved(recipe._id) ?"saved":"save"}</button>
          </div>
          <div>
            <p>{recipe.instructions}</p>
          </div>
          <img src={recipe.imageUrl}/>
          <p>Cooking Time:{recipe.cookingTime}</p>
        </li>
      )
    })}
  </ul>
    </div>
  )
}

export default Home