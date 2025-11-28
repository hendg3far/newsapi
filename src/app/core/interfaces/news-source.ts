import { Article } from './article';

export interface NewsSource {
  status: string;
  sources: Article[];
}
