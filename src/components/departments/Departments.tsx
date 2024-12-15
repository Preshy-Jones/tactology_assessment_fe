import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CREATE_DEPARTMENT_MUTATION,
  UPDATE_DEPARTMENT_MUTATION,
  DELETE_DEPARTMENT_MUTATION,
} from "@/graphql/mutations";
import { GET_DEPARTMENTS_QUERY } from "@/graphql/queries";
import { IDepartment, PaginatedDepartments } from "@/types/department";
import DepartmentsTable from "./DepartmentsTable";
import DepartmentsPagination from "./DepartmentsPagination";

const departmentSchema = z.object({
  name: z.string().min(2, "Department name must be at least 2 characters"),
  subDepartments: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z
          .string()
          .min(2, "Sub-department name must be at least 2 characters"),
      })
    )
    .optional(),
});

type DepartmentFormData = z.infer<typeof departmentSchema>;

const Departments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDepartment, setSelectedDepartment] =
    useState<IDepartment | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_DEPARTMENTS_QUERY, {
    variables: { page: currentPage, limit: 10 },
  });

  const [createDepartment, { loading: createDepartmentLoading }] = useMutation(
    CREATE_DEPARTMENT_MUTATION,
    {
      onCompleted: () => refetch(),
    }
  );

  const [updateDepartment, { loading: updateDepartmentLoading }] = useMutation(
    UPDATE_DEPARTMENT_MUTATION,
    {
      onCompleted: () => refetch(),
    }
  );

  const [deleteDepartment] = useMutation(DELETE_DEPARTMENT_MUTATION, {
    onCompleted: () => refetch(),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      subDepartments: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subDepartments",
  });

  const onSubmit = (formData: DepartmentFormData) => {
    if (isEditing && selectedDepartment) {
      updateDepartment({
        variables: {
          id: Number(selectedDepartment.id),
          name: formData.name,
          subDepartments:
            formData.subDepartments?.map((sd) => ({
              id: Number(sd.id),
              name: sd.name,
            })) || [],
        },
      });
    } else {
      createDepartment({
        variables: {
          input: {
            name: formData.name,
            subDepartments:
              formData.subDepartments?.map((sd) => ({ name: sd.name })) || [],
          },
        },
      });
    }
    reset();
    setIsEditing(false);
    setSelectedDepartment(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch({ page, limit: 10 });
  };

  const handleEdit = (department: IDepartment) => {
    setSelectedDepartment(department);
    setIsEditing(true);

    setValue("name", department.name);

    if (department.subDepartments) {
      while (fields.length !== 0) {
        remove(0);
      }

      department.subDepartments.forEach((subDept) =>
        append({
          id: Number(subDept.id),
          name: subDept.name,
        })
      );
    }
  };

  const handleDelete = (id: number) => {
    deleteDepartment({
      variables: {
        id: Number(id),
      },
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  const paginatedData = data?.GetDepartments as PaginatedDepartments;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Departments Management</h1>

      {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-gray-700 text-sm font-bold">
              Sub-Departments
            </label>
            <button
              type="button"
              onClick={() => append({ name: "" })}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm"
            >
              Add Sub-Department
            </button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center mb-2">
              <input
                type="text"
                {...register(`subDepartments.${index}.name`)}
                placeholder="Sub-department name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              />
              {field.id && (
                <input
                  type="hidden"
                  // {...register(`subDepartments.${index}.id`)}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setValue(
                      `subDepartments.${index}.id`,
                      Number(e.target.value)
                    );
                  }}
                />
              )}
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
              >
                Remove
              </button>
              {errors.subDepartments?.[index]?.name && (
                <p className="text-red-500 text-xs italic ml-2">
                  {errors.subDepartments[index]?.name?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? "cursor-not-allowed bg-blue-400" : "hover:bg-blue-600"
            }`}
          >
            {createDepartmentLoading || updateDepartmentLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isEditing ? (
              "Update Department"
            ) : (
              "Create Department"
            )}
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

      {paginatedData && (
        <>
          <DepartmentsTable
            data={{ GetDepartments: paginatedData.departments }}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <DepartmentsPagination
            currentPage={paginatedData.page}
            totalPages={paginatedData.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Departments;
