import { createCrudStore } from "@/stores/create-crud-store";
import type { Instructor } from "./types";

export const useInstructorStore = createCrudStore<Instructor>();
