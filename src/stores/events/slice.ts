import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: "1",
		Descripcion: "Ecuador VS Venezuela",
		Lugar: "Levis Stadium",
		FechaEvento: "28-06-2024",
		Valor: "50.99",
		Status: "Active",
	},
	{
		id: "2",
		Descripcion: "Argentina VS Canada",
		Lugar: "Mercedes-Benz Stadium",
		FechaEvento: "28-06-2024",
		Valor: "50.99",
		Status: "Active",
	},
	{
		id: "3",
		Descripcion: "Estados Unidos VS Bolivia",
		Lugar: "AT&T Stadium",
		FechaEvento: "28-06-2024",
		Valor: "50.99",
		Status: "Active",
	},
];

export type EventId = number;

export interface Event {
	Descripcion: string;
	Lugar: string;
	FechaEvento: string;
	Valor: string;
	Status: string;
}

export interface EventWithId extends Event {
	id: EventId;
}

const initialState: EventWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).Event : DEFAULT_STATE;
})();

export const eventsSlice = createSlice({
	name: "Events",
	initialState,
	reducers: {
		addNewEvent: (state, action: PayloadAction<Event>) => {
			const id = crypto.randomUUID()
			state.push({ id, ...action.payload })
		},
		deleteEventById: (state, action: PayloadAction<EventId>) => {
			const id = action.payload;
			return state.filter((event) => event.id !== id);
		},
		rollbackEvent: (state, action: PayloadAction<EventWithId>) => {
			const isEventAlreadyDefined = state.some(event => event.id === action.payload.id)
			if (!isEventAlreadyDefined) {
				state.push(action.payload)
			}
		}
	},
});

export default eventsSlice.reducer;

export const { addNewEvent, deleteEventById, rollbackEvent } = eventsSlice.actions;