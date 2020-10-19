import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import {connect} from 'react-redux'
 
class QrContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      result: 'Hold QR Code Steady and Clear to Scan',
    }
    this.handleScan = this.handleScan.bind(this)
  }

  handleScan(id){
    if(id !== null){
      fetch(`http://localhost:3001/users/${id}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Key': localStorage.getItem('auth_key')
      }
    })
    .then(res => res.json())
    .then(student => this.props.setCurrentStudent(student))
    }
  }

  handleError(err){
    console.error(err)
  }
  
  render(){
    const previewStyle = {
      height: 700,
      width: 1000,
      display: 'flex',
      "justify-content": "center"
    }

    const camStyle = {
      display: 'flex',
      justifyContent: "center",
      marginTop: '-50px'
    }

    const textStyle = {
      fontSize: '30px',
      "text-align": 'center',
      marginTop: '-50px'
    }
 
    return(
      <React.Fragment>
        <div style = {camStyle} >
          <QrReader
            delay={100}
            style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
            />
        </div>
        <p style = {textStyle}>
          {this.state.result}
        </p>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentStudent: (student)=> {dispatch({type: 'SET_STUDENT', student: student})}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(QrContainer);
