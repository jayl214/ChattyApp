import React, {Component} from 'react';

// function MessageList(props) {
//   const messageArray = props.messages;
//   const messageItems = messageArray.map((message) =>
//     <div className = "message">
//       <span className="message-username">{message.username}</span>
//       <span className="message-content">{message.content}</span>
//     </div>
//   );
//   return messageItems
// }

class Message extends Component {
  render() {
    console.log('render Message');

    return (

      <div className = "message">
      <span className="message-username">{this.props.message.username}</span>
      <span className="message-content">{this.props.message.content}</span>
    </div>

    );
  }
}

export default Message;