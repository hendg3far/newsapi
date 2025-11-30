import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../core/services/news.service';
import { DatePipe, NgIf } from '@angular/common';
import { Article } from '../../core/interfaces/article';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [NgIf, DatePipe],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.scss'
})
export class ArticleDetailsComponent {
  article!: Article;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: NewsService
  ) { }

  ngOnInit(): void {
    // متابعة أي تغير في params
    this.route.paramMap.pipe(
      switchMap(params => {
        const encodedUrl = params.get('id');
        if (!encodedUrl) {
          this.errorMessage = 'Invalid article ID';
          return of(null);
        }
        const articleUrl = decodeURIComponent(encodedUrl);

        // البحث في كل المقالات (top headlines + كل categories)
        return this.articleService.getArticleByUrl(articleUrl);
      })
    ).subscribe({
      next: article => {
        if (article) this.article = article;
      },
      error: () => this.errorMessage = 'Article not found'
    });
  }

}
