import AppHeader from '@/app/components/appHeader'
import AppActionRow from '@/app/components/appActionRow'
import TodoList from '@/app/components/todoList'

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <AppHeader />
      <div className="flex flex-col w-[600px]">
        <AppActionRow />
        <TodoList />
      </div>
    </div>
  )
}

export default Home
