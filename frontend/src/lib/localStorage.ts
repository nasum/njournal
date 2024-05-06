type Order = {
	order_by: "updated_at" | "created_at";
	order: "asc" | "desc";
};

export const GetNotesOrder = (): Order => {
	const order = localStorage.getItem("notesOrder");
	if (order) {
		return JSON.parse(order) as Order;
	}
	return { order_by: "created_at", order: "desc" };
};

export const SaveNotesOrder = (order: Order) => {
	localStorage.setItem("notesOrder", JSON.stringify(order));
};
