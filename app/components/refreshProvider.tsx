'use client'

import { createContext, FC, useState } from 'react'

export const RefreshContext = createContext<{ refresh: boolean; triggerRefresh: () => void }>({
  refresh: false,
  triggerRefresh: () => {}
})

export const RefreshProvider: FC<any> = ({ children }) => {
  const [refresh, setRefresh] = useState<boolean>(false)

  const triggerRefresh = () => {
    setRefresh(!refresh)
  }

  return (
    <>
      <RefreshContext.Provider value={{ refresh, triggerRefresh }}>{children}</RefreshContext.Provider>
    </>
  )
}
