const LoginForm = ({ handleSubmit, username, password, onUsernameChange, onPasswordChange }) => (
  <div>
	  <h2>Login</h2>
    <form onSubmit={handleSubmit}>
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
			  				type="password"
			  				value={password}
			  				onChange={onPasswordChange} />
		  			</label>
		  	</div>
	  		<button type="submit">login</button>
	  	</form>
  	</div>
)

export default LoginForm