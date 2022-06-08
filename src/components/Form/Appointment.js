import React, { Component } from 'react';
import {Container} from 'react-bootstrap';
import ProgressBar from './ProgressBar';
import configData from './../../config.json';
import { InlineWidget } from "react-calendly";
import './Appointment.css';


class InstantOffer extends Component{

    constructor(props){
        super(props);
        this.state = {
            step: this.props.inputValues.step,
        } 
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }


    componentDidMount() {
        let date = new Date();
        date.setDate(date.getDate() + 5 );
        this.setState({
            validity: date
        });
    }

    render(){

        const {inputValues: { address }} = this.props;
        
        return (
            <Container className='p-md-5 w-xl-75 m-auto'>
                <p className="text-center text-dark m-0">Preparing cash offer for: <br/><b>{address}</b></p>
                <ProgressBar active={this.state.step} changeStep={this.props.changeStep}/>
                <h2 className='text-center'>
                    <strong>
                        <a href="callto:+1-210-951-0143" className="text-dark">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-1 w-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            &nbsp;&nbsp;+1-210-951-0143
                        </a>
                    </strong>
                </h2>
                <Container>
                    <InlineWidget styles={{height: '1000px'}} url={configData.CALENDLY_LINK} />
                </Container>
            </Container>
        )
    }
}

export default InstantOffer;