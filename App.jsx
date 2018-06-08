import React from 'react';
import axios from 'axios';

class App extends React.Component {
      constructor() {
            super();
                  
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
                        <li onClick={this.getCountry.bind()}>Brasil</li>
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
      constructor() {
            super();
                  
            this.state = {
                  cities: []
            };

            this.getState = this.getState.bind(this);
      }

      getState(id) {
            /* if(this.state.cities.length === 0){
                  axios.get('http://localhost:8081/states/' + id)
                        .then(response => this.setState({cities: response.data.cities}))
            }
            else{
                  this.setState({cities:[]});
            }*/

            axios.get('http://localhost:8081/states/' + id)
                        .then(response => this.setState({cities: response.data.cities}))
      }

      render() {
            return (
            <div>
                  <li onClick={() => this.getState(this.props.data.id)}>
                        {this.props.data.name}
                        <ul>
                        {this.state.cities.map((city, i) => <ListCities key = {i} 
                              data = {city} />)}
                        </ul>
                  </li>
            </div>
      );
   }
}

class ListCities extends React.Component {
      constructor() {
            super();
                  
            this.state = {
                  neighborhoods: []
            };

            this.getCity = this.getCity.bind(this);
      }

      getCity(id) {
            /* if(this.state.neighborhoods.length === 0){
                  axios.get('http://localhost:8081/cities/' + id)
                        .then(response => this.setState({neighborhoods: response.data.neighborhoods}));
            }
            else{
                  this.setState({neighborhoods:[]});
            }*/
            
            axios.get('http://localhost:8081/cities/' + id)
            .then(response => this.setState({neighborhoods: response.data.neighborhoods}));
      }

      render() {
            return (
            <div>
                  <li onClick={() => this.getCity(this.props.data.id)}>
                        {this.props.data.name}
                        <ul>
                        {this.state.neighborhoods.map((neighborhood, i) => <ListNeighborhoods key = {i} 
                              data = {neighborhood} />)}
                        </ul>
                  </li>
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
