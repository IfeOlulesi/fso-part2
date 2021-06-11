import React from 'react';

const Output = ({ filterOutput, sectionTitle, single }) => {
  return (
    <React.Fragment>
      {single 
        ? 
          <React.Fragment>
            <h2>{filterOutput[0].name}</h2> 
            <p>
              Population: {filterOutput[0].population}<br />
              Languages:
              <ol>
                 {
                  filterOutput[0]
                  .languages
                  .map((language) => (
                    <li key={language.name}>{language.name}</li>
                    ))
                  }
              </ol>
            </p>
            <img style={{width: '100px'}} src={filterOutput[0].flag}/>
          </React.Fragment>

        : 
          <React.Fragment>
            <h2>{sectionTitle}</h2>
            <ol>
              {filterOutput.map((country) => (
                <li key={country.name}>{country.name}</li>
              ))}
            </ol>
          </React.Fragment>
        
      }
      
    </React.Fragment>
  )
}

export default Output;