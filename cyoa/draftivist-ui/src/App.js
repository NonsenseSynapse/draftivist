import React, {Component} from 'react';
import './App.css';
import Survey from './components/survey/survey';
import {apiBase} from './settings';

class App extends Component {
  state = {
    survey: null
  }

  getContacts() {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
    })
    .catch(console.log)
  }

  getSurvey() {
    fetch(apiBase + '/surveys/1')
    .then(res => res.json())
    .then(data => {
      this.setState({survey: data})
    })
  }

  componentDidMount() {
    this.getSurvey()
  }
  
  render () {
    return (
      <Survey survey={this.state.survey} />
    )
  }
}

export default App;