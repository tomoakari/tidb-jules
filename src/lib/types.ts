export interface Group {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  group_id: number;
}

export interface UserWithGroup extends User {
  group_name: string;
}
