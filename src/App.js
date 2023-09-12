import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import AdminLogin from '../src/components/Admin/Login/Login.jsx';
import Dashboard from '../src/components/Admin/Dashboard/Dashboard.jsx';
import Home from '../src/components/Home/Home.jsx';
import Users from  '../src/components/Admin/Users/Users.jsx';
function App() {


  const routes = createBrowserRouter([
    {index: true , element: <AdminLogin />},
    {path:"home" ,element:<Home />, children:[
      {index:true ,element:<Dashboard />},
      {path:"dashboard" ,element:<Dashboard />},
      {path:"users", element: <Users/>}
    ] },
  ])








  return (
    <div className='main-app'>
    <RouterProvider  router={routes}></RouterProvider>
    </div>
  );
}

export default App;
