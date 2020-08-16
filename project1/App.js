import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default class App extends React.Component {
  
  state = {
    count: 0,
    timer:null,
    timerRunning: null
  }

  start_timer = () => {
    this.setState({timerRunning:true})
    this.setState({timer: setInterval(this.increaseCount,1000)})
  }
  
  increaseCount = () => {
    let {count} = this.state;
    count+=1;
    this.setState ({count})
  }

  stop_timer = () => {
    this.setState({timerRunning:false})
    clearInterval(this.state.timer)
    this.setState({timer: null})
  }

  restart_timer = () => {
    this.setState({count:0});
    
    if(this.state.timerRunning)
    {
      this.stop_timer()
      this.start_timer()
    }

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
    if(this.state.count === 0)
    {
      return '25'
      
    }

    else
    {
      return `${24 - Math.floor(this.state.count/60)}`
    }
    
  }

  display_timer = () => {
    return `${this.display_minutes()} : ${this.display_seconds()}`
   
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Start" onPress = {this.start_timer}/>
        <Button title="Stop" onPress = {this.stop_timer}/>
        <Button title="Reset" onPress={this.restart_timer}/>
    
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
});
