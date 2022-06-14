import React, { Component } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import ProgressBar from './ProgressBar';
import configData from './../../config.json';
import axios from 'axios';
import SpeedoMeter from './../../assets/speedometer.png';
import './InstantOffer.css';

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
        if (parseInt(step) === 55){
            this.props.changeStep(55);
        } else {
            this.props.nextStep();
        }
    };


    componentDidMount() {
        const {inputValues: { property_condition, property_details }} = this.props;
        this.setState({
            property_match : true
        })
        let instantOffer = this.InstantOffer(property_condition, property_details.value);
        this.generateLeadToCRM(this.props.inputValues, instantOffer);
        let date = new Date();
        date.setDate(date.getDate() + 5 );
        this.setState({
            validity: date
        });
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

    generateLeadToCRM = (inputValues, instantOffer) => {
        let firstName =  inputValues.fullName.split(' ')[0];
        let lastName =  (inputValues.fullName.split(' ')[1]) ? inputValues.fullName.split(' ')[1] : '';
        var data = JSON.stringify({
            "first_name": firstName,
            "last_name": lastName,
            "email": inputValues.email,
            "cell_phone": inputValues.phoneNumber,
            "bathrooms": inputValues.property_details.full_bathroom,
            "bedrooms": inputValues.property_details.bedrooms,
            "floors" : inputValues.property_details.floors,
            "built_year":inputValues.property_details.built_year,
            "area": inputValues.property_details.area,
            "instant_offer": instantOffer,
            "property_type" : inputValues.property_details.property_type,
            "lot_size" : inputValues.property_details.lot_size,
            "market_value" : inputValues.property_details.value,
            "mailing_address" : inputValues.property_details.mailing_address,
            "mailing_city" : inputValues.property_details.mailing_city,
            "mailing_state" : inputValues.property_details.mailing_state,
            "mailing_zip" : inputValues.property_details.mailing_zip
        });


        axios.post(`${configData.APP_URL}api.php`, data)
        .then(response => {
        })
        .catch(error => {
            console.log('error', error);
        });
    }

    render(){

        const {inputValues: { address, property_condition, property_details }} = this.props;
        const instantOffer = this.InstantOffer(property_condition, property_details.value);
        return(
            <Container className='p-md-5 w-md-75 m-auto'>
                <p className="text-center text-dark m-0">Preparing cash offer for: <br/><b>{address}</b></p>
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