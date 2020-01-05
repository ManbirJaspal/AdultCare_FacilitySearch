import React,{Fragment} from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {getList, clearList} from '../../actions';
import { Button, Icon, Image, Item, Label, Rating, Modal, Header } from 'semantic-ui-react';
import '../../styles.css';

class RenderList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  showModal = () => {
    this.setState({
      isOpen: true
    });
  }
  renderList() {

    return this.props.list.map(l => {
      return (
        <Item className="list" style={{ marginLeft:"3px", marginTop: "2px", borderRadius: "7px", borderWidth: "2px", borderColor: "#1A73CB", borderStyle: "solid", width: "95%", backgroundColor:"white"}} >
          <Item.Content style={{padding: "10px"}}>
            <div style={{paddingTop: "10px", paddingLeft:"10px", width: "200px"}}><Rating className= "ui blue" style={{color: "#0F4376"}} defaultRating={l.rating} maxRating={5}  icon="star" size="huge"  disabled /></div>
            <div  style={{marginLeft: "16px", marginTop:"8px", width: "280px"}}>
              <Item.Header onClick={this.showModal} style={{borderStyle: "", color: "#1A73CB", marginTop: "10px", fontSize:"18px", fontWeight: "900"}} as='a'>{l.provider_name}</Item.Header>
            </div>
            <div style={{ marginLeft:"50%", display: "inline-block", marginTop: "-25px" }}>
              <Item.Extra>
                <div >
                  <Label className="label" basic style={{backgroundColor:"#57C4BE", borderRadius: "", color: "white", borderColor:"#57C4BE", padding:"10px 10px", fontSize: "13px", fontWeight: "1" }} icon='globe' content="Website" />
                  <Label basic style={{backgroundColor:"#57C4BE",borderRadius: "", color: "white", borderColor:"#57C4BE", padding:"10px 10px", fontSize: "13px", fontWeight: "1"}} icon='calendar' content='Book Tour' />
                  <Label basic style={{backgroundColor:"#57C4BE", borderRadius: "", color: "white", borderColor:"#57C4BE", padding:"10px 10px", fontSize: "13px", fontWeight: "1"}} icon='envelope' content='Message' />
                </div>
              </Item.Extra>
            </div>
            <p style={{ marginTop:"-20px",marginLeft: "16px",color: "#7495A9", fontSize: "16px", fontWeight: "900", borderStyle: "", width: "270px"}}>{l.city} , {l.state} - {l.phone_number}</p>
            <p style={{ marginTop:"-6px",marginLeft: "16px",color: "#1A73CB", fontSize: "16px", fontWeight: "900", borderStyle: "", width: "270px"}}>{l.facility_type}</p>
            <div style= {{marginTop: "-7px", marginLeft: "15px" ,width: "150px", borderStyle: ""}}><img src={require('../../resources/logo4.png')} className="ui small image" />
            </div>
          </Item.Content>
        </Item>
);
});
}

render() {
  return (
    <div style= {{padding:"100px"}}>
      <Item.Group style={{ overflow: "auto", maxHeight: "70vh"}}  className="scroller">{this.renderList()}</Item.Group>
    </div>
);
}
}

const mapStateToProps = state => {
  return {
    list: Object.values(state.list)
  };
};

export default connect(mapStateToProps, { clearList })(RenderList);
