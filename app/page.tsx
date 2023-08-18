import AppHeader from '@/app/components/app-header'
import AppActionRow from '@/app/components/app-action-row'
import TodoList from '@/app/components/todo-list'
import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'

const Home = () => {
  return (
    <ConfigProvider locale={enUS}>
      <div className="flex flex-col items-center">
        <AppHeader />
        <div className="flex flex-col w-96">
          <AppActionRow />
          <TodoList />
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Home
