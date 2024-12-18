'use client'

import { useState } from 'react'
import UserCard from './UserCard'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function GitHubUserSearch() {
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username) {
      setError('Please enter a username')
      return
    }

    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`)
      if (!userResponse.ok) {
        throw new Error('User not found')
      }
      const userData = await userResponse.json()

      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`)
      const reposData = await reposResponse.json()

      setUserData({ ...userData, repos: reposData })
      setError('')
    } catch (err) {
      setError('Error fetching user data')
      setUserData(null)
    }

    setUsername('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4 w-[512px] flex flex-row">
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="border p-2 mr-2 rounded"
          aria-label="GitHub username"
        />
        <Button type="submit" >
          Search
        </Button>
      </form>
      {error && <p className="text-red-500" role="alert">{error}</p>}
      {userData && <UserCard user={userData} />}
    </div>
  )
}

