import { createCrudStore } from "@/stores/create-crud-store";
import type { Module } from "./types";

export const useModuleStore = createCrudStore<Module>();
