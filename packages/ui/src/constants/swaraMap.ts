// Mapping for Carnatic swara abbreviations to full names.
export const SWARA_MAP: Record<string, string> = {
  'S.R': 'Suddha Rishabham',
  'C.R': 'Chatusruti Rishabham',
  'SHA.R': 'Shatsruti Rishabham',
  'S.G': 'Sadharana Gandharam',
  'SA.G': 'Sadharana Gandharam',
  'A.G': 'Antara Gandharam',
  'SU.G': 'Suddha Gandharam',
  'S.M': 'Suddha Madhyamam',
  'P.M': 'Prati Madhyamam',
  'S.D': 'Suddha Daivatam',
  'C.D': 'Chatusruti Daivatam',
  'SHA.D': 'Shatsruti Daivatam',
  'K.N': 'Kaisiki Nishadam',
  'KK.N': 'Kakali Nishadam',
  'SU.N': 'Suddha Nishadam',
  P: 'Panchamam',
  S: 'Shadjam',
};

export const expandSwaraValue = (value?: string | null) => {
  if (!value) return value;
  return value
    .split(',')
    .map((part) => {
      const trimmed = part.trim();
      const full = SWARA_MAP[trimmed.toUpperCase()];
      return full ?? trimmed;
    })
    .join(', ');
};
