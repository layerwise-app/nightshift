import type { AskEntry } from '~/content/ask';

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9€\s-]/g, ' ');

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'do', 'does', 'you', 'your', 'we', 'our', 'is', 'are',
  'can', 'how', 'what', 'when', 'who', 'which', 'with', 'for', 'to', 'of',
  'in', 'on', 'it', 'i', 'my', 'me', 'us', 'and', 'or', 'be'
]);

export function tokens(query: string): string[] {
  return normalize(query)
    .split(/\s+/)
    .filter((t) => t.length > 0 && !STOP_WORDS.has(t));
}

/**
 * Ranks the questions against what someone typed. Every word must match the
 * question, its keywords, its topic, or its answer; question matches count
 * most. An empty query returns every question in its written order.
 */
export function searchAsk(
  query: string,
  entries: AskEntry[],
  answerOf: (entry: AskEntry) => string[]
): AskEntry[] {
  const words = tokens(query);
  if (words.length === 0) return entries;

  const scored = entries.map((entry, index) => {
    const question = normalize(entry.question);
    const keywords = entry.keywords.map(normalize);
    const topic = normalize(entry.topic);
    const answer = normalize(answerOf(entry).join(' '));
    let score = 0;
    for (const word of words) {
      let best = 0;
      const wordRe = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
      if (wordRe.test(question)) best = 6;
      else if (keywords.some((k) => k.startsWith(word) || wordRe.test(k))) best = 4;
      else if (topic.startsWith(word)) best = 3;
      else if (wordRe.test(answer)) best = 1;
      if (best === 0) return { entry, index, score: 0 };
      score += best;
    }
    return { entry, index, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((s) => s.entry);
}
