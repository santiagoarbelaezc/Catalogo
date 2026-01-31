import { Routes } from '@angular/router';
import { CatalogoHomeComponent } from './pages/catalogo-home/catalogo-home.component';
import { DistricolComponent } from './pages/districol/districol.component';
import { EspumasplasticosComponent } from './pages/espumasplasticos/espumasplasticos.component';
import { PlaxtilineasComponent } from './pages/plaxtilineas/plaxtilineas.component';

export const routes: Routes = [
  { path: '', redirectTo: '/catalogo-home', pathMatch: 'full' },
  { path: 'catalogo-home', component: CatalogoHomeComponent },
  { path: 'districol', component: DistricolComponent },
  { path: 'espumasplasticos', component: EspumasplasticosComponent },
  { path: 'plaxtilineas', component: PlaxtilineasComponent }
];
