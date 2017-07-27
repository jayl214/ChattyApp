import React, {Component} from 'react';

class ChatBar extends Component {
  render() {


    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.name} onKeyUp = {this.props.usernameFunction} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp = {this.props.messageFunction} />
      </footer>
    );
  }
}

export default ChatBar;