import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Users = () => {
	const users = useSelector((state) => state.users)
	const byAmount = (a, b) => b.blogs.length - a.blogs.length;
	console.log(users)
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
						<td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
						<td>{user.blogs.length}</td>
					</tr>
				))}
			</tbody>
		</table>
		</>
	)
}

export default Users