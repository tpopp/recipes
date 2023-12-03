import React from 'react';
import './App.css';

// INGREDIENTS
const RED_ONION = {name: "Red Onion", unit: "onions"};
const GREEN_ONION = {name: "Green Onion", unit: "onions"};


const INGREDIENT_COUNT = 1;
const INGREDIENT_NAME = 0;
const picturesData = [
  {
    id: 1,
    imgUrl: '/pizza.jpg',
    ingredients: [[RED_ONION, 2], [GREEN_ONION, 2]],
  },
  {
    id: 2,
    imgUrl: '/pizza.jpg',
    ingredients: [[RED_ONION, 1], [GREEN_ONION,3]],
  },
  // Add more pictures and data as needed
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPictures: [],
    };
  }

  handlePictureSelect = (pictureId) => {
    const { selectedPictures } = this.state;
    const pictureIndex = selectedPictures.indexOf(pictureId);
    if (pictureIndex === -1) {
      this.setState({ selectedPictures: [...selectedPictures, pictureId] });
    } else {
      const updatedSelection = [...selectedPictures];
      updatedSelection.splice(pictureIndex, 1);
      this.setState({ selectedPictures: updatedSelection });
    }
  };

  generateShoppingList = () => {
    const { selectedPictures } = this.state;
    const shoppingList = {};
    selectedPictures.forEach((pictureId) => {
      const selectedPicture = picturesData.find((picture) => picture.id === pictureId);
      selectedPicture.ingredients.forEach((ingredient) => {
        if (shoppingList[ingredient[INGREDIENT_NAME].name]) {
          shoppingList[ingredient[INGREDIENT_NAME].name] += ingredient[INGREDIENT_COUNT];
        } else {
          shoppingList[ingredient[INGREDIENT_NAME].name] = ingredient[INGREDIENT_COUNT];
        }
      });
    });
    return shoppingList;
  };

  render() {
    const shoppingList = this.generateShoppingList();

    return (
      <div>
        <h1>GitHub Webpage with Pictures and Ingredients</h1>
        <div>
          {picturesData.map((picture) => (
            <div key={picture.id}>
              <img src={picture.imgUrl} alt={`Picture ${picture.id}`} width={400} height={400} />
              <ul>
                {picture.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient[INGREDIENT_NAME].name}</li>
                ))}
              </ul>
              <button onClick={() => this.handlePictureSelect(picture.id)}>
                {this.state.selectedPictures.includes(picture.id) ? 'Deselect' : 'Select'}
              </button>
            </div>
          ))}
        </div>
        <div>
          <h2>Shopping List</h2>
          <ul>
            {Object.entries(shoppingList).map(([ingredient, count]) => (
              <li key={ingredient}>
                {ingredient}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default App;