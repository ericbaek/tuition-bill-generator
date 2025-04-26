import type { Route } from './+types/student';
import GeneratePage from '~/components/layout/generatePage';
import useStore from 'app/database/students';
import { Link, useParams } from 'react-router';
import { AddReceipt } from '~/add/addReceipt';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Manage Receipts' }];
}

export default function StudentPage() {
  const { id } = useParams<{ id: string }>();
  const students = useStore((state) => state.students);
  const student = Object.values(students).find((student) => student.id === id);

  if (!student) {
    return (
      <GeneratePage title="Student Not Found">
        <p className="text-gray-500">
          The student with ID "{id}" does not exist.
        </p>
      </GeneratePage>
    );
  }
  const receipts = student.receipts;

  return (
    <GeneratePage
      title={`${student.name}'s Receipts`}
      titleRight={<AddReceipt studentId={student.id} />}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {receipts.length > 0 ? (
          receipts.map((receipt) => (
            <Link to={`/student/${id}/receipt/${receipt.id}`} key={receipt.id}>
              <div className="p-4 border rounded-lg shadow-sm bg-white">
                <h3 className="text-lg font-semibold">{receipt.name}</h3>
                <p className="text-sm text-gray-500">
                  Receipt ID: {receipt.id}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">
            No receipts available for this student.
          </p>
        )}
      </div>
    </GeneratePage>
  );
}
