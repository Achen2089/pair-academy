import CodeEditor from './components/CodeEditor';
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
    <NavBar />
    <Outlet />
    </>;
}

export default App
