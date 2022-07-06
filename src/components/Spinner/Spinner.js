import React, { Component } from "react";
import Loader from "./../../assets/loading.gif"
import './Spinner.css';
 
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerClass: "spinner-container",
        }; 
    }

    componentDidMount() {
        (this.props.show) ? this.setState({containerClass: "spinner-container show"}) : this.setState({containerClass: "spinner-container hide"});
    }

    componentDidUpdate(prevProps) {
        if (this.props.show !== prevProps.show) {
            (this.props.show == true) ? this.setState({containerClass: "spinner-container show"}) : this.setState({containerClass: "spinner-container hide"});
        }
    }

    render() {
        return (
            <div className={this.state.containerClass}>
                <div className="spinner">
                    <img src={Loader}/>
                </div>
            </div>
        );
    }
}
 
export default Home;