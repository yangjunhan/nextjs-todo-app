import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Todo } from '@/app/interfaces/todo'
import { Avatar, Button, message, Modal, Popconfirm, Space } from 'antd'
import { CheckOutlined, DeleteFilled, EditFilled } from '@ant-design/icons'
import { RefreshContext } from '@/app/components/refresh-provider'
import TodoItemNew from '@/app/components/todo-item-form'

export const TodoItem: FC<{ item: Todo.Item }> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [status, setStatus] = useState<Todo.ItemStatus>(item.status)
  const [messageApi, contextHolder] = message.useMessage()
  const title = useRef<string>(item.title)
  const { triggerRefresh } = useContext(RefreshContext)

  const setTitle = (t: string): void => {
    title.current = t
  }

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const toggleItemStatus = (): void => {
    if (status === Todo.ItemStatus.INCOMPLETE) {
      setStatus(Todo.ItemStatus.COMPLETE)
    } else {
      setStatus(Todo.ItemStatus.INCOMPLETE)
    }
  }

  const updateTodoItem = useCallback((): void => {
    const storage = window.localStorage.getItem(Todo.StorageKey)
    const list: Todo.Item[] = storage ? JSON.parse(storage) : []
    const match = list.findIndex(el => el.id === item.id)
    if (match > -1) {
      list.splice(match, 1, { ...item, title: title.current, status })
      window.localStorage.setItem(Todo.StorageKey, JSON.stringify(list))
    }
  }, [item, status])

  const deleteTodoItem = (): void => {
    const storage = window.localStorage.getItem(Todo.StorageKey)
    const list: Todo.Item[] = storage ? JSON.parse(storage) : []
    const match = list.findIndex(el => el.id === item.id)
    if (match > -1) {
      list.splice(match, 1)
      window.localStorage.setItem(Todo.StorageKey, JSON.stringify(list))
      triggerRefresh()
    }
  }

  const handleOk = useCallback((): void => {
    if (!title.current) {
      messageApi.warning('TODO title cannot be empty.').then()
      return
    }
    updateTodoItem()
    triggerRefresh()
    messageApi.success('TODO item successfully added.').then()
    setIsModalOpen(false)
  }, [messageApi, triggerRefresh, updateTodoItem])

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    // listen to status change and update the item
    updateTodoItem()
  }, [status, updateTodoItem])

  return (
    <>
      {contextHolder}
      <div className="flex items-center w-full">
        <div className="mr-4 cursor-pointer" onClick={toggleItemStatus}>
          {status === Todo.ItemStatus.COMPLETE ? (
            <Avatar
              shape="square"
              icon={<CheckOutlined className="animate-pop-out" />}
              className="bg-success text-white"
            />
          ) : (
            <Avatar shape="square" />
          )}
        </div>
        <div className="flex flex-auto flex-col overflow-hidden mr-4">
          {status === Todo.ItemStatus.COMPLETE ? (
            <span className="font-medium text-ellipsis overflow-hidden whitespace-nowrap line-through text-gray-600">
              {item.title}
            </span>
          ) : (
            <span className="font-medium text-ellipsis overflow-hidden whitespace-nowrap">{item.title}</span>
          )}
          <span className="text-xs text-gray-500">Created: {new Date(item.createdTime).toLocaleString()}</span>
        </div>
        <div className="flex-initial">
          <Space>
            <Button icon={<EditFilled />} onClick={showModal} />
            <Popconfirm
              title="Delete the TODO"
              description="Are you sure to delete this TODO?"
              onConfirm={deleteTodoItem}
            >
              <Button icon={<DeleteFilled />} />
            </Popconfirm>
          </Space>
        </div>
      </div>
      <Modal title="Modify TODO" destroyOnClose={true} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <TodoItemNew title={item.title} onTitleChanges={setTitle} />
      </Modal>
    </>
  )
}
