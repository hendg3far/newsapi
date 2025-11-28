import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Article } from '../interfaces/article';
import { ArticleSource } from '../interfaces/article-source';
import { NewsSource } from '../interfaces/news-source';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;
  private country = 'us';

  constructor(private http: HttpClient) { }

  private buildParams(extraParams: Record<string, any> = {}): HttpParams {
    let params = new HttpParams()
      .set('country', this.country)
      .set('apiKey', this.apiKey);

    Object.entries(extraParams).forEach(([key, value]) => {
      params = params.set(key, value);
    });

    return params;
  }

  getTopHeadlines(): Observable<any[]> {
    return this.http
      .get<{ status: string; totalResults: number; articles: Article[] }>(
        `${this.apiUrl}/top-headlines`,
        { params: this.buildParams({}) }
      )
      .pipe(map(res => res.articles));
  }

  getAllSources(): Observable<Article[]> {
    return this.http
      .get<NewsSource>(`${this.apiUrl}/sources`, { params: this.buildParams({}) })
      .pipe(map((res) => res.sources));
  }

  getCategories(): Observable<any[]> {
    return this.http
      .get<NewsSource>(`${this.apiUrl}/sources`, { params: this.buildParams({}) })
      .pipe(
        map((res) => {
          const categories = res.sources.map((source) => source.category);
          return [...new Set(categories)];
        })
      );
  }

  getNewsByCategory(category: string): Observable<Article[]> {
    return this.http.get<{ articles: Article[] }>(`${this.apiUrl}/top-headlines`, {
      params: this.buildParams({ category })
    }).pipe(
      map(res => res.articles.map(a => ({ ...a, category })))
    );
  }

  getPopularNews(params: { query?: string; from?: string; to?: string } = {}): Observable<Article[]> {
    // Set default values if not provided
    const query = params.query || 'apple';
    const from = params.from || new Date().toISOString().split('T')[0];
    const to = params.to || new Date().toISOString().split('T')[0];

    let httpParams = new HttpParams()
      .set('q', query)
      .set('from', from)
      .set('to', to)
      .set('sortBy', 'popularity')
      .set('apiKey', this.apiKey);

    return this.http
      .get<{ articles: Article[] }>(`${this.apiUrl}/everything`, { params: httpParams })
      .pipe(map(res => res.articles));
  }

}
