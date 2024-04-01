import React, { useState } from 'react';
import login from "../assets/login.PNG";
import { useNavigate } from 'react-router-dom';
import { Navbarlogin } from './Navbarlogin';

function LoginPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('staff');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/');
      const users = await response.json();

      const user = users.find(user => user.username === userId && user.password === password);

      if (user) {
        if ((user.role.roleName === 'Manager' && userType === 'manager') || 
            (user.role.roleName === 'Staff' && userType === 'staff')) {
          // Login successful, navigate to respective dashboard
          navigate(`/${user.role.roleName.toLowerCase()}`);
        } else {
          alert('Invalid user type selected');
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in');
    }
  };

  return (
    <>
      <Navbarlogin />
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        <div className="flex flex-col justify-center items-center px-6 md:px-12">
          <h1 className="text-3xl font-bold mb-6">Login</h1>
          <select
            value={userType}
            onChange={handleUserTypeChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="staff">Staff Login</option>
            <option value="manager">Manager Login</option>
          </select>
          <label className="block text-gray-700 font-medium mt-4">
            {userType === 'staff' ? 'Staff ID' : 'Manager ID'}
          </label>
          <input
            type="text"
            value={userId}
            onChange={handleUserIdChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter ID"
          />
          <label className="block text-gray-700 font-medium mt-4">Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter Password"
          />
          <button
            type="button"
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
          >
            Login
          </button>
        </div>
        <div className="md:block">
          <img src={login} alt="login-hero" className="mt-0.5 mr-0 h-full" />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
