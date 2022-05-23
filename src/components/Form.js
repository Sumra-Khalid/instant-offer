import React, { Component } from 'react';
import PropertyAddress from "./Form/PropertyAddress";
import PropertyDetails from "./Form/PropertyDetails";
import InstantOffer from "./Form/InstantOffer";
import PropertyCondition from "./Form/PropertyCondition";
import UserDetails from './Form/UserDetails';
import Appointment from './Form/Appointment';
import NoProperty from './Form/NoProperty';
import './Form.css';

class MultiStepForm extends Component {
    state = {
        step: 1,
        address: '',
        address2: '',
        area_sq_ft: 0,
        partial_bathroom: 0,
        built_year: 1900,
        floors: 0,
        bedrooms: 0,
        covered_parking: 0,
        full_bathroom: 0,
        carport_spaces: 0,
        property_condition: '',
        property_details: [],
        fullName: '',
        phoneNumber: '',
        email: '',

        city: '',
        state: '',
        zip:'',
    }

    address = () => {
        const queryParams = new URLSearchParams(window.location.search);
        const address = queryParams.get('propaddress');
        this.state.city = queryParams.get('propcity');
        this.state.state = queryParams.get('propstate');
        this.state.zip = queryParams.get('propzip');
        this.state.address = address;
        return address;
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    changeStep = (changed_step) => {
        if (changed_step < this.state.step) {
            this.setState({
                step: parseInt(changed_step)
            })
        } else if (changed_step == 404) {
            this.setState({
                step: changed_step
            })
        }
    }

    correctAddress = (address) => {
        this.setState({
            address: address.address_line_1,
            address2: address.address_line_2,
            city: address.city,
            state: address.state,
        });
    }

    updatePropertyDetails = (propertyDetails) => {
        this.setState({
            property_details: propertyDetails
        });
    }


    componentDidMount(){
        this.address();
    }

    render(){
        this.address();
        const { step, address, area_sq_ft, partial_bathroom, built_year, floors, bedrooms, covered_parking, full_bathroom, carport_spaces, property_condition, property_details, fullName, phoneNumber, email, city, state, zip } = this.state;
        const inputValues = { step, address, area_sq_ft, partial_bathroom, built_year, floors, bedrooms, covered_parking, full_bathroom, carport_spaces, property_condition, property_details, fullName, phoneNumber, email, city, state, zip } ;
        switch(step) {
            case 1:
                return <PropertyAddress
                            nextStep={this.nextStep}
                            address={this.address()}
                            handleChange = {this.handleChange}
                            changeStep={this.changeStep}
                            inputValues={inputValues}
                            correctAddress={this.correctAddress}
                            updatePropertyDetails={this.updatePropertyDetails}
                        />
            case 2:
                return <PropertyCondition
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                        changeStep={this.changeStep}
                        inputValues={inputValues}
                        />
            case 3:
                return <UserDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                        changeStep={this.changeStep}
                        inputValues={inputValues}
                        />
            case 4:
                return <InstantOffer
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                        changeStep={this.changeStep}
                        inputValues={inputValues}
                        />
            case 5:
                return <Appointment
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                        changeStep={this.changeStep}
                        inputValues={inputValues}
                        />
            case 404:
                return <NoProperty
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                        changeStep={this.changeStep}
                        inputValues={inputValues}
                        />
            default:
                return null;
        }
    }
}

export default MultiStepForm;