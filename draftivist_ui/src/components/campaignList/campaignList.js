import React, {Component} from 'react';
import {apiBase} from '../../settings';
import {Link} from 'react-router-dom';


class CampaignList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campaignList: null
        }
    }
    
    getCampaigns() {
        fetch(`${apiBase}/campaigns`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            campaignList: data.results
          })
        })
      }
    
      componentDidMount() {
        this.getCampaigns()
      }

    render() {
        if (!this.state.campaignList) {
            return <div />
        }
    
        return (
            <div>

                <h1>Available Campaigns</h1>

                <ol>

                {this.state.campaignList.map((campaign) => (
                    <li key={campaign.id}>
                        <Link to={`/campaigns/${campaign.id}`}>{campaign.name}</Link>
                    </li>
                ))}
                
                </ol>

            </div>

            
        )
    }

}

export default CampaignList