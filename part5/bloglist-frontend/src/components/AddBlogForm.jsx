import { useState } from "react"

const AddBlogForm = ({ title, author, url, onTitleChange, onAuthorChange, onUrlChange, handleCreateBlog }) => (
	<div>
	<h2>Create new blog</h2>
	<form onSubmit={handleCreateBlog}>
		<div>
			<label>
				title:
				<input
					type="text"
					value={title}
					onChange={onTitleChange}/>
			</label>
		</div>
		<div>
			<label>
				author:
				<input
					type="text"
					value={author}
					onChange={onAuthorChange}/>
			</label>
		</div>
		<div>
			<label>
				url:
				<input
					type="text"
					value={url}
					onChange={onUrlChange}/>
			</label>
		</div>
		<button type="submit">create</button>
	</form>
	</div>
)

export default AddBlogForm