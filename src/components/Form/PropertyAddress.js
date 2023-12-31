import React, { Component } from 'react';
import { Form, Button, Col, Container, Row, Modal } from 'react-bootstrap';
import loading from './../../assets/loading-icon.gif';
import ProgressBar from './ProgressBar';
import configData from './../../config.json';
import Spinner from './../Spinner/Spinner';

const photoStyle = {
    width: '600px',
    maxWidth: '100%',
    maxHeight: '400px',
    borderRadius: '10px!important',
    border: '1px solid lightgray',
};

class PropertyAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            complete_address: '',
            step: this.props.inputValues.step,
            location_image: loading,
            address_modal: false,
            map_image: loading,
            is_property: false,
            is_address_valid: false,
            is_loading: true,
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
        if (this.state.is_property) {
            e.preventDefault();
            this.props.nextStep();
        } else {
            this.props.changeStep(404);
        }
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
            state: document.getElementById('state').value
        }
        let addr = corrected_address.address_line_1 + ', ' + corrected_address.address_line_2 + ', ' + corrected_address.city + ', ' + corrected_address.state;
        this.setState({
            address: addr,
        });
        this.props.correctAddress(corrected_address);
        this.getLocationImage(addr);
        this.getMapImage(addr);
        this.setState({
            address_modal: false,
            is_address_valid: true,
        });
        window.history.replaceState(null, "Test Title", "/?phone={Phone:2}&email={Email:3}&propaddress="+corrected_address.address_line_1+"&propcity="+corrected_address.city+"&propstate="+corrected_address.state+"&propzip=");
        this.fetchProperty(corrected_address.address_line_1, corrected_address.city, corrected_address.state);
    }

    componentDidMount() {
        const {inputValues: { address, city, state }} = this.props;
        let addr = address + ', ' + city + ', ' + state;
        this.getLocationImage(addr);
        this.getMapImage(addr);
        if (this.props.inputValues.zip) {
            addr += ', ' + this.props.inputValues.zip;
        }
        this.setState({
            complete_address: addr,
        });

        if (this.props.inputValues.address && this.props.inputValues.city && this.props.inputValues.state) {
            this.setState({
                is_address_valid: true,
            });
            this.fetchProperty(this.props.inputValues.address, this.props.inputValues.city, this.props.inputValues.state, this.props.inputValues.zip);
        } else {
            this.setState({
                is_address_valid: false,
            });
        }        
    }

    fetchProperty(address, city, state) {
        this.setState({
            is_loading: true,
        });
        const headers = { 'Content-Type': 'application/json', 'apikey': configData.ATOM_API_KEY };
        fetch("https://api.gateway.attomdata.com/propertyapi/v1.0.0/avm/detail?Address1=" + address + '&Address2=' + city + ', ' + state  , { headers })
            .then((res) => res.json())
            .then((json) => {
                if (json.property && json.property.length > 0) {
                    let property_details = {
                        'area' : json.property[0].building.size.universalsize,
                        'built_year' : json.property[0].summary.yearbuilt,
                        'floors' : json.property[0].building.summary.levels,
                        'bedrooms' : json.property[0].building.rooms.beds,
                        'covered_parking' : json.property[0].building.parking.prkgSize,
                        'full_bathroom' : json.property[0].building.rooms.bathstotal,
                        'value' : json.property[0].avm.amount.value,
                        'property_type' : json.property[0].summary.propclass,
                        'lot_size' : json.property[0].lot.lotsize2,
                        'mailing_address' : json.property[0].address.line1,
                        'mailing_city' : json.property[0].address.locality,
                        'mailing_state' : json.property[0].address.countrySubd,
                        'mailing_zip' : json.property[0].address.postal1,

                    };
                    this.props.updatePropertyDetails(property_details);
                    this.setState({
                        is_property: true,
                    });
                } else {
                    this.setState({
                        is_property: false,
                    });
                }
                this.setState({
                    is_loading: false,
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    is_loading: false,
                });
            }
            );
    }

    render() {
        const {inputValues: { address, city, state }} = this.props;
        let complete_address = address;

        return( <Container fluid='sm' className="p-md-5 w-md-75 m-auto"> 
                    <Spinner show={this.state.is_loading}/>          
                    <p className="text-center text-dark m-0">Preparing cash offer for: <br/><b>{complete_address}</b></p>
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
                    </Row>

                    <div className="text-center py-5">
                        <h1>Is this the right address?</h1>
                        <h5 className="mb-4"> {complete_address}</h5>
                        <button className={(this.state.is_address_valid) ? 'button-green d-block m-auto w-sm-100 w-md-25  mb-3' : 'button-green bg-light text-muted border d-block m-auto w-sm-100 w-md-25  mb-3'} disabled={this.state.is_address_valid ? false : true} onClick={this.saveAndContinue}>Yes Got it Right</button>
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
                                            defaultValue={address}
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
                                            <option value="District Of Columbia">District Of Columbia</option>
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
                                            <option value="New Hampshire">New Hampshire</option>
                                            <option value="New Jersey">New Jersey</option>
                                            <option value="New Mexico">New Mexico</option>
                                            <option value="New York">New York</option>
                                            <option value="North Carolina">North Carolina</option>
                                            <option value="North Dakota">North Dakota</option>
                                            <option value="Ohio">Ohio</option>
                                            <option value="Oklahoma">Oklahoma</option>
                                            <option value="Oregon">Oregon</option>
                                            <option value="Pennsylvania">Pennsylvania</option>
                                            <option value="Rhode Island">Rhode Island</option>
                                            <option value="South Carolina">South Carolina</option>
                                            <option value="South Dakota">South Dakota</option>
                                            <option value="Tennessee">Tennessee</option>
                                            <option value="Texas">Texas</option>
                                            <option value="Utah">Utah</option>
                                            <option value="Vermont">Vermont</option>
                                            <option value="Virginia">Virginia</option>
                                            <option value="Washington">Washington</option>
                                            <option value="West Virginia">West Virginia</option>
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