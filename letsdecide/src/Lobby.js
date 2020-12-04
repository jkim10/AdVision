import React, { Component } from "react";

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      room_code: "",
      entered_room: false,
    };
  }

  componentDidMount(){
      this.setState({username: this.props.username, room_code: this.props.room_code})
  }
  render() {
     return (
     <div>hi</div>
     )
    }
}

export default Lobby;
