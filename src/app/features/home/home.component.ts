import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../core/interfaces/article';
import { NewsService } from '../../core/services/news.service';
import { ArticleCardComponent } from "../components/article-card/article-card.component";
import { CategoryFilterPipe } from '../../core/pipes/category-filter.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent, CategoryFilterPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  topHeadlines: Article[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  articlesByCategory: { [key: string]: Article[] } = {};




  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadTopHeadlines();
    this.loadCategories();

  }

  loadTopHeadlines() {
    this.newsService.getTopHeadlines().subscribe({
      next: (result: Article[]) => {
        this.topHeadlines = result.slice(0, 5);
      },
      error: (err) => console.error(err)
    });
  }

  loadCategories() {
    this.newsService.getCategories().subscribe({
      next: (result: string[]) => {
        this.categories = result;
        if (result.length > 0) {
          this.selectedCategory = result[0];
          this.loadArticlesForCategories()
        }
      },
      error: (err) => console.error(err)
    });
  }

  setActiveCategory(cat: string) {
    this.selectedCategory = cat;
  }

  loadArticlesForCategories() {
    this.categories.forEach(cat => {
      this.newsService.getNewsByCategory(cat).subscribe((res: any) => {
        this.articlesByCategory[cat] = res.map((a: Article) => ({
          ...a,
          category: cat
        }));
      });
    });
  }
}
