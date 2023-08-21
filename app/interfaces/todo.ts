export namespace Todo {
  export const StorageKey = 'TODO_LIST_STORAGE'

  export enum ItemStatus {
    INCOMPLETE = 'INCOMPLETE',
    COMPLETE = 'COMPLETE'
  }
  export interface Item {
    id: string
    title: string
    status: ItemStatus
    createdTime: number
  }
}
