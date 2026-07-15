export type TestimonialStatus = "draft" | "published";

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  status: TestimonialStatus;
  display_order: number;
  created_at: string;
  updated_at: string;
};
