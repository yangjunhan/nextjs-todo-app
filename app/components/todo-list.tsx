'use client'

import { Avatar, Button, List, Space } from 'antd'
import { Todo } from '@/app/interfaces/todo'
import { BellOutlined, DeleteFilled, EditFilled } from '@ant-design/icons'
import ItemStatus = Todo.ItemStatus
import { useEffect, useState } from 'react'

const TodoList = () => {
  const [items, setItems] = useState<Todo.Item[]>([])

  useEffect(() => {
    setItems([
      {
        title: 'Do exercise in the morning',
        status: ItemStatus.INCOMPLETE,
        createdTime: 1692330569940
      }
    ])
  }, [])

  return (
    <List
      bordered
      size="large"
      dataSource={items}
      renderItem={item => (
        <List.Item key={item.title}>
          <div className="flex items-center w-full">
            <div className="mr-4">
              <Avatar icon={<BellOutlined />} />
            </div>
            <div className="flex flex-auto flex-col overflow-hidden mr-4">
              <span className="font-medium text-ellipsis overflow-hidden whitespace-nowrap">{item.title}</span>
              <span className="text-xs text-gray-500">{new Date(item.createdTime).toLocaleString()}</span>
            </div>
            <div className="flex-initial">
              <Space>
                <Button icon={<EditFilled />} />
                <Button icon={<DeleteFilled />} />
              </Space>
            </div>
          </div>
        </List.Item>
      )}
    />
  )
}

export default TodoList
