import React from "react";
import Weather from "./Weather"

const Output = ({ filterOutput, sectionTitle, single }) => {
  const singleCountry = filterOutput[0]

  const formatter = new Intl.NumberFormat('en-US', {})

  return (
    <React.Fragment>
      {single ? ( // if its a single country
        <React.Fragment>
          <h2>{singleCountry.name}</h2>
          <p>
            Population: {formatter.format(singleCountry.population)}<br />
            Languages:
            <ol>
              {singleCountry.languages.map((language) => (
                <li key={language.name}>{language.name}</li>
              ))}
            </ol>
          </p>
          <img style={{ width: "100px" }} src={filterOutput[0].flag} />
          <Weather country={singleCountry}/>
        </React.Fragment>
      ) : ( //if we're handling multiple countries
        <React.Fragment>
          <h2>{sectionTitle}</h2>
          <ol>
            {filterOutput.map((country) => (
              <li key={country.name}>{country.name}</li>
            ))}
          </ol>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Output;
