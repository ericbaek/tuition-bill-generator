import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Student = {
  id: string;
  name: string;
  receipts: Receipt[];
};

type Receipt = {
  id: string;
  name: string;
};

type StudentStore = {
  students: Record<string, Student>;
  addStudent: (student: Student) => void;
  removeStudent: (id: string) => void;
  updateStudent: (id: string, updatedInfo: Partial<Student>) => void;
  getStudent: (id: string) => Student | undefined;
  addReceipt: (studentId: string, receipt: Receipt) => void;
  removeReceipt: (studentId: string, receiptId: string) => void;
  updateReceipt: (
    studentId: string,
    receiptId: string,
    updatedInfo: Partial<Receipt>
  ) => void;
  getReceipts: (studentId: string) => Receipt[] | undefined;
};

const useStore = create(
  persist<StudentStore>(
    (set, get) => ({
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
        if (!id) return undefined;
        const state = get();
        return state.students[id];
      },

      addReceipt: (studentId, receipt) =>
        set((state) => {
          const student = state.students[studentId];
          if (!student) return state;

          return {
            students: {
              ...state.students,
              [studentId]: {
                ...student,
                receipts: [...student.receipts, receipt],
              },
            },
          };
        }),

      removeReceipt: (studentId, receiptId) =>
        set((state) => {
          const student = state.students[studentId];
          if (!student) return state;

          return {
            students: {
              ...state.students,
              [studentId]: {
                ...student,
                receipts: student.receipts.filter(
                  (receipt) => receipt.id !== receiptId
                ),
              },
            },
          };
        }),

      updateReceipt: (studentId, receiptId, updatedInfo) =>
        set((state) => {
          const student = state.students[studentId];
          if (!student) return state;

          return {
            students: {
              ...state.students,
              [studentId]: {
                ...student,
                receipts: student.receipts.map((receipt) =>
                  receipt.id === receiptId
                    ? { ...receipt, ...updatedInfo }
                    : receipt
                ),
              },
            },
          };
        }),

      getReceipts: (studentId) => {
        if (!studentId) return [];
        const student = get().students[studentId];
        return student ? student.receipts : undefined;
      },
    }),
    {
      name: 'student-storage',
    }
  )
);

export default useStore;
