import { createCrudStore } from "@/stores/create-crud-store";
import type { Company } from "./types";

export const useCompanyStore = createCrudStore<Company>();
