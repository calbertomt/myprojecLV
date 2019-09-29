@extends('app')

@section('content')
	<div id="crud" class="row">
		<div class="col-xs-12">
			<h1 class="page-header">CRUD Laravel & VUE</h1>
		</div>
		<div class="col-sm-7">
			<a href="#" class="href btn btn-primary pull-right" data-toggle="modal" data-target="#create">New Task</a>
			<table class="table table-hover table-striped">
				<thead>
					<tr>
						<th>ID</th>
						<th>Task</th>
						<th>&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="keep in keeps">
						<td width="10px">
							@{{ keep.id }}
						</td>
						<td>
							@{{ keep.keep }}
						</td>
						<td width="10px">
							<a href="#" class="href btn btn-warning btn-sm" v-on:click.prevent="editKeeps(keep)">Edit</a>
						</td>
						<td width="10px">
							<a href="#" class="href btn btn-danger btn-sm" v-on:click.prevent="deleteKeeps(keep)">Delete</a>
						</td>
					</tr>
				</tbody>
			</table>

			<nav>
				<ul class="pagination">
					<li v-if="pagination.current_page > 1">
						<a href="#" @click.prevent="changesPage(pagination.current_page - 1)">
							<span>Prev</span>
						</a>	
					</li>
					<li v-for="page in pageNumber" v-bind:class="[page == isActived ? 'active' : '']">
						<a href="#" @click.prevent="changesPage(page)">
							@{{ page }}
						</a>	
					</li>
					<li v-if="pagination.current_page < pagination.last_page">
						<a href="#" @click.prevent="changesPage(pagination.current_page + 1)">
							<span>Next</span>
						</a>	
					</li>
				</ul>
			</nav>
			@include('laravel_vue/create')
			@include('laravel_vue/edit')
		</div>
		<div class="col-sm-5">
			<pre>
				@{{ $data }}
			</pre>
		</div>
	</div>
@endsection