import React from 'react';
import axios from 'axios';

class App extends React.Component {
      constructor() {
            super();
                  
            this.state = {
                  states: []
            };

            this.loadStates = this.loadStates.bind(this);
      }
      
      loadStates() {
            axios.get('http://localhost:8081/countries/BR')
            .then(response => this.setState({states: response.data.states}))
      }

      render() {
            return (
            <div>
                  <Header/>
                  <ul>
                        <li onClick={this.loadStates.bind()}>Brasil</li>
                        <ul>
                        {this.state.states.map((state, i) => <TableRowStates key = {i} 
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

class TableRowStates extends React.Component {
      constructor() {
            super();
                  
            this.state = {
                  cities: []
            };

            this.loadCities = this.loadCities.bind(this);
      }

      loadCities(id) {
            axios.get('http://localhost:8081/states/' + id)
                .then(response => this.setState({cities: response.data.cities}))
      }

      render() {
            return (
            <li onClick={() => this.loadCities(this.props.data.id)}>
                  {this.props.data.name}
                  <ul>
                  {this.state.cities.map((city, i) => <TableRowCities key = {i} 
                        data = {city} />)}
                  </ul>
            </li>
      );
   }
}

class TableRowCities extends React.Component {
      constructor() {
            super();
                  
            this.state = {
                  neighborhoods: []
            };

            this.loadNeighborhoods = this.loadNeighborhoods.bind(this);
      }

      loadNeighborhoods(id) {
            axios.get('http://localhost:8081/cities/' + id)
                .then(response => this.setState({neighborhoods: response.data.neighborhoods}))
      }

      render() {
            return (
            <li onClick={() => this.loadNeighborhoods(this.props.data.id)}>
                  {this.props.data.name}
                  <ul>
                  {this.state.neighborhoods.map((neighborhood, i) => <TableRowNeighborhoods key = {i} 
                        data = {neighborhood} />)}
                  </ul>
            </li>
      );
   }
}


class TableRowNeighborhoods extends React.Component {
      render() {
      return (
         <li>
            {this.props.data.name}
         </li>
      );
   }
}

export default App;
