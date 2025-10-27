import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Removes filler words and immediate duplicated words from transcript
 * Preserves all punctuation
 */
export function cleanFillerAndDupes(text: string): string {
  if (!text || text.trim().length === 0) {
    return "";
  }

  // Step 1: Trim and collapse repeated spaces
  let cleaned = text.trim().replace(/\s+/g, " ");

  // Step 2: Remove common filler words (case-insensitive)
  // Added: "you know", "er" to the list
  const fillerWords = /\b(um|uh|hmm|like|you know|er)\b/gi;
  cleaned = cleaned.replace(fillerWords, " ");

  // Step 3: Remove duplicated tokens (e.g., "you you" -> "you")
  cleaned = cleaned.replace(/\b(\w+)\s+\1\b/gi, "$1");

  // Collapse spaces again after removals
  cleaned = cleaned.trim().replace(/\s+/g, " ");

  return cleaned;
}

/**
 * Inserts natural commas for proper punctuation and readability
 * Preserves existing punctuation and capitalization
 */
export function insertNaturalCommas(text: string): string {
  if (!text || text.trim().length === 0) {
    return "";
  }

  let result = text;

  // Insert commas after introductory phrases at sentence start
  const introductoryPhrases = /\b(well|so|however|by the way|actually|in fact)\b(?!,)/gi;
  result = result.replace(introductoryPhrases, "$1,");

  // Insert commas after short response phrases
  const responsePhrases = /\b(thank you|of course|I think|I believe|I guess|I mean)\b(?!,)/gi;
  result = result.replace(responsePhrases, "$1,");

  // Insert commas before coordinating conjunctions joining clauses
  // Only if there are words on both sides (indicating independent clauses)
  const coordinatingConjunctions = /(\w+)\s+(and|but|or|yet|for|nor)\s+(\w+)/gi;
  result = result.replace(coordinatingConjunctions, (match, before, conj, after) => {
    // Avoid adding comma in short phrases (less than 4 words total)
    const wordCount = result.split(/\s+/).length;
    if (wordCount < 6) {
      return match;
    }
    return `${before}, ${conj} ${after}`;
  });

  // Clean up any double commas or comma-space issues
  result = result.replace(/,\s*,/g, ",").replace(/,\s+/g, ", ");

  return result;
}

/**
 * Post-processes raw speech recognition transcript for better grammar analysis and AI interaction
 */
export function formatTranscription(text: string): string {
  if (!text || text.trim().length === 0) {
    return "";
  }

  // Step 1: Clean fillers and duplicates
  let cleaned = cleanFillerAndDupes(text);

  // If only filler words, return empty
  if (cleaned.length === 0) {
    return "";
  }

  // Step 2: Insert natural commas
  cleaned = insertNaturalCommas(cleaned);

  // Step 3: Capitalize first alphabetical character
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  // Step 4: Add punctuation if missing
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
