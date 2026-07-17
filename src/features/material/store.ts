import { createCrudStore } from "@/stores/create-crud-store";
import type { Material } from "./types";

export const useMaterialStore = createCrudStore<Material>();
