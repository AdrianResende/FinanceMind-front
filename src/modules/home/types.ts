export interface HomeData {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HomeState {
  data: HomeData | null;
  loading: boolean;
  error: string | null;
}
