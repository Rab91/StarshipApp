import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import "./App.css";
import "./styles/PageButton.css"
import { Button } from "carbon-components-react";
import { Theme, ThemeContext } from "@carbon/react";
import { g100 } from "@carbon/themes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [starships, setStarships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  /** fetching data from API when the component is rendered */
  useEffect(() => {
    const fetchStarships = async () => {
      setLoading(true);
      const response = await fetch(`https://swapi.dev/api/starships/?page=${currentPage}`);
      const data = await response.json();
      setStarships(data.results || []);
      setLoading(false);
    };
    fetchStarships();
  }, [currentPage]);

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));

  return (
    <Provider store={store}>
    <div className="App">
     <Theme theme={g100}>
      <Navbar />
    </Theme>
      <h3 className="heading">Welcome to our Starship App</h3>
      <p className="m-2">Explore the universe with our collection of starships, planets, and characters.</p>
        {loading ? (
          <p>Loading starships...</p>
        ) : (
          <div className="productList">
            {starships.map((ship) => (
              /** creating card for product */
              <ProductCard
                key={ship.name}
                name={ship.name}
                model={ship.model}
                manufacturer={ship.manufacturer}
                cost={ship.cost_in_credits}
              />
            ))}
          </div>
        )}
            <ToastContainer />

        <div className="text-center">
          {/** create previous button */}
        <Button 
        kind="primary" 
        onClick={handlePrevPage} disabled={currentPage === 1}
        className="page-button">
          Previous
        </Button>
        {/**create next button */}
        <Button
        className="page-button"
        kind="primary" 
        onClick={handleNextPage}>Next</Button>
        </div>
    </div>
    </Provider>
  );
};

export default App;
