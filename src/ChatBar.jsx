import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log('render ChatBar');
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp = {this.props.changeFunc} />
      </footer>
    );
  }
}

export default ChatBar;