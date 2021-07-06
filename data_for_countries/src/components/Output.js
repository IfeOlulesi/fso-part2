import React, { useState } from "react";
import Weather from "./Weather";


const Output = ({ filterOutput, sectionTitle, single }) => {
  const singleCountry = filterOutput[0];
  const formatter = new Intl.NumberFormat("en-US", {});
  const [detailContent, setDetailContent] = useState(null);
  const [focusedCountry, setFocusedCountry] = useState();

  const showDetailsOf = (country) => {
    if (detailContent === null || focusedCountry !== country.name) {
      setFocusedCountry(country.name)
      setDetailContent(
        <div>
          <h2>{country.name}</h2>
          <p>
            Population: {formatter.format(country.population)}
            <br />
            Languages:
            <ol>
              {country.languages.map((language) => (
                <li key={language.name}>{language.name}</li>
              ))}
            </ol>
          </p>
          <img style={{ width: "100px" }} src={filterOutput[0].flag} />
          <Weather country={country} />
        </div>
      )}
    else {
      setDetailContent(null)
      setFocusedCountry(null)
    } 
  };

  return (
    <React.Fragment>
      {single ? ( // if its a single country
        <React.Fragment>
          <h2>{singleCountry.name}</h2>
          <p>
            Population: {formatter.format(singleCountry.population)}
            <br />
            Languages:
            <ol>
              {singleCountry.languages.map((language) => (
                <li key={language.name}>{language.name}</li>
              ))}
            </ol>
          </p>
          <img style={{ width: "100px" }} src={filterOutput[0].flag} />
          <Weather country={singleCountry} />
        </React.Fragment>
      ) : (
        //if we're handling multiple countries
        <React.Fragment>
          <h2>{sectionTitle}</h2>
          <ol>
            {filterOutput.map((country) => (
              <li key={country.name} onClick={() => showDetailsOf(country)}>
                {country.name}
                <button onClick={() => showDetailsOf(country)}>
                  {focusedCountry === country.name ? 'Hide' : 'Show' }{country.name}
                </button>
              </li>
            ))}
          </ol>
          {detailContent === null ? null : detailContent }
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Output;
