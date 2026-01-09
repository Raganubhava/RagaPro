import { H2, H3, Paragraph, Text, XStack, YStack, useThemeName, Image } from 'tamagui';
import { PageContainer } from './PageContainer';
import { Footer } from './Footer';

export const HelpPage = () => {
  const themeName = useThemeName();
  const isDark = themeName?.toLowerCase().includes('dark');
  const heroBorder = isDark ? 'rgba(255,255,255,0.12)' : '#E5D6C8';
  const cardBg = isDark ? 'rgba(255,255,255,0.06)' : '$surface';
  const cardBorder = isDark ? 'rgba(255,255,255,0.16)' : '$borderSoft';

  const structuralTerms = [
    {
      term: 'Arohana / Arohan',
      description: 'Ascending order of the notes in a raga.',
    },
    {
      term: 'Avarohana / Avarohan',
      description: 'Descending order of the notes in a raga.',
    },
  ];

  const swaras = [
    'S – Shadja / Shadjam',
    'R – Rishabha / Rishabham',
    'G – Gandhara / Gandharam',
    'M – Madhyama / Madhyamam',
    'P – Panchama / Panchamam',
    'D – Daivata / Daivatam',
    'N – Nishada / Nishadam',
  ];

  const swaraTable = [
    { hindustani: 'sa', full: 'shadja', carnatic: 'Sa (Shadjam)' },
    { hindustani: 'komal re', full: 'komal rishabha', carnatic: 'Shuddha Rishabham' },
    { hindustani: 'shuddha re', full: 'shuddha rishabha', carnatic: 'Chatusruti Rishabham' },
    { hindustani: 'komal ga', full: 'komal gandhaara', carnatic: 'Sadharana Gandharam' },
    { hindustani: 'shuddha ga', full: 'shuddha gandhaara', carnatic: 'Antara Gandharam' },
    { hindustani: 'shuddha ma', full: 'shuddha madhyama', carnatic: 'Shuddha Madhyamam' },
    { hindustani: 'tivra ma', full: 'tivra madhyama', carnatic: 'Prati Madhyamam' },
    { hindustani: 'pa', full: 'panchama', carnatic: 'Panchamam' },
    { hindustani: 'komal dha', full: 'komal dhaivata', carnatic: 'Shuddha Dhaivatam' },
    { hindustani: 'shuddha dha', full: 'shuddha dhaivata', carnatic: 'Chatusruti Dhaivatam' },
    { hindustani: 'komal ni', full: 'komal nishaada', carnatic: 'Kaisiki Nishadam' },
    { hindustani: 'shuddha ni', full: 'shuddha nishaada', carnatic: 'Kakali Nishadam' },
    { hindustani: 'sa (upper)', full: 'shadja', carnatic: 'Tara Shadjam' },
  ];

  const thaatTable = [
    { thaat: 'Bilaval', carnatic: 'Dheerashankarabharanam (29th Mela)' },
    { thaat: 'Kafi', carnatic: 'Kharaharapriya (22nd Mela)' },
    { thaat: 'Bhairavi', carnatic: 'Hanumatodi (8th Mela)' },
    { thaat: 'Kalyan', carnatic: 'Kalyani (65th Mela)' },
    { thaat: 'Khamaj', carnatic: 'Harikambhoji (28th Mela)' },
    { thaat: 'Asavari', carnatic: 'Natabhairavi (20th Mela)' },
    { thaat: 'Bhairav', carnatic: 'Mayamalavagowla (15th Mela)' },
    { thaat: 'Marva', carnatic: 'Gamanashrama (53rd Mela)' },
    { thaat: 'Poorvi', carnatic: 'Kamavardhani (51st Mela)' },
    { thaat: 'Todi', carnatic: 'Shubhapantuvarali (45th Mela)' },
  ];

  const melakartaM1 = [
    { chakra: 'Indu Chakra', ragas: ['Kanakangi', 'Ratnangi', 'Ganamoorthy', 'Vanaspathi', 'Manavathi', 'Taanaroopi'] },
    { chakra: 'Netra Chakra', ragas: ['Senavathi', 'Hanumathodi', 'Dhenuka', 'Natakapriya', 'Kokilapriya', 'Roopavathi'] },
    { chakra: 'Agni Chakra', ragas: ['Gayakapriya', 'Vakulabharanam', 'Mayamalavagowla', 'Chakravakam', 'Suryakanthi', 'Hatakambari'] },
    { chakra: 'Veda Chakra', ragas: ['Jhankaradwani', 'Natabhairavi', 'Keeravani', 'Kharaharapriya', 'Gowrimanohari', 'Varunapriya'] },
    { chakra: 'Baana Chakra', ragas: ['Mararanjani', 'Charukesi', 'Sarasangi', 'Harikambhoji', 'Dheera Shankarabharanam', 'Naganandini'] },
    { chakra: 'Ruthu Chakra', ragas: ['Yagapriya', 'Ragavardhini', 'Gangeyabhooshani', 'Vagadheeshwari', 'Soolini', 'Chalanata'] },
  ];

  const melakartaM2 = [
    { chakra: 'Rushi Chakra', ragas: ['Salagamu', 'Jalarnavamu', 'Jhalavarali', 'Navaneetamu', 'Pavani', 'Raghupriya'] },
    { chakra: 'Vasu Chakra', ragas: ['Gavambhodi', 'Bhavapriya', 'Shubhapantuvarali', 'Shadvidamargini', 'Suvarnangi', 'Divyamani'] },
    { chakra: 'Brahma Chakra', ragas: ['Dhavalambari', 'Namanarayani', 'Kamavardhini', 'Ramapriya', 'Gamanashrama', 'Vishwambhari'] },
    { chakra: 'Disi Chakra', ragas: ['Shyamalangi', 'Shanmukhapriya', 'Simhendramadhyama', 'Hemavathi', 'Dharmavathi', 'Neetimathi'] },
    { chakra: 'Rudra Chakra', ragas: ['Kantamani', 'Rushabhapriya', 'Latangi', 'Vachaaspathi', 'Mechakalyani', 'Chitrambari'] },
    { chakra: 'Adithya Chakra', ragas: ['Sucharitra', 'Jyothiswaroopini', 'Dhatuvardhini', 'Nasikabhooshani', 'Kosalamu', 'Rasikapriya'] },
  ];

  const identityTerms = [
    {
      term: 'Vadi Swaram',
      description: 'The note of primary importance in a raga; often the most emphasized or “rested upon” note.',
    },
    {
      term: 'Samvadi Swaram',
      description: 'The consonant note to the vadi, typically a fourth or fifth apart.',
    },
    {
      term: 'Jiva Swaram',
      description: 'Life-giving notes that bring out the raga’s identity and emotional color.',
    },
    {
      term: 'Rasa',
      description: 'The emotional mood or flavor of the raga, linked to the Nava Rasa.',
    },
    {
      term: 'Rakti Ragam',
      description: 'A highly attractive, aesthetically rich raga that instantly appeals to listeners.',
    },
  ];

  const classificationTerms = [
    {
      term: 'Janya Ragam',
      description: 'A derived raga that originates from one of the 72 Melakartas.',
    },
    {
      term: 'Raganga Raga',
      description: 'A melakarta raga that strictly adheres to its canonical structure (example: Shankarabharanam).',
    },
    {
      term: 'Ancient Raga',
      description: 'A raga with deep historical roots, practiced for centuries.',
    },
    {
      term: 'Upanga Raga',
      description: 'A janya raga that uses only the swaras of its parent melakarta; no anya swaras.',
    },
    {
      term: 'Bhashanga Raga',
      description: 'A janya raga that uses anya swaras (foreign notes not in its parent), e.g., Anandabhairavi, Saranga.',
    },
    {
      term: 'Kriyanga Raga',
      description: 'Ragas used in festivals or processions, chosen for energetic rasa (example: Kadanakutuhalam).',
    },
    {
      term: 'Anya Swaram',
      description: 'A foreign note introduced into a raga, deviating from its parent scale.',
    },
  ];

  const grammarTerms = [
    {
      term: 'Apurva Prayogas',
      description: 'Rare or unique melodic phrases that define a raga’s distinctiveness.',
    },
    {
      term: 'Swara Sancharam',
      description: 'Characteristic movement of notes that must follow the raga’s grammar.',
    },
    {
      term: 'Compositions',
      description: 'Representative kritis, varnams, or other works composed in the raga.',
    },
    {
      term: 'Description',
      description: 'Narrative explanation of the raga’s mood, usage, history, and aesthetics.',
    },
    {
      term: 'Audio (Arohana & Avarohana)',
      description: 'Reference recordings of the scale for clarity and learning.',
    },
  ];

  const scaleTypes = [
    {
      term: 'Swarantharam',
      description: 'Ragas with four notes (swaras).',
    },
    {
      term: 'Sampurna Raga',
      description: 'Uses all seven notes in both arohana and avarohana.',
    },
    {
      term: 'Audava',
      description: 'Pentatonic scale (five notes).',
    },
    {
      term: 'Shadava',
      description: 'Hexatonic scale (six notes).',
    },
    {
      term: 'Sampurna Shadavam',
      description: '7 swaras in arohanam and 6 swaras in avarohanam.',
    },
    {
      term: 'Shadava Sampurnam',
      description: '6 swaras in arohanam and 7 swaras in avarohanam.',
    },
    {
      term: 'Sampurna Audavam',
      description: '7 swaras in arohanam and 5 swaras in avarohanam.',
    },
    {
      term: 'Audava Sampurnam',
      description: '5 swaras in arohanam and 7 swaras in avarohanam.',
    },
    {
      term: 'Shadava Shadavam',
      description: '6 swaras in arohanam and 6 swaras in avarohanam.',
    },
    {
      term: 'Audava Shadavam',
      description: '5 swaras in arohanam and 6 swaras in avarohanam.',
    },
    {
      term: 'Audava Audavam',
      description: '5 swaras in arohanam and 5 swaras in avarohanam.',
    },
    {
      term: 'Nisadantya',
      description: 'Raga whose phrases or scale end on Ni instead of Sa.',
    },
  ];

  const introSections = [
    {
      title: 'What Is a Raga?',
      description: (
        <>
          Ragam is the foundation of Indian classical music. Raga emerges from the factors of Arohana/Arohan and Avarohana/Avarohan. Arohana/Arohan is the ascending order of swaras, such as S R G M P D N S, and Avarohana/Avarohan is the descending order of swaras S N D P M G R S. The combination of these swara groups and their movements that give pleasantness to the ears and the mind is called Ragam. Raga has its own shape, color, and mood.
        </>
      ),
    },
    {
      title: 'Hindustani Ragas',
      description: (
        <>
          The ten Thaats are Kalyaan Thaat, Bilaawal Thaat, Khamaaj Thaat, Bhairav Thaat, Poorvi Thaat, Maarva Thaat, Kaafi Thaat, Aasaavari Thaat, Bhairavi Thaat, and Todi Thaat.
          <YStack
            marginTop="$3"
            borderWidth={1}
            borderColor={cardBorder}
            borderRadius="$radius.10"
            overflow="hidden"
          >
            <XStack
              backgroundColor={cardBg}
              borderBottomWidth={1}
              borderColor={cardBorder}
              paddingVertical="$2"
              paddingHorizontal="$3"
              gap="$2"
            >
              <Paragraph flexBasis="35%" flexGrow={1} fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'} fontSize="$2">
                Thaat
              </Paragraph>
              <Paragraph flexBasis="65%" flexGrow={1} fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'} fontSize="$2">
                Carnatic Equivalent (Mela / Raga)
              </Paragraph>
            </XStack>
            {thaatTable.map((row) => (
              <XStack
                key={`${row.thaat}-${row.carnatic}`}
                borderBottomWidth={1}
                borderColor={cardBorder}
                paddingVertical="$2"
                paddingHorizontal="$3"
                gap="$2"
              >
                <Paragraph flexBasis="35%" flexGrow={1} color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$2">
                  {row.thaat}
                </Paragraph>
                <Paragraph flexBasis="65%" flexGrow={1} color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$2">
                  {row.carnatic}
                </Paragraph>
              </XStack>
            ))}
          </YStack>
        </>
      ),
    },
    {
      title: 'Carnatic Ragas',
      description: (
        <>
          Janaka ragas or Melakartha ragas are 72 in number. The 72 Melakartha ragas are formed by three classifications of swaras: R-G-M-D-N. Out of these 72 Melakartha ragas, the first 36 ragas are called Suddha Madhyama and the other 36 are called Prati Madhyama. The first 36 Suddha Madhyama Melakartha ragas have 6 chakras, and the Prati Madhyama ragas also have their 6 chakras. The swarasthana varieties of the five variable swaras are as follows: Rishabham has Suddha Rishabham, Chatusruti Rishabham, and Shatsruti Rishabham. Gandharam includes Suddha Gandharam, Sadharana Gandharam, and Antara Gandharam. Madhyamam has two varieties, Suddha Madhyamam and Prati Madhyamam. Dhaivatam consists of Suddha Dhaivatam, Chatusruti Dhaivatam, and Shatsruti Dhaivatam. Nishadam includes Suddha Nishadam, Kaisiki Nishadam, and Kakali Nishadam.
        </>
      ),
    },
  ];

  const featureSections = [
    {
      title: 'Ragas for Wellness & Mindfulness',
      description: (
        <>
          Indian classical ragas are known for their healing effects-improving sleep, reducing stress, enhancing focus,
          and balancing emotions. Explore curated raga recommendations for calmness, meditation, devotion, and emotional well-being.
        </>
      ),
    },
    {
      title: 'Learn the Foundations',
      description: (
        <>
          RagaNidhi includes beginner-friendly guides based on the principles outlined in <strong>Hamsadhwani</strong>-what is a raga?
          What are swaras? How do gamakas work? What is the difference between Carnatic and Hindustani music?
        </>
      ),
    },
    {
      title: 'How many ragas exist in Carnatic music?',
      description: (
        <>
          Ragavai ananta-ragas are infinite in Carnatic music. Although the system defines 72 Melakarta ragas, the number of
          Janya ragas is vast because ragas evolve over time.
        </>
      ),
    },
    {
      title: 'What is a Melakarta raga?',
      description: <>A Melakarta is the parent scale (similar to a Western scale) from which other ragas (janya ragas) are derived.</>,
    },
    {
      title: 'Which raga is used in film song/film music?',
      description: (
        <>
          You can reach me at shankar.maruvada@gmail.com, and I will respond as soon as possible.{' '}
          <Text
            color={isDark ? '#FFFFFF' : '$primary'}
            fontWeight="700"
            textDecorationLine="underline"
            cursor="pointer"
            onPress={() => {
              if (typeof document === 'undefined') return;
              const target = document.getElementById('melakarta-72');
              target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            72 Melakarthas
          </Text>
        </>
      ),
    },
  ];

  return (
    <YStack
      minHeight="100vh"
      backgroundColor="$background"
      color={isDark ? '#F5F7FF' : '$textPrimary'}
      {...(isDark
        ? {
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(74,118,255,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,148,255,0.14), transparent 42%), linear-gradient(180deg, rgba(11,16,38,0.9) 0%, rgba(11,16,38,0.95) 100%)',
          }
        : {
            backgroundImage:
              "none",
          })}
    >
      <PageContainer>
        <YStack gap="$6" maxWidth={960} marginHorizontal="auto" paddingVertical="$6" $sm={{ paddingHorizontal: '$3' }}>
          <YStack
            padding="$5"
            borderRadius="$radius.12"
            backgroundColor={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.92)'}
            borderWidth={1}
            borderColor={heroBorder}
            shadowColor={isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.12)'}
            shadowRadius={12}
            shadowOffset={{ width: 0, height: 6 }}
            gap="$4"
          >
            <XStack gap="$4" alignItems="center" justifyContent="space-between" flexWrap="wrap">
              <YStack gap="$3" flex={1} minWidth={260}>
                <H2 fontFamily="$heading" color={isDark ? '#FFFFFF' : '$primaryDeep'} $sm={{ fontSize: '$7', textAlign: 'center' }}>
                  Explore the World of Indian Classical Ragas
                </H2>

                <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={26} $sm={{ textAlign: 'center' }}>
                  RagaNidhi is your companion to decode Carnatic and Hindustani ragas: arohana/avarohana, lakshana, audio, and practice tips.
                </Paragraph>
              </YStack>

            </XStack>
          </YStack>

          <YStack
            alignItems="center"
            padding="$4"
            borderRadius="$radius.12"
            backgroundColor={isDark ? 'rgba(255,255,255,0.05)' : '$surface'}
            borderWidth={1}
            borderColor={heroBorder}
            shadowColor={isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}
            shadowRadius={10}
            shadowOffset={{ width: 0, height: 4 }}
          >
            <YStack width="100%" maxWidth={720} overflow="hidden" borderRadius="$radius.12">
              <Image
                source={{ uri: '/RagaNidhi2.png' }}
                width="100%"
                height={340}
                resizeMode="contain"
                $sm={{ height: 240 }}
                backgroundColor={isDark ? 'rgba(255,255,255,0.04)' : '$surface'}
                alt="RagaNidhi"
              />
            </YStack>

            <YStack gap="$2" />
          </YStack>

          <YStack
            gap="$5"
            padding="$5"
            backgroundColor={isDark ? 'rgba(255,255,255,0.05)' : '$surface'}
            borderRadius="$radius.12"
            borderWidth={1}
            borderColor={heroBorder}
            shadowColor={isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}
            shadowRadius={10}
            shadowOffset={{ width: 0, height: 4 }}
            $sm={{ padding: '$4', gap: '$4' }}
          >
            <Paragraph color={isDark ? '#FFFFFF' : '$textPrimary'} lineHeight={26}>
              Welcome to <strong>RagaNidhi</strong>, a comprehensive platform built to help you search, learn, and experience the rich traditions of
              <strong> Carnatic</strong> and <strong>Hindustani</strong> classical music. Whether you're a student, performer, or music enthusiast, RagaNidhi provides deep insights into raga structures, audio examples, compositions, and AI-powered raga identification.
            </Paragraph>

 
          </YStack>

          <YStack
            gap="$5"
            padding="$5"
            borderRadius="$radius.12"
            backgroundColor={isDark ? 'rgba(255,255,255,0.05)' : '$surface'}
            borderWidth={1}
            borderColor={heroBorder}
            shadowColor={isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}
            shadowRadius={10}
            shadowOffset={{ width: 0, height: 4 }}
            $sm={{ padding: '$4' }}
          >

            <XStack gap="$3" flexWrap="wrap">
              {introSections.map((item) => {
                const isPair = item.title === 'Carnatic Ragas' || item.title === 'Hindustani Ragas';
                return (
                  <YStack
                    key={item.title}
                    gap="$2"
                    padding="$4"
                    borderRadius="$radius.10"
                    backgroundColor={cardBg}
                    borderWidth={1}
                    borderColor={cardBorder}
                    flexBasis={isPair ? '48%' : '100%'}
                    maxWidth={isPair ? '48%' : '100%'}
                    flexGrow={1}
                    $sm={{ flexBasis: '100%', maxWidth: '100%' }}
                  >
                    <H3 fontFamily="$heading" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$5">
                      {item.title}
                    </H3>
                    <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={22} fontSize="$3">
                      {item.description}
                    </Paragraph>
                  </YStack>
                );
              })}
            </XStack>

            <YStack gap="$4">
              <Paragraph fontWeight="800" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$5">
                Basic Structural Terms
              </Paragraph>
              <XStack gap="$3" flexWrap="wrap">
                {structuralTerms.map((item) => (
                  <YStack
                    key={item.term}
                    gap="$2"
                    padding="$4"
                    borderRadius="$radius.10"
                    backgroundColor={cardBg}
                    borderWidth={1}
                    borderColor={cardBorder}
                    maxWidth={420}
                    flexGrow={1}
                  >
                    <Paragraph fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'}>
                      {item.term}
                    </Paragraph>
                    <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={22}>
                      {item.description}
                    </Paragraph>
                  </YStack>
                ))}
              </XStack>
            </YStack>



            <YStack gap="$3">
              <Paragraph fontWeight="800" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$5">
                Swaras (Notes)
              </Paragraph>
              <XStack gap="$2" flexWrap="wrap">
                {swaras.map((item) => (
                  <YStack
                    key={item}
                    paddingVertical="$2"
                    paddingHorizontal="$3"
                    borderRadius="$radius.8"
                    backgroundColor={cardBg}
                    borderWidth={1}
                    borderColor={cardBorder}
                  >
                    <Paragraph color={isDark ? '#FFFFFF' : '$textPrimary'} fontWeight="600">
                      {item}
                    </Paragraph>
                  </YStack>
                ))}
              </XStack>
              <YStack
                marginTop="$2"
                borderWidth={1}
                borderColor={cardBorder}
                borderRadius="$radius.10"
                overflow="hidden"
              >
                <XStack
                  backgroundColor={cardBg}
                  borderBottomWidth={1}
                  borderColor={cardBorder}
                  paddingVertical="$2"
                  paddingHorizontal="$3"
                  gap="$2"
                >
                  <Paragraph flexBasis="30%" flexGrow={1} fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'} fontSize="$3">
                    Note Name (Hindustani)
                  </Paragraph>
                  <Paragraph flexBasis="30%" flexGrow={1} fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'} fontSize="$3">
                    Full Name
                  </Paragraph>
                  <Paragraph flexBasis="40%" flexGrow={1} fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'} fontSize="$3">
                    Equivalent Carnatic Note
                  </Paragraph>
                </XStack>
                {swaraTable.map((row) => (
                  <XStack
                    key={`${row.hindustani}-${row.carnatic}`}
                    borderBottomWidth={1}
                    borderColor={cardBorder}
                    paddingVertical="$2"
                    paddingHorizontal="$3"
                    gap="$2"
                  >
                    <Paragraph flexBasis="30%" flexGrow={1} color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$3">
                      {row.hindustani}
                    </Paragraph>
                    <Paragraph flexBasis="30%" flexGrow={1} color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$3">
                      {row.full}
                    </Paragraph>
                    <Paragraph flexBasis="40%" flexGrow={1} color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$3">
                      {row.carnatic}
                    </Paragraph>
                  </XStack>
                ))}
              </YStack>
            </YStack>

            <YStack gap="$4">
              <Paragraph fontWeight="800" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$5">
                Raga Identity Terms
              </Paragraph>
              <XStack gap="$3" flexWrap="wrap">
                {identityTerms.map((item) => (
                  <YStack
                    key={item.term}
                    gap="$2"
                    padding="$4"
                    borderRadius="$radius.10"
                    backgroundColor={cardBg}
                    borderWidth={1}
                    borderColor={cardBorder}
                    maxWidth={420}
                    flexGrow={1}
                  >
                    <Paragraph fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'}>
                      {item.term}
                    </Paragraph>
                    <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={22}>
                      {item.description}
                    </Paragraph>
                  </YStack>
                ))}
              </XStack>
            </YStack>

            <YStack gap="$4">
              <Paragraph fontWeight="800" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$5">
                Raga Classification
              </Paragraph>
              <XStack gap="$3" flexWrap="wrap">
                {classificationTerms.map((item) => (
                  <YStack
                    key={item.term}
                    gap="$2"
                    padding="$4"
                    borderRadius="$radius.10"
                    backgroundColor={cardBg}
                    borderWidth={1}
                    borderColor={cardBorder}
                    maxWidth={420}
                    flexGrow={1}
                  >
                    <Paragraph fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'}>
                      {item.term}
                    </Paragraph>
                    <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={22}>
                      {item.description}
                    </Paragraph>
                  </YStack>
                ))}
              </XStack>
            </YStack>

            <YStack gap="$4">
              <Paragraph fontWeight="800" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$5">
                Musical Grammar
              </Paragraph>
              <XStack gap="$3" flexWrap="wrap">
                {grammarTerms.map((item) => (
                  <YStack
                    key={item.term}
                    gap="$2"
                    padding="$4"
                    borderRadius="$radius.10"
                    backgroundColor={cardBg}
                    borderWidth={1}
                    borderColor={cardBorder}
                    maxWidth={420}
                    flexGrow={1}
                  >
                    <Paragraph fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'}>
                      {item.term}
                    </Paragraph>
                    <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={22}>
                      {item.description}
                    </Paragraph>
                  </YStack>
                ))}
              </XStack>
            </YStack>

            <YStack gap="$4">
              <Paragraph fontWeight="800" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$5">
                Raga Types
              </Paragraph>
              <XStack gap="$3" flexWrap="wrap">
                {scaleTypes.map((item) => (
                  <YStack
                    key={item.term}
                    gap="$2"
                    padding="$4"
                    borderRadius="$radius.10"
                    backgroundColor={cardBg}
                    borderWidth={1}
                    borderColor={cardBorder}
                    maxWidth={420}
                    flexGrow={1}
                  >
                    <Paragraph fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'}>
                      {item.term}
                    </Paragraph>
                    <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={22}>
                      {item.description}
                    </Paragraph>
                  </YStack>
                ))}
              </XStack>
            </YStack>

            <XStack gap="$3" flexWrap="wrap">
              {featureSections.map((item) => (
                <YStack
                  key={item.title}
                  gap="$2"
                  padding="$4"
                  borderRadius="$radius.10"
                  backgroundColor={cardBg}
                  borderWidth={1}
                  borderColor={cardBorder}
                  maxWidth={420}
                  flexGrow={1}
                >
                  <H3 fontFamily="$heading" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$5">
                    {item.title}
                  </H3>
                  <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={22} fontSize="$3">
                    {item.description}
                  </Paragraph>
                </YStack>
              ))}
            </XStack>

            <YStack
              id="melakarta-72"
              gap="$4"
              padding="$5"
              borderRadius="$radius.12"
              backgroundColor={isDark ? 'rgba(255,255,255,0.05)' : '$surface'}
              borderWidth={1}
              borderColor={heroBorder}
              shadowColor={isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}
              shadowRadius={10}
              shadowOffset={{ width: 0, height: 4 }}
              $sm={{ padding: '$4' }}
            >
              <H3 fontFamily="$heading" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$5">
                72 Melakarthas
              </H3>

              <Paragraph fontWeight="700" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$4">
                Suddha Madhyamam (M1) — Melakarta Ragas 1–36
              </Paragraph>
              <YStack borderWidth={1} borderColor={cardBorder} borderRadius="$radius.10" overflow="hidden">
                <XStack
                  backgroundColor={cardBg}
                  borderBottomWidth={1}
                  borderColor={cardBorder}
                  paddingVertical="$2"
                  paddingHorizontal="$3"
                  gap="$2"
                >
                  <Paragraph flexBasis="30%" flexGrow={1} fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'} fontSize="$2">
                    Chakra
                  </Paragraph>
                  <Paragraph flexBasis="70%" flexGrow={1} fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'} fontSize="$2">
                    Ragas
                  </Paragraph>
                </XStack>
                {melakartaM1.map((row) => (
                  <XStack
                    key={row.chakra}
                    borderBottomWidth={1}
                    borderColor={cardBorder}
                    paddingVertical="$2"
                    paddingHorizontal="$3"
                    gap="$2"
                  >
                    <Paragraph flexBasis="30%" flexGrow={1} color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$2">
                      {row.chakra}
                    </Paragraph>
                    <Paragraph flexBasis="70%" flexGrow={1} color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$2">
                      {row.ragas.join(', ')}
                    </Paragraph>
                  </XStack>
                ))}
              </YStack>

              <Paragraph fontWeight="700" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$4" marginTop="$2">
                Prati Madhyamam (M2) — Melakarta Ragas 37–72
              </Paragraph>
              <YStack borderWidth={1} borderColor={cardBorder} borderRadius="$radius.10" overflow="hidden">
                <XStack
                  backgroundColor={cardBg}
                  borderBottomWidth={1}
                  borderColor={cardBorder}
                  paddingVertical="$2"
                  paddingHorizontal="$3"
                  gap="$2"
                >
                  <Paragraph flexBasis="30%" flexGrow={1} fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'} fontSize="$2">
                    Chakra
                  </Paragraph>
                  <Paragraph flexBasis="70%" flexGrow={1} fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'} fontSize="$2">
                    Ragas
                  </Paragraph>
                </XStack>
                {melakartaM2.map((row) => (
                  <XStack
                    key={row.chakra}
                    borderBottomWidth={1}
                    borderColor={cardBorder}
                    paddingVertical="$2"
                    paddingHorizontal="$3"
                    gap="$2"
                  >
                    <Paragraph flexBasis="30%" flexGrow={1} color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$2">
                      {row.chakra}
                    </Paragraph>
                    <Paragraph flexBasis="70%" flexGrow={1} color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$2">
                      {row.ragas.join(', ')}
                    </Paragraph>
                  </XStack>
                ))}
              </YStack>
            </YStack>

          </YStack>


            <YStack
              gap="$4"
              padding="$5"
              borderRadius="$radius.12"
              backgroundColor={isDark ? 'rgba(255,255,255,0.05)' : '$surface'}
              borderWidth={1}
              borderColor={heroBorder}
              shadowColor={isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}
              shadowRadius={10}
              shadowOffset={{ width: 0, height: 4 }}
              $sm={{ padding: '$4' }}
            >
              <Paragraph fontFamily="$heading" fontSize="$7" color={isDark ? '#FFFFFF' : '$primaryDeep'}>
                Discover & Learn Indian Classical Ragas
              </Paragraph>
              <Paragraph fontFamily="$heading" fontSize="$5" color={isDark ? '#FFFFFF' : '$primary'}>
                Carnatic & Hindustani Music Exploration Platform
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                RagaNidhi.com is a knowledge-driven platform dedicated to the discovery, learning, and intelligent exploration of Indian classical music ragas, spanning both Carnatic and Hindustani traditions.
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                RagaNidhi enables musicians, students, researchers, and rasikas to deeply understand ragas through theory, structure, rasa (emotion), arohana–avarohana, characteristic phrases (prayogas), and historical context, presented in a modern, accessible way.
              </Paragraph>

              <Paragraph fontWeight="800" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$5">
                What Do We Offer?
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                🎵 Comprehensive Raga Discovery
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                Explore hundreds of Carnatic and Hindustani ragas
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                Detailed raga lakshana, swara structure, scales, and classifications
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                Clear presentation of traditional concepts for modern learners
              </Paragraph>

              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                🧠 Intelligent Raga Search & Exploration
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                Search ragas by swaras, scale patterns, mood (rasa), or musical traits
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                AI-assisted discovery for learners, performers, and composers
              </Paragraph>

              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                📚 Learning-Oriented Knowledge Base
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                Beginner-friendly explanations alongside advanced insights
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                Bridges traditional musicology with contemporary understanding
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                Ideal for self-learners and guided learning environments
              </Paragraph>

              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                🌍 Global & Inclusive Platform
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                Designed for a worldwide audience of Indian classical music enthusiasts
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                Content inspired by authentic sources, performance practice, and research
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                Encourages curiosity, experimentation, and deeper musical listening
              </Paragraph>

              <Paragraph fontWeight="800" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$5">
                Who Is RagaNidhi For?
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                Students of Carnatic and Hindustani music
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                Performing artists and composers
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                Music teachers and researchers
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                Rasikas seeking deeper raga understanding
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                Technologists exploring music, AI, and culture
              </Paragraph>

              <Paragraph fontWeight="800" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$5">
                Our Mission
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                RagaNidhi is an open-ended educational and cultural initiative dedicated to bringing Indian classical music ragas closer to everyone who approaches with open ears.
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                It aims to connect tradition and technology, enabling discovery, learning, and appreciation of ragas across systems, without boundaries.
              </Paragraph>

              <Paragraph fontWeight="800" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$5">
                Contact
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                📧 Email: shankar.maruvada@gmail.com
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
                For collaboration, feedback, or inquiries related to RagaNidhi.
              </Paragraph>
            </YStack>


        </YStack>
      </PageContainer>

      <Footer />
    </YStack>
  );
};
