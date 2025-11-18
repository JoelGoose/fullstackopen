const LoginForm = ({ handleLogin, username, password, onUsernameChange, onPasswordChange }) => (
	<><h2>Login</h2><form onSubmit={handleLogin}>
		<div>
			<label>
				username
				<input
					type="text"
					value={username}
					onChange={onUsernameChange} />
			</label>
		</div>
		<div>
			<label>
				password
				<input
					type="text"
					value={password}
					onChange={onPasswordChange} />
			</label>
		</div>
		<button type="submit">login</button>
	</form></>
)

export default LoginForm