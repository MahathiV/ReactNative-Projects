import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { vibrate } from "./utils";

export default class App extends React.Component {
  state = {
    count: 0,
    timer: null,
    timerRunning: null,
    phase: "Work Phase",
    phaseBackgroundColor: "#ae77e7",
    workPhaseTime: 25,
    restPhaseTime:5
  };

  startTimer = () => {
    if (!this.state.timerRunning) {
      this.setState({ timerRunning: true });
      this.setState({
        timer: setInterval(this.increaseCount, 10),
      });
    }
  };

  increaseCount = () => {
    let { count } = this.state;
    count += 1;

    if (count === this.state.workPhaseTime * 60) {
      // To vibrate the phone after 25 minutes - Work Phase
      this.setState({ phase: "Rest Phase", phaseBackgroundColor: "#008800" });
      count = 0;
      vibrate();
    }

    if (count === this.state.restPhaseTime * 60 && this.state.phase === "Rest Phase") {
      // To vibrate the phone after 5 minutes - Rest Phase
      this.setState({ phase: "Work Phase", phaseBackgroundColor: "#ae77e7" });
      count = 0;
      vibrate();
    }

    this.setState({ count });
  };

  stopTimer = () => {
    this.setState({ timerRunning: false });
    clearInterval(this.state.timer);
    this.setState({ timer: null });
  };

  restartTimer = () => {
    this.setState({ count: 0 });
  };

  displaySeconds = () => {
    if (this.state.count % 60 === 0) {
      return "00";
    } else {
      return `${60 - (this.state.count % 60)}`;
    }
  };

  displayMinutes = () => {
    if (this.state.phase === "Work Phase") {
      if (this.state.count === 0) {
        return `${this.state.workPhaseTime}`;
      } else {
        return `${(this.state.workPhaseTime - 1) - Math.floor(this.state.count / 60)}`;
      }
    } else {
      if (this.state.count === 0) {
        return `${this.state.restPhaseTime}`;
      } else {
        return `${(this.state.restPhaseTime - 1) - Math.floor(this.state.count / 60)}`;
      }
    }
  };

  displayTimer = () => {
    return `${this.displayMinutes()} : ${this.displaySeconds()}`;
  };

  phase = () => {
    return `${this.state.phase}`;
  };

  updateWorkTimer = (text) => 
  {
    try{parseInt(text)}
    catch 
    {

      //return null;

      if (isNaN(parseInt(text)))
      {
        Alert.alert("Please Enter Number")
      }
      
    }

    this.setState({workPhaseTime : parseInt(text)})
    
  }

  restWorkTimer = (text) =>
  {
    try{parseInt(text)}
    catch
    {
      return null;
    }

    this.setState({restPhaseTime : parseInt(text)})
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.phaseTextWrapper,
            { backgroundColor: this.state.phaseBackgroundColor },
          ]}
        >
          <Text style={styles.phaseText}>{this.phase()}</Text>
        </View>

        <View style={styles.displayTimerWrapper}>
        <TextInput 
           keyboardType = "numeric"
           style = {{height: 40,backgroundColor: 'azure', fontSize: 20}}
           placeholder = "WorkPhase Timer"
           onChangeText = {(text) => this.updateWorkTimer(text)} />
        </View>

        <View style={styles.displayTimerWrapper}>
        <TextInput 
           keyboardType = "numeric"
           style = {{height: 40,backgroundColor: 'azure', fontSize: 20}}
           placeholder = "RestPhase Timer"
           onChangeText = {(text) => this.restWorkTimer(text)} />
        </View>

        <View style={styles.timerTextWrapper}>
          <Text style={styles.timerText}>{this.displayTimer()}</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Button title="Start" onPress={this.startTimer} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Stop" onPress={this.stopTimer} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Reset" onPress={this.restartTimer} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    padding: 5,
  },
  phaseTextWrapper: {
    height: 125,
    width: 125,
    borderRadius: 75,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  phaseText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  timerText: {
    fontWeight: "bold",
    fontSize: 28,
  },
  timerTextWrapper: {
    padding: 15,
    borderColor: "black",
    borderWidth: 1,
    width: 175,
    alignItems: "center",

  },
  displayTimerWrapper: {
    margin:7,
    borderColor: "black",
    borderWidth: 1,
    padding:3,
    width:170
  },
});
