export interface Words {
  id: number | undefined;
  russian: string;
  german: string;
  other: boolean;
  adverb: boolean;
  verb: boolean;
  noun: boolean;
  adjective: boolean;
  pronoun: boolean;
  wordType: string | undefined | null;
}
