import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import {vibrate} from './utils'



export default class App extends React.Component {
  
  state = {
    count: 0,
    timer:null,
    timerRunning: null,
    phase: "Work Phase"
  }

  start_timer = () => {
    if (!this.state.timerRunning) {
      this.setState({ timerRunning: true });
      this.setState({
        timer: setInterval(this.increaseCount, 1000),
      });
    }
  };
  
  increaseCount = () => {
    let {count} = this.state;
    count+=1;

    if (count === 25*60)
    {
      this.setState({phase: "Rest Phase"})
      count = 0
      vibrate();
    }

    if ((count === 5*60) && (this.state.phase === "Rest Phase"))
    {
      this.setState({phase: "Work Phase"})
      count = 0
      vibrate();
    }



    this.setState ({count})


  }

  stop_timer = () => {
    this.setState({timerRunning:false})
    clearInterval(this.state.timer)
    this.setState({timer: null})
  }

  restart_timer = () => {
    this.setState({count:0});
  }

  display_seconds = () =>
  {
    if(this.state.count%60 === 0)
    {
      return '00'
    }
    else
    {
      return `${60 - this.state.count%60}`
    }
  }

  display_minutes = () =>
  {
    if (this.state.phase === "Work Phase") 
    {
      if(this.state.count === 0)
      {
        return '25'
        
      }
  
      else
      {
        return `${24 - Math.floor(this.state.count/60)}`
      }

    }

    else
    {
      if(this.state.count === 0)
      {
        return '5'
        
      }
      else
      {
        return `${4 - Math.floor(this.state.count/60)}`
      }
    }

    
  }

  display_timer = () => {
    return `${this.display_minutes()} : ${this.display_seconds()}`
  }

  phase = () => {
    return `${this.state.phase}`
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonWrapper}>
          <Button title="Start" onPress = {this.start_timer}/>
        </View>
        <Button title="Stop" onPress = {this.stop_timer}/>
        <Button title="Reset" onPress={this.restart_timer}/>
        <View style={styles.phaseTextWrapper}>
          <Text style={styles.phaseText}>{this.phase()}</Text>
        </View>
        <Text>{this.display_timer()}</Text>
      </View>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    padding: 10,
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
    // color: '#800020',
    textTransform: "uppercase",
  },
});
