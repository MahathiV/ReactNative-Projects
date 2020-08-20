import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { vibrate } from "./utils";

export default class App extends React.Component {
  state = {
    count: 0,
    timer: null,
    timerRunning: null,
    phase: "Work Phase",
  };

  startTimer = () => {
    if (!this.state.timerRunning) {
      this.setState({ timerRunning: true });
      this.setState({
        timer: setInterval(this.increaseCount, 1000),
      });
    }
  };

  increaseCount = () => {
    let { count } = this.state;
    count += 1;

    if (count === 25 * 60) {
      // To vibrate the phone after 25 minutes - Work Phase
      this.setState({ phase: "Rest Phase" });
      count = 0;
      vibrate();
    }

    if (count === 5 * 60 && this.state.phase === "Rest Phase") {
      // To vibrate the phone after 5 minutes - Rest Phase
      this.setState({ phase: "Work Phase" });
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
        return "25";
      } else {
        return `${24 - Math.floor(this.state.count / 60)}`;
      }
    } else {
      if (this.state.count === 0) {
        return "5";
      } else {
        return `${4 - Math.floor(this.state.count / 60)}`;
      }
    }
  };

  displayTimer = () => {
    return `${this.displayMinutes()} : ${this.displaySeconds()}`;
  };

  phase = () => {
    return `${this.state.phase}`;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.phaseTextWrapper}>
          <Text style={styles.phaseText}>{this.phase()}</Text>
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
    height: 150,
    width: 150,
    borderRadius: 75,
    margin: 10,
    backgroundColor: "#ae77e7",
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
    fontSize: 28
  },
  timerTextWrapper: {
    padding:15,
    borderColor: "black",
    borderWidth: 1

  }
});
