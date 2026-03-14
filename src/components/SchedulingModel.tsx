import { useState } from 'react';
import { Calendar } from './ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { useNavigate } from 'react-router';
import type { Mentor } from '@/types';

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor;
}

const TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
];

export function SchedulingModal({
  isOpen,
  onClose,
  mentor,
}: SchedulingModalProps) {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const navigate = useNavigate();

  const mentorName = `${mentor.firstName} ${mentor.lastName}`;
  const subject = mentor.subjects[0];

  const handleSchedule = () => {
    if (date && selectedTime && subject) {
      const sessionDateTime = new Date(date);
      const [hours, minutes] = selectedTime.split(':');
      sessionDateTime.setHours(
        Number.parseInt(hours),
        Number.parseInt(minutes),
      );

      const sessionId = `${mentor.id}-${Date.now()}`;
      const searchParams = new URLSearchParams({
        date: sessionDateTime.toISOString(),
        courseTitle: subject?.subjectName ?? '',
        mentorName: mentorName,
        mentorId: mentor.mentorId,
        mentorImg: mentor.profileImageUrl ?? '',
        subjectId: String(subject?.id ?? ''),
      });
      navigate(`/payment/${sessionId}?${searchParams.toString()}`);
    }
  };

  const isPastTime = (time: string) => {
    if (!date) return false;

    const now = new Date();
    const selected = new Date(date);

    const [hours, minutes] = time.split(':');
    selected.setHours(Number(hours), Number(minutes), 0);

    return selected < now;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-center space-y-0">
          <DialogTitle>Schedule this session</DialogTitle>
          <DialogDescription className="sr-only">
            Pick a date and time for your mentoring session with {mentorName}.
          </DialogDescription>
        </DialogHeader>
        <div className="mb-4">
          <p className="text-sm text-gray-500">Mentor</p>
          <p className="font-medium">{mentorName}</p>

          <p className="text-sm text-gray-500 mt-2">Subject</p>
          <p className="font-medium">{subject?.subjectName}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Choose a date</h4>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </div>
          <div>
            <h4 className="font-medium mb-2">Choose a time</h4>
            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? 'default' : 'outline'}
                  className="w-full"
                  disabled={isPastTime(time)}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSchedule}
            disabled={!date || !selectedTime || !subject}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
