import { useCallback, useState, MouseEvent, FC } from 'react'
import { Button, Form, Input, message, notification } from 'antd'
import { SupabaseClient } from '@supabase/supabase-js'

const Auth: FC<{ supabaseClient: SupabaseClient }> = ({ supabaseClient }) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [messageApi, messageContextHolder] = message.useMessage()
  const [api, notificationContextHolder] = notification.useNotification()

  const handleLogin = useCallback(
    async (event: MouseEvent) => {
      event.preventDefault()

      setLoading(true)
      const redirectUrl =
        process.env.NODE_ENV === 'production' ? 'https://nextjs-todo-app-liard-one.vercel.app' : 'http://localhost:3000'
      const { error } = await supabaseClient.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectUrl
        }
      })

      if (error) {
        api.error({ message: 'Failed to send magic link', description: error.message })
      } else {
        messageApi.success('Please Check your email for the login link.')
      }
      setLoading(false)
    },
    [api, email, messageApi, supabaseClient.auth]
  )

  return (
    <>
      {messageContextHolder}
      {notificationContextHolder}
      <div className="flex flex-col">
        <Form layout="vertical">
          <Form.Item label="Email address" name="email">
            <Input onChange={e => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} onClick={e => handleLogin(e)} className="w-full">
              {loading ? 'Loading' : 'Send magic link'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Auth
