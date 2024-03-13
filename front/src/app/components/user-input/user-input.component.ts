import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OpenaiService } from '../../services/openai.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  inputText = '';
  outputText: any[] = [];
  

  constructor(private openai: OpenaiService) {}

  async handleKeyPress() {
    this.outputText.push({ role: 'user', content: this.inputText });
    this.inputText = '';
    
    try {
      const response = await this.openai.enviarConversacion(this.outputText);
      this.outputText.push({ role: 'assistant', content: response.response });
    } catch (error) {
      console.error('Error al enviar conversación al servidor:', error);
      this.outputText.push({ role: 'system', content: 'Error en la respuesta del servidor' });
    }
  }

  fileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.outputText.push({ role: 'user', content: file });
      // Aquí puedes realizar cualquier acción que desees con el archivo seleccionado
      console.log('Archivo seleccionado:', file.name);
      event.target.value = null;
    }
  }
}