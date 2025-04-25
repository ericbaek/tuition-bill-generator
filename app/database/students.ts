import { create } from 'zustand';

type Student = {
  id: string;
  name: string;
};

type StudentStore = {
  students: Record<string, Student>;
  addStudent: (student: Student) => void;
  removeStudent: (id: string) => void;
  updateStudent: (id: string, updatedInfo: Partial<Student>) => void;
  getStudent: (id: string) => Student | undefined;
};

const useStore = create<StudentStore>((set, get) => ({
  students: {},

  addStudent: (student) =>
    set((state) => ({
      students: { ...state.students, [student.id]: student },
    })),

  removeStudent: (id) =>
    set((state) => {
      const { [id]: _, ...remainingStudents } = state.students;
      return { students: remainingStudents };
    }),

  updateStudent: (id, updatedInfo) =>
    set((state) => ({
      students: {
        ...state.students,
        [id]: { ...state.students[id], ...updatedInfo },
      },
    })),

  getStudent: (id) => {
    const state = get();
    return state.students[id];
  },
}));

export default useStore;
