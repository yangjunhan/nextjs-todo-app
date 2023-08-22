'use client'

import AppHeader from '@/app/components/appHeader'
import AppActionRow from '@/app/components/appActionRow'
import TodoList from '@/app/components/todoList'
import { supabaseClient } from '@/app/lib/SupabaseClient'
import { useEffect, useState } from 'react'
import { Session } from '@supabase/gotrue-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import enUS from 'antd/locale/en_US'
import { ConfigProvider } from 'antd'

const Home = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <ConfigProvider locale={enUS}>
      <div className="flex flex-col items-center">
        <AppHeader />
        <div className="flex flex-col w-[600px]">
          {session ? (
            <>
              <AppActionRow session={session} />
              <TodoList session={session} />
            </>
          ) : (
            <Auth
              supabaseClient={supabaseClient}
              view="magic_link"
              appearance={{ theme: ThemeSupa }}
              showLinks={false}
              providers={[]}
            />
          )}
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Home
