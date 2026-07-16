import { createCrudStore } from "@/stores/create-crud-store";
import type { Class } from "./types";

export const useClassStore = createCrudStore<Class>();
