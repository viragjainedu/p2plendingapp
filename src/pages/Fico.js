
import React, { Component } from 'react';
// import './css/fico_score_estimator.css';
// import MyVueComponent from '../expense-analyser/src/App.vue'
import TopNavbar from '../components/TopNavbar'
import LeftNavbar from '../components/LeftNavbar'
import RightNavbar from '../components/RightNavbar'
import MainHeader from '../components/MainHeader'
// import { Link } from 'react-router-dom';
import axios from 'axios';


class App extends Component {
  
  constructor(props) {
		super(props);
		this.state = { answer1: "",  
                       answer1a: "",    
                       answer2: "",     
                       answer3: "",    
                       answer4: "",   
                       answer5: "",   
                       answer6: "",   
                       answer7: "",   
                       answer7a: "",   
                       answer8: "",   
                       answer8a: "",    
                       answer9: "",    
                       answer10: "",    
                       answer10a: "",  
                       current_q:1, 
                       activateSubmitButton: false,
                       nextButton: true,
                       returnButton: true,
    };
	}
	

    handleInputChanged(event) {

        this.setState({
            ...this.state,
            [event.target.name] : event.target.value,
        });
    }

    handleButtonClicked() {
        console.log(this.state)

        if( this.state.answer1 !== ""  && this.state.answer2 !== ""&&
            this.state.answer3 !== ""&& this.state.answer4 !== ""&& this.state.answer5 !== ""&&
            this.state.answer6 !== ""&& this.state.answer7 !== ""&& 
            this.state.answer9 !== ""&& this.state.answer10 !== "")
        {
            axios.post("https://mysqlp2p.herokuapp.com0/Fico", {               
                answer1 : this.state.answer1,
                answer1a : this.state.answer1a,
                answer2 : this.state.answer2,
                answer3 : this.state.answer3,
                answer4 : this.state.answer4,
                answer5 : this.state.answer5,
                answer6 : this.state.answer6,
                answer7 : this.state.answer7,
                answer7a : this.state.answer7a,
                answer9 : this.state.answer9,
                answer10a : this.state.answer10a,
                email: localStorage.getItem('emailReg')
            }).then((response) => {
                console.log(response);
            if(response.data.message){
                alert(response.data.message)
                window.location.href = "/Borrowing";
            }
            });
        }
        else{
            this.setState({
                ...this.state,
                message : "Please fill all fields",
            });
        }

    }

    handleButtonClickedReturn(){
        if(this.state.current_q !== 1){
            this.setState({
                ...this.state,
                current_q : this.state.current_q - 1,
                nextButton : true
            })
        }
    }

    handleButtonClickedNext(){

        if(this.state.current_q === 1 && this.state.answer1 === "1.1")
        {
            this.setState({
                ...this.state,
                current_q : 3,
                answer1a : ""

            }); 
        }else if(this.state.current_q === 8 && this.state.answer7 === "7.1"){
            this.setState({
                ...this.state,
                current_q : 10,
                answer7a : ""
            });
        }else if(this.state.current_q === 10 && this.state.answer8 === "8.1"){
            this.setState({
                ...this.state,
                current_q : 12,
                answer8a : ""
            });
        }else if(this.state.current_q === 13 && this.state.answer10 === "10.1"){
            this.setState({
                ...this.state,
                current_q : 14,
                activateSubmitButton : true,
                nextButton : false,
            });
        }else if(this.state.current_q === 13 && this.state.answer10 === "10.2"){
            this.setState({
                ...this.state,
                activateSubmitButton : true,
                nextButton : false,
                answer10a : ""
            });

        }else if(this.state.current_q === 14){
            this.setState({
                ...this.state,
                activateSubmitButton : true
            })
        }else{
            this.setState({
                ...this.state,
                current_q : this.state.current_q + 1,
            });
        }



    }


