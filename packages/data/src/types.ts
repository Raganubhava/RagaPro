export interface Raga {
  id: number;
  ragaName: string;
  alternativeRagaName?: string;
  melakarthaId: number;
  chakram?: string;
  arohana?: string;
  avarohana?: string;
  rasa?: string;
  vadiSwara?: string;
  samvadiSwara?: string;
  grahaswara?: string;
  nyasaSwara?: string;
  jeevaSwara?: string;
  hindustaniEquiRaga?: string;
  popularRaga?: boolean;
  raktiRaga?: boolean;
  ancientRaga?: boolean;
  compositions?: string;
  description?: string;
  ragaType?: string;
  upangaRaga?: boolean;
  bhashangaRaga?: boolean | null;
}
