import React, { Component } from 'react';
import PropertyAddress from "./Form/PropertyAddress";
import PropertyDetails from "./Form/PropertyDetails";
import InstantOffer from "./Form/InstantOffer";
import PropertyCondition from "./Form/PropertyCondition";
import UserDetails from './Form/UserDetails';
import './Form.css';

class MultiStepForm extends Component {
    state = {
        step: 1,
        address: '',
        address2: '',
        area_sq_ft: '',
        partial_bathroom: '',
        built_year: '',
        floors: '',
        bedrooms: '',
        covered_parking: '',
        full_bathroom: '',
        carport_spaces: '',
        property_condition: '',
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


    componentDidMount(){
        this.address();
    }

    render(){
        this.address();
        const { step, address, area_sq_ft, partial_bathroom, built_year, floors, bedrooms, covered_parking, full_bathroom, carport_spaces, property_condition, fullName, phoneNumber, email, city, state, zip } = this.state;
        const propertyAddress = { address };
        const propertyDetails = {area_sq_ft, partial_bathroom, built_year, floors, bedrooms, covered_parking, full_bathroom, carport_spaces};
        const propertyCondition = { property_condition };
        const userDetails = { fullName, phoneNumber, email };
        const inputValues = { step, address, area_sq_ft, partial_bathroom, built_year, floors, bedrooms, covered_parking, full_bathroom, carport_spaces, property_condition, fullName, phoneNumber, email, city, state, zip } ;
        console.log('input values ', inputValues);
        switch(step) {
            case 1:
                return <PropertyAddress
                            nextStep={this.nextStep}
                            address={this.address()}
                            handleChange = {this.handleChange}
                            changeStep={this.changeStep}
                            inputValues={inputValues}
                            correctAddress={this.correctAddress}
                        />
            case 2:
                return <PropertyDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                        changeStep={this.changeStep}
                        inputValues={inputValues}
                        />
            case 3:
                return <PropertyCondition
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                        changeStep={this.changeStep}
                        inputValues={inputValues}
                        />
            case 4:
                return <UserDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                        changeStep={this.changeStep}
                        inputValues={inputValues}
                        />
            case 5:
                return <InstantOffer
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