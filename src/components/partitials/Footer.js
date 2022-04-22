import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

class Header extends Component {
  render() {
    return (
        <div id="footer" className='pt-4 pb-2 text-white'>
            <div className="container">
                <div className="d-flex flex-col justify-content-between">
                    <p>
                        &copy; Copyright 2022 WhatsMyOffer.com. All Rights Reserved.  
                    </p>
                    <p>
                        <a href="https://www.whatsmyoffer.com/privacy-policy" className="text-white">Terms of Use</a> | 
                        <a href="https://www.sellmyhousefastsatx.com/privacy/" className="text-white"> Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
  }
}


export default Header;