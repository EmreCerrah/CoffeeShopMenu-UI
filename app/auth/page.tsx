'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Coffee } from 'lucide-react'
import AuthService from '@/services/AuthService'

export default function Login() {
  const [error, setError] = useState<string>('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await AuthService.Login(username,password);
      if (result) {
        router.push("/dashboard");
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError(error+': throwing error when sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <Coffee className="w-12 h-12 text-primary mb-2" />
          <CardTitle className="text-2xl">La Bianco Cafe Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit} className="p-8 border rounded-lg shadow-lg">
        <h1 className="text-2xl mb-4">Giriş Yap</h1>
        <div className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Kullanıcı Adı"
            className="w-full p-2 border rounded"
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
          <input
            name="password"
            type="password"
            placeholder="Şifre"
            className="w-full p-2 border rounded"
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
          <button 
            type="submit" 
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </div>
      </form>
        </CardContent>
      </Card>
    </div>
  );
}