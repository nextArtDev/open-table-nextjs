'use client'
import Link from 'next/link'
import { FC, useContext } from 'react'
import AuthModal from './AuthModal'
import { AuthenticationContext } from '../context/AuthContext'
import useAuth from '@/hooks/useAuth'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { data, loading } = useContext(AuthenticationContext)
  const { signout } = useAuth()
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        {' '}
        OpenTable{' '}
      </Link>
      {loading ? null : (
        <div>
          <div className="flex">
            {data ? (
              <button
                onClick={signout}
                className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
              >
                Logout
              </button>
            ) : (
              <>
                <AuthModal isSignin />
                <AuthModal isSignin={false} />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
