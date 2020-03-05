import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Sort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Rotas } from '@enums';
import { take } from 'rxjs/operators';
import { Paginated } from 'sesa-sd-commons';
import { paginaListagemService } from './pagina-listagem.service';

@Component({
	selector: 'app-pagina',
	templateUrl: './pagina-listagem.component.html',
	styleUrls: ['./pagina-listagem.component.scss']
})
export class paginaListagemComponent implements OnInit {
	public formulario: FormGroup;
	public paginated = new Paginated<any>();

	constructor(
		public fb: FormBuilder,
		public service: paginaListagemService,
		public router: Router,
		public route: ActivatedRoute
	) {
		this.paginated.pageNumber = 0;
	}

	ngOnInit() {
		this.criarFormulario();
		const params = this.route.snapshot.queryParams;
		if (params.manterFiltro) {
			this.service
				.getEstadoDaBusca(this.router.url)
				.subscribe(formGroup => (this.formulario = formGroup));
		}
	}

	private criarFormulario() {
		this.formulario = this.fb.group({
			campo1: [null]
		});
	}

	public pesquisar(): void {
		this.paginated = new Paginated<any>();
		this.paginated.pageNumber = 0;

		this.pesquisarPorFiltro();
	}

	private pesquisarPorFiltro() {
		const filtro: any = this.formulario.value;
		this.service
			.getpaginaByFiltro(this.paginated, filtro)
			.pipe(take(1))
			.subscribe((paginated: Paginated<any>) => {
				this.paginated = paginated;
			});
	}

	public limpar(): void {
		this.formulario.reset();

		this.paginated = new Paginated<any>();
	}

	public excluir(pagina: any) {
		this.service.excluirpagina(pagina.id);
	}

	public editar(pagina: any) {
		this.service.setEstadoDaBusca(this.router.url, this.formulario);
		this.router.navigate([Rotas.PAGINA.formulario], {
			queryParams: {
				id: pagina.id
			},
			relativeTo: this.route.root
		});
	}

	public alterarPagina(pageNumber: number) {
		this.paginated.pageNumber = pageNumber;
		this.pesquisarPorFiltro();
	}

	public alterarOrdem(sort: Sort) {
		this.paginated.sort = sort;
		this.alterarPagina(0);
	}

	public navegarParaCadastro() {
		this.service.setEstadoDaBusca(this.router.url, this.formulario);
		this.router.navigate([Rotas.PAGINA.formulario]);
	}
}
