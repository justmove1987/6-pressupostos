export type ServicesState = {
  seo: boolean;
  ads: boolean;
  web: boolean;
};

export interface Budget {
  id: number;
  name: string;
  phone: string;
  email: string;
  services: string[];
  total: number;
  webConfig?: {
    pages: number;
    languages: number;
  };
}