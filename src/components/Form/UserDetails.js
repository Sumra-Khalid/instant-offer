import { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ProgressBar from './ProgressBar';


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
        this.props.nextStep();
    };

    render() {
        return (
            <Container className="p-md-5 p-3 w-md-75 m-auto">
                <p className="text-center text-dark m-0">Preparing cash offer for: <br/><b>{this.props.inputValues.address}</b></p>
                <ProgressBar active={this.state.step} changeStep={this.props.changeStep} />
                <h1 className="text-default mb-3 text-center">You're 5 Seconds Away From Your Offer!</h1>
                <div className="text-center">
                    <h3 className="text-dark">Your Instant Offer is: </h3>
                    <h3 className="text-default blur">$1234567</h3>
                </div>
                <div className="w-md-50 m-auto">
                    <Form>
                        <Form.Group className="mb-4" as={Col} controlId="full_name">
                            <Form.Label className="label">Full Name</Form.Label>
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
                            <Form.Label className="label">Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={this.props.inputValues.phoneNumber}
                                name="phoneNumber"
                                placeholder="(201) 555 5555"
                                required
                                onChange={this.props.handleChange}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-4" as={Col} controlId="email">
                            <Form.Label className="label">Email Address</Form.Label>
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