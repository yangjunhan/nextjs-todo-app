'use client'

import { Button, message, Modal } from 'antd'
import { useContext, useRef, useState } from 'react'
import TodoItemNew from '@/app/components/todo-item-form'
import { Todo } from '@/app/interfaces/todo'
import { RefreshContext } from '@/app/components/refresh-provider'

const AppActionRow = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage()
  const { triggerRefresh } = useContext(RefreshContext)
  const title = useRef<string>('')

  const setTitle = (t: string): void => {
    title.current = t
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const addItemToTodoList = (): void => {
    if (title.current) {
      const storage = window.localStorage.getItem(Todo.StorageKey)
      const list: Todo.Item[] = storage ? JSON.parse(storage) : []
      const now = new Date().valueOf()
      list.unshift({
        id: now.toString(),
        title: title.current,
        status: Todo.ItemStatus.INCOMPLETE,
        createdTime: now
      })
      window.localStorage.setItem(Todo.StorageKey, JSON.stringify(list))
      triggerRefresh()
    }
  }

  const handleOk = () => {
    if (!title.current) {
      messageApi.warning('TODO title cannot be empty.').then()
      return
    }
    messageApi.success('TODO item successfully added.').then()
    addItemToTodoList()
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {contextHolder}
      <div className="flex justify-between mb-4">
        <Button type="primary" onClick={showModal}>
          Add TODO
        </Button>
      </div>
      <Modal title="Add TODO" destroyOnClose={true} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <TodoItemNew onTitleChanges={setTitle} />
      </Modal>
    </>
  )
}

export default AppActionRow
