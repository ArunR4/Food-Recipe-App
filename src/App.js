import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import RecipeItem from './component/RecipeItmes/RecipeItem';

function App() {
  const [text, setText] = useState('');
  const [recipe, setRecipe] = useState([]);
  const [health, setHealth] = useState("vegan");
  const healthLabels = ["vegan", "vegetarian", "paleo", "dairy-free", "gluten-free", "wheat-free", "fat-free", "low-sugar", "egg-free", "peanut-free", "tree-nut-free", "soy-free", "fish-free", "shellfish-free"];

  axios.defaults.baseURL = `https://api.edamam.com/search?q=${text}&app_id=b86238d7&app_key=450d4f48c429c867ce8b7e3dc3bb029c&
  from=0&to=20&`;

  useEffect(()=>{
    axios.get(`https://api.edamam.com/search?q=sambar&app_id=b86238d7&app_key=450d4f48c429c867ce8b7e3dc3bb029c&
    from=0&to=20&health=vegetarian`).then(res => {
      setRecipe(res.data.hits);
      console.log(res)
    }).catch(err => console.log(err))
  },[])

  function getRecipe() {
    axios.get('health=' + health).then(res => {
      setRecipe(res.data.hits);
      console.log(res)
    }).catch(err => console.log(err))
  }

  const submitHandler = e => {
    e.preventDefault();
    getRecipe();
  }

  const onClickHandler = el => {
    setHealth(el);
  }

  return (
    <div className="App">
      <h1>Food Recipe Plaza 🍔</h1>

      <form className='appSearchForm' onSubmit={submitHandler}>
        <input type='text' placeholder='Enter ingridient' value={text} onChange={e => setText(e.target.value)} className='input' />
        <input type='submit' className='btn' value='Search' />
        <select className='dropDown' onChange={(e) => onClickHandler(e.target.value)}>
          {healthLabels.map(el => {
            return <option value={el} key={healthLabels.indexOf(el)}>{el}</option>
          })}
        </select>
      </form>

      <div className='items'>
        {recipe.map(el => (
          <RecipeItem recipe={el} key={recipe.indexOf(el)} />
        ))}
      </div>
    </div>
  );
}

export default App;
