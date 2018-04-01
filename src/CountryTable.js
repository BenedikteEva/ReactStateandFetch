import React, { Component } from "react";
//import  CountryFactory from "./countryFactory";

 function countryPropMany(props){
  
  if (props.length>1){
  return props[0]+"(+"+(props.length-1)+")";
}
 
    return props[0];
}

const URL = "http://localhost:3333"; 


class CountryTable extends Component {
 
  constructor(props) {
    super(props);
    this.state = { labels: this.props.labels, countries: this.props.countries}
    
  }
   componentDidMount() {
    fetch(URL + "/labels")
      .then(results => {
        if (!results.ok) {
          throw Error(results.statusText);
        }
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
        if (!results.ok) {
          throw Error(results.statusText);
        }
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




  render() {
 
    return (
     
      <table className="table">
 
        <thead>
          {this.state.labels}

        </thead>
        <tbody>
          {this.state.countries}
        </tbody>
      </table>

    );
  }

}

export default CountryTable;