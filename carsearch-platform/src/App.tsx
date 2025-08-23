import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Makes from "./pages/Makes";
import RootLayout from "./layout/RootLayout";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<RootLayout />}>
				<Route index element={<Home />} />
				<Route path="makes" element={<Makes />} />
			</Route>
		)
	);
	return <RouterProvider router={router} />;
}

export default App;
