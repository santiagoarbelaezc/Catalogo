import { Routes } from '@angular/router';
import { CatalogoHomeComponent } from './pages/catalogo-home/catalogo-home.component';
import { DistricolComponent } from './pages/districol/districol.component';
import { EspumasplasticosComponent } from './pages/espumasplasticos/espumasplasticos.component';
import { PlaxtilineasComponent } from './pages/plaxtilineas/plaxtilineas.component';
import { CatalogoPrintComponent } from './pages/catalogo-print/catalogo-print.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardInicioComponent } from './components/dashboard/dashboard-inicio/dashboard-inicio.component';
import { DashboardProductComponent } from './components/dashboard/dashboard-product/dashboard-product.component';
import { DashboardCategoriesComponent } from './components/dashboard/dashboard-categories/dashboard-categories.component';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

export const routes: Routes = [
  { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardInicioComponent, canActivate: [authGuard] },
  { path: 'dashboard/productos', component: DashboardProductComponent, canActivate: [authGuard] },
  { path: 'dashboard/categorias', component: DashboardCategoriesComponent, canActivate: [authGuard] },
  { path: 'catalogo', component: CatalogoHomeComponent },
  { path: 'catalogo-home', redirectTo: '/catalogo', pathMatch: 'full' },
  { path: 'districol', component: DistricolComponent },
  { path: 'espumasplasticos', component: EspumasplasticosComponent },
  { path: 'plaxtilineas', component: PlaxtilineasComponent },
  { path: 'catalogo-print', component: CatalogoPrintComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: NotFoundComponent }
];
