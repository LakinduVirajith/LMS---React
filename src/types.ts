export interface User {
  id: string;
  name: string;
  email: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

/*------------------------
    MENTOR INTERFACES
-------------------------*/
export interface Mentor {
  id: number;
  mentorId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  title: string;
  profession: string;
  company: string;
  experienceYears: number;
  bio: string;
  profileImageUrl?: string;
  positiveReviews?: number;
  totalEnrollments?: number;
  isCertified: boolean;
  startYear: number;
  subjects: Subject[];
}

/*------------------------
    SUBJECT INTERFACES
-------------------------*/
export interface Subject {
  id: number;
  subjectName: string;
  description: string | null;
  courseImageUrl: string | null;
  mentorId: number;
  mentorName: string;
}

export interface SubjectCreateRequest {
  mentorId: number;
  subjectName: string;
  description?: string;
  courseImageUrl?: string;
}

/*------------------------
    SESSION INTERFACES
-------------------------*/
export interface Session {
  id: number;
  studentName: string;
  mentorName: string;
  mentorProfileImageUrl?: string | null;
  subjectName: string;
  sessionAt: string;
  durationMinutes: number;
  paymentStatus: 'PENDING' | 'CONFIRMED' | 'COMPLETED';
  sessionStatus: 'PENDING' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  meetingLink?: string | null;
}
