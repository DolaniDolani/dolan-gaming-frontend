import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'games', pathMatch: 'full' },
    { path: 'games', 
        loadChildren: () => 
            import('./features/games/games.routes').then(m => m.routes)},
    { path: 'purchases',
        loadChildren: () =>
            import('./features/purchases/purchases.routes').then(m => m.routes)},
];
