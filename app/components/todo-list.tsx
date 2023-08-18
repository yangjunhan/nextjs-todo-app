'use client'

import { Avatar, List } from 'antd'
import { Todo } from '@/app/interfaces/todo'
import { BellOutlined } from '@ant-design/icons'
import ItemStatus = Todo.ItemStatus

const TodoList = () => {
  const items: Todo.Item[] = [
    {
      title: 'Do exercise',
      status: ItemStatus.INCOMPLETE,
      createdTime: new Date().valueOf()
    }
  ]
  return (
    <List
      bordered
      size="large"
      dataSource={items}
      renderItem={item => (
        <List.Item key={item.title}>
          <div className="flex items-center">
            <div className="mr-2">
              <Avatar icon={<BellOutlined />} />
            </div>
            <div className="flex flex-col">
              <span>{item.title}</span>
              <span className="text-xs">{item.createdTime}</span>
            </div>
          </div>
        </List.Item>
      )}
    />
  )
}

export default TodoList
