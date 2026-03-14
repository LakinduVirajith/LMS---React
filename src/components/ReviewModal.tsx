import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import type { Review } from '@/types';

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId: number | null;
  onSubmit: (data: Review) => void;
}

export default function ReviewModal({
  open,
  onOpenChange,
  sessionId,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    if (!sessionId) return;

    onSubmit({
      sessionId,
      rating,
      review,
    });

    setReview('');
    setRating(5);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* STAR RATING */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer transition ${
                  star <= rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          {/* REVIEW TEXT */}
          <Textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          {/* SUBMIT */}
          <Button className="w-full" onClick={handleSubmit}>
            Submit Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
