export interface Logistic {
  id: number;
  class_id: number;
  hotel_name?: string;
  hotel_address?: string;
  map_url?: string;
  food_schedule?: any;
  field_trip_destination?: string;
  itinerary?: any;
}

export type CreateLogisticRequest = Omit<Logistic, "id" | "created_at" | "updated_at">;
export type UpdateLogisticRequest = Partial<CreateLogisticRequest>;
