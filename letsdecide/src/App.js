import React, { Component } from "react";
import firebase from "./firebase";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import NavBar from "./shared/Navbar";
import Lobby from "./Lobby"
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      room_code: "",
      entered_room: false,
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleCreateRoom = this.handleCreateRoom.bind(this)
  }

  handleChange(evt) {
    this.setState({
      ...this.state,
      [evt.target.name]: evt.target.value,
    });
  }
  handleCreateRoom(event){
    if(this.state.username === ""){
      alert("specify username")
    } else{
      event.preventDefault()
      const db = firebase.firestore();
      let r = Math.random().toString(36).substring(7);
      db.collection("rooms").doc(r).collection('users').add({
        name: this.state.username
      })
      this.setState({entered_room: true})
   }
  }
  render() {
    if (this.state.entered_room) {
      return(
        <Box>
        <NavBar />
        <Container id="login-view" align="center" fixed>
          <Lobby username={this.state.username} code={this.state.room_code}/>
        </Container>
      </Box>)
    } else{
      return (
        <div>
          <NavBar />
          <Container id="login-view" align="center" fixed>
            <Box mt={5}>
              <Typography variant="h6" component="h6">
                1. Choose Temporary Username
              </Typography>
              <TextField
                required
                inputProps={{ style: { textAlign: "center" } }}
                align="center"
                label="Username"
                variant="filled"
                name="username"
              />
              <Box mt={2}>
                <Typography mt={3} variant="h6" component="h6">
                  2. Join or Create a Room
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-end"
              >
                <Button variant="contained" style={{marginRight: '10px'}} onClick={this.handleCreateRoom} color="primary" disableElevation>
                  Create
                </Button>
                <Typography display="inline" variant="h6" component="h6">
                  or...
                </Typography>
                <TextField
                  style={{marginLeft: '10px'}}
                  inputProps={{ style: { textAlign: "center" } }}
                  align="center"
                  label="Join"
                  name="room_code"
                />
              </Box>
            </Box>
          </Container>
        </div>
      );
  }
}
}

export default App;
