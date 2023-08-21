import AppHeader from '@/app/components/app-header'
import AppActionRow from '@/app/components/app-action-row'
import TodoList from '@/app/components/todo-list'
import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import { RefreshProvider } from '@/app/components/refresh-provider'

const Home = () => {
  return (
    <ConfigProvider locale={enUS}>
      <RefreshProvider>
        <div className="flex flex-col items-center">
          <AppHeader />
          <div className="flex flex-col w-[600px]">
            <AppActionRow />
            <TodoList />
          </div>
        </div>
      </RefreshProvider>
    </ConfigProvider>
  )
}

export default Home
