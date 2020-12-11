/* global alert  */

import React, { Component } from 'react'
import firebase from './firebase'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import NavBar from './shared/Navbar'
import Lobby from './Lobby.js'
import './App.css'

/**
 * Render the App Component
 * This is a single page app
 * View changes when state "entered_room" is flagged as true
 * ```html
 * <App />
 * ```
 */
class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      room_code: '',
      entered_room: false,
      suggestion: '',
      error: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCreateRoom = this.handleCreateRoom.bind(this)
  }

  handleChange (evt) {
    this.setState({
      ...this.state,
      [evt.target.name]: evt.target.value || ''
    })
  }

  handleCreateRoom (event) {
    if (this.state.username === '') {
      this.setState({ error: true })
    } else {
      event.preventDefault()
      const db = firebase.firestore()
      const r = Math.random().toString(36).substring(7)
      db.collection('rooms').doc(r).collection('users').doc(this.state.username).set({ name: this.state.username })
      this.setState({ entered_room: true, room_code: r })
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.state.username === '') {
      this.setState({ error: true })
    } else {
      event.preventDefault()
      const db = firebase.firestore()
      const ref = db.collection('rooms').doc(this.state.room_code).collection('users')
      ref.doc(this.state.username).set({ name: this.state.username })
      this.setState({ entered_room: true, room_code: this.state.room_code })
    }
  }

  handleAddSuggestion (event) {
    event.preventDefault()
    if (this.state.suggestion === '') {
      alert('specify suggestion')
    } else {
      const db = firebase.firestore()
      const ref = db.collection('rooms').doc(this.state.room_code).collection('suggestions')
      ref.add({
        title: this.state.suggestion,
        votes: 0
      })
      this.setState({ suggestion: '' })
    }
  }

  render () {
    if (this.state.entered_room) {
      return (
        <Box>
          <NavBar />
          <Container id='login-view' align='center' fixed>
            <Box mb={1}>
              <h3>Room Code: {this.state.room_code}</h3>
              <form display='flex' align='center' onSubmit={this.handleAddSuggestion.bind(this)}>
                <Box mt={3} justifyContent='center' display='flex'>
                  <TextField id='outlined-basic' onChange={(event) => { this.handleChange(event) }} value={this.state.suggestion} name='suggestion' label='Add a Suggestion' variant='outlined' />
                  <Button type='submit' variant='outlined' size='large' color='primary'>
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
            <Lobby username={this.state.username} room_code={this.state.room_code} />
          </Container>
        </Box>
      )
    } else {
      return (
        <div>
          <NavBar />
          <Container id='login-view' align='center' fixed>
            <Box mt={5}>
              <Typography variant='h6' component='h6'>
                1. Choose Temporary Username
              </Typography>
              <TextField
                required
                inputProps={{ style: { textAlign: 'center' }, 'data-testid': 'username' }}
                align='center'
                label='Username'
                variant='filled'
                error={this.state.error}
                name='username'
                onChange={(event) => { this.handleChange(event) }}
              />
              <Box mt={2}>
                <Typography mt={3} variant='h6' component='h6'>
                  2. Join or Create a Room
                </Typography>
              </Box>
              <Box
                display='flex'
                justifyContent='center'
                alignItems='flex-end'
              >

                <Button data-testid='create' variant='contained' style={{ marginRight: '10px' }} onClick={this.handleCreateRoom} color='primary' disableElevation>
                  Create
                </Button>
                <Typography display='inline' variant='h6' component='h6'>
                  or...
                </Typography>
                <form data-testid='form' onSubmit={this.handleSubmit.bind(this)}>
                  <TextField
                    style={{ marginLeft: '10px' }}
                    inputProps={{ style: { textAlign: 'center' }, 'data-testid': 'room_code' }}
                    align='center'
                    label='Join'
                    name='room_code'
                    onChange={(event) => { this.handleChange(event) }}
                  />
                </form>
              </Box>
            </Box>
          </Container>
        </div>
      )
    }
  }
}

export default App
