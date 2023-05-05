
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
 import Home from "./Pages/home";
 import Auth from "./Pages/auth";
 import CreateRecipes from "./Pages/create-recipe";
 import {SavedRecipes}  from "./Pages/save-racipes";
 import Navbar from "./component/Navbar";
 import "./App.css"
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/create-recipes' element={<CreateRecipes/>}/>
          <Route path='/save-recipes' element={<SavedRecipes />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
