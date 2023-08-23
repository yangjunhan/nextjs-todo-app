'use client'

import AppHeader from '@/app/components/appHeader'
import AppActionRow from '@/app/components/appActionRow'
import TodoList from '@/app/components/todoList'
import { supabaseClient } from '@/app/lib/SupabaseClient'
import { useEffect, useState } from 'react'
import { Session } from '@supabase/gotrue-js'
import enUS from 'antd/locale/en_US'
import { ConfigProvider } from 'antd'
import Auth from '@/app/components/auth'
import theme from '@/app/theme/default'

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
    <ConfigProvider locale={enUS} theme={theme}>
      <div className="flex flex-col items-center h-screen">
        <AppHeader session={session} />
        <div className="flex flex-col w-[600px]">
          {session ? (
            <>
              <AppActionRow session={session} />
              <TodoList session={session} />
            </>
          ) : (
            <Auth supabaseClient={supabaseClient} />
          )}
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Home
