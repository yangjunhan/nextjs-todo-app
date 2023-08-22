export namespace Todo {
  export enum ItemStatus {
    INCOMPLETE = 'INCOMPLETE',
    COMPLETE = 'COMPLETE'
  }
  export interface Item {
    id: string
    title: string
    status: ItemStatus
    createdAt: number
  }
}
