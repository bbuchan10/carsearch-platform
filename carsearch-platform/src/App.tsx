import Header from "./Header";
import CarMakes from "./components/CarMakes";
import CarModels from "./components/CarModels";
import type { Make } from "./api";
import { useState } from "react";

function App() {
	const [selectedMake, setSelectedMake] = useState<Make | null>(null);

	return (
		<div>
			<Header />
			<div style={{ display: "flex", gap: "2rem" }}>
				<CarMakes onSelectMake={setSelectedMake} />
				<CarModels make={selectedMake} />
			</div>
		</div>
	);
}

export default App;
