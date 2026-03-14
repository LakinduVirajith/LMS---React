import type { Mentor } from '@/types';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';

interface TutorCardProps {
  mentor: Mentor;
  onClick?: (id: number) => void; // For Tutor page
  onEdit?: (mentor: Mentor) => void; // For Mentor page
  onDelete?: (mentor: Mentor) => void; // For Mentor page
}

export default function TutorCard({
  mentor,
  onClick,
  onEdit,
  onDelete,
}: TutorCardProps) {
  return (
    <div
      onClick={onClick ? () => onClick(mentor.id) : undefined}
      className={`cursor-pointer border rounded-xl shadow-md bg-white hover:shadow-lg transition flex flex-col overflow-hidden ${
        onClick ? 'hover:shadow-xl' : ''
      }`}
    >
      {mentor.profileImageUrl && (
        <div className="h-40 w-full overflow-hidden flex justify-center bg-gray-50">
          <img
            src={mentor.profileImageUrl}
            alt={`${mentor.firstName} ${mentor.lastName}`}
            className="h-full object-cover"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            {mentor.firstName} {mentor.lastName}
            {mentor.isCertified && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                Certified
              </span>
            )}
          </h2>

          <div className="text-sm text-gray-500 mt-1">{mentor.email}</div>
          {mentor.phoneNumber && (
            <div className="text-sm text-gray-500">{mentor.phoneNumber}</div>
          )}
          {mentor.title && (
            <div className="text-sm text-gray-500 mt-1">{mentor.title}</div>
          )}
          {mentor.totalEnrollments !== undefined && (
            <div className="text-sm text-gray-700 mt-2">
              Students Enrolled:{' '}
              <span className="font-medium">{mentor.totalEnrollments}</span>
            </div>
          )}
        </div>

        {/* Show Edit/Delete buttons only if handlers are passed */}
        {(onEdit || onDelete) && (
          <div className="flex gap-3 mt-4">
            {onEdit && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(mentor);
                }}
                variant="outline"
                className="flex-1 flex items-center justify-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Pencil size={16} /> Edit
              </Button>
            )}
            {onDelete && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(mentor);
                }}
                variant="outline"
                className="flex-1 flex items-center justify-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash size={16} /> Delete
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
