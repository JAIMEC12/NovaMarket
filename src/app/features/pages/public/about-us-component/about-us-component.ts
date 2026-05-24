import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-us-component',
  imports: [MatIconModule],
  templateUrl: './about-us-component.html',
  styleUrl: './about-us-component.css',
})
export class AboutUsComponent {
  values = [
    { icon: 'handshake', title: 'Confianza', desc: 'Relaciones honestas con clientes y proveedores.', color: '#1976d2' },
    { icon: 'bolt', title: 'Agilidad', desc: 'Procesos rápidos y sin fricciones.', color: '#f57c00' },
    { icon: 'diversity_3', title: 'Inclusión', desc: 'Para todos, sin excepciones.', color: '#388e3c' },
    { icon: 'eco', title: 'Sostenibilidad', desc: 'Comprometidos con el planeta.', color: '#2e7d32' },
  ];
}
