export type FaqStatus = "draft" | "published";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  status: FaqStatus;
  display_order: number;
  created_at: string;
  updated_at: string;
};
