export type MelakartaRaga = {
  number: number;
  name: string;
  chakra: string;
  note_s: string;
  note_r: string;
  note_g: string;
  note_m: string;
  note_p: string;
  note_d: string;
  note_n: string;
};

export const MELAKARTA_RAGAS: MelakartaRaga[] = [
  { number: 1, name: 'Kanakangi', chakra: 'Indu', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Suddha Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Suddha Nishadam' },
  { number: 2, name: 'Ratnangi', chakra: 'Indu', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Suddha Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 3, name: 'Ganamurti', chakra: 'Indu', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Suddha Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kakali Nishadam' },
  { number: 4, name: 'Vanaspati', chakra: 'Indu', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Suddha Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 5, name: 'Manavati', chakra: 'Indu', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Suddha Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 6, name: 'Tanarupi', chakra: 'Indu', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Suddha Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Shatsruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 7, name: 'Senavati', chakra: 'Netra', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Suddha Nishadam' },
  { number: 8, name: 'Hanumatodi', chakra: 'Netra', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 9, name: 'Dhenuka', chakra: 'Netra', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kakali Nishadam' },
  { number: 10, name: 'Natakapriya', chakra: 'Netra', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 11, name: 'Kokilapriya', chakra: 'Netra', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 12, name: 'Rupavati', chakra: 'Netra', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Shatsruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 13, name: 'Gayakapriya', chakra: 'Agni', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Suddha Nishadam' },
  { number: 14, name: 'Vakulabharanam', chakra: 'Agni', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 15, name: 'Mayamalavagowla', chakra: 'Agni', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kakali Nishadam' },
  { number: 16, name: 'Chakravakam', chakra: 'Agni', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 17, name: 'Suryakantam', chakra: 'Agni', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 18, name: 'Hatakambari', chakra: 'Agni', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Shatsruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 19, name: 'Jhankaradhwani', chakra: 'Veda', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Suddha Nishadam' },
  { number: 20, name: 'Natabhairavi', chakra: 'Veda', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 21, name: 'Keeravani', chakra: 'Veda', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kakali Nishadam' },
  { number: 22, name: 'Kharaharapriya', chakra: 'Veda', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 23, name: 'Gourimanohari', chakra: 'Veda', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 24, name: 'Varunapriya', chakra: 'Veda', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Shatsruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 25, name: 'Mararanjani', chakra: 'Bana', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Suddha Nishadam' },
  { number: 26, name: 'Charukesi', chakra: 'Bana', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 27, name: 'Sarasangi', chakra: 'Bana', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kakali Nishadam' },
  { number: 28, name: 'Harikambhoji', chakra: 'Bana', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 29, name: 'Dheerasankarabharanam', chakra: 'Bana', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 30, name: 'Naganandini', chakra: 'Bana', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Shatsruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 31, name: 'Yagapriya', chakra: 'Rutu', note_s: 'Shadjam', note_r: 'Shatsruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Suddha Nishadam' },
  { number: 32, name: 'Ragavardhini', chakra: 'Rutu', note_s: 'Shadjam', note_r: 'Shatsruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 33, name: 'Gangeyabhushani', chakra: 'Rutu', note_s: 'Shadjam', note_r: 'Shatsruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kakali Nishadam' },
  { number: 34, name: 'Vagadheeswari', chakra: 'Rutu', note_s: 'Shadjam', note_r: 'Shatsruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 35, name: 'Shulini', chakra: 'Rutu', note_s: 'Shadjam', note_r: 'Shatsruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 36, name: 'Chalanata', chakra: 'Rutu', note_s: 'Shadjam', note_r: 'Shatsruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Suddha Madhyamam', note_p: 'Panchamam', note_d: 'Shatsruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 37, name: 'Salagam', chakra: 'Rishi', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Suddha Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Suddha Nishadam' },
  { number: 38, name: 'Jalarnavam', chakra: 'Rishi', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Suddha Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 39, name: 'Jhalavarali', chakra: 'Rishi', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Suddha Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kakali Nishadam' },
  { number: 40, name: 'Navaneetam', chakra: 'Rishi', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Suddha Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 41, name: 'Pavani', chakra: 'Rishi', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Suddha Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 42, name: 'Raghupriya', chakra: 'Rishi', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Suddha Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Shatsruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 43, name: 'Gavambhodi', chakra: 'Vasu', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Suddha Nishadam' },
  { number: 44, name: 'Bhavapriya', chakra: 'Vasu', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 45, name: 'Shubhapantuvarali', chakra: 'Vasu', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kakali Nishadam' },
  { number: 46, name: 'Shadvidamargini', chakra: 'Vasu', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 47, name: 'Suvarnangi', chakra: 'Vasu', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 48, name: 'Divyamani', chakra: 'Vasu', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Shatsruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 49, name: 'Dhavalambari', chakra: 'Brahma', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Suddha Nishadam' },
  { number: 50, name: 'Namanarayani', chakra: 'Brahma', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 51, name: 'Kamavardani', chakra: 'Brahma', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kakali Nishadam' },
  { number: 52, name: 'Ramapriya', chakra: 'Brahma', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 53, name: 'Gamanashrama', chakra: 'Brahma', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 54, name: 'Vishwambari', chakra: 'Brahma', note_s: 'Shadjam', note_r: 'Suddha Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Shatsruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 55, name: 'Shamalangi', chakra: 'Disi', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Suddha Nishadam' },
  { number: 56, name: 'Shanmukhapriya', chakra: 'Disi', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 57, name: 'Simhendramadhyamam', chakra: 'Disi', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kakali Nishadam' },
  { number: 58, name: 'Hemavati', chakra: 'Disi', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 59, name: 'Dharmavati', chakra: 'Disi', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 60, name: 'Neetimati', chakra: 'Disi', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Sadharana Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Shatsruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 61, name: 'Kantamani', chakra: 'Rudra', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Suddha Nishadam' },
  { number: 62, name: 'Rishabhapriya', chakra: 'Rudra', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 63, name: 'Latangi', chakra: 'Rudra', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kakali Nishadam' },
  { number: 64, name: 'Vachaspati', chakra: 'Rudra', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 65, name: 'Mechakalyani', chakra: 'Rudra', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 66, name: 'Chitrambari', chakra: 'Rudra', note_s: 'Shadjam', note_r: 'Chatusruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Shatsruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 67, name: 'Sucharitra', chakra: 'Aditya', note_s: 'Shadjam', note_r: 'Shatsruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Suddha Nishadam' },
  { number: 68, name: 'Jyotiswarupini', chakra: 'Aditya', note_s: 'Shadjam', note_r: 'Shatsruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 69, name: 'Dhatuvardani', chakra: 'Aditya', note_s: 'Shadjam', note_r: 'Shatsruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Suddha Daivatam', note_n: 'Kakali Nishadam' },
  { number: 70, name: 'Nasikabhushani', chakra: 'Aditya', note_s: 'Shadjam', note_r: 'Shatsruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kaisiki Nishadam' },
  { number: 71, name: 'Kosalam', chakra: 'Aditya', note_s: 'Shadjam', note_r: 'Shatsruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Chatusruti Daivatam', note_n: 'Kakali Nishadam' },
  { number: 72, name: 'Rasikapriya', chakra: 'Aditya', note_s: 'Shadjam', note_r: 'Shatsruti Rishabham', note_g: 'Antara Gandharam', note_m: 'Prati Madhyamam', note_p: 'Panchamam', note_d: 'Shatsruti Daivatam', note_n: 'Kakali Nishadam' },
];

export const MELAKARTA_BY_NUMBER = new Map(
  MELAKARTA_RAGAS.map((entry) => [entry.number, entry])
);



