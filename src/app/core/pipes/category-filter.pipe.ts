import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces/article';

@Pipe({
  name: 'categoryFilter',
  standalone: true
})
export class CategoryFilterPipe implements PipeTransform {
  transform(articles: Article[], category: string): Article[] {
    if (!articles || !category) return articles;
    return articles.filter(a => a.category === category);
  }
}
