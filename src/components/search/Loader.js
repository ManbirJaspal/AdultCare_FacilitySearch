import React, { Component } from "react";
import Loader from 'react-loader-spinner'
 export default class App extends React.Component {
  //other logic
    render() {
     return(
       <div>
      <Loader
         type="Bars"
         color="#1A73CB"
         height={200}
         width={200}
         timeout={20000} //3 secs
         style={{paddingTop:"37%", paddingLeft: "40%"}}>
      </Loader>
      <h2 style={{paddingTop: "20px", paddingLeft:"29%", color: "#1A73CB"}}>Loading Results Most Relevant To You</h2>
      </div>

     );
    }
 }
