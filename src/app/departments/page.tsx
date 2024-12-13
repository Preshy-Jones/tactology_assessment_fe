"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CREATE_DEPARTMENT_MUTATION,
  UPDATE_DEPARTMENT_MUTATION,
  DELETE_DEPARTMENT_MUTATION,
} from "@/graphql/mutations";
import { GET_DEPARTMENTS_QUERY } from "@/graphql/queries";

const departmentSchema = z.object({
  name: z.string().min(2, "Department name must be at least 2 characters"),
  subDepartments: z
    .array(
      z.object({
        name: z
          .string()
          .min(2, "Sub-department name must be at least 2 characters"),
      })
    )
    .optional(),
});

type DepartmentFormData = z.infer<typeof departmentSchema>;

export default function DepartmentsPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_DEPARTMENTS_QUERY);

  const [createDepartment] = useMutation(CREATE_DEPARTMENT_MUTATION, {
    onCompleted: () => refetch(),
  });

  const [updateDepartment] = useMutation(UPDATE_DEPARTMENT_MUTATION, {
    onCompleted: () => refetch(),
  });

  const [deleteDepartment] = useMutation(DELETE_DEPARTMENT_MUTATION, {
    onCompleted: () => refetch(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
  });

  const onSubmit = (formData: DepartmentFormData) => {
    if (isEditing && selectedDepartment) {
      updateDepartment({
        variables: {
          id: selectedDepartment.id,
          name: formData.name,
        },
      });
    } else {
      createDepartment({
        variables: {
          input: formData,
        },
      });
    }
    reset();
    setIsEditing(false);
    setSelectedDepartment(null);
  };

  const handleEdit = (department: any) => {
    setSelectedDepartment(department);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    deleteDepartment({ variables: { id } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Departments Management</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Department Name
          </label>
          <input
            type="text"
            {...register("name")}
            defaultValue={selectedDepartment?.name || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isEditing ? "Update Department" : "Create Department"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setSelectedDepartment(null);
                reset();
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white shadow-md rounded">
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
            {data.getDepartments.map((department: any) => (
              <tr key={department.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {department.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {department.subDepartments
                    .map((subDept: any) => subDept.name)
                    .join(", ")}
                </td>
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
    </div>
  );
}
