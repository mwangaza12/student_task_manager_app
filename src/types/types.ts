export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type FilterType = 'All' | 'Active' | 'Completed';