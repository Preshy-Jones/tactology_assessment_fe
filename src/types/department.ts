export interface IDepartment {
  id: number;
  name: string;
  subDepartments?: ISubDepartment[];
}

export interface ISubDepartment {
  id: number;
  name: string;
}
