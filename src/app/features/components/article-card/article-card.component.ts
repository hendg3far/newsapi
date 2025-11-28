import { Component, Input } from '@angular/core';
import { Article } from '../../../core/interfaces/article';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { ClampTextDirective } from "../../../core/directives/clamp-text.directive";

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, RouterLink, ClampTextDirective],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() article!: Article;
  @Input() layout: 'layout-1' | 'layout-2' = 'layout-2';
  @Input() index!: number;


  onImageError(event: any) {
    event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
  }
}
