import { Star } from 'lucide-react'
import Image from 'next/image'
interface Repo {
  id: number
  name: string
  html_url: string
  stargazers_count: number
}

interface UserCardProps {
  user: {
    avatar_url: string
    name: string
    login: string
    bio: string
    followers: number
    following: number
    public_repos: number
    created_at: string
    repos: Repo[]
  }
}

function calculateRating(user: UserCardProps['user']): number {
  const creationDate = new Date(user.created_at)
  const now = new Date()
  const accountAge = (now.getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24 * 365) // Age in years

  const totalStars = user.repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  
  // Calculate rating based on various factors
  const rating = (
    (user.followers * 2) +
    (user.public_repos * 0.5) +
    (totalStars * 0.1) +
    (accountAge * 10)
  ) / 100

  return Math.min(Math.max(rating, 0), 5) // Ensure rating is between 0 and 5
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-2 text-sm ">({rating.toFixed(1)})</span>
    </div>
  )
}

export default function UserCard({ user }: UserCardProps) {
  const rating = calculateRating(user)

  console.log(user);
  

  return (
    <div className="bg-white/10 shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center mb-4">
        <Image
          src={user.avatar_url}
          alt={user.name || user.login}
          width={100}
          height={100}
          className="rounded-full mr-4"
        />
        <div className='text-left'>
          <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
          <p className="">{user.bio}</p>
          <RatingStars rating={rating} />
        </div>
      </div>
      <ul className="grid grid-cols-3 gap-4 mb-4 text-center">
        <li className="bg-gray-100/10 p-2 rounded">
          <strong className="block text-lg">{user.followers}</strong> followers
        </li>
        <li className="bg-gray-100/10 p-2 rounded">
          <strong className="block text-lg">{user.following}</strong> following
        </li>
        <li className="bg-gray-100/10 p-2 rounded">
          <strong className="block text-lg">{user.public_repos}</strong> repos
        </li>
      </ul>
      <div>
        <h3 className="text-xl font-semibold mb-2">Top Repositories</h3>
        <div className="grid grid-cols-2 gap-2">
          {user.repos.slice(0, 6).map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200/10 px-3 py-2 rounded text-sm hover:bg-gray-300/10 transition-colors"
            >
              {repo.name} ({repo.stargazers_count} ⭐)
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

