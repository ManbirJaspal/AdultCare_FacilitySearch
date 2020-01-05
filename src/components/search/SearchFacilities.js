import React, { Component } from "react";
import history from '../../history';
import '../../styles.css';
import {connect} from 'react-redux';
import {getList, clearList, getListCache} from '../../actions';
import { Responsive, Button, Form, Grid, Header, Message, Segment, Modal, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import qs from "qs";
import axios from 'axios';
import renderHTML from 'react-render-html';
import { url } from "../utils/RestUtils";
import { Dropdown } from 'semantic-ui-react';
import RenderList from './RenderList';
import MapContainer from '../gmaps/mapapp';
import Loader from './Loader';

const radius = [
  { key: 1, text: '15 Miles', value: '15' },
  { key: 2, text: '20 Miles', value: '20' },
  { key: 3, text: '50 Miles', value: '50' },
  { key: 4, text: '100 Miles', value: '100' },
]

export class SearchFacilities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: "",
      options: "",
      listRen: false,
      test: "good",
      lat: "33.7490",
      lng: "-84.3880",
      clicked: true,
      clickedSubmit: false,
      isOpen: false,
      radius: "",
      arr: [{name: 'Assisted Living', active: false},
      { name: "Skilled Nursing", active: false },
      { name: "Adult Day Care", active: false },
      { name: "Palliative Care", active: false },
      { name: "Hospice", active: false },
      { name: "Home Health", active: false },
    ],
    arrList: [],
    setradius: 1,
  };
}

componentDidMount(){
  if(this.props.isSignedIn){
    if(this.props.location.state){
      var {score} = this.props.location.state;
      console.log(score);
      switch(score) {
        case 0:
        case 1:
        case 2:
        console.log("inside CDM 0-2");
        this.zeroToTwo();
        break;
        case 3:
        case 4:
        console.log("inside CDM 0-2");
        this.threeToFour();
        break;
        case 5:
        case 6:
        console.log("inside CDM 5-6");
        this.fiveToSix();
        default:
        console.log("defaulted");
      }
    }
    console.log("score is undefined");
    if(this.props.location.state){
      var {zipCode} = this.props.location.state;
      this.setZipCode(zipCode, 15);
    }
    console.log("zipCode is undefined");
  } else {
    history.push('/');
  }
}

onSubmit = async (event) => {
  event.preventDefault();
  await this.setState({clickedSubmit: true});
  this.props.clearList();
  await this.onSubmitConcatActive();
  if(this.state.zipCode == "30144" || this.state.zipCode == "77070"){
    await this.props.getListCache(this.state.zipCode, this.state.arrList, this.state.radius);
  }
  else {
    await this.props.getList(this.state.zipCode, this.state.arrList, this.state.radius);
  }
  await this.setState({lat: this.props.list[0].lat, lng: this.props.list[0].lng})
  await this.setState({listRen: true, test: "bad"});
  await this.setState({clickedSubmit: false});
}

onSubmitStartup = async () => {
  await this.setState({clickedSubmit: true});
  this.props.clearList();
  await this.onSubmitConcatActive();
  if(this.state.zipCode == "30144" || this.state.zipCode == "77070"){
    await this.props.getListCache(this.state.zipCode, this.state.arrList, this.state.radius);
  }
  else {
    await this.props.getList(this.state.zipCode, this.state.arrList, this.state.radius);
  }
  console.log(this.props.list[0].lat);
  await this.setState({lat: this.props.list[0].lat, lng: this.props.list[0].lng})
  await this.setState({listRen: true, test: "bad"});
  await this.setState({clickedSubmit: false});
  console.log(this.state);
}

onClick(index) {
  console.log(index);
  let tmp = this.state.arr;
  tmp[index].active = !tmp[index].active;
  console.log(tmp[index].name, tmp[index].active);
  this.setState({ arr: tmp });
}

onSubmitConcatActive = async () => {
  this.setState({arrList: []})
  this.state.arr.map((l) => {
    console.log(l.name, l.active);
    if(l.active == true) {
      this.setState(prevState => ({
        arrList: [...prevState.arrList, l.name]
      }))
    }
  })
}

handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  });
}

onChangeDropdown = (event, data) => {
  console.log(this.event);
  this.setState({options: data.value})
}

onChangeDropdownRadius = (event, data) => {
  this.setState({radius: data.value})
}

zeroToTwo = async () => {
  let tmp = this.state.arr;
  tmp[1].active = !tmp[1].active;
  tmp[3].active = !tmp[3].active;
  tmp[4].active = !tmp[4].active;
  await this.setState({ arr: tmp });
}

threeToFour = async () => {
  let tmp = this.state.arr;
  tmp[0].active = !tmp[0].active;
  tmp[5].active = !tmp[5].active;
  await this.setState({ arr: tmp });
}

fiveToSix = async () => {
  let tmp = this.state.arr;
  tmp[0].active = !tmp[0].active;
  tmp[5].active = !tmp[5].active;
  tmp[2].active = !tmp[2].active;
  await this.setState({ arr: tmp });
}

setZipCode = async (zipCode, radius) => {
  await this.setState({
    zipCode: zipCode,
    radius: radius
  });
  this.onSubmitStartup();
}

render() {
  const { active } = this.state;

  return (
    <div style={{}}>
      <div className="" style={{marginRight:"60%"}}>
        <h1 style={{fontSize:"25px", marginLeft: "60px", marginTop: "40px"}} >Enter search criteria below</h1>
        <h3 style={{fontSize:"17px", marginLeft: "60px", marginTop: "30px"}} >Select Facility Options</h3>
        <div style={{marginLeft: "60px", marginRight:"40px"}}>
          {this.state.arr.map((el, index) =>
            <div style={{display: "inline"}} key={index} onClick={() => this.onClick(index)}>{el.active ? <Button size="small" style={{borderRadius: "20px"}} color="grey">{el.name}</Button> : <Button size="small" style={{borderRadius: "20px", margin:"5px"}}>{el.name}</Button> }</div>
            )}
            </div>
              <form style={{marginLeft: "60px", marginTop: "10px", marginRight:"", border: ""}} onSubmit={this.onSubmit}>
                <div style={{marginTop: "20px"}} className="ui big icon input">
                  <input style={{marginLeft: "10px", width:"180px", marginRight:"30px"}} type="text" defaultValue={this.state.zipCode} name="zipCode" onChange={this.handleChange} />
                  <Dropdown style={{width: "180px"}}
                    search
                    fluid
                    onChange={this.onChangeDropdownRadius}
                    name="radius"
                    selection
                    options={radius}
                    placeholder='15 miles'
                  />
                </div>
                <Button size="large" style={{marginLeft: "24%", marginTop:"30px", width: "150px", backgroundColor: "#1A73CB", color:"white"}} className="ui button">Search
                </Button>
              </form>
            </div>
              <div style = {{marginLeft:"5%", marginRight: "50%", marginTop:"40px"}}>{this.state.listRen == false ? <MapContainer  list={this.props.list}/> : <MapContainer list={this.props.list} ren={this.state.listRen} latt={this.state.lat} lngg={this.state.lng}/> }</div>
                <div style={{ marginLeft:"40%", marginTop:"-30%", backgroundColor: "#F5F5F5", height:"92vh"}}>
                  {this.state.clickedSubmit ? <Loader /> :  <RenderList style={{ paddingLeft:"20%"}}></RenderList> }
                </div>
              </div>
)
}
}

const mapStateToProps = state => {
  return {
    list: Object.values(state.list),
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { getList, clearList, getListCache })(SearchFacilities);
