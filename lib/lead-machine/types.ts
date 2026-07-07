export interface KvkOrganization {
  kvkNumber: string;
  name: string;
  city?: string;
  postalCode?: string;
  address?: string;
  website?: string;
  sbiCode?: string;
  sbiDescription?: string;
}

export type ProspectStatusValue =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'CONVERTED'
  | 'ARCHIVED';

export interface ProspectLead {
  id: string;
  name: string;
  tradeName?: string | null;
  kvkNumber?: string | null;
  website?: string | null;
  email?: string | null;
  phone?: string | null;
  contactPerson?: string | null;
  sbiCode?: string | null;
  sbiDescription?: string | null;
  city?: string | null;
  postalCode?: string | null;
  address?: string | null;
  aiScore?: number | null;
  aiRationale?: string | null;
  status: ProspectStatusValue;
  starred: boolean;
  notes?: string | null;
  customerId?: string | null;
  scrapedAt?: string | null;
  scoredAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult extends KvkOrganization {
  email?: string;
  phone?: string;
  aiScore?: number;
  aiRationale?: string;
  alreadySaved?: boolean;
}

// SBI-presetten afgestemd op DAAR's domein: vrijwilligers- & welzijnsorganisaties.
export const SBI_PRESETS = [
  { code: '88990', label: 'Maatschappelijke dienstverlening' },
  { code: '88100', label: 'Thuiszorg & ouderenzorg' },
  { code: '84110', label: 'Gemeenten & overheid' },
  { code: '94990', label: 'Verenigingen & stichtingen' },
  { code: '88910', label: 'Kinderopvang' },
  { code: '87901', label: 'Verzorgings- en verpleeghuizen' },
  { code: '85599', label: 'Overig onderwijs' },
  { code: '88320', label: 'Sociaal raadsliedenwerk' },
  { code: '86921', label: 'Huisartsenpraktijken' },
] as const;
