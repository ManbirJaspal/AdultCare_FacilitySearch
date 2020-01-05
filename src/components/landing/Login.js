import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import qs from 'qs';
import { loginAuth } from '../../actions';
import { url } from "../utils/RestUtils";
import { connect } from "react-redux";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      password: "",
    };
  }

  handleSubmit(event){
    console.log("inside handle submit in login");
    this.props.loginAuth(this.state.emailId, this.state.password);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render(){
    return(
      <div>
        <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' textAlign='center' style={{ color:"#1A73CB"}}>
              Log-in to your account
            </Header>
            <Form size='large' onSubmit={this.handleSubmit.bind(this)}>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name="emailId" id="email" onChange={this.handleChange.bind(this)}/>
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name="password" id="password"
                  onChange={this.handleChange.bind(this)}
                  />
                <Button style={{ backgroundColor:"#1A73CB", color: "white"}} fluid size='large' type='submit'>
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
        {this.state.login === true ? <div>Logged in</div>: null}
      </div>
    )
  }
}

export default connect(null, { loginAuth })(Login);
