'use client'

import { Button, message, Modal, notification } from 'antd'
import { FC, useCallback, useContext, useRef, useState } from 'react'
import TodoItemNew from '@/app/components/todoItemForm'
import { Todo } from '@/app/interfaces/todo'
import { RefreshContext } from '@/app/components/refreshProvider'
import { Session } from '@supabase/gotrue-js'
import { supabaseClient } from '@/app/lib/SupabaseClient'

const AppActionRow: FC<{ session: Session }> = ({ session }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [messageApi, messageContextHolder] = message.useMessage()
  const [api, notificationContextHolder] = notification.useNotification()
  const { triggerRefresh } = useContext(RefreshContext)
  const title = useRef<string>('')
  const user = session.user

  const setTitle = (t: string): void => {
    title.current = t
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleOk = useCallback(() => {
    const titleTrim = title.current.trim()
    if (!titleTrim.length) {
      messageApi.warning('TODO title cannot be empty.').then()
      return
    }
    const addItemToTodoList = async () => {
      const { data: item, error } = await supabaseClient
        .from('todos')
        .insert([{ title: titleTrim, status: Todo.ItemStatus.INCOMPLETE, userId: user.id }])
        .select()
        .single()

      if (error) {
        api.error({ message: 'Failed to add todo item', description: error.message })
      } else if (item) {
        messageApi.success('TODO item successfully added.').then()
        triggerRefresh()
      }
    }

    addItemToTodoList().then()
    setIsModalOpen(false)
  }, [api, messageApi, triggerRefresh, user.id])

  return (
    <>
      {notificationContextHolder}
      {messageContextHolder}
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
