import { Form, Input } from 'antd'
import { FC } from 'react'

type FieldType = {
  title?: string
}

interface TodoItemNewCallbacks {
  title?: string
  onTitleChanges: (title: string) => void
}

const todoItemForm: FC<TodoItemNewCallbacks> = ({ title, onTitleChanges }) => {
  return (
    <Form name="basic" initialValues={{ title }} onValuesChange={values => onTitleChanges(values.title)}>
      <Form.Item<FieldType> label="Title" name="title">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default todoItemForm
