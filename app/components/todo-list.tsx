'use client'

import { List } from 'antd'
import { Todo } from '@/app/interfaces/todo'
import { useContext, useEffect, useState } from 'react'
import { RefreshContext } from '@/app/components/refresh-provider'
import { TodoItem } from '@/app/components/todo-item'

const TodoList = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [items, setItems] = useState<Todo.Item[]>([])
  const { refresh } = useContext(RefreshContext)

  const getTodoList = (): Todo.Item[] => {
    const storage = window.localStorage.getItem(Todo.StorageKey)
    return storage ? JSON.parse(storage) : []
  }

  useEffect(() => {
    // sort todo items based on descending created time
    const list = getTodoList().sort((pre, cur) => cur.createdTime - pre.createdTime)
    setItems(list)
    setLoading(false)
  }, [refresh])

  return (
    <List
      bordered
      size="large"
      dataSource={items}
      loading={loading}
      renderItem={item => (
        <List.Item key={item.title}>
          <TodoItem item={item} />
        </List.Item>
      )}
    />
  )
}

export default TodoList
