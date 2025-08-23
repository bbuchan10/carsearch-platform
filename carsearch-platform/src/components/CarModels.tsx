import { useEffect, useState } from "react";
import { getModels, createModel, deleteModel } from "../api";
import type { CarModel, Make } from "../api";

interface CarModelsProps {
	make: Make | null;
}

export default function CarModels({ make }: CarModelsProps) {
	const [models, setModels] = useState<CarModel[]>([]);
	const [newModel, setNewModel] = useState("");

	useEffect(() => {
		if (make) loadModels();
	}, [make]);

	async function loadModels() {
		if (!make) return;
		const data = await getModels(make._id);
		setModels(data);
	}

	async function handleAddModel(e: React.FormEvent) {
		e.preventDefault();
		if (!make || !newModel) return;
		await createModel(make._id, newModel);
		setNewModel("");
		loadModels();
	}

	async function handleDeleteModel(id: string) {
		await deleteModel(id);
		loadModels();
	}

	// if (!make) return <p>Select a make to view models.</p>;

	return (
		<div>
			<h2>{make.make} Models</h2>
			<form onSubmit={handleAddModel}>
				<input
					placeholder="Model name"
					value={newModel}
					onChange={(e) => setNewModel(e.target.value)}
				/>
				<button type="submit">Add Model</button>
			</form>
			<ul>
				{models.map((m) => (
					<li key={m._id}>
						{m.model}
						<button onClick={() => handleDeleteModel(m._id)}>❌</button>
					</li>
				))}
			</ul>
		</div>
	);
}
