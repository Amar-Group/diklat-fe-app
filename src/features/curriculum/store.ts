import { createCrudStore } from "@/stores/create-crud-store";
import type { Curriculum } from "./types";

export const useCurriculumStore = createCrudStore<Curriculum>();
