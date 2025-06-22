
export type FeedbackEntry = {
  id: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  discount: number;
  discountCode: string;
  date: string; // ISO Date string
};

export function generateDiscount(): number {
  // Random integer between 5 and 10 (inclusive)
  return Math.floor(Math.random() * 6) + 5;
}

export function generateCode(): string {
  // 6-char code: uppercase letters and digits
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Store in localStorage (simulate backend)
export function saveFeedback(entry: FeedbackEntry) {
  const key = "feedback-entries";
  const current = JSON.parse(localStorage.getItem(key) || "[]");
  current.push(entry);
  localStorage.setItem(key, JSON.stringify(current));
}

export function getAllFeedback(): FeedbackEntry[] {
  return JSON.parse(localStorage.getItem("feedback-entries") || "[]");
}
