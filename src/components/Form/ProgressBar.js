import { Component } from "react";
import { Container } from "react-bootstrap";
import './ProgressBar.css';

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
        return (
            <Container>
                <ul id="progressbar" className="mt-4">
                    <li onClick={this.updateStep} data-step="1" className={(this.state.step >= 1) ? "active" : ""} id="address"><strong>Confirm Address</strong></li>
                    <li onClick={this.updateStep} data-step="2" className={(this.state.step >= 2) ? "active" : ""} id="property_condition"><strong>Property Condition</strong></li>
                    <li onClick={this.updateStep} data-step="3" className={(this.state.step >= 3) ? "active" : ""} id="user_details"><strong>Personal Info</strong></li>
                    <li onClick={this.updateStep} data-step="4" className={(this.state.step >= 4) ? "active" : ""} id="instant_offer"><strong>Instant Offer</strong></li>
                    <li onClick={this.updateStep} data-step="5" className={(this.state.step >= 5) ? "active" : ""} id="property_details"><strong>Schedule Appointment</strong></li>
                </ul>
            </Container>
        )
    }
}

export default ProgressBar;