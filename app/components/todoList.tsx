'use client'

import { List, notification } from 'antd'
import { Todo } from '@/app/interfaces/todo'
import { FC, useContext, useEffect, useState } from 'react'
import { RefreshContext } from '@/app/components/refreshProvider'
import { TodoItem } from '@/app/components/todoItem'
import { Session } from '@supabase/gotrue-js'
import { supabaseClient } from '@/app/lib/SupabaseClient'

const TodoList: FC<{ session: Session }> = ({ session }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [list, setList] = useState<Todo.Item[]>([])
  const [api, contextHolder] = notification.useNotification()
  const { refresh } = useContext(RefreshContext)

  useEffect(() => {
    const getTodoList = async () => {
      setLoading(true)
      const user = session.user

      const { data: list, error } = await supabaseClient
        .from('todos')
        .select('id, title, createdAt, status')
        .filter('userId', 'eq', user.id)
        .order('createdAt', { ascending: false })
      if (error) {
        api.error({ message: 'Failed to load todo list', description: error.message })
      } else if (list) {
        setList(list)
      }
      setLoading(false)
    }
    getTodoList().then()
  }, [api, refresh, session.user])

  return (
    <>
      {contextHolder}
      <List
        bordered
        size="large"
        dataSource={list}
        loading={loading}
        renderItem={item => (
          <List.Item key={item.title}>
            <TodoItem item={item} />
          </List.Item>
        )}
      />
    </>
  )
}

export default TodoList
