import React, { Component } from 'react';
//I dont know how to pass this class as props to Countrytable so I just put the 
// componentDidMount and the function for value arrays into CountryTable. 

function countryPropMany(props){
  
  if (props.length>1){
  return props[0]+"(+"+(props.length-1)+")";
}
 
    return props[0];
}

const URL = "http://localhost:3333";

class CountryFactory {

  constructor() {
  
    this.labels = [];
    this.countries = [];
  }

  getLabels = () => {
  return this.labels 
}
  
  
  getCountries = () => {
  return this.countries
  };

  componentDidMount() {
    fetch(URL + "/labels")
      .then(results => {
        return results.json();
      }).then(data => {

        const labels = data.map((label) => {
          return (
            <th>
              <tr key={label.id}>
                {label}
              </tr>
            </th>
          )
        })

        this.setState({ labels: labels })
   
      })

    fetch(URL + "/countries")
      .then(results => {
        return results.json();
      }).then(data2 => {

        const countries = data2.map((country) => {
          return (
            <tr key={country.id}>

              <td>  {country.name}</td>
              <td> {country.capital}</td>
              <td> {country.region}</td>
              <td> {country.population}</td>
              <td> {country.area}</td>
              <td> {countryPropMany(country.timezones)}</td>
              <td> {countryPropMany(country.borders)}</td>
              <td> {country.topLevelDomain}</td>
              <td> {countryPropMany(country.currencies)}</td>
              <td> {countryPropMany(country.languages)}</td>
            </tr>

          )
        })
        this.setState({ countries: countries })
   
      })

  }
 
}
export default new CountryFactory();





