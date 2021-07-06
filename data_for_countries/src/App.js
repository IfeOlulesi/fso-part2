import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Output from "./components/Output";


const App = () => {
  const [filterParam, setFilterParam] = useState("");
  const [countries, setCountries] = useState([]);

  // get data from API
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  // defines functionality for the search box
  const filterHandler = (event) => {
    setFilterParam(event.target.value);
  };

  // filters the countries according to the search query,
  // assigns the result to constant variable filterOutput -
  // which is then displayed within the Output component
  const filterOutput = countries.filter((person) =>
    JSON.stringify(person.name)
      .toLowerCase()
      .includes(filterParam.toLowerCase().trim())
  );

  return (
    <div>
      <h2>Data for countries</h2>
      <Filter
        preText="Find country: "
        placeholder="query..."
        value={filterParam}
        onChange={filterHandler}
      />

      {filterParam.length === 0 ? (
        "Input a search query"
      ) : filterOutput.length < 1 ? (
        "No matches found, try another query"
      ) : filterOutput.length === 1 ? (
        <Output
          filterOutput={filterOutput}
          sectionTitle={"Countries"}
          single={true}
        />
      ) : filterOutput.length < 11 ? (
        <Output
          filterOutput={filterOutput}
          sectionTitle={"Countries"}
          single={false}
        />
      ) : (
        "Too many matches found, please try a more specific query"
      )}
    </div>
  );
};

export default App;
