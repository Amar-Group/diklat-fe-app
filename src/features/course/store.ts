import { createCrudStore } from "@/stores/create-crud-store";
import type { Course } from "./types";

export const useCourseStore = createCrudStore<Course>();
