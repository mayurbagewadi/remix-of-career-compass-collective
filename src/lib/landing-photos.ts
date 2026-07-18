export type LandingPhotoStatus = "draft" | "published";

export type LandingPhoto = {
  id: string;
  image_url: string;
  storage_path: string;
  alt_text: string | null;
  status: LandingPhotoStatus;
  display_order: number;
  created_at: string;
  updated_at: string;
};
