'use client'

import React, { FC, useCallback } from 'react'
import Icon from '@ant-design/icons'
import TodoSvg from '@/public/todo.svg'
import { Session } from '@supabase/gotrue-js'
import { Dropdown, message } from 'antd'
import { supabaseClient } from '@/app/lib/SupabaseClient'

const AppHeader: FC<{ session: Session | null }> = ({ session }) => {
  const [messageApi, messageContextHolder] = message.useMessage()
  const logOut = useCallback(() => {
    supabaseClient.auth.signOut().then(() => {
      messageApi.success('Successfully logged out.').then()
    })
  }, [messageApi])

  const items = [
    {
      key: '1',
      label: <a onClick={logOut}>Log out</a>
    }
  ]

  return (
    <>
      {messageContextHolder}
      <div className="flex flex-inital justify-between w-full py-2 px-3 bg-primary mb-4">
        <div className="flex align-center ml-4">
          <Icon component={TodoSvg} className="text-2xl mr-4" style={{ color: '#fff' }} />
          <span className="font-bold text-base text-white">MY TODO LIST</span>
        </div>
        {session ? (
          <Dropdown menu={{ items }}>
            <div className="mr-4 text-white text-sm cursor-default">
              <span>{session.user.email}</span>
            </div>
          </Dropdown>
        ) : null}
      </div>
    </>
  )
}

export default AppHeader
