import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'articles/:id',
        loadComponent: () =>
            import('./features/article-details/article-details.component').then(
                (m) => m.ArticleDetailsComponent
            ),
    },
    {
        path: 'popular',
        loadComponent: () =>
            import('./features/popular-news/popular-news.component').then(
                (m) => m.PopularNewsComponent
            ),
    },
];
