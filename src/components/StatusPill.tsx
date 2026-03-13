import { cn } from '@/lib/utils';

interface StatusPillProps {
  status: 'PENDING' | 'ACCEPTED' | 'COMPLETED' | 'CANCELLED';
}

export default function StatusPill({ status }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        status === 'PENDING' && 'bg-yellow-100 text-yellow-800',
        status === 'ACCEPTED' && 'bg-blue-100 text-blue-800',
        status === 'COMPLETED' && 'bg-green-100 text-green-800',
        status === 'CANCELLED' && 'bg-red-100 text-red-800',
      )}
    >
      {status}
    </span>
  );
}
