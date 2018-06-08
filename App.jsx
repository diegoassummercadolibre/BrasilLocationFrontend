import React from 'react';
import axios from 'axios';

class App extends React.Component {
      constructor(props) {
            super(props);
                  
            this.state = {
                  states: []
            };

            this.getCountry = this.getCountry.bind(this);
      }
      
      getCountry() {
            if(this.state.states.length === 0){
                  axios.get('http://localhost:8081/countries/BR')
                        .then(response => this.setState({states: response.data.states}));
            }
            else{
                  this.setState({states:[]});
            }  
      }

      render() {
            return (
            <div>
                  <Header/>
                  <ul>
                        <li onClick={this.getCountry}>Brasil</li>
                        <ul>
                        {this.state.states.map((state, i) => <ListStates key = {i} 
                              data = {state} />)}
                        </ul>
                  </ul>
            </div>
            );
      }
}

class Header extends React.Component {
      render() {
            return (
            <div>
                  <h1>Brasil's Locations</h1>
            </div>
            );
      }
}

class ListStates extends React.Component {
      constructor(props) {
            super(props);
                  
            this.state = {
                  cities: []
            };

            this.getState = this.getState.bind(this);
      }

      getState(id) {
            if(this.state.cities.length === 0){
                  axios.get('http://localhost:8081/states/' + id)
                        .then(response => this.setState({cities: response.data.cities}))
            }
            else{
                  this.setState({cities:[]});
            }
      }

      render() {
            return (
            <div>
                  <ul>
                        <li onClick={() => this.getState(this.props.data.id)}>{this.props.data.name}</li>
                        <ul>
                        {this.state.cities.map((city, i) => <ListCities key = {i} 
                              data = {city} />)}
                        </ul>
                  </ul>
            </div>
      );
   }
}

class ListCities extends React.Component {
      constructor(props) {
            super(props);
                  
            this.state = {
                  neighborhoods: []
            };

            this.getCity = this.getCity.bind(this);
      }

      getCity(id) {
            if(this.state.neighborhoods.length === 0){
                  axios.get('http://localhost:8081/cities/' + id)
                        .then(response => this.setState({neighborhoods: response.data.neighborhoods}));
            }
            else{
                  this.setState({neighborhoods:[]});
            }
      }

      render() {
            return (
            <div>
                  <li onClick={() => this.getCity(this.props.data.id)}>{this.props.data.name}</li>
                  <ul>
                  {this.state.neighborhoods.map((neighborhood, i) => <ListNeighborhoods key = {i} 
                        data = {neighborhood} />)}
                  </ul>
            </div>
      );
   }
}


class ListNeighborhoods extends React.Component {
      render() {
      return (
         <li>
            {this.props.data.name}
         </li>
      );
   }
}

export default App;
