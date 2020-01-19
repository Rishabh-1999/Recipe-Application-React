import React from "react";

function Recipes(props) {
  const ddata = props.recipes.map(recipe => {
    return (
      <div key={recipe.recipe.label}>
        <div className="col-md-12" style={{ marginBottom: "2rem" }}>
          <div className="recipes__box">
            <img
              className="recipe__box-img"
              src={recipe.recipe.image}
              alt={recipe.recipe.label}
            />
            <div className="recipe__text">
              <h5 className="recipes__title">
                {recipe.recipe.label.length < 20
                  ? `${recipe.recipe.label}`
                  : `${recipe.recipe.label.substring(0, 25)}...`}
              </h5>
              <p className="recipes__subtitle">
                Publisher: <span>{recipe.recipe.source}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{ddata}</div>
    </div>
  );
}

export default Recipes;
