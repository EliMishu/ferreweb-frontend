import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule, ThemePalette } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DetalleTransferenciaRequest } from '../../models/detalle-transferencia-req.model';
import { OrdenCompraService } from '../../services/orden-compra.service';
import { fechaHoyOMenorValidator, fileValidator } from '../../validations/validations';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { getImageTypes } from '../../constants/image.constants';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-pago-compra',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMatFileInputModule
  ],
  templateUrl: './pago-compra.component.html',
  styleUrl: './pago-compra.component.css'
})
export class PagoCompraComponent implements OnInit {
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  transferenciaForm!: FormGroup;
  isSubmitting = false;
  idOrdenCompra!: number;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private ordenCompraService: OrdenCompraService
  ) {}

  ngOnInit(): void {
    this.idOrdenCompra = Number(this.route.snapshot.paramMap.get('idCompra'));

    this.transferenciaForm = this.fb.group({
      entidadBancaria: ['', Validators.required],
      fechaTransferencia: [
        '',
        [Validators.required, fechaHoyOMenorValidator()]
      ],
      montoTransferido: [
        '',
        [Validators.required, Validators.min(0.01)]
      ],
      numeroOperacion: [
        '',
        [Validators.required, Validators.maxLength(20)]
      ],
      archivo: [
        '',
        [Validators.required, fileValidator([
          ...getImageTypes(),
          'application/pdf'
        ])]
      ]
    });
  }

  registrarTransferencia(): void {
    if (this.transferenciaForm.valid) {
      this.isSubmitting = true;
      this.transferenciaForm.disable();
      const detalleTransferencia: DetalleTransferenciaRequest =
        this.transferenciaForm.value;

        const archivo: File = this.transferenciaForm.value.archivo;

        this.ordenCompraService.pagarOrdenCompra(this.idOrdenCompra, detalleTransferencia, archivo).subscribe({
          next: () => this.router.navigate(['/compras']),
          error: (err) => {
            this.alertService.showError(err.error.message);
            this.transferenciaForm.enable();
          },
          complete: () => {
            this.alertService.showSuccess('Detalles de transferencia enviados con éxito.');
            this.transferenciaForm.enable();
          }
        });

      this.isSubmitting = false;
    }
  }

  cancelarRegistro(): void {
    this.router.navigate(['/compras'])
  }

  getFileTypes(): string {
    return getImageTypes().join(', ').concat(', application/pdf');
  }

}