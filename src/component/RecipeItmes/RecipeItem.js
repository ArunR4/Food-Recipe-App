import './RecipeItem.css';

const RecipeItem = props => {
    return <div className="item" onClick={()=>[
        window.open(props.recipe['recipe']['url'])
    ]}>
        <img src={props.recipe["recipe"]["image"]}/>
        <p>{props.recipe["recipe"]['label']}</p>
    </div>
}

export default RecipeItem;