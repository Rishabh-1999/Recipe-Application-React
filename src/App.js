import React, { Component } from "react";
import "./App.css";
import Form from "./components/Form";
import Recipes from "./components/Recipes";
import axios from "axios";

const REACT_APP_APIURL = "https://api.edamam.com";
const REACT_APP_APIID = "4629df7d";
const REACT_APP_APIKEY = "a04da6cfd96bad9e15d82c5ce59d012a";

class App extends Component {
  state = {
    recipes: []
  };

  getRecipe = async e => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    console.log(
      REACT_APP_APIURL +
        `/search?app_id=` +
        REACT_APP_APIID +
        `&app_key=` +
        REACT_APP_APIKEY +
        `&q=${recipeName}`
    );
    axios
      .get(
        REACT_APP_APIURL +
          `/search?app_id=` +
          REACT_APP_APIID +
          `&app_key=` +
          REACT_APP_APIKEY +
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
            REACT_APP_APIURL +
              `/search?app_id=` +
              REACT_APP_APIID +
              `&app_key=` +
              REACT_APP_APIKEY +
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
