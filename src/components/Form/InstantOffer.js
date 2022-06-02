import React, { Component } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import ProgressBar from './ProgressBar';
import configData from './../../config.json';
import './InstantOffer.css';
import axios from 'axios';
import Moment from 'react-moment';
import SpeedoMeter from './../../assets/speedometer.png';

class InstantOffer extends Component{

    constructor(props){
        super(props);
        this.state = {
            step: this.props.inputValues.step,
            property_details: '',
            formula_values: {
                'condition_price': {
                    "1": "12000",
                    "2": "25000",
                    "3": "45000",
                    "4": "75000",
                },
                'percentage' : {
                    "lt200k": "60",
                    "btw200k400k": "70",
                    "gt400": "75"
                }
            }
        } 
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        var step = e.target.getAttribute('data-step');
        if (step == 55){
            this.props.changeStep(55);
        } else {
            this.props.nextStep();
        }
    };


    componentDidMount() {
        const {inputValues: { address, area_sq_ft, partial_bathroom, built_year, floors, bedrooms, covered_parking, full_bathroom, carport_spaces, property_condition, firstName, lastName, email, city, state, zip }} = this.props;
        this.setState({
            property_match : true
        })
        this.generateLeadToCRM(this.props.inputValues);
        let date = new Date();
        date.setDate(date.getDate() + 5 );
        this.setState({
            validity: date
        });
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
        if (mktvalue <= 200000) {
            return (mktvalue * (this.state.formula_values.percentage.lt200k/100)) - (this.state.formula_values.condition_price[condition]);
        } else if (mktvalue > 200000 && mktvalue <= 400000) {
            return (mktvalue * (this.state.formula_values.percentage.btw200k400k/100)) - (this.state.formula_values.condition_price[condition]);
        } else if (mktvalue > 400000) {
            return (mktvalue * (this.state.formula_values.percentage.gt400/100)) - (this.state.formula_values.condition_price[condition]);
        } else {
            return 0.00
        }
    }

    generateLeadToCRM = (inputValues) => {

        var data = JSON.stringify({
            "first_name": inputValues.fullName,
            "last_name": "",
            "company":"",
            "title":"",
            "cell_phone": inputValues.phone,
            "landline_phone":"",
            "email": inputValues.email,
            "address": inputValues.address,
            "lead_type": "Instant Offer",
            "next_action":"Create Lead",
            "message":"",
            "campaign":"",
            "token": `${configData.REICONTROL_API_KEY}`,
        });

        axios.post(`https://localhost/60-Seconds/api.php`, data)
        .then(response => {
            console.log('response', response);
        })
        .catch(error => {
            console.log('error', error);
        });
    }

    render(){

        const {inputValues: { address, area_sq_ft, partial_bathroom, built_year, floors, bedrooms, covered_parking, full_bathroom, carport_spaces, property_condition, property_details, firstName, lastName, email }} = this.props;
        const instantOffer = this.InstantOffer(property_condition, property_details.value);
        return(
        <Container className='p-md-5 w-md-75 m-auto'>
                <p className="text-center text-dark m-0">Preparing cash offer for: <br/><b>{this.props.inputValues.address}</b></p>
                <ProgressBar active={this.state.step} changeStep={this.props.changeStep}/>
                <div className='my-5 shadow border rounded p-2 p-md-5 text-center'>
                    <h4 className=' text-dark gradient-text'>Preliminary Offer</h4>
                    <p className='cash-offer gradient-text text-dark'>${parseFloat(instantOffer).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    <Card className='bg-light p-2 w-sm-100 w-md-75 m-auto'>
                        <div className='d-flex'>
                            <img src={SpeedoMeter} height="65" className='' alt='preliminary-offer'/>
                            <p className='text-center text-dark px-4 pt-3'>
                                <strong>
                                    Many offers increase after we see your home. 
                                </strong>
                            </p>
                        </div>
                    </Card>
                    <div className='sm-img'>
                    </div>
                    <div className='w-md-25 m-auto mt-5'>
                        <Button className="bg-default border-0 py-3 w-100" data-step="55" onClick={this.saveAndContinue}><strong data-step="55">Yes, I Accept</strong></Button>
                    </div>
                    <div>
                        <button className='text-default bg-white border-0 mt-2' onClick={this.saveAndContinue}>I still have questions and would like to speak with an agent</button>
                        <p className='text-secondary text-sm'>* Subject to Inspection, confirmation of details and clear title.</p>
                    </div>
                </div>
            </Container>
        )
        
    }
}

export default InstantOffer;