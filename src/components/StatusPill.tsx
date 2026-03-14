import { cn } from '@/lib/utils';

interface StatusPillProps {
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'SCHEDULED' | 'CANCELLED';
  type: 'payment' | 'session';
}

export default function StatusPill({ status, type }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        // PAYMENT STATUS COLORS
        type === 'payment' &&
          status === 'PENDING' &&
          'bg-yellow-100 text-yellow-800',

        type === 'payment' &&
          status === 'CONFIRMED' &&
          'bg-blue-100 text-blue-800',

        type === 'payment' &&
          status === 'COMPLETED' &&
          'bg-green-100 text-green-800',

        // SESSION STATUS COLORS
        type === 'session' &&
          status === 'PENDING' &&
          'bg-orange-100 text-orange-800',

        type === 'session' &&
          status === 'SCHEDULED' &&
          'bg-indigo-100 text-indigo-800',

        type === 'session' &&
          status === 'COMPLETED' &&
          'bg-emerald-100 text-emerald-800',

        type === 'session' &&
          status === 'CANCELLED' &&
          'bg-red-100 text-red-800',
      )}
    >
      {status}
    </span>
  );
}
