import React, { Component } from 'react';
import { Form, Button, Col, Container, Row, Modal } from 'react-bootstrap';
import no_image from './../../assets/no-image.jpg';
import ProgressBar from './ProgressBar';
import MapContainer from './Map';
import configData from './../../config.json';

const photoStyle = {
    width: '600px',
    maxWidth: '100%',
    maxHeight: '400px',
    borderRadius: '10px!important',
};

class PropertyAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: this.props.address,
            step: this.props.inputValues.step,
            location_image: no_image,
            address_modal: false,
            map_image: no_image,
        };
        
    }

    handleClose = () => {
        this.setState({
            address_modal: false,
        });
    };

    handleShow = () => {
        this.setState({
            address_modal: true,
        });
    };

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    getLocationImage = (addr) => {
        fetch("https://maps.googleapis.com/maps/api/streetview?location=" + addr + "&size=600x400&key=" + configData.GOOGLE_MAPS_API_KEY + "", {'Access-Control-Allow-Origin': '*'})
        .then(data => {            
            this.setState({
                location_image: data.url,
            });
        })
        .catch(error => console.log(error));
    }

    getMapImage = (addr) => {
        fetch("https://maps.googleapis.com/maps/api/staticmap?markers=color%3Ared%7C" + addr + "&size=600x400&key=" + configData.GOOGLE_MAPS_API_KEY + "", {'Access-Control-Allow-Origin': '*'})
        .then(data => {
            console.log('map image data', data);
            if (data.status === 200) {    
                this.setState({
                    map_image: data.url,
                });
            }
        })
        .catch(error => console.log(error));
    }

    correctAddress = () => {
        let corrected_address = {
            address_line_1: document.getElementById('address_line_1').value,
            address_line_2: document.getElementById('address_line_2').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
        }
        this.setState({
            address: corrected_address.address_line_1 + ', ' + corrected_address.address_line_2 + ', ' + corrected_address.city + ', ' + corrected_address.state
        });
        this.props.correctAddress(corrected_address);
        this.setState({
            address_modal: false,
        });
    }

    updateAddress = (addr) => {
        // this.setState({
        //     address: addr,
        // });
    }

    componentDidMount() {
        this.getLocationImage(this.state.address);
        this.getMapImage(this.state.address);
    }

    render() {

        return( <Container fluid='sm' className="p-md-5 w-md-75 m-auto">
                    <ProgressBar active={this.state.step} changeStep={this.props.changeStep}/>
                    <Row className=''>
                        <Col sm={12} md={6} className="mb-2">
                            <img 
                                id="photo"
                                src={this.state.location_image}
                                alt="property"
                                style={photoStyle}
                            />
                        </Col>
                        <Col sm={12} md={6} className="mb-2">
                            <img 
                                id="photo"
                                src={this.state.map_image}
                                alt="property"
                                style={photoStyle}
                            />
                        </Col>
                        {/* <Col>
                            <MapContainer address={this.state.address} className="custom" changeImageSrc={this.getLocationImage} updateAddress={this.updateAddress}/>
                        </Col> */}
                    </Row>

                    <div className="text-center py-5">
                        <h1>Is this the right address?</h1>
                        <h5 className="mb-4"> {this.state.address}, {this.props.inputValues.city}, {this.props.inputValues.state}, {this.props.inputValues.zip}</h5>
                        <button className='button-green d-block m-auto w-sm-100 w-md-25  mb-3' onClick={this.saveAndContinue}>Yes Got it Right</button>
                        <button className='button-danger d-block m-auto w-sm-100 w-md-25  mb-3' onClick={this.handleShow}>Fix Address</button>
                    </div>

                    <Modal show={this.state.address_modal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Correct You Address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col sm={12} md={6}>
                                    <Form.Group className="mb-2" as={Col} controlId="address_line_1">
                                        <Form.Label className="label">Address Line 1</Form.Label>
                                        <Form.Control
                                            type="text"
                                            defaultValue={this.props.address}
                                            name="address_line_1"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={6}>
                                    <Form.Group className="mb-2" as={Col} controlId="address_line_2">
                                        <Form.Label className="label">Address Line 2</Form.Label>
                                        <Form.Control
                                            type="text"
                                            defaultValue={this.props.inputValues.email}
                                            name="address_line_2"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={6}>
                                    <Form.Group className="mb-2" as={Col} controlId="city">
                                        <Form.Label className="label">City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            defaultValue={this.props.inputValues.city}
                                            name="city"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={6}>
                                    <Form.Group className="mb-2" as={Col} controlId="state">
                                        <Form.Label className="label">State</Form.Label>
                                        <Form.Select
                                            type="text"
                                            defaultValue={this.props.inputValues.state}
                                            name="state"
                                            required
                                        >
                                            <option value="Alabama">Alabama</option>
                                            <option value="Alaska">Alaska</option>
                                            <option value="Arizona">Arizona</option>
                                            <option value="Arkansas">Arkansas</option>
                                            <option value="California">California</option>
                                            <option value="Colorado">Colorado</option>
                                            <option value="Connecticut">Connecticut</option>
                                            <option value="Delaware">Delaware</option>
                                            <option value="District">District Of Columbia</option>
                                            <option value="Florida">Florida</option>
                                            <option value="Georgia">Georgia</option>
                                            <option value="Hawaii">Hawaii</option>
                                            <option value="Idaho">Idaho</option>
                                            <option value="Illinois">Illinois</option>
                                            <option value="Indiana">Indiana</option>
                                            <option value="Iowa">Iowa</option>
                                            <option value="Kansas">Kansas</option>
                                            <option value="Kentucky">Kentucky</option>
                                            <option value="Louisiana">Louisiana</option>
                                            <option value="Maine">Maine</option>
                                            <option value="Maryland">Maryland</option>
                                            <option value="Massachusetts">Massachusetts</option>
                                            <option value="Michigan">Michigan</option>
                                            <option value="Minnesota">Minnesota</option>
                                            <option value="Mississippi">Mississippi</option>
                                            <option value="Missouri">Missouri</option>
                                            <option value="Montana">Montana</option>
                                            <option value="Nebraska">Nebraska</option>
                                            <option value="Nevada">Nevada</option>
                                            <option value="New">New Hampshire</option>
                                            <option value="New">New Jersey</option>
                                            <option value="New">New Mexico</option>
                                            <option value="New">New York</option>
                                            <option value="North">North Carolina</option>
                                            <option value="North">North Dakota</option>
                                            <option value="Ohio">Ohio</option>
                                            <option value="Oklahoma">Oklahoma</option>
                                            <option value="Oregon">Oregon</option>
                                            <option value="Pennsylvania">Pennsylvania</option>
                                            <option value="Rhode">Rhode Island</option>
                                            <option value="South">South Carolina</option>
                                            <option value="South">South Dakota</option>
                                            <option value="Tennessee">Tennessee</option>
                                            <option value="Texas">Texas</option>
                                            <option value="Utah">Utah</option>
                                            <option value="Vermont">Vermont</option>
                                            <option value="Virginia">Virginia</option>
                                            <option value="Washington">Washington</option>
                                            <option value="West">West Virginia</option>
                                            <option value="Wisconsin">Wisconsin</option>
                                            <option value="Wyoming">Wyoming</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>


                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button className="bg-default" onClick={(this.correctAddress)}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
        );
    }
}

export default PropertyAddress;