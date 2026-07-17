export type Material = {
  id: number;
  module_id: number;
  type: 'video' | 'document';
  title: string;
  file_url: string;
  duration_seconds?: number;
  is_skippable?: boolean;
};
