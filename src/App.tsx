import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
	return (
		<BrowserRouter>
			<Suspense>
				<Routes>
					<Route path="/*" element={<DefaultLayout />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
