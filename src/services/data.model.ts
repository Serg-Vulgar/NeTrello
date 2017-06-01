export interface Board {
  id: number,
  name: string,
  columns: Array<Column>
}

export interface Column {
  id: number,
  name: string,
  cards: Array<Card>
}

export interface Card {
  id: number,
  name: string,
  description?: string,
  members?: Array<any>,
  checkLists?: Array<any>,
  comments?: Array<CheckList>,
  dueDate?: any,
  timeTracking?: {
    estimatedTime: any,
    spentTime: any,
    remainingTime: any
  },
  attachments?: any
}

export interface CheckList {
  name: string,
  items: Array<CheckItem>
}

export interface CheckItem {
  name: string,
  checked: boolean
}
