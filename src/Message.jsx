import React, {Component} from 'react';

class Message extends Component {
  render() {
    const MessageStyle = {
      color: this.props.message.messageColor
    }
    const imgStyle = {
      "max-height": "60%",
      "max-width": "60%"
    }
    console.log(this.props.message.content.slice(-4))
    if (this.props.message.content.slice(-4) == ".png" || this.props.message.content.slice(-4) == ".gif" || this.props.message.content.slice(-4) == ".jpg"){
      return (
        <div className = "message">
          <span className="message-username" style = {MessageStyle} >{this.props.message.username}</span>
          <img className="message-content" style = {imgStyle} src = {this.props.message.content}></img>
        </div>
      )
    } else{
      return (

        <div className = "message">
          <span className="message-username" style = {MessageStyle} >{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>

      );
    }
  }
}

export default Message;