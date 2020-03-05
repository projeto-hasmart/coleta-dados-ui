import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Rotas } from '@enums';
import { SdMensageriaService } from 'sesa-sd-commons';
import { paginaFormularioService } from './pagina-formulario.service';

@Component({
	selector: 'app-pagina-formulario',
	templateUrl: './pagina-formulario.component.html',
	styleUrls: ['./pagina-formulario.component.scss']
})
export class paginaFormularioComponent implements OnInit, AfterViewInit {
	public ehEdicao = false;

	public formulario: FormGroup;
	private pagina: any;

	constructor(
		private formBuilder: FormBuilder,
		private mensageriaService: SdMensageriaService,
		private service: paginaFormularioService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.criarFormulario();
	}

	ngAfterViewInit(): void {
		this.pegarDadospaginaNaRota();

		if (this.pagina) {
			this.ehEdicao = true;
		}
	}

	private pegarDadospaginaNaRota(): void {
		const data: Data = this.route.snapshot.data;

		if (data.pagina) {
			this.pagina = data.pagina;
			this.preencherFormulario(this.pagina);
		}
	}

	private criarFormulario(): void {
		this.formulario = this.formBuilder.group({
			campo1: [null]
		});
	}

	public clickCancelar(): void {
		this.router.navigate([Rotas.PAGINA.listagem], {
			queryParams: { manterFiltro: true }
		});
	}

	public clickSalvar(): void {
		this.service
			.salvarDadospagina(this.formulario.value)
			.subscribe((paginaSalvo: any) => {
				if (paginaSalvo) {
					this.router.navigate([Rotas.PAGINA.listagem], {
						queryParams: { manterFiltro: true }
					});
					this.mensageriaService.sucesso('Registro salvo', 'Sucesso');
				}
			});
	}

	public mostrarError(formControlName: string) {
		const abstractControl: AbstractControl = this.formulario.get(
			formControlName
		);
		if (abstractControl.hasError('error')) {
			return abstractControl.errors.error;
		}
	}

	private preencherFormulario(pagina: any): void {
		this.formulario.patchValue(pagina);
	}
}
