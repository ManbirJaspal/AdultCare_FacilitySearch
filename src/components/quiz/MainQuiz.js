import React from "react";
import history from "../../history";
import { quizData } from "./quizData";
import { Button } from 'semantic-ui-react';
import { Progress } from 'semantic-ui-react';
import {connect} from 'react-redux';

var score = 0;
class MainQuiz extends React.Component {

  state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false,
    zipCode: "",
  };

  loadQuizData = () => {
    this.setState(() => {
      return {
        questions: quizData[this.state.currentQuestion].question,
        answer: quizData[this.state.currentQuestion].answer,
        options: quizData[this.state.currentQuestion].options
      };
    });
  };

  componentDidMount() {
    if(this.props.isSignedIn) {
      this.loadQuizData();
    } else {
      history.push('/');
    }
  }

  nextQuestionHandler = async () => {
    const { myAnswer, answer, score } = this.state;
    if (myAnswer === answer) {
      await this.setState({
        score: score + 1
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
    console.log(this.state);
  };

  onSubmit = async () => {
    console.log("Inside mainquiz on submit form",this.state);
    this.props.history.push({
      pathname: '/search',
      state: {
        score: this.state.score,
        zipCode: this.state.zipCode
      }
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: quizData[this.state.currentQuestion].options,
          answer: quizData[this.state.currentQuestion].answer
        };
      });
    }
  }
  //check answer
  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
  };

  preFinishHandler = async () => {
    const { myAnswer, answer, score, currentQuestion } = this.state;

    if (myAnswer === answer) {
      await this.setState({
        score: score + 1,
      });
    }
  };

  finishHandler = async () => {
    console.log("inside finsih handler()");
    await this.preFinishHandler();
    if (this.state.currentQuestion === quizData.length - 1) {
      await this.setState({
        isEnd: true,
      });
    }
    console.log(this.state);
  };
  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;
    var score;

    if (isEnd) {
      console.log("inside isEnd");
      return (
        <div>
          <div style={{height:"80px", marginTop:"-16px", backgroundColor:"#1A73CB"}}>
            <p style={{paddingLeft:"10%", paddingTop:"30px", fontSize:"15px", color:"white"}}>Senior Living/Care Assessment</p>
            <Progress active color="green" style={{marginLeft:"28%", marginRight:"15%",marginTop:"-2.5%"}} value={6} total='6' progress='ratio' />
          </div>
          <div style={{marginLeft:"20%", marginRight:"20%", marginTop:"10%"}}>
            <h1 style={{color:"#1A73CB"}}>Please enter a zip code for us to find the facilities nearest to you, based on your score. </h1>
            <form style={{marginLeft: "", marginTop: "10px", marginRight:"", border: ""}} onSubmit={this.onSubmit}>
              <div style={{marginTop: "20px"}} className="ui big icon input">
                <input style={{marginLeft: "", width:"180px", marginRight:"30px"}} type="text" placeholder="57115" name="zipCode" onChange={this.handleChange} />
              </div>
              <Button size="huge" style={{marginLeft: "1%", marginTop:"30px", width: "150px", backgroundColor: "#1A73CB", color:"white"}}
                className="ui button"
              >Search</Button>
            </form>
          </div>
        </div>
);
} else {
  return (
    <div>
      <div style={{height:"80px", marginTop:"-16px", backgroundColor:"#1A73CB"}}>
        <p style={{paddingLeft:"10%", paddingTop:"30px", fontSize:"15px", color:"white"}}>Senior Living/Care Assessment</p>
        <Progress active color="green" style={{marginLeft:"28%", marginRight:"15%",marginTop:"-2.5%"}} value={this.state.currentQuestion} total='6' progress='ratio' />
      </div>
      <div style={{marginLeft:"20%", marginRight:"20%", marginTop:"10%"}}>
        <span className="cGrey" style={{fontSize:"16px"}}>{`Question ${currentQuestion + 1}`}</span>
        <h1 className="cBlue">{this.state.questions} </h1>
        {options.map(option => (
          <p
            key={option.id}
            style={{padding:"28px"}}
            className={` ui floating message options
      ${myAnswer === option ? "selected" : null}
      `}
            onClick={() => this.checkAnswer(option)}
          >
            {option}
          </p>
        ))}
        {currentQuestion < quizData.length - 1 && (
          <Button
            style={{backgroundColor: "#1A73CB", color:"white"}}
            size="big"
            disabled={this.state.disabled}
            onClick={this.nextQuestionHandler}
          >
            Next Question
          </Button>
        )}
        {/* //adding a finish button */}
        {currentQuestion === quizData.length - 1 && (
          <Button
            onClick={this.finishHandler}
            style={{backgroundColor: "#1A73CB", color:"white"}}
            size="big"
            disabled={this.state.disabled}
          >
            View Results
          </Button>
        )}
      </div>
    </div>
  );
}
}
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(MainQuiz);
