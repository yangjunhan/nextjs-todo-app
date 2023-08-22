import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Todo } from '@/app/interfaces/todo'
import { Avatar, Button, message, Modal, notification, Popconfirm, Space } from 'antd'
import { CheckOutlined, DeleteFilled, EditFilled } from '@ant-design/icons'
import { RefreshContext } from '@/app/components/refreshProvider'
import TodoItemNew from '@/app/components/todoItemForm'
import { supabaseClient } from '@/app/lib/SupabaseClient'

export const TodoItem: FC<{ item: Todo.Item }> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [status, setStatus] = useState<Todo.ItemStatus>(item.status)
  const [messageApi, messageContextHolder] = message.useMessage()
  const [api, notificationContextHolder] = notification.useNotification()
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

  const deleteTodoItem = useCallback(async () => {
    try {
      await supabaseClient.from('todos').delete().eq('id', item.id).throwOnError()
      triggerRefresh()
    } catch (e: any) {
      api.error({ message: 'Failed to delete todo item', description: e.message })
    }
  }, [api, item.id, triggerRefresh])

  const handleOk = useCallback(async () => {
    const titleTrim = title.current.trim()
    if (!titleTrim.length) {
      messageApi.warning('TODO title cannot be empty.').then()
      return
    }
    try {
      await supabaseClient.from('todos').update({ title: titleTrim }).eq('id', item.id)
      messageApi.success('TODO item successfully updated.').then()
      triggerRefresh()
      setIsModalOpen(false)
    } catch (e: any) {
      api.error({ message: "Failed to update todo item's title", description: e.message })
    }
  }, [api, item.id, messageApi, triggerRefresh])

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    // listen to status change and update the item
    const updateItemStatus = async () => {
      try {
        await supabaseClient.from('todos').update({ status }).eq('id', item.id)
        setIsModalOpen(false)
      } catch (e: any) {
        api.error({ message: "Failed to update todo item's status", description: e.message })
      }
    }
    updateItemStatus().then()
  }, [api, item.id, messageApi, status])

  return (
    <>
      {notificationContextHolder}
      {messageContextHolder}
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
          <span className="text-xs text-gray-500">Created: {new Date(item.createdAt).toLocaleString()}</span>
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
