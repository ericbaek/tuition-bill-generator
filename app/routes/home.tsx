import type { Route } from './+types/home';
import { AddStudent } from '../add/addStudent';
import GeneratePage from '~/components/layout/generatePage';
import useStore from 'app/database/students';
import { Link } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Students List' }];
}

export default function Home() {
  const students = useStore((state) => state.students);

  return (
    <GeneratePage title="Students" titleRight={<AddStudent />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(students).map((student) => (
          <Link to={`/student/${student.id}`} key={student.id}>
            <div className="p-4 border rounded-lg shadow-sm bg-white">
              <h3 className="text-lg font-semibold">{student.name}</h3>
              <p className="text-sm text-gray-500">ID: {student.id}</p>
            </div>
          </Link>
        ))}
      </div>
    </GeneratePage>
  );
}
