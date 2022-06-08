import { Component } from "react";
import { Container, Col, Button, Form } from "react-bootstrap";
import ProgressBar from './ProgressBar';
import NumberFormat from 'react-number-format'

class UserDetails extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            step: this.props.inputValues.step,
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
        const { inputValues: { fullName, phoneNumber, email } } = this.props;
        if (fullName && phoneNumber && email) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <Container className="p-md-5 p-3 w-md-75 m-auto">
                <p className="text-center text-dark m-0">Preparing cash offer for: <br/><b>{this.props.inputValues.address}</b></p>
                <ProgressBar active={this.state.step} changeStep={this.props.changeStep} />
                <h1 className="gradient-text mb-3 text-center">You're 5 Seconds Away From Your Offer!</h1>
                <div className="text-center">
                    <h2 className="text-dark text-lg">Your Instant Offer is: </h2>
                    <h1 className="text-default text-lg">$ <span className="blur">1234567</span></h1>
                </div>
                <div className="w-md-50 m-auto">
                    <div className="text-center">
                        <p className="text-danger d-none" id="errorMsg">Please fill out all required fields below to receive your instant offer.</p>
                    </div>
                    <Form>
                        <Form.Group className="mb-4" as={Col} controlId="full_name">
                            <Form.Label className="label">Full Name <strong className="text-danger">*</strong></Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={this.props.inputValues.fullName}
                                name="fullName"
                                required
                                placeholder="John Doe"
                                onChange={this.props.handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" as={Col} controlId="phone_number">
                            <Form.Label className="label">Phone Number <strong className="text-danger">*</strong></Form.Label>
                            <NumberFormat 
                                format="+1 (###) ###-####"
                                mask="_" 
                                defaultValue={this.props.inputValues.phoneNumber}
                                name="phoneNumber"
                                placeholder="(201) 555 5555"
                                required
                                onChange={this.props.handleChange}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-4" as={Col} controlId="email">
                            <Form.Label className="label">Email Address <strong className="text-danger">*</strong></Form.Label>
                            <Form.Control
                                type="email"
                                defaultValue={this.props.inputValues.email}
                                name="email"
                                required
                                placeholder="john@example.com"
                                onChange={this.props.handleChange}
                            />
                        </Form.Group>
                        
                    </Form>
                </div>

                <div className='w-md-25 m-auto mt-5'>
                    <Button className="bg-default w-100" onClick={this.saveAndContinue}><strong>Next &#10142;</strong></Button>
                </div>
            </Container>
        )
    }
}

export default UserDetails;