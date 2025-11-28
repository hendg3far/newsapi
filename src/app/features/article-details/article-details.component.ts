import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../core/services/news.service';
import { DatePipe, NgIf } from '@angular/common';
import { Article } from '../../core/interfaces/article';

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
    const index = this.route.snapshot.paramMap.get('id');

    if (index !== null) {
      this.articleService.getTopHeadlines().subscribe({
        next: (articles) => {
          this.article = articles[+index];
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to load article';
        },
      });
    } else {
      this.errorMessage = 'Invalid article ID';
    }
  }
}
