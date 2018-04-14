import React from 'react'
import Link from 'react-router-dom/Link'
import UserProvider from '../../containers/UserProvider.js'
import RequestsProvider from '../../containers/RequestsProvider.js'

const FriendRequests = ({ user }) => {
  return (
    <RequestsProvider
      render={requests => (
        <div>
          Requests: ({requests.length})
          {requests.map(request => (
            <UserProvider
              uid={request.user}
              key={request.id}
              render={user => (
                <div>
                  <Link to={`/profile/${user.id}`}>{user.name}</Link>
                  <button onClick={request.accept}>Accept</button>
                  <button onClick={request.destroy}>Delete</button>
                </div>
              )}
            />
          ))}
        </div>
      )}
    />
  )
}

export default FriendRequests
