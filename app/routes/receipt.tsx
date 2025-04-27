import type { Route } from './+types/student';
import GeneratePage from '~/components/layout/generatePage';
import useStore from 'app/database/students';
import { useParams } from 'react-router';
import { AddReceipt } from '~/add/addReceipt';
import { DatePickerForm } from '~/form/receiptForm';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Manage Receipts' }];
}

export default function RecieptPage() {
  const { sid, rid } = useParams<{ sid: string; rid: string }>();
  const students = useStore((state) => state.students);
  const student = Object.values(students).find((student) => student.id === sid);

  if (!student) {
    return (
      <GeneratePage title="Student Not Found">
        <p className="text-gray-500">
          The student with ID "{sid}" does not exist.
        </p>
      </GeneratePage>
    );
  }
  const receipts = student.receipts;
  const receipt = receipts.find((receipt) => receipt.id == rid);

  if (!receipt) {
    return (
      <GeneratePage title="Receipt Info Not Found">
        <p className="text-gray-500">
          The receipt with ID "{sid}" does not exist.
        </p>
      </GeneratePage>
    );
  }

  return (
    <GeneratePage
      title={`${receipt.name}`}
      subTitle={`${student.name}`}
      titleRight={<AddReceipt studentId={student.id} />}
    >
      <DatePickerForm />
    </GeneratePage>
  );
}
