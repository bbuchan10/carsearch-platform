export interface Make {
	_id: string;
	make: string;
	region: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface CarModel {
	_id: string;
	model: string;
	makeId: Make | string;
	createdAt?: string;
	updatedAt?: string;
}

const API_URL = "http://localhost:5050/api/v1";

// ----- MAKES -----
export async function getMakes(): Promise<Make[]> {
	const res = await fetch(`${API_URL}/makes`);
	if (!res.ok) throw new Error("Failed to fetch makes");
	return res.json();
}

export async function createMake(make: string, region: string): Promise<Make> {
	const res = await fetch(`${API_URL}/makes`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ make, region }),
	});
	if (!res.ok) throw new Error("Failed to create make");
	return res.json();
}

export async function updateMake(
	id: string,
	updates: Partial<Make>
): Promise<Make> {
	const res = await fetch(`${API_URL}/makes/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updates),
	});
	if (!res.ok) throw new Error("Failed to update make");
	return res.json();
}

export async function deleteMake(id: string): Promise<{ message: string }> {
	const res = await fetch(`${API_URL}/makes/${id}`, { method: "DELETE" });
	if (!res.ok) throw new Error("Failed to delete make");
	return res.json();
}

// ----- MODELS -----
export async function getModels(makeId?: string): Promise<CarModel[]> {
	const url = makeId
		? `${API_URL}/models?makeId=${makeId}`
		: `${API_URL}/models`;
	const res = await fetch(url);
	if (!res.ok) throw new Error("Failed to fetch models");
	return res.json();
}

export async function createModel(
	makeId: string,
	model: string
): Promise<CarModel> {
	const res = await fetch(`${API_URL}/models`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ makeId, model }),
	});
	if (!res.ok) throw new Error("Failed to create model");
	return res.json();
}

export async function updateModel(
	id: string,
	updates: Partial<CarModel>
): Promise<CarModel> {
	const res = await fetch(`${API_URL}/models/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updates),
	});
	if (!res.ok) throw new Error("Failed to update model");
	return res.json();
}

export async function deleteModel(id: string): Promise<{ message: string }> {
	const res = await fetch(`${API_URL}/models/${id}`, { method: "DELETE" });
	if (!res.ok) throw new Error("Failed to delete model");
	return res.json();
}
