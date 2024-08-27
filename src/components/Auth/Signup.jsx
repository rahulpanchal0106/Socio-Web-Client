import { useState } from "react";
import fetchData from "../../utils/fetch_data";
import url from "../../utils/url";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../Navbar/Nav";

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchData(url + "/signup", {"username":username,"password":password}, 'POST');
      navigate('/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-yellow-200 dark:bg-gray-600 dark:text-white flex flex-col w-full h-screen justify-center items-center">
      <Nav/>
      <form className="w-1/2 h-1/2 px-10 py-5 flex flex-col justify-center items-center" onSubmit={handleSubmit}>
        <h1 className="mb-2 px-4 py-2 text-4xl">Sign Up for <i className="text-shadow">Socio</i></h1>
        <input
          type="text"
          name="username"
          className="input mb-2 px-4 py-2 rounded-lg dark:text-black"
          onChange={handleInputChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          className="input mb-2 px-4 py-2 rounded-lg dark:text-black"
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <button type="submit" className="bg-pink-200 dark:bg-slate-900 dark:hover:bg-slate-600 px-4 py-2 rounded-lg hover:bg-pink-400 transition-all duration-300">
          Sign Up
        </button>
        {isLoading && <div>Loading...</div>}
        {error && <div className="error">{error}</div>}
      </form>
      <div className="flex flex-row">
        Already Have an Account? <Link className="ml-2 text-shadow" to="/login">Log In</Link>!
      </div>
    </div>
  );
};

export default SignupForm;
