import React, { useEffect } from 'react'
import firebase from './firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Badge from '@material-ui/core/Badge'
import Chip from '@material-ui/core/Chip'

const Lobby = (props) => {
  const db = firebase.firestore()
  const usersRef = db.collection('rooms').doc(props.room_code).collection('users')
  const query = usersRef.limit(25)
  const [users] = useCollectionData(query)
  const suggestionsRef = db.collection('rooms').doc(props.room_code).collection('suggestions')
  const suggestionsQuery = suggestionsRef.limit(25)
  const [suggestions] = useCollectionData(suggestionsQuery, { idField: 'id' })
  useEffect(() => {
    const cleanup = () => {
      usersRef.doc(props.username).delete()
      usersRef.get().then(function (querySnapshot) {
        if (querySnapshot.numChildren() === 0) {
          db.collection('rooms').doc(props.room_code).delete()
        }
      })
    }
    window.onbeforeunload = cleanup

    window.addEventListener('beforeunload', cleanup)
    return function end () {
      window.removeEventListener('beforeunload', cleanup)
    }
  })

  const handleClick = (suggestion) => {
    suggestionsRef.doc(suggestion.id).update({
      votes: firebase.firestore.FieldValue.increment(1)
    })
  }

  return (
    <Box>
      Suggestions:
      <Box display='flex' flexWrap='wrap' justifyContent='flex-start'>
        {suggestions && suggestions.map(s =>
          <Box key={s.id} display='inline' ml={1} mr={1} mb={3}>
            <Badge showZero badgeContent={s.votes} color='primary'>
              <Chip onClick={() => { handleClick(s) }} label={s.title} />
            </Badge>
          </Box>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Users:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map(user => <TableRow key={user.name}><TableCell component='th' scope='row'>{user.name}</TableCell></TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
export default Lobby
