import React, { Component } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import ProgressBar from './ProgressBar';
import configData from './../../config.json';
import './InstantOffer.css';
import axios from 'axios';
import HomeArrow from './../../assets/tick-12345.png';
import Moment from 'react-moment';

class Congratulations extends Component{

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

        
//  
//  

        const {inputValues: { address, area_sq_ft, partial_bathroom, built_year, floors, bedrooms, covered_parking, full_bathroom, carport_spaces, property_condition, firstName, lastName, email }} = this.props;

        console.log('props', this.props);
        return (
            <Container className='p-md-5 w-md-75 m-auto'>
                <p className="text-center text-dark m-0">Preparing cash offer for: <br/><b>{this.props.inputValues.address}</b></p>
                <div className='my-5'>
                    <h2 className="gradient-text text-center m-auto p-3">{this.props.inputValues.fullName}, CONGRATULATIONS ON ACCEPTING YOUR CASH OFFER!</h2>
                    <div className='text-center mb-5'>
                        <h3 className='text-secondary '>Next Steps and What to Expect</h3>
                    </div>
                    <div class="m-auto text-left text-gray">
                        {/* <Card className="border-0 border-bottom my-3 p-2">
                            <div className="d-flex m-2 ms-0 justify-content-start gap-3">
                                <div className="">
                                    <div className="li-number rounded-circle bg-default text-center text-white p-2">1</div>
                                </div>
                                <div className="">
                                    <h4 className="text-dark mb-2">
                                        Check Your Email
                                    </h4>
                                    <p className="mb-0 text-secondary">
                                        We will be emailing you an official Offer Letter with the proposed terms to purchase your home at {this.props.inputValues.address} for $60100.8. If you do not see it within 24 hours, please check your SPAM folder. Still not there, email us at info@whatsmyoffer.com
                                    </p>
                                    
                                </div>
                            </div>
                        </Card>
                        <Card className="border-0 border-bottom my-3 p-2">
                            <div className="d-flex m-2 ms-0 justify-content-start gap-3">
                                <div className="">
                                    <div className="li-number rounded-circle bg-default text-center text-white p-2">2</div>
                                </div>
                                <div className="">
                                    <h4 className="text-dark mb-2">
                                        Schedule an Inspection
                                    </h4>
                                    <p className="mb-0 text-secondary">
                                        A member of our team will be reaching out to you to schedule an inspection of the property to verify its condition. If the the level of repairs you provided is not accurate, it may be necessary to adjust our offer up or down to more accurately reflect its condition and the costs to restore it to "like new" condition.
                                    </p>
                                    
                                </div>
                            </div>
                        </Card> */}
                        <Card className="border-0 border-bottom my-3 p-2">
                            <div className="d-flex m-2 ms-0 justify-content-start gap-3">
                                <div className="">
                                    <div className="li-number rounded-circle bg-default text-center text-white p-2">1</div>
                                </div>
                                <div className="">
                                    <h4 className="text-dark mb-2">
                                        Sign Contract
                                    </h4>
                                    <p className="mb-0 text-secondary">
                                    After the inspection, we will create a contract for the purchase of your home for your approval. The contract will detail the property details, pricing, closing dates, and legal responsibilities of each party.
                                    </p>
                                    
                                </div>
                            </div>
                        </Card>
                        <Card className="border-0 border-bottom my-3 p-2">
                            <div className="d-flex m-2 ms-0 justify-content-start gap-3">
                                <div className="">
                                    <div className="li-number rounded-circle bg-default text-center text-white p-2">2</div>
                                </div>
                                <div className="">
                                    <h4 className="text-dark mb-2">
                                        Open Escrow
                                    </h4>
                                    <p className="mb-0 text-secondary">
                                        Once the contract is executed by both parties, we forward the contract and earnest money deposit to one of our preferred title companies. The title company will do a title examination, where they search the title history of the property, including previous deeds, liens, taxes due, judgments, easements, and anything else that might affect title to the property
                                    </p>
                                    
                                </div>
                            </div>
                        </Card>
                        <Card className="border-0 border-bottom my-3 p-2">
                            <div className="d-flex m-2 ms-0 justify-content-start gap-3">
                                <div className="">
                                    <div className="li-number rounded-circle bg-default text-center text-white p-2">3</div>
                                </div>
                                <div className="">
                                    <h4 className="text-dark mb-2">
                                        Closing
                                    </h4>
                                    <p className="mb-0 text-secondary">
                                        Once the title company has completed the title examination, and cleared any issues that may have been discovered during that research, we will schedule the closing where all parties sign the documents necessary to transfer ownership of the property from you to WhatsMyOffer.com. We send a mobile notary to you to sign all the closing documents.
                                    </p>
                                    
                                </div>
                            </div>
                        </Card>
                        <Card className="border-0 border-bottom my-3 p-2">
                            <div className="d-flex m-2 ms-0 justify-content-start gap-3">
                                <div className="">
                                    <div className="li-number rounded-circle bg-default text-center text-white p-2">4</div>
                                </div>
                                <div className="">
                                    <h4 className="text-dark mb-2">
                                        Funding
                                    </h4>
                                    <p className="mb-0 text-secondary">
                                        After all parties have signed the closing documents, the title company will review and verify the signatures, and then wire your cash to your bank account within 24 hours of signing closing documents.
                                    </p>
                                    
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Container>
        )
    }
}

export default Congratulations;