import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Article } from '../interfaces/article';
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


  getArticleByUrl(url: string): Observable<Article> {
    return this.getCategories().pipe(
      switchMap(categories => {
        const categoryObservables = categories.map(cat => this.getNewsByCategory(cat));

        return forkJoin({
          top: this.getTopHeadlines(),
          cats: forkJoin(categoryObservables)
        });
      }),
      map(({ top, cats }) => {
        const allArticles = [...top, ...cats.flat()];
        const found = allArticles.find(a => a.url === url);
        if (!found) throw new Error('Article not found');
        return found;
      })
    );
  }

}
