import React from 'react'
import Link from 'react-router-dom/Link'
import UserProvider from '../../../containers/UserProvider.js'
import RequestsProvider from '../../../containers/RequestsProvider.js'

const FriendRequests = ({ user }) => {
  return (
    <RequestsProvider
      render={requests => (
        <div>
          Received Requests: ({requests.length})
          {requests.map(request => (
            <UserProvider
              uid={request.user}
              render={requestUser => (
                <div key={requestUser.id}>
                  <Link to={`/profile/${requestUser.id}`}>
                    {requestUser.name}
                  </Link>
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
