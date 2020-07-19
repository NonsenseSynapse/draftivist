import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';

class App extends Component {
  
  render () {

    return (
       <div>
          <h1>Welcome home, dude</h1>
          <Link to="/surveys">Available Surveys</Link> 
       </div>
       
    )
  }
}

export default App;