import React, { Component } from 'react';
import { Card, Container } from 'react-bootstrap';
import configData from './../../config.json';
import { InlineWidget } from "react-calendly";

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

    render() {
        const {inputValues: { address, fullName }} = this.props;
        return (
            <Container className='p-md-5 w-md-75 m-auto'>
                <p className="text-center text-dark m-0">Preparing cash offer for: <br/><b>{address}</b></p>
                <div className='my-5'>
                    <h2 className="gradient-text text-center m-auto p-3">{fullName}, CONGRATULATIONS ON ACCEPTING YOUR CASH OFFER!</h2>
                    <div className='text-center mb-5'>
                        <h3 className='text-secondary '>Next Steps and What to Expect</h3>
                    </div>
                    <InlineWidget styles={{height: '1000px'}} url={configData.CALENDLY_CONTRACT_LINK} />
                    <div class="m-auto text-left text-gray">
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
                                        Once the title company has completed the title examination, and cleared any issues that may have been discovered during that research, we will schedule the closing where all parties sign the documents necessary to transfer ownership of the property from you to Sell My House Fast SA TX. We send a mobile notary to you to sign all the closing documents.
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