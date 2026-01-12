import userService from '../services/users'

const users = await userService.getAll()

const byAmount = (a, b) => b.blogs.length - a.blogs.length;

// TODO: CREATE DIFFERENT VIEWS
const Users = () => {
	return (
		<>
		<h2>Users</h2>
		<table>
			<thead>
				<tr>
					<td></td>
					<td><b>blogs created</b></td>
				</tr>
			</thead>
			<tbody>
				{users.toSorted(byAmount).map(user => (
					<tr key={user.id}>
						<td>{user.username}</td>
						<td>{user.blogs.length}</td>
					</tr>
				))}
			</tbody>
		</table>
		</>
	)
}

export default Users