import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import HomePage from './components/HomePage';
import MainPage from './components/MainPage';
import NavBar from './components/NavBar';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage/> },
      {
        path: "code-editor",
        element: <MainPage/>,
        // children: [
        //   {
        //     path: ":pageNumber",
        //     element: <AllPosts />,
        //   },
        //   {
        //     path: "post/:postId",
        //     element: <PostView />,
        //   },
        // ],
      },
    ],
  },
]);

function App() {

  return <RouterProvider router={router} />;
}

function Layout() {
  return <>
  <h1 className="text-3xl font-bold underline text-center"></h1>
    <NavBar />
    <Outlet />
    </>;
}

export default App
