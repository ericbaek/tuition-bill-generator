import { Plus } from 'lucide-react';
import { useState } from 'react';
import ShortUniqueId from 'short-unique-id';

import { Button } from 'app/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'app/components/ui/dialog';
import { Input } from 'app/components/ui/input';
import { Label } from 'app/components/ui/label';
import useStore from 'app/database/students';

export function AddStudent() {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const addStudent = useStore((state) => state.addStudent);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === '') {
      alert('Name cannot be empty');
      return;
    }
    const { randomUUID } = new ShortUniqueId({ length: 10 });
    const newStudent = {
      id: randomUUID(),
      name,
      receipts: [],
    };

    addStudent(newStudent);
    setName('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full w-9 h-9">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a student</DialogTitle>
          <DialogDescription>Input necessary information</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddStudent} className="flex flex-col gap-5">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Update state on input change
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="submit" variant="default">
              Add Student
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
