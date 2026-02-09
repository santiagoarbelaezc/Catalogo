import { Component } from '@angular/core';
import { PlaxtilineasComponent } from "../plaxtilineas/plaxtilineas.component";

import { EspumasplasticosComponent } from "../espumasplasticos/espumasplasticos.component";
import { DistricolComponent } from "../districol/districol.component";
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";

@Component({
  selector: 'app-catalogo-home',
  standalone: true,
  imports: [PlaxtilineasComponent, EspumasplasticosComponent, DistricolComponent, NavbarComponent],
  templateUrl: './catalogo-home.component.html',
  styleUrl: './catalogo-home.component.css'
})
export class CatalogoHomeComponent {
  // Datos de ejemplo para el banner
  
}
