import React, {Component} from 'react';

import Message from './Message.jsx';

class Messagelist extends Component {
  render() {
    console.log('render Messagelist');


    return (
      <main className="messages">

        {this.props.messages.map(function(message, index){
          return <Message message = {message} key = {index} />
        }) }

      </main>
    );
  }
}

export default Messagelist;