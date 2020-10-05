import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Campaign from './components/campaign/campaign';
import CampaignList from './components/campaignList/campaignList';
import Draft from './components/draft/draft';
import * as serviceWorker from './serviceWorker';
import { 
  BrowserRouter as Router, 
  Route
} from 'react-router-dom';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/campaigns" component={CampaignList} />
      <Route exact path="/campaigns/:id" component={Campaign} />
      <Route exact path="/draft/:id" component={Draft} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
