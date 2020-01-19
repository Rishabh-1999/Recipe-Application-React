import React, { Component } from "react";
import "./App.css";
import Form from "./components/Form";
import Recipes from "./components/Recipes";
import axios from "axios";

class App extends Component {
  state = {
    recipes: []
  };

  getRecipe = async e => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    axios
      .get(
        process.env.REACT_APP_APIURL +
          `/search?app_id=` +
          process.env.REACT_APP_APIID +
          `&app_key=` +
          process.env.REACT_APP_APIKEY +
          `&q=${recipeName}`
      )
      .then(res => {
        this.setState({ recipes: res.data.hits });
      });
  };

  componentDidMount = () => {
    if (this.state.recipes.length === 0) {
      const json = localStorage.getItem("recipes");
      if (json != null) {
        const recipes = JSON.parse(json);
        this.setState({ recipes });
      } else {
        axios
          .get(
            process.env.REACT_APP_APIURL +
              `/search?app_id=` +
              process.env.REACT_APP_APIID +
              `&app_key=` +
              process.env.REACT_APP_APIKEY +
              `&q=pizza`
          )
          .then(res => {
            this.setState({ recipes: res.data.hits });
            localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
          });
      }
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> Recipe Search </h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
