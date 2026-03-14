import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { subjectSchema } from '@/validations/subjectSchema';
import { getMentors, createSubject } from '@/lib/api';
import type { Mentor, SubjectCreateRequest } from '@/types';
import { useAuth } from '@clerk/react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';

export default function CreateSubjectPage() {
  const { getToken } = useAuth();
  const [mentors, setMentors] = useState<Mentor[]>([]);

  const form = useForm<SubjectCreateRequest>({
    resolver: zodResolver(subjectSchema) as any,
    defaultValues: {
      subjectName: '',
      description: '',
      courseImageUrl: '',
      mentorId: 0,
    },
  });

  // LOAD MENTORS
  useEffect(() => {
    getMentors()
      .then((res) => setMentors(res.content))
      .catch(() => toast.error('Failed to load mentors'));
  }, []);

  const onSubmit = async (values: SubjectCreateRequest) => {
    try {
      const token = await getToken({ template: 'lms-auth' });
      if (!token) throw new Error('Unauthorized');

      await createSubject(token, values);
      toast.success('Subject created successfully');
      form.reset();
    } catch {
      toast.error('Failed to create subject');
    }
  };

  return (
    <div className="p-10 flex justify-center">
      <div className="w-full max-w-xl bg-white border rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold mb-6">Create Subject</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* SUBJECT NAME */}
            <FormField
              control={form.control}
              name="subjectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Java Programming" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DESCRIPTION */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Course description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* IMAGE URL */}
            <FormField
              control={form.control}
              name="courseImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://image.com/course.webp"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* MENTOR SELECT */}
            <FormField
              control={form.control}
              name="mentorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Mentor</FormLabel>

                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Mentor" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {mentors.map((mentor) => (
                        <SelectItem
                          key={mentor.mentorId}
                          value={String(mentor.mentorId)}
                        >
                          <span className="text-xs text-slate-400 ml-2">
                            #{mentor.mentorId}
                          </span>
                          <span>
                            {mentor.firstName} {mentor.lastName}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Creating...' : 'Create Subject'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
