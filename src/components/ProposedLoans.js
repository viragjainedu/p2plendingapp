
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Axios from 'axios';

class CompleteProfile extends Component {
	
	constructor(props) {
		super(props);
        this.state = {
            Loans : {},
            message : "Please Choose a Loan"
        };
	}

    //To check whether user has completed form or not
    callAPI() {
        Axios.post("https://mysqlp2p.herokuapp.com0/borrowing/ProposedLoansForEmail", {
            email: localStorage.getItem('emailReg'),
        }).then((response) => {
          console.log(response);
          if(response.data){
              console.log(response.data)
            this.setState({
                ...this.state,
                Loans : response.data,
            },()=>{
              if(this.state.Loans.selected !== 0){
                this.setState({
                  ...this.state,
                  message : "Thank you for selecting the Loan. Loan amount will be transacted shortly."
                })
              }
            });            
          }
        });
	}
	
	componentWillMount() {
		this.callAPI();
	} 
    
  handleButtonClickedAcceptLoans(selectedLoan) {

      //Axios ka post request daalna hai 
      Axios.post("https://mysqlp2p.herokuapp.com0/borrowing/LoanSelection", {
          selectedLoan : selectedLoan,
          email : localStorage.getItem('emailReg'),
      }).then((response) => {
          console.log(response);
        if(response.data.status === "Accepted"){
          window.location.href = "/borrowing";
        }
      });
    }
  
  handleButtonClickedRejectLoans(month_req) {
      //Axios ka post request daalna hai 
      Axios.post("https://mysqlp2p.herokuapp.com0/borrowing/LoanRejection", {
          email : localStorage.getItem('emailReg'),
          month_req: month_req
      }).then((response) => {
          console.log(response);
        if(response.data.status === "Rejected"){
          window.location.href = "/borrowing";
        }
      });
    }
    
    render(){
        return (
            <>
        <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Loan Proposals</h4>
            
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>
                      Months
                    </th>
                    <th>
                      Amount 
                    </th>
                    <th>
                      Interest 
                    </th>
                    <th>
                      Option
                    </th>
                  </tr>
                </thead>
                <tbody> 
                      
                        <tr>
                            {console.log(this.state.Loans)}
                            <td>{this.state.Loans.month_req} Months</td>
                            <td className="py-1">
                            ???{this.state.Loans.amount1 }
                            </td>
                            <td className="py-1">
                            {this.state.Loans.interest1 } %
                            </td>  
                            {(() => {

                              if(this.state.Loans.selected === 0 && this.state.Loans.rejected === null){
                                return(
                                  <>
                                  <td>
                                    <button onClick={() => {if(window.confirm('Are you sure to Accept this Loan?')){ this.handleButtonClickedAcceptLoans(1)};}} className="btn btn-success me-2">Accept</button>
                                    <button onClick={() => {if(window.confirm('Are you sure to Reject this Loan?')){ this.handleButtonClickedRejectLoans(this.state.Loans.month_req)};}} className="btn btn-danger me-2">Decline</button>
                                  </td>
                                  </>
                                )
                              }
                              else if(this.state.Loans.selected === 1){
                                return (
                                  <td className="py-1" style={{color: "green"}}>Accpeted</td>
                                )    
                              }else if(this.state.Loans.rejected === 1){
                                return <td className="py-1" style={{color: "red"}}>Declined</td>
                              }
                            })()}

                        </tr>
                        
                  
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                  <p className="card-description" style={{color : "green"}}>
                    {this.state.message}
                  </p>
                </div>
            </div>
          </div>
        </div>
    </div>
        
            </>
            )
        }
    }

export default CompleteProfile;


   

