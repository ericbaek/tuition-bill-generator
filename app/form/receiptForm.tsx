'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from 'app/lib/utils';
import { Button } from 'app/components/ui/button';
import { Calendar } from 'app/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'app/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'app/components/ui/popover';

// Update the schema to handle multiple dates
const FormSchema = z.object({
  selectedDates: z
    .array(z.date())
    .nonempty('At least one date must be selected.'),
});

export function DatePickerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selectedDates: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="selectedDates"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select Dates</FormLabel>
              <Calendar
                mode="multiple" // Enable multiple date selection
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
              />
              <FormDescription>
                Select one or more dates for your schedule.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
