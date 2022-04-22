import { Component } from "react";
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import './PropertyCondition.css';
import ProgressBar from "./ProgressBar";

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
        this.props.nextStep();
    };

    handleParentChange = (e) => {
        this.props.handleChange(e);
    }

    changeSelected = (e) => {
        this.setState({
            selected: parseInt(e.target.value),
        });
    }

    render() {
        console.log('render', this.state.selected, "1");
        return (
            <Container className="p-md-5 w-md-75 m-auto text-center">
                <ProgressBar active={this.state.step} changeStep={this.props.changeStep} />
                <h1 className="text-default w-md-75 m-auto p-3">Tell Us About The Current Condition Of Your Property</h1>
                <p>Please choose the level that most accurately discribes the work that need to be done to your home to make it "buyer ready"</p>
                <Container className="p-md-5 w-sm-100 w-md-75">
                    <ul className="list-group mt-1 text-white condition-list">
                        <li className={(parseInt(this.state.selected) === 1) ? "list-group-item d-flex align-content-center bg-default text-white border-0" : "list-group-item d-flex align-content-center" }>
                            <div className="check">
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
                                            <strong>Level 1 - </strong> &nbsp;<h4>Touch-Up Only</h4>
                                        </div>
                                        
                                        <div className="about"><small> A House that needs only cleaning, minor touch-ups, and a quick coat of paint. </small></div>
                                    </div>
                                </div>
                            </label>
                        </li>
                        <li className={(parseInt(this.state.selected) === 2) ? "list-group-item d-flex align-content-center bg-default text-white border-0" : "list-group-item d-flex align-content-center" }>
                            <div className="check">
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
                                        
                                        <div className="about"><small> A House that needs only cleaning, minor touch-ups, and a quick coat of paint. </small></div>
                                    </div>
                                </div>
                            </label>
                        </li>
                        <li className={(parseInt(this.state.selected) === 3) ? "list-group-item d-flex align-content-center bg-default text-white border-0" : "list-group-item d-flex align-content-center" }>
                            <div className="check">
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
                                        
                                        <div className="about"><small> A House that needs only cleaning, minor touch-ups, and a quick coat of paint. </small></div>
                                    </div>
                                </div>
                            </label>
                        </li>
                        <li className={(parseInt(this.state.selected) === 4) ? "list-group-item d-flex align-content-center bg-default text-white border-0" : "list-group-item d-flex align-content-center" }>
                            <div className="check">
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
                                            <strong>Level 4 - </strong> &nbsp;<h4>Full Remodel & Rehab</h4>
                                        </div>
                                        
                                        <div className="about"><small> A House that needs only cleaning, minor touch-ups, and a quick coat of paint. </small></div>
                                    </div>
                                </div>
                            </label>
                        </li>
                    </ul> 
                    <div className='w-md-25 m-auto mt-5'>
                        <Button className="bg-default w-100" onClick={this.saveAndContinue}><strong>Next &#10142;</strong></Button>

                    </div> 
                </Container>
            </Container>
        );
    }
}

export default PropertyCondition;