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
                <div className="d-flex flex-col py-3 gap-3 justify-content-between progress-wrapper">
                    <div onClick={this.updateStep} data-step="1" className={(this.state.step >= 1) ? "d-flex text-default flex-item" : "d-flex flex-item"}>
                        <div>
                            <img src={(this.state.step >= 1) ? greenLocationIcon : locationIcon} alt="logo" width='35' className="p-1 img-fluid" />
                        </div>
                        <p className="m-2"> <strong>Confirm Address</strong></p>
                    </div>
                    <div onClick={this.updateStep} data-step="2" className={(this.state.step >= 2) ? "d-flex text-default flex-item" : "d-flex flex-item"}>
                        <div>
                            <img src={(this.state.step >= 2) ? greenHouseIcon : houseIcon} alt="logo" width='35' className="p-1 img-fluid" />
                        </div>
                        <p className="m-2"> <strong>Property Details</strong></p>
                    </div>
                    <div onClick={this.updateStep} data-step="3" className={(this.state.step >= 3) ? "d-flex text-default flex-item" : "d-flex flex-item"}>
                        <div>
                            <img src={(this.state.step >= 3) ? greenPropertyIcon : propertyIcon} alt="logo" width='35' className="p-1 img-fluid" />
                        </div>
                        <p className="m-2"> <strong>Property Condition</strong></p>
                    </div>
                    <div onClick={this.updateStep} data-step="4" className={(this.state.step >= 4) ? "d-flex text-default flex-item" : "d-flex flex-item"}>
                        <div>
                            <img src={(this.state.step >= 4) ? greenInfoIcon : infoIcon} alt="logo" width='35' className="p-1 img-fluid" />
                        </div>
                        <p className="m-2"> <strong>Personal Info</strong></p>
                    </div>
                    <div onClick={this.updateStep} data-step="5" className={(this.state.step >= 5) ? "d-flex text-default flex-item" : "d-flex flex-item"}>
                        <div>
                            <img src={(this.state.step >= 5) ? greenDollarIcon : dollarIcon} alt="logo" width='35' className="p-1 img-fluid" />
                        </div>
                        <p className="m-2"> <strong>Instant Offer</strong></p>
                    </div>

                </div>
                <BootstrapProgressBar className="mb-4" striped variant="default" now={this.state.progress} />
            </Container>
        )
    }
}

export default ProgressBar;