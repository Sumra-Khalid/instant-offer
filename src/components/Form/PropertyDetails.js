import React, { Component } from 'react';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import ProgressBar from './ProgressBar';

class PropertyDetails extends Component{

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
        return( <Container className="p-md-5 w-md-75 m-auto">
                    <ProgressBar active={this.state.step} changeStep={this.props.changeStep} />
                    <h1 className='text-default w-md-75 m-auto text-center p-3'>Please Confirm Your House's Property Details Below</h1>
                    <p className='text-center'>The information below was pulled from local tax records. Please enter any missing information</p>
                    <Form className='w-md-75 mt-5 m-auto'>
                        <Row className="mb-4 mx-md-5">
                            <Col sm={12} md={6} className="mb-sm-10">
                                <Form.Group controlId="area_sq_ft">
                                    <Form.Label className='font-weight-bold'>Square Feet</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        defaultValue={this.props.inputValues.area_sq_ft}
                                        name="area_sq_ft"
                                        required
                                        onChange={this.props.handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col  sm={12} md={6} className="mb-sm-10">
                                <Form.Group controlId="partial_bathrooms">
                                    <Form.Label className='font-weight-bold'>Partial Bathrooms</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        defaultValue={this.props.inputValues.partial_bathroom}
                                        name="partial_bathroom"
                                        required
                                        onChange={this.props.handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6} className="mb-sm-10">
                                <Form.Group controlId="built_year">
                                    <Form.Label className='font-weight-bold'>Year Built</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        defaultValue={this.props.inputValues.built_year}
                                        name="built_year"
                                        required
                                        onChange={this.props.handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col  sm={12} md={6} className="mb-sm-10">
                                <Form.Group controlId="floors">
                                    <Form.Label className='font-weight-bold'>Floors</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        defaultValue={this.props.inputValues.floors}
                                        name="floors"
                                        required
                                        onChange={this.props.handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6} className="mb-sm-10">
                                <Form.Group controlId="bedrooms">
                                    <Form.Label className='font-weight-bold'>Bedrooms</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        defaultValue={this.props.inputValues.bedrooms}
                                        name="bedrooms"
                                        required
                                        onChange={this.props.handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6} className="mb-sm-10">
                                <Form.Group controlId="covered_parking">
                                    <Form.Label className='font-weight-bold'>Covered Parking</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        defaultValue={this.props.inputValues.covered_parking}
                                        name="covered_parking"
                                        required
                                        onChange={this.props.handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col  sm={12} md={6} className="mb-sm-10">
                                <Form.Group controlId="full_bathroom">
                                    <Form.Label className='font-weight-bold'>Full Bathrooms</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        defaultValue={this.props.inputValues.full_bathroom}
                                        name="full_bathroom"
                                        required
                                        onChange={this.props.handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6} className="mb-sm-10">
                                <Form.Group controlId="carport_spaces">
                                    <Form.Label className='font-weight-bold'>Carport Spaces</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        defaultValue={this.props.inputValues.carport_spaces}
                                        name="carport_spaces"
                                        required
                                        onChange={this.props.handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className='w-md-25 m-auto mt-5'>
                            <Button className="bg-default w-100" onClick={this.saveAndContinue}><strong>Next &#10142;</strong></Button>

                        </div>

                    </Form>
                </Container>
        );
    }
}



export default PropertyDetails;