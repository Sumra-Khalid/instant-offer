import React, { Component } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import ProgressBar from './ProgressBar';
import configData from './../../config.json';
import './InstantOffer.css';

class InstantOffer extends Component{

    constructor(props){
        super(props);
        this.state = {
            step: this.props.inputValues.step,
            property_details: '',
        } 
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };


    componentDidMount() {
        const {inputValues: { address, area_sq_ft, partial_bathroom, built_year, floors, bedrooms, covered_parking, full_bathroom, carport_spaces, property_condition, firstName, lastName, email, city, state, zip }} = this.props;
        const headers = { 'Content-Type': 'application/json', 'apikey': configData.ATOM_API_KEY };
        fetch("https://api.gateway.attomdata.com/propertyapi/v1.0.0/attomavm/detail?Address1=" + address + '&Address2="' + city + ', ' + state + '"', { headers })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    property_details: json,
                });
                const verificationStatus = this.verifyPropertyDetails(this.props.inputValues);
                
            })
    }

    verifyPropertyDetails = (inputValues) => {
        console.log('inputValues', inputValues);
        console.log('this.state.property_details', this.state.property_details);
        const property_details = this.state.property_details;
        console.log('property_details', property_details);
        if(property_details.status && property_details.status.code === 0){
            let user_data = {
                'area' : parseInt(inputValues.area_sq_ft),
                'built_year' : parseInt(inputValues.built_year),
                'floors' : parseInt(inputValues.floors),
                'bedrooms' : parseInt(inputValues.bedrooms),
                'covered_parking' : parseInt(inputValues.covered_parking),
                'full_bathroom' : parseInt(inputValues.full_bathroom),
            };

            console.log('user_data', user_data);

            let atom_data = {
                'area' : property_details.property[0].building.size.universalsize,
                'built_year' : property_details.property[0].summary.yearbuilt,
                'floors' : property_details.property[0].building.summary.levels,
                'bedrooms' : property_details.property[0].building.rooms.beds,
                'covered_parking' : property_details.property[0].building.parking.prkgSize,
                'full_bathroom' : property_details.property[0].building.rooms.bathstotal,
            };

            // var equals = user_data.length === user_data.length && user_data.every((e, i) => e.area === atom_data[i].area && e.built_year === atom_data[i].built_year && e.floors === atom_data[i].floors && e.bedrooms === atom_data[i].bedrooms && e.covered_parking === atom_data[i].covered_parking && e.full_bathroom === atom_data[i].full_bathroom);
            var equals = JSON.stringify(user_data)==JSON.stringify(atom_data);
            this.state.property_match = equals; 
        }
        else{
            
        }

    }
    
    InstantOffer = (condition, mktvalue) => {
        // console.log('condition', condition);
        // console.log('mktvalue', mktvalue);
        if (mktvalue <= 200000) {
            return (mktvalue * (this.state.formula_values.percentage.lt200k/100)) - (this.state.formula_values.condition_price[condition]);
        } else if (mktvalue > 200000 && mktvalue <= 400000) {
            return (mktvalue * (this.state.formula_values.percentage.btw200k400k/100)) - (this.state.formula_values.condition_price[condition]);
        } else if (mktvalue > 400000) {
            return (mktvalue * (this.state.formula_values.percentage.gt400/100)) - (this.state.formula_values.condition_price[condition]);
        }
    }

    render(){
        const {inputValues: { address, area_sq_ft, partial_bathroom, built_year, floors, bedrooms, covered_parking, full_bathroom, carport_spaces, property_condition, firstName, lastName, email }} = this.props;
        const verificationStatus = this.verifyPropertyDetails(this.props.inputValues);
        if (this.state.property_match) {
            const instantOffer = this.InstantOffer(property_condition, this.state.property_details.property[0].assessment.market.mktlandvalue);
            return(
            <Container className='p-md-5 w-md-75 m-auto'>
                    <p className="text-center text-dark m-0">Preparing cash offer for: <br/><b>{this.props.inputValues.address}</b></p>
                    <ProgressBar active={this.state.step} changeStep={this.props.changeStep}/>
                    <div className='bg-light rounded my-5 border rounded-lg p-2 p-md-5'>
                        <h1 className='text-default '>HERE'S OUR OFFER FOR YOUR HOUSE:</h1>
                        <div className='d-flex justify-content-between w-sm-100 w-md-50 py-3 h3'>
                            <p>Offer :</p>
                            <p className='text-default'><strong>${instantOffer}</strong></p>
                        </div>
                        <div className='d-flex  justify-content-between w-sm-100 w-md-50 mt-1'>
                            <div>
                                <p>Status</p>
                                <p className='text-default'><strong>Preliminary</strong></p>
                            </div>
                            <div>
                                <p>Valid Until</p>
                                <p className='text-default'><strong>22 Apr, 2022</strong></p>
                            </div>
                        </div>
                        <hr/>
                        <p className='h4 py-3'>To Do</p>
                        <div>
                            <Card>
                                <Card.Body className='d-flex gap-3 offer-mobile'>
                                    <h3>Show Us Your Home</h3>
                                    <Button className='bg-light text-dark border' disabled>Due 24 April</Button>
                                    <a href="#" className='h2 ms-auto'>&gt;</a>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Container>
            )
        } else {
            return (
                <Container className='p-md-5 w-md-75 m-auto'>
                    <p className="text-center text-dark m-0">Preparing cash offer for: <br/><b>{this.props.inputValues.address}</b></p>
                    <ProgressBar active={this.state.step} changeStep={this.props.changeStep}/>
                    <div className='bg-light rounded my-5 border rounded-lg p-md-5'>
                        <div className='text-center mb-5'>
                            <img src={require('./../../assets/no-offer.webp')} alt='logo' className='w-sm-100 w-md-25 mb-5'/>
                            <h2 className='text-default '>We're sorry, but we're unable to make an Instant cash offer for some reason.</h2>
                        </div>
                        <div class="w-75 m-auto text-left text-gray">
                            <h3>REASON 1: Not In Our Database</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>

                            <h3>REASON 2: Not Enough Comparable Home Sales</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        </div>
                    </div>
                </Container>
            )
        }
    }
}

export default InstantOffer;