import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()

	const navigate = useNavigate()

	// function logout2(){
	// 	console.log('logout')
	// 	//borrrar el token
	// 	localStorage.removeItem('token')
	// 	//pasar auth a false
	// 	dispatch({ type: "set_auth", payload: false })  
	// 	//redirecciona al home
	// 	navigate("/")
	// }

	function logout(){
		console.log('logout')
		//borrrar el token
		localStorage.removeItem('token')
		//pasar auth a false
		dispatch({ type: "set_auth", payload: false })  
		
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{/*<Link to="/demo">
						{store.auth ? <button onClick={logout} className="btn btn-primary">Logout2</button> : null}
						
					</Link>*/}

					{store.auth ?
					<Link to="/">
						<button onClick={logout} className="btn btn-primary">Logout</button>
					</Link>
					: null}
				</div>
			</div>
		</nav>
	);
};