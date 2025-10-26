import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Post-processes raw speech recognition transcript for better grammar analysis and AI interaction
 */
export function formatTranscription(text: string): string {
  if (!text || text.trim().length === 0) {
    return "";
  }

  // Step 1: Trim and collapse repeated spaces
  let cleaned = text.trim().replace(/\s+/g, " ");

  // Step 2: Remove common filler words (case-insensitive)
  const fillerWords = /\b(um|uh|hmm|like)\b/gi;
  cleaned = cleaned.replace(fillerWords, " ");

  // Step 3: Remove duplicated tokens (e.g., "you you" -> "you")
  cleaned = cleaned.replace(/\b(\w+)\s+\1\b/gi, "$1");

  // Collapse spaces again after removals
  cleaned = cleaned.trim().replace(/\s+/g, " ");

  // If only filler words, return empty
  if (cleaned.length === 0) {
    return "";
  }

  // Step 4: Capitalize first alphabetical character
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  // Step 5: Add punctuation if missing
  // Check if already has terminal punctuation
  const hasTerminalPunctuation = /[.!?]$/.test(cleaned);
  
  if (!hasTerminalPunctuation) {
    // Question detection heuristic
    const interrogativeWords = /\b(who|what|when|where|why|how)\b/i;
    const auxiliaryAtStart = /^(is|are|was|were|do|does|did|can|could|should|would|will|have|has|had)\b/i;
    
    const isQuestion = interrogativeWords.test(cleaned) || auxiliaryAtStart.test(cleaned);
    
    cleaned += isQuestion ? "?" : ".";
  }

  return cleaned;
}
