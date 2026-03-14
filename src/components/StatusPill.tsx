import { cn } from '@/lib/utils';

interface StatusPillProps {
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED';
}

export default function StatusPill({ status }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        status === 'PENDING' && 'bg-yellow-100 text-yellow-800',
        status === 'CONFIRMED' && 'bg-blue-100 text-blue-800',
        status === 'COMPLETED' && 'bg-green-100 text-green-800',
      )}
    >
      {status}
    </span>
  );
}
