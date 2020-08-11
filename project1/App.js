import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default class App extends React.Component {
  
  state = {
    count: 0,
    timer:null
  }

  start_timer = () => {
    this.setState({timer: setInterval(this.increaseCount,1000)})
  }
  
  increaseCount = () => {
    let {count} = this.state;
    count+=1;
    this.setState ({count})
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Start" onPress = {this.start_timer}/>
        <Button title="Stop"/>
        <Button title="Reset"/>
    <Text>{Math.floor(this.state.count/60)} : {this.state.count%60}</Text>
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
