import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { JuegoDetalleComponent } from './juego-detalle/juego-detalle.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'inicio', component: PrincipalComponent},
    { path: 'game/:id', component: JuegoDetalleComponent},
    { path: 'admin', component: AdminPanelComponent}

  ];