  render() {
  return (
    <>

        <div className="container-scroller"> 
          <TopNavbar/>
          <div className="container-fluid page-body-wrapper">
            <RightNavbar/>
            <LeftNavbar/>
            <div className="main-panel">
              <div className="content-wrapper">
                <MainHeader name="Fico"/>
                  <br></br>

                  <div className='col-12 grid-margin'>
                    <div className='card'>
                        <div className='card-body'>
                        <h4 className="card-title">Answer the following questions correctly</h4>
                        <p style={{color: "green"}}>These details will be physically verified</p>
                        <p style={{color : "red"}}>
                            {this.state.message}    
                        </p>
                            <div className='form-sample'>
                                {
                                    (()=>{
                                        if(this.state.current_q === 1){
                                            return(
                                                <div className="form-group">
                                                    <label className="col-form-label">1. How many credit cards do you have?</label>
                                                    <div className="col-sm-12">
                                                        <select onChange={this.handleInputChanged.bind(this)} name="answer1" className="form-control">
                                                            <option value="">Select</option>
                                                            <option value="1.1">I have never had a credit card</option>
                                                            <option value="1.2">1</option>
                                                            <option value="1.3">2 to 4</option>
                                                            <option value="1.4">5 or more</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })()
                                }
                                
                                {
                                    (()=>{
                                        if(this.state.current_q === 2){
                                            return(
                                            
                                            <div className="form-group">
                                                <label className="col-form-label">1a. How long ago did you get your first credit card?</label>
                                                <div className="col-sm-12">
                                                    <select onChange={this.handleInputChanged.bind(this)} name="answer1a" className="form-control" required>
                                                        <option value="">Select</option>
                                                        <option value="1a.1">less than 6 months ago</option>
                                                        <option value="1a.2">between 6 months and 2 years ago</option>
                                                        <option value="1a.3">2 to 4 years</option>
                                                        <option value="1a.4">4 to 5 years</option>
                                                        <option value="1a.5">5 to 8 years</option>
                                                        <option value="1a.6">8 to 10 years</option>
                                                        <option value="1a.7">10 to 15 years</option>
                                                        <option value="1a.8">15 to 20 years</option>
                                                        <option value="1a.9">more than 20 years ago</option>
                                                    </select>
                                                </div>
                                            </div>

                                            )
                                        }
                                    })()
                                }
                                {
                                    (()=>{
                                        if(this.state.current_q === 3){
                                            return(
                                                <>
                                                    <div className="form-group">
                                                        <label className="col-form-label">2. How long ago did you get your first loan? (i.e., auto loan, mortgage, student loan, etc.)</label>
                                                        <div className="col-sm-12">
                                                            <select onChange={this.handleInputChanged.bind(this)} name="answer2" className="form-control" required>
                                                                <option value="">Select</option>
                                                                <option value="2.1">between 6 months and 2 years ago</option>
                                                                <option value="2.2">2 to 5 years ago</option>
                                                                <option value="2.3">5 to 10 years ago</option>
                                                                <option value="2.4">10 to 15 years ago</option>
                                                                <option value="2.5">15 to 20 years ago</option>
                                                                <option value="2.6">more than 20 years ago</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    })()
                                }

                                {
                                    (()=>{
                                        if(this.state.current_q === 4){
                                            return(
                                                <>
                                                    <div className="form-group">
                                                        <label className="col-form-label">3. How many loans or credit cards have you applied for in the last year?</label>
                                                        <div className="col-sm-12">
                                                            <select onChange={this.handleInputChanged.bind(this)} name="answer3" className="form-control" required>
                                                                <option value="">Select</option>
                                                                <option value="3.1">0</option>
                                                                <option value="3.2">1</option>
                                                                <option value="3.3">2</option>
                                                                <option value="3.4">3 to 5</option>
                                                                <option value="3.5">6 or more</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                </>
                                            )
                                        }
                                    })()
                                }

                                {
                                    (()=>{
                                        if(this.state.current_q === 5){
                                            return(
                                                <>
                                                <div className="form-group">
                                                    <label className="col-form-label">4. How recently have you opened a new loan or credit card?</label>
                                                    <div className="col-sm-12">
                                                        <select onChange={this.handleInputChanged.bind(this)} name="answer4" className="form-control" required>
                                                            <option value="">Select</option>
                                                            <option value="4.1">less than 3 months ago</option>
                                                            <option value="4.2">between 3 to 6 months ago</option>
                                                            <option value="4.3">more than 6 months ago</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                </>
                                            )
                                        }
                                    })()
                                }
                                {
                                    (()=>{
                                        if(this.state.current_q === 6){
                                            return(
                                                <>
                                                    <div className="form-group">
                                                        <label className="col-form-label">5. How many of your loans and/or credit cards currently have a balance?</label>
                                                        <div className="col-sm-12">
                                                            <select onChange={this.handleInputChanged.bind(this)} name="answer5" className="form-control" required>
                                                                <option value="">Select</option>
                                                                <option value="5.1">0 to 4</option>
                                                                <option value="5.2">5 to 6</option>
                                                                <option value="5.3">7 to 8</option>
                                                                <option value="5.4">9 or more</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    })()
                                }
                                {
                                    (()=>{
                                        if(this.state.current_q === 7){
                                            return(
                                                <>
                                                  <div className="form-group">
                                                        <label className="col-form-label">6. Besides any mortgage loans, what are your total balances on all other loans and credit cards combined?</label>
                                                        <div className="col-sm-12">
                                                            <select onChange={this.handleInputChanged.bind(this)} name="answer6" className="form-control" required>
                                                                <option value="">Select</option>
                                                                <option value="6.1">I have only mortgage loan(s)</option>
                                                                <option value="6.2">Less than $500</option>
                                                                <option value="6.3">$500 to $999</option>
                                                                <option value="6.4">$1,000 to $4,999</option>
                                                                <option value="6.5">$5,000 to $9,999</option>
                                                                <option value="6.6">$10,000 to $19,999</option>
                                                                <option value="6.7">$20,000+</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    })()
                                }
                                {
                                    (()=>{
                                        if(this.state.current_q === 8){
                                            return(
                                                <>
                                                    <div className="form-group">
                                                        <label className="col-form-label">7. When did you last miss a loan or credit card payment?</label>
                                                        <div className="col-sm-12">
                                                            <select onChange={this.handleInputChanged.bind(this)} name="answer7" className="form-control" required>
                                                                <option value="">Select</option>
                                                                <option value="7.1">I have never missed a payment</option>
                                                                <option value="7.2">in the past 3 months</option>
                                                                <option value="7.3">3 to 6 months ago</option>
                                                                <option value="7.4">6 months to 1 year ago</option>
                                                                <option value="7.5">1 to 2 years ago</option>
                                                                <option value="7.6">2 to 3 years ago</option>
                                                                <option value="7.7">3 to 4 years ago</option>
                                                                <option value="7.8">more than 4 years ago</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    })()
                                }
                                {
                                    (()=>{
                                        if(this.state.current_q === 9){
                                            return(
                                                <>
                                                    <div className="form-group">
                                                        <label className="col-form-label">7a. What is the most delinquent you have ever been on a loan or credit card payment?</label>
                                                        <div className="col-sm-12">
                                                            <select onChange={this.handleInputChanged.bind(this)} name="answer7a" className="form-control" required>
                                                                <option value="">Select</option>
                                                                <option value="7a.1">30 days delinquent</option>
                                                                <option value="7a.2">60 days delinquent</option>
                                                                <option value="7a.3">90 days delinquent</option>
                                                                <option value="7a.4">more than 90 days delinquent</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    })()
                                }
                                {
                                    (()=>{
                                        if(this.state.current_q === 10){
                                            return(
                                                <>
                                                    <div className="form-group">
                                                        <label className="col-form-label">8. How many of your loans and/or credit cards are currently past due?</label>
                                                        <div className="col-sm-12">
                                                            <select onChange={this.handleInputChanged.bind(this)} name="answer8" className="form-control" required>
                                                                <option value="">Select</option>
                                                                <option value="8.1">0</option>
                                                                <option value="8.2">1</option>
                                                                <option value="8.3">2</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    })()
                                }
                                {
                                    (()=>{
                                        if(this.state.current_q === 11){
                                            return(
                                                <>
                                                <div className="form-group">
                                                    <label className="col-form-label">8a. What are your total balances on all currently past due accounts?</label>
                                                    <div className="col-sm-12">
                                                        <select onChange={this.handleInputChanged.bind(this)} name="answer8a" className="form-control" required>
                                                            <option value="">Select</option>
                                                            <option value="8a.1">less than $250</option>
                                                            <option value="8a.2">$250 - $499</option>
                                                            <option value="8a.3">$500 - $4,999</option>
                                                            <option value="8a.4">$5,000+</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                </>
                                            )
                                        }
                                    })()
                                }
                                {
                                    (()=>{
                                        if(this.state.current_q === 12){
                                            return(
                                                <>
                                                    <div className="form-group">
                                                        <label className="col-form-label">9. What percent of your total credit card limits do your credit card balances represent?</label>
                                                        <div className="col-sm-12">
                                                            <select onChange={this.handleInputChanged.bind(this)} name="answer9" className="form-control" required>
                                                                <option value="">Select</option>
                                                                <option value="9.1">0% to 9%</option>
                                                                <option value="9.2">10% to 19%</option>
                                                                <option value="9.3">20% to 29%</option>
                                                                <option value="9.4">30% to 39%</option>
                                                                <option value="9.5">40% to 49%</option>
                                                                <option value="9.6">50% to 69%</option>
                                                                <option value="9.7">60% to 79%</option>
                                                                <option value="9.8">70% to 89%</option>
                                                                <option value="9.9">80% to 99%</option>
                                                                <option value="9.10">100% or higher</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    })()
                                }
                                {
                                    (()=>{
                                        if(this.state.current_q === 13){
                                            return(
                                                <>
                                                <div className="form-group">
                                                    <label className="col-form-label">10. In the last 10 years, have you ever experienced bankruptcy, repossession or an account in collections?</label>
                                                    <div className="col-sm-12">
                                                        <select onChange={this.handleInputChanged.bind(this)} name="answer10" className="form-control" required>
                                                            <option value="">Select</option>
                                                            <option value="10.1">Yes</option>
                                                            <option value="10.2">No</option>
                                                        </select>
                                                    </div>
                                                </div>   
                                                </>
                                            )
                                        }
                                    })()
                                }
                                {
                                    (()=>{
                                        if(this.state.current_q === 14){
                                            return(
                                                <>
                                                    <div className="form-group">
                                                        <label className="col-form-label">10a. If yes, how long ago did the most recent negative event occur?</label>
                                                        <div className="col-sm-12">
                                                            <select onChange={this.handleInputChanged.bind(this)} name="answer10a" className="form-control" required>
                                                                <option value="">Select</option>
                                                                <option value="10a.1">less than 1 year</option>
                                                                <option value="10a.2">1 to 3 years</option>
                                                                <option value="10a.3">more than 3 years</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    
                                                </>
                                            )
                                        }
                                    })()
                                }
                                

                                <div className='row'>
                                {
                                    (()=>{
                                        if(this.state.nextButton){
                                            return(
                                                <div className='col-lg-1'>
                                                    <button  onClick={this.handleButtonClickedNext.bind(this)} className="btn btn-primary me-2">Next</button>
                                                </div>                                                
                                            )
                                        }
                                    })()
                                }
                                {
                                    (()=>{
                                        if(this.state.returnButton){
                                            return(
                                                <div className='col-lg-1'>
                                                    <button  onClick={this.handleButtonClickedReturn.bind(this)} className="btn btn-success me-2">Return</button>
                                                </div>                                                
                                            )
                                        }
                                    })()
                                }
                                {
                                    (()=>{
                                        if(this.state.activateSubmitButton){
                                            return(
                                            <div className='col-lg-1'>
                                                <button  onClick={this.handleButtonClicked.bind(this)} className="btn btn-primary me-2">Submit</button>
                                            </div>
                                            )
                                        }
                                    })()
                                }
                                </div>

                                

                            </div>
                        </div>
                    </div>  
                  </div>

                  <br></br>
              </div>
              
            </div>
          </div>
         
        </div>
    </>
    );
  }
}

export default App;
