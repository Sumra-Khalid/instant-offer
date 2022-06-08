import { Component } from "react";
import { Form, Button, Container } from 'react-bootstrap';
import ProgressBar from "./ProgressBar";
import './PropertyCondition.css';

class PropertyCondition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: this.props.inputValues.step,
            selected: 0
        };
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        var validate = this.validate();
        if (validate) {
            document.getElementById('errorMsg').classList.remove('d-none');
            this.props.nextStep();
        } else {
            document.getElementById('errorMsg').classList.remove('d-none');
        }
    };

    validate = () => {
        const { inputValues: { property_condition } } = this.props;
        if (property_condition) {
            return true;
        }
        return false;
    }

    handleParentChange = (e) => {
        this.props.handleChange(e);
    }

    changeSelected = (e) => {
        this.setState({
            selected: parseInt(e.target.value),
        });
    }

    render() {
        return (
            <Container className="p-md-5 w-md-75 m-auto">
                <p className="text-center text-dark m-0">Preparing cash offer for: <br/><b>{this.props.inputValues.address}</b></p>
                <ProgressBar active={this.state.step} changeStep={this.props.changeStep} />
                <h1 className="gradient-text text-center w-md-75 m-auto p-3">Tell Us About The Current Condition Of Your Property</h1>
                <p className="text-center">Please choose the level that most accurately discribes the work that need to be done to your home to make it "buyer ready"</p>
                <Container className="p-md-5 w-sm-100 w-md-75">
                    <div className="text-center">
                        <p className="text-danger d-none" id="errorMsg">Please fill out all required fields below to receive your instant offer.</p>
                    </div>
                    <ul className="list-group mt-1 text-white condition-list">
                        <li className={(parseInt(this.state.selected) === 1) ? "list-group-item d-flex align-content-center bg-default text-white border-0" : "list-group-item d-flex align-content-center" }>
                            <div className="check d-none">
                                <Form.Check
                                    id="level1"
                                    type="radio"
                                    defaultValue='1'
                                    name="property_condition"
                                    required
                                    onChange={(e) => {this.handleParentChange(e); this.changeSelected(e)}}
                                />
                            </div>
                            <label for="level1">
                                <div className="checkbox-details">
                                    <div className="">
                                        <div className="d-flex flex-col align-items-baseline">
                                            <strong>Level 1 - </strong> &nbsp;<h4>Great Condition</h4>
                                        </div>
                                        
                                        <div className="about"><small> Level one is for a house that only needs minor cleaning, minor touch-ups, and some paint. </small></div>
                                    </div>
                                </div>
                            </label>
                        </li>
                        <li className={(parseInt(this.state.selected) === 2) ? "list-group-item d-flex align-content-center bg-default text-white border-0" : "list-group-item d-flex align-content-center" }>
                            <div className="check  d-none">
                                <Form.Check
                                    id="level2"
                                    type="radio"
                                    defaultValue='2'
                                    name="property_condition"
                                    required
                                    onChange={(e) => {this.handleParentChange(e); this.changeSelected(e)}}
                                />
                            </div>
                            <label for="level2">
                                <div className="checkbox-details">
                                    <div className="">
                                        <div className="d-flex flex-col align-items-baseline">
                                            <strong>Level 2 - </strong> &nbsp;<h4>Light Remodel</h4>
                                        </div>
                                        
                                        <div className="about"><small> Level 2 is for houses that only need minor repairs, painting throughout the house, new flooring, updating fixtures, light electrical or plumbing work, and new appliances. </small></div>
                                    </div>
                                </div>
                            </label>
                        </li>
                        <li className={(parseInt(this.state.selected) === 3) ? "list-group-item d-flex align-content-center bg-default text-white border-0" : "list-group-item d-flex align-content-center" }>
                            <div className="check  d-none">
                                <Form.Check
                                    id="level3"
                                    type="radio"
                                    defaultValue='3'
                                    name="property_condition"
                                    required
                                    onChange={(e) => {this.handleParentChange(e); this.changeSelected(e)}}
                                />
                            </div>
                            <label for="level3">
                                <div className="checkbox-details">
                                    <div className="">
                                        <div className="d-flex flex-col align-items-baseline">
                                            <strong>Level 3 - </strong> &nbsp;<h4>Moderate Remodel</h4>
                                        </div>
                                        
                                        <div className="about"><small> Level 3 would include everything from level 2 and complete renovation of the kitchen, bathrooms, sheetrock repairs, window replacements, and some more expensive repairs such as a new roof, foundation repair, replacement of siding, etc. </small></div>
                                    </div>
                                </div>
                            </label>
                        </li>
                        <li className={(parseInt(this.state.selected) === 4) ? "list-group-item d-flex align-content-center bg-default text-white border-0" : "list-group-item d-flex align-content-center" }>
                            <div className="check  d-none">
                                <Form.Check
                                    id="level4"
                                    type="radio"
                                    defaultValue='4'
                                    name="property_condition"
                                    required
                                    onChange={(e) => {this.handleParentChange(e); this.changeSelected(e)}}
                                />
                            </div>
                            <label for="level4">
                                <div className="checkbox-details">
                                    <div className="">
                                        <div className="d-flex flex-col align-items-baseline">
                                            <strong>Level 4 - </strong> &nbsp;<h4>Full Remodel</h4>
                                        </div>
                                        
                                        <div className="about"><small> Level 4 is the entire home needs to be fully renovated top to bottom, inside and out, including all mechanicals and structural repairs. </small></div>
                                    </div>
                                </div>
                            </label>
                        </li>
                    </ul> 
                    <div className='w-md-25 m-auto mt-5'>
                        <Button className="bg-default border-0 w-100" onClick={this.saveAndContinue}><strong>Next &#10142;</strong></Button>

                    </div> 
                </Container>
            </Container>
        );
    }
}

export default PropertyCondition;