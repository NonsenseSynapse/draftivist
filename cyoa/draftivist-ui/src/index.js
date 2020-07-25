import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Survey from './components/survey/survey';
import SurveyList from './components/surveyList/surveyList';
import SurveyResult from './components/surveyResult/surveyResult';
import * as serviceWorker from './serviceWorker';
import { 
  BrowserRouter as Router, 
  Route
} from 'react-router-dom';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/surveys" component={SurveyList} />
      <Route exact path="/surveys/:id" component={Survey} />
      <Route exact path="/draft/:id" component={SurveyResult} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
