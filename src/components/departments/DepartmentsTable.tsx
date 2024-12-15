import { IDepartment, ISubDepartment } from "@/types/department";
import React from "react";

const DepartmentsTable: React.FC<{
  data: {
    GetDepartments: IDepartment[];
  };
  handleEdit: (department: IDepartment) => void;
  handleDelete: (id: number) => void;
}> = ({ data, handleDelete, handleEdit }) => {
  return (
    <div className="bg-white shadow-md rounded mb-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
              Sub-Departments
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.GetDepartments.map((department: IDepartment) => (
            <tr key={department.id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {department.name}
              </td>
              {department.subDepartments && (
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {department.subDepartments
                    .map((subDept: ISubDepartment) => subDept.name)
                    .join(", ")}
                </td>
              )}
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <button
                  onClick={() => handleEdit(department)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(department.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentsTable;
