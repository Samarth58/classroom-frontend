import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";

type Subject = {
  id: string;
  coursecode: string;
  name: string;
  department: string;
  description: string;
};

const mockSubjects: Subject[] = [
  {
    id: "1",
    coursecode: "CS101",
    name: "Introduction to Computer Science",
    department: "CS",
    description: "A foundational course introducing algorithms, programming, and computing systems.",
  },
  {
    id: "2",
    coursecode: "MATH203",
    name: "Linear Algebra",
    department: "Math",
    description: "Covers vectors, matrices, linear transformations, and their applications.",
  },
  {
    id: "3",
    coursecode: "SCI110",
    name: "General Physics",
    department: "Science",
    description: "An introductory physics course exploring motion, forces, energy, and waves.",
  },
];

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({ resource }: GetListParams): Promise<GetListResponse<TData>> => {
    if (resource !== "subjects") {
      return { data: [] as TData[], total: 0 };
    }

    return {
      data: mockSubjects as unknown as TData[],
      total: mockSubjects.length,
    };
  },

  getOne: async () => { throw new Error('This function is not present in mock data provider'); },
  create: async () => { throw new Error('This function is not present in mock data provider'); },
  update: async () => { throw new Error('This function is not present in mock data provider'); },
  deleteOne: async () => { throw new Error('This function is not present in mock data provider'); },

  getApiUrl: () => '',
  custom: async () => { throw new Error('This function is not present in mock data provider'); },
};
