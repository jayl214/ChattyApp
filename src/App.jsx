import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const socket = new WebSocket("ws://localhost:3001");
console.log('connected to server');

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
          currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: []
        }
  }


  componentDidMount() {
    console.log("componentDidMount <App />");

    socket.onmessage = (response) => {
      let newMessage = JSON.parse(response.data);
      console.log(newMessage);
      if (newMessage.type === "incomingMessage"){
        let messages = this.state.messages.concat(newMessage);
        this.setState({messages: messages});
        console.log(this.state.messages);

      } else if (newMessage.type === "incomingNotification"){
        console.log(newMessage.notification)
        const updatedUsername = {name: newMessage.newName}

        let messages = this.state.messages.concat(newMessage);

        this.setState({messages: messages});
        console.log(this.state.messages);
        this.setState({currentUser: updatedUsername})
      }
    }
  }

  sendMessageOnEnter(event){
    if (event.keyCode === 13){
      const newMessage = {type:"postMessage", username: this.state.currentUser.name, content: event.target.value}
      console.log(JSON.stringify(newMessage), 'sent to server')
      socket.send(JSON.stringify(newMessage));

    }
  }

  changeUsername(event){
    if (event.keyCode === 13) {
      const newUsername = {type: "postNotification", newName: event.target.value, oldName: this.state.currentUser.name}
      console.log(JSON.stringify(newUsername));
      socket.send(JSON.stringify(newUsername));

      this.setState({currentUser:newUsername});
      console.log(this.state.currentUser)

    }
  }





  render() {
    console.log('render App')
    return (
      <div className = "wrapper">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>

        <MessageList messages = {this.state.messages} />

        <ChatBar name = {this.state.currentUser.name} messageFunction = {this.sendMessageOnEnter.bind(this)} usernameFunction = {this.changeUsername.bind(this)}  />

      </div>
    );
  }
}
export default App;
// bind will anchor the value of 'this' to refer to app.jsx when in function changeFunc in Chatbar
