
import React, { Component } from 'react';
import  Axios  from 'axios';
import moment from 'moment'


class App extends Component {

	constructor(props) {
		super(props);
		this.state = { notifications: [] ,read_notifications : []};
	}
	
	callAPI() {
        Axios.post("https://mysqlp2p.herokuapp.com0/SystemNotifications/getNotification", {
            email: localStorage.getItem('emailReg'),
        }).then((res)=>{
            // console.log(res.data);
            this.setState({
                ...this.state,
                notifications : res.data.notifications
            },()=>{
                Axios.post("https://mysqlp2p.herokuapp.com0/SystemNotifications/getReadNotification", {
                    email: localStorage.getItem('emailReg'),
                }).then((res)=>{
                    console.log(res.data);
                    this.setState({
                        ...this.state,
                        read_notifications : res.data.read_notifications
                    })
                })
            })
        })
	}


	
	componentWillMount() {
		this.callAPI();
	}

    handleNotiClicked(){
        Axios.post("https://mysqlp2p.herokuapp.com0/SystemNotifications/setLatestNotTime", {
            email: localStorage.getItem('emailReg'),
        }).then((res)=>{
            // console.log(res.data);
        })
    }


  render() {
  return (
    <>    

        <a className="nav-link count-indicator" id="countDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="icon-bell" />
            <span className="count" />
        </a>

        <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0" onClick={this.handleNotiClicked.bind(this)} aria-labelledby="countDropdown">
            <a className="dropdown-item py-3">
            <p className="mb-0 font-weight-medium float-left">Unread({this.state.notifications.length})</p>
            {/* <span className="badge badge-pill badge-primary float-right">View all</span> */}
            </a>
            <div className="dropdown-divider" />
            {
                this.state.notifications.map((item) => {
                    return(
                        <a className="dropdown-item preview-item">
                            <div className="preview-thumbnail">
                            <img src="images/faces/face8.jpg" alt="image" className="img-sm profile-pic" />
                            </div>
                            <div className="preview-item-content flex-grow py-2">
                            <p className="preview-subject ellipsis font-weight-medium text-dark">{moment(item.not_time).format('DD/MM/YYYY') }</p>
                            <p className="fw-light small-text mb-0"> {item.message} </p>
                            </div>
                        </a>
                    )
                })
            }
            <a className="dropdown-item py-3">
            <p className="mb-0 font-weight-medium float-left">Read({this.state.read_notifications.length})</p>
            {/* <span className="badge badge-pill badge-primary float-right">View all</span> */}
            </a>
            {
                this.state.read_notifications.map((item) => {
                    return(
                        <a className="dropdown-item preview-item">
                            <div className="preview-thumbnail">
                            <img src="images/faces/face8.jpg" alt="image" className="img-sm profile-pic" />
                            </div>
                            <div className="preview-item-content flex-grow py-2">
                            <p className="preview-subject ellipsis font-weight-medium text-dark">{moment(item.not_time).format('DD/MM/YYYY HH:mm:ss') }</p>
                            <p className="fw-light small-text mb-0"> {item.message} </p>
                            </div>
                        </a>
                    )
                })
            }
        </div>

    </>
    );
  }
}

export default App;
