export interface IDepartment {
  id: number;
  name: string;
  subDepartments?: ISubDepartment[];
}

export interface ISubDepartment {
  id: number;
  name: string;
}

export interface PaginatedDepartments {
  departments: IDepartment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}