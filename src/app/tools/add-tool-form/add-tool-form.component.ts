import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToolService } from "../tool.service";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-tool-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-tool-form.component.html',
  styleUrl: './add-tool-form.component.css',
  providers: [ToolService]
})
export class AddToolFormComponent {
  @Output() toolAdded = new EventEmitter<boolean>();
  toolForm: FormGroup;

  constructor(private fb: FormBuilder, private toolService: ToolService, private router: Router) {
    this.toolForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      available: [true, Validators.required]
    });
  }

  onSubmit() {
    if (this.toolForm.valid) {
      this.toolService.addTool(this.toolForm.value).subscribe({
        next: (success) => {
          this.toolForm.reset();
          this.toolAdded.emit(success);
        },
        error: (error) => {
          console.error('Error al añadir la herramienta', error);
          if (error.message.includes('Usuario no logueado')) {
            this.router.navigate(['/login']);
          }
        }
      });
    }
  }

}
