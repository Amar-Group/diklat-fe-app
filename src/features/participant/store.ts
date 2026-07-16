import { createCrudStore } from "@/stores/create-crud-store";
import type { Participant } from "./types";

export const useParticipantStore = createCrudStore<Participant>();
