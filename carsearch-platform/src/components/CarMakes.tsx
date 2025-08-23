import { useEffect, useState } from "react";
import { getMakes, createMake, deleteMake } from "../api";
import type { Make } from "../api";

interface CarMakesProps {
	onSelectMake: (make: Make) => void;
}

export default function CarMakes() {
	const [makes, setMakes] = useState<Make[]>([]);
	const [newMake, setNewMake] = useState("");
	const [region, setRegion] = useState("");

	const logos = import.meta.glob("../assets/car_logos/*.{png,jpg,svg}", {
		eager: true,
	});

	const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

	// Convert to a key/value map: { "toyota": "url", "ford": "url", ... }
	const logoMap: Record<string, string> = {};

	for (const [path, mod] of Object.entries(logos)) {
		// Extract filename (e.g. "toyota.png" → "toyota")
		const fileName = path.split("/").pop()?.split(".")[0]?.toLowerCase();
		if (fileName && mod && (mod as any).default) {
			logoMap[normalize(fileName)] = (mod as any).default;
		}
	}

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
		<div className="container">
			{/* <h2>Car Makes</h2>
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
			</form> */}

			<div className="row row-cols-1 row-cols-md-5 g-4">
				{makes.map((input) => {
					const key = normalize(input.make.toLowerCase());
					const logo = logoMap[key];
					return (
						<div className="col" key={input._id}>
							<div
								className="card h-100"
								onClick={() => console.log("Model Clicked: " + { key })}
								style={{ cursor: "pointer" }}
							>
								<img
									src={logo}
									className="card-img-top"
									alt={`${input.make} logo`}
								/>
								<div className="card-body">
									<h5 className="card-title">{input.make}</h5>
									<p className="card-text">Region: {input.region}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
