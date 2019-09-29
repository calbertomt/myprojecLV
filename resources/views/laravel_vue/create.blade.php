<form action="POST" v-on:submit.prevent="createKeeps">
	<div class="modal fade" id="create">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span>&times;</span>
					</button>
					<h4>New Task</h4>
				</div>
				<div class="modal-body">
					<label for="keep">Add Task</label>
					<input type="text" name="keep" class="form-control" v-model="newKeep">
					<span v-for="error in errors" class="text-danger">@{{ error }}</span>
				</div>
				<div class="modal-footer">
					<input type="submit" class="btn btn-primary" value="Save">
				</div>
			</div>
		</div>
	</div>
</form>
