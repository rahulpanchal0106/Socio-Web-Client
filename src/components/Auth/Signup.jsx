import { useState } from "react";
import fetchData from "../../utils/fetch_data";
import url from "../../utils/url";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../Navbar/Nav";
import toast, { Toaster } from "react-hot-toast";

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [agrees, setAgrees] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const didntAgree = ()=>{
    toast.error("You have to agree with the Terms & Conditions to proceed further");
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      toast.loading("Signing you up");
      const data = await fetchData(url + "/signup", {"username":username,"password":password}, 'POST');
      toast.dismiss()
      // const resp = await data.json();
      
      data.message>1000?toast.error(data.message==11000?`username ${username} already exists`:"Faild to signup"):toast.success("Sign up suceesfull")
      data.message>1000?setTimeout(()=>{
        navigate('/signup');
      },1000):setTimeout(()=>{
        navigate('/login');
      },1000)

    } catch (error) {
      toast.error(error.message||"Signup failed")
      setError(error.message);
      setTimeout(()=>{
        navigate('/signup');
      },1000)
    } finally {
      setIsLoading(false);
    }

    
  };

  return (
    <div className="bg-yellow-200 dark:bg-gray-600 dark:text-white flex flex-col w-full h-screen justify-center items-center">
      <Nav/>
      <Toaster/>
      <form className="w-1/2 h-1/2 px-10 py-5 flex flex-col justify-center items-center" onSubmit={agrees?handleSubmit:didntAgree}>
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

          <div className="flex items-center my-5">
            <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-slate-600 bg-gray-100 border-gray-300 rounded focus:ring-slate-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600 " onClick={()=>setAgrees(!agrees)}  />
            <label htmlFor="link-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="/t&c.pdf" className="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</a>.</label>
          </div>
        <button type={agrees?"submit":"none"}  style={{
          background:agrees?"":"",
        }}  className="bg-pink-200 dark:bg-slate-900 dark:hover:bg-slate-600 px-4 py-2 rounded-lg hover:bg-pink-400 transition-all duration-300">
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
