export type ServicesState = {
  seo: boolean;
  ads: boolean;
  web: boolean;
};

export type Budget = {
  id: number;
  name: string;
  client: string;
  phone: string;
  email: string;
  services: string[];
  webConfig?: {
    pages: number;
    languages: number;
  };
  total: number;
};