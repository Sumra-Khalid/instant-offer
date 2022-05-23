import React, { Component } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import ProgressBar from './ProgressBar';
import configData from './../../config.json';
import './InstantOffer.css';
import axios from 'axios';
import Moment from 'react-moment';

class NoProperty extends Component{

    constructor(props){
        super(props);
        this.state = {
            step: this.props.inputValues.step
            }
        } 
    

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    changeStep = (e) => {
        e.preventDefault();
        this.props.changeStep(1);
    }


    componentDidMount() {
        
    }

    render() {

        const {inputValues: { address, area_sq_ft, partial_bathroom, built_year, floors, bedrooms, covered_parking, full_bathroom, carport_spaces, property_condition, firstName, lastName, email }} = this.props;
        return (
            <Container className='p-md-5 w-md-75 m-auto'>
                <p className="text-center text-dark m-0">Preparing cash offer for: <br/><b>{this.props.inputValues.address}</b></p>
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
                    
                    <div className='w-md-25 m-auto mt-5'>
                        <Button className="bg-default border-0 w-100" onClick={this.changeStep}><strong>Back</strong></Button>
                    </div> 
                </div>
            </Container>
        )
    }
}

export default NoProperty;