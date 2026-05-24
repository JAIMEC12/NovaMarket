import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact-us-component',
  imports: [MatIconModule],
  templateUrl: './contact-us-component.html',
  styleUrl: './contact-us-component.css',
})
export class ContactUsComponent {
  contactInfo = [
    {
      icon: 'location_on',
      label: 'Dirección',
      value: 'Av. Principal 123, Guayaquil, Ecuador',
      color: '#1976d2',
    },
    { icon: 'phone', label: 'Teléfono', value: '+593 99 123 4567', color: '#388e3c' },
    { icon: 'email', label: 'Correo', value: 'contacto@novamarket.com', color: '#f57c00' },
    {
      icon: 'schedule',
      label: 'Horario',
      value: 'Lunes a Viernes, 9:00 – 18:00',
      color: '#7b1fa2',
    },
  ];

  socialLinks = [
    { icon: 'facebook', label: 'Facebook', url: 'https://facebook.com' },
    { icon: 'photo_camera', label: 'Instagram', url: 'https://instagram.com' },
    { icon: 'alternate_email', label: 'Twitter / X', url: 'https://twitter.com' },
  ];
}
