export namespace Todo {
  export enum ItemStatus {
    INCOMPLETE = 'INCOMPLETE',
    COMPLETE = 'COMPLETE'
  }
  export interface Item {
    title: string
    status: ItemStatus
    createdTime: number
  }
}
