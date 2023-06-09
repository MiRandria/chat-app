import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Login from '@/components/auth/Login';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
        <Login/>
    </div>
    
  )
}
