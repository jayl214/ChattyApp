import React, {Component} from 'react';

import Message from './Message.jsx';

class Messagelist extends Component {
  render() {
    return (
      <main class="messages">
        <div class="message">
          <span class="message-username">Anonymous1</span>
          <span class="message-content">I won't be impressed with technology until I can download food.</span>
        </div>
      </main>
    );
  }
}

export default Messagelist;