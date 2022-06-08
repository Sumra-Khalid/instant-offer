import { Component } from 'react';
import {
    Navbar,
    Nav,
    Container

} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './../../assets/logo.png';

class Header extends Component {
  render() {
    return (
        <>
            <Navbar bg="light" expand="lg">
            <Container >
                <Navbar.Brand href="/">
                    <img
                        alt="logo"
                        src={logo}
                        className="d-inline-block align-top site-logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="ms-auto my-2 my-lg-0"
                    navbarScroll
                >
                    <Nav.Link className="text-blue" href="https://www.sellmyhousefastsatx.com/how-we-buy-houses/">How It Works</Nav.Link>
                    <Nav.Link className="text-blue" href="https://www.sellmyhousefastsatx.com/our-company/">About Us</Nav.Link>
                    <Nav.Link className="text-blue" href="https://www.sellmyhousefastsatx.com/faq/">FAQ</Nav.Link>
                    <Nav.Link className="text-blue" href="https://www.sellmyhousefastsatx.com/we-buy-houses-in-texas/">Areas We Serve</Nav.Link>
                    <Nav.Link className="text-blue" href="https://www.sellmyhousefastsatx.com/we-buy-houses-in-texas/#">Who We Help</Nav.Link>
                    <Nav.Link className="text-blue" href="https://www.sellmyhousefastsatx.com/testimonials/">Testimonials</Nav.Link>
                    <Nav.Link className="text-blue" href="https://www.sellmyhousefastsatx.com/contact-us/">Contact Us</Nav.Link>
                    <Nav.Link className="text-blue" href="https://www.sellmyhousefastsatx.com/blog/">Blog</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    );
  }
}


export default Header;