import { ArticleSource } from "./article-source";

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
    category?: string;
}
