export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  language: string;
  cast?: string;
  director?: string;
  year?: string;
  rating?: number;
  coverUrl: string;
  videoUrl: string;
  downloadUrl: string;
  isUploaded?: boolean;
  size?: string;
  category?: string;
  uploadedAt: string;
  userRatings?: number[];
}
