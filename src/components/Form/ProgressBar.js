import { Component } from "react";
import BootstrapProgressBar from "react-bootstrap/ProgressBar";
import { Container } from "react-bootstrap";
import './ProgressBar.css';
import locationIcon from './../../assets/map.png';
import RightArrow from './../../assets/right-arrow.png';
import houseIcon from './../../assets/house.png';
import propertyIcon from './../../assets/earthquake.png';
import infoIcon from './../../assets/information.png';
import dollarIcon from './../../assets/dollar-symbol.png';
import greenLocationIcon from './../../assets/g-map.png';
import greenRightArrow from './../../assets/g-right-arrow.png';
import greenHouseIcon from './../../assets/g-house.png';
import greenPropertyIcon from './../../assets/g-earthquake.png';
import greenInfoIcon from './../../assets/g-information.png';
import greenDollarIcon from './../../assets/g-dollar-symbol.png';

class ProgressBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: this.props.active,
            progress: 20
        };
    }

    updateStep = (event) => {
        let step = '';
        if (event.target.getAttribute('data-step')) {
            step = event.target.getAttribute('data-step');
        } else if (event.target.parentNode.getAttribute('data-step')) {
            step = event.target.parentNode.getAttribute('data-step');
        } else if (event.target.parentNode.parentNode.getAttribute('data-step')) {
            step = event.target.parentNode.parentNode.getAttribute('data-step');
        }
        this.props.changeStep(step);
    }

    componentDidMount(prevProps) {
        switch (this.state.step) {
            case 1: 
                this.setState({
                    progress: 20
                });
                break;
            case 2:
                this.setState({
                    progress: 40
                });
                break;
            case 3:
                this.setState({
                    progress: 60
                });
                break;
            case 4:
                this.setState({
                    progress: 80
                });
                break;
            case 5:
                this.setState({
                    progress: 100
                });
                break;
            default:
                break;
        }
    }


    
    render() {
        console.log('step', this.state.step);
        return (
            <Container>
                <ul id="progressbar" className="mt-4">
                    <li onClick={this.updateStep} data-step="1" className={(this.state.step >= 1) ? "active" : ""} id="address"><strong>Confirm Address</strong></li>
                    <li onClick={this.updateStep} data-step="2" className={(this.state.step >= 2) ? "active" : ""} id="property_details"><strong>Property Details</strong></li>
                    <li onClick={this.updateStep} data-step="3" className={(this.state.step >= 3) ? "active" : ""} id="property_condition"><strong>Property Condition</strong></li>
                    <li onClick={this.updateStep} data-step="4" className={(this.state.step >= 4) ? "active" : ""} id="user_details"><strong>Personal Info</strong></li>
                    <li onClick={this.updateStep} data-step="5" className={(this.state.step >= 5) ? "active" : ""} id="instant_offer"><strong>Instant Offer</strong></li>
                </ul>
            </Container>
        )
    }
}

export default ProgressBar;