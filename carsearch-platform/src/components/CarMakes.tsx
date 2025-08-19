import { useEffect, useState } from "react";
import { getMakes, createMake, deleteMake } from "../api";
import type { Make } from "../api";

interface CarMakesProps {
	onSelectMake: (make: Make | null) => void;
}

export default function CarMakes({ onSelectMake }: CarMakesProps) {
	const [makes, setMakes] = useState<Make[]>([]);
	const [newMake, setNewMake] = useState("");
	const [region, setRegion] = useState("");

	useEffect(() => {
		loadMakes();
	}, []);

	async function loadMakes() {
		try {
			const data = await getMakes();
			setMakes(data);
		} catch (err) {
			console.error(err);
		}
	}

	async function handleAddMake(e: React.FormEvent) {
		e.preventDefault();
		if (!newMake || !region) return;
		await createMake(newMake, region);
		setNewMake("");
		setRegion("");
		loadMakes();
	}

	async function handleDeleteMake(id: string) {
		await deleteMake(id);
		loadMakes();
	}

	return (
		<div>
			<h2>Car Makes</h2>
			<form onSubmit={handleAddMake}>
				<input
					placeholder="Make"
					value={newMake}
					onChange={(e) => setNewMake(e.target.value)}
				/>
				<input
					placeholder="Region"
					value={region}
					onChange={(e) => setRegion(e.target.value)}
				/>
				<button type="submit">Add</button>
			</form>
			<ul>
				{makes.map((m) => (
					<li key={m._id}>
						<span onClick={() => onSelectMake(m)} style={{ cursor: "pointer" }}>
							{m.make} ({m.region})
						</span>
						<button onClick={() => handleDeleteMake(m._id)}>❌</button>
					</li>
				))}
			</ul>
		</div>
	);
}
