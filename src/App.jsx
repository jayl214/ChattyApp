import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const socket = new WebSocket("ws://localhost:3001");
console.log('connected to server');

class App extends Component {


  constructor(props){
    let colorGen = () => {
      return '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)
    };

    super(props);
    this.state = {
          currentUser: {name: "Anonymous", color: colorGen().toString()}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: [
          //  {  type
          //     username: "Bob",
          //     content: "Has anyone seen my marbles?"},
                 // messageColor
          //   {
          //     username: "Anonymous",
          //     content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."}
          ],
          connectedUsers: 0
        }
  }


  componentDidMount() {


    socket.onmessage = (response) => {
      let newMessage = JSON.parse(response.data);
      console.log(newMessage);
      if (newMessage.type === "incomingMessage"){
        let messages = this.state.messages.concat(newMessage);
        this.setState({messages: messages});

      } else if (newMessage.type === "incomingNotification"){

        const updatedUsername = {name: newMessage.newName}

        let messages = this.state.messages.concat(newMessage);

        this.setState({messages: messages});


      } else if (newMessage.type === "connectionNotification"){
        let messages = this.state.messages.concat(newMessage);

        this.setState({connectedUsers: newMessage.counter})

        this.setState({messages: messages});
      }
    }
  }

  sendMessageOnEnter(event){
    if (event.keyCode === 13){
      const newMessage = {type:"postMessage", username: this.state.currentUser.name, messageColor: this.state.currentUser.color, content: event.target.value}
      // console.log(JSON.stringify(newMessage), 'sent to server')
      socket.send(JSON.stringify(newMessage));
      event.target.value = "";
    }
  }

  changeUsername(event){
    if (event.keyCode === 13) {
      const newUsername = {type: "postNotification", newName: event.target.value, oldName: this.state.currentUser.name}
      // console.log(JSON.stringify(newUsername));
      socket.send(JSON.stringify(newUsername));

      this.state.currentUser.name = newUsername.newName
      // console.log(this.state.currentUser)

    }
  }





  render() {
    console.log('render App')
    return (
      <div className = "wrapper">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="onlineUserCount">{this.state.connectedUsers} users online</span>
        </nav>

        <MessageList messages = {this.state.messages}  />

        <ChatBar name = {this.state.currentUser.name} messageFunction = {this.sendMessageOnEnter.bind(this)} usernameFunction = {this.changeUsername.bind(this)} color = {this.state.currentUser.color} />

      </div>
    );
  }
}
export default App;
// bind will anchor the value of 'this' to refer to app.jsx when in function changeFunc in Chatbar
