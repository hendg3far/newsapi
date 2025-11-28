import { Component } from '@angular/core';
import { Article } from '../../core/interfaces/article';
import { NewsService } from '../../core/services/news.service';
import { ArticleCardComponent } from "../components/article-card/article-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular-news',
  standalone: true,
  imports: [ArticleCardComponent, CommonModule],
  templateUrl: './popular-news.component.html',
  styleUrl: './popular-news.component.scss'
})
export class PopularNewsComponent {
  popularArticles: Article[] = [];


  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getPopularNews().subscribe({
      next: (data) => this.popularArticles = data,
      error: (err) => console.error(err)
    });
  }

}
