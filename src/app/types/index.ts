export interface MovieData {
  Title: string;
  video_url: string;
  cover_img_url: string;
  rating: number;
}
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}