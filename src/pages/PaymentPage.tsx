import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { enrollInSession } from '@/lib/api';
import { useAuth } from '@clerk/react';
import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { toast } from 'sonner';

export default function PaymentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { sessionId } = useParams();
  const { getToken } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const date = searchParams.get('date');
  const courseTitle = searchParams.get('courseTitle');
  const mentorId = searchParams.get('mentorId');
  const mentorName = searchParams.get('mentorName');
  const subjectId = searchParams.get('subjectId');
  const sessionDate = date ? new Date(date).toLocaleDateString() : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!file || !date || !mentorId || !subjectId || !sessionId) return;

    setIsUploading(true);

    try {
      const token = await getToken({ template: 'lms-auth' });
      if (!token) throw new Error('Not authenticated');

      await enrollInSession(token, {
        mentorId: Number(mentorId),
        subjectId: Number(subjectId),
        sessionAt: date,
        durationMinutes: 60,
      });

      toast.info('Payment Confirmed', {
        description:
          'Your bank slip has been uploaded and verified. Session scheduled successfully.',
        position: 'bottom-right',
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      toast.error('Error occurred', {
        description:
          'There was a problem scheduling your session. Please try again.',
        position: 'bottom-right',
      });
      setIsUploading(false);
    }
  };

  return (
    <div className="container max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Upload Bank Transfer Slip</CardTitle>
        </CardHeader>
        <form onSubmit={handleUpload}>
          <CardContent className="space-y-4">
            {mentorName && (
              <div className="text-sm font-medium">
                Session with: {mentorName}
              </div>
            )}
            {courseTitle && (
              <div className="text-sm text-muted-foreground">{courseTitle}</div>
            )}
            {sessionDate && (
              <div className="text-sm">
                <strong>Session Date:</strong> {sessionDate}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="slip">Bank Transfer Slip</Label>
              <Input
                id="slip"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Please upload a clear image of your bank transfer slip to confirm
              your payment.
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={!file || isUploading}
            >
              {isUploading ? 'Verifying...' : 'Confirm Payment'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
