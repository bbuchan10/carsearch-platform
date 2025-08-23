import CarMakes from "../components/CarMakes";

const Makes = () => {
	return (
		<div style={{ display: "flex", gap: "2rem" }}>
			<CarMakes />
			{/* <CarModels make={selectedMake} /> */}
		</div>
	);
};

export default Makes;
