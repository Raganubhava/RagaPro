import { useEffect, useMemo, useState } from 'react';
import { Paragraph, Spinner, XStack, YStack } from 'tamagui';
import { PageContainer } from 'ui';
import { FAST_API_ENDPOINTS } from './fastApi';

type KalyaniResponse = {
  content?: unknown;
  quiz?: unknown;
  blocks?: Array<{
    id?: number | string;
    title?: string;
    content?: unknown;
    quiz?: unknown;
    quizIds?: unknown;
  }>;
  quizIds?: unknown;
  quizzes?: Array<{
    id?: number | string;
    blockId?: number | string;
    question?: string;
    options?: string[];
    answer?: number | string | null;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
};

const prettyValue = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return value.map(prettyValue).filter(Boolean).join('\n');
  if (value && typeof value === 'object') return JSON.stringify(value, null, 2);
  return '';
};

const renderBlock = (value: unknown, textColor = '#FFFFFF') => {
  if (value == null) return <Paragraph color="#D7DCEE">No data available.</Paragraph>;

  if (Array.isArray(value)) {
    const lines = value.map((item) => prettyValue(item)).filter(Boolean);
    if (lines.length === 0) {
      return <Paragraph color="#D7DCEE">No data available.</Paragraph>;
    }
    return (
      <YStack gap="$3">
        {lines.map((line, index) => (
          <Paragraph key={`${index}-${line.slice(0, 12)}`} color={textColor} fontSize="$4" lineHeight={28}>
            {line}
          </Paragraph>
        ))}
      </YStack>
    );
  }

  const text = prettyValue(value);
  if (!text) return <Paragraph color="#D7DCEE">No data available.</Paragraph>;

  return (
    <Paragraph color={textColor} fontSize="$4" lineHeight={28} whiteSpace="pre-wrap">
      {text}
    </Paragraph>
  );
};

type LessonBlock = {
  id: number;
  title: string;
  content: unknown;
  quiz: unknown;
};

type QuizRow = {
  label: string;
  value: string;
};

type QuizItem = {
  id?: number | string;
  blockId?: number | string;
  question?: string;
  options?: string[];
  answer?: number | string | null;
  [key: string]: unknown;
};

const normalizeId = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const buildQuizMap = (quizIds: unknown): Map<number, unknown> => {
  const map = new Map<number, unknown>();
  if (!quizIds) return map;

  if (Array.isArray(quizIds)) {
    quizIds.forEach((item) => {
      if (!item || typeof item !== 'object') return;
      const record = item as Record<string, unknown>;
      const id = normalizeId(record.blockId ?? record.block_id ?? record.id ?? record.block);
      if (id === null) return;
      const quiz = record.quiz ?? record.quizData ?? record.data ?? record.questions ?? record.items ?? record.content;
      if (quiz !== undefined) {
        map.set(id, quiz);
      }
    });
    return map;
  }

  if (quizIds && typeof quizIds === 'object') {
    Object.entries(quizIds as Record<string, unknown>).forEach(([key, value]) => {
      const id = normalizeId(key);
      if (id !== null) {
        map.set(id, value);
      }
    });
  }
  return map;
};

const buildQuizzesByBlockId = (quizzes: KalyaniResponse['quizzes']): Map<number, unknown[]> => {
  const map = new Map<number, unknown[]>();
  if (!quizzes) return map;
  quizzes.forEach((quiz) => {
    const blockId = normalizeId(quiz?.blockId);
    if (blockId === null) return;
    const existing = map.get(blockId) ?? [];
    existing.push(quiz);
    map.set(blockId, existing);
  });
  return map;
};

const buildQuizzesById = (quizzes: KalyaniResponse['quizzes']): Map<number, unknown> => {
  const map = new Map<number, unknown>();
  if (!quizzes) return map;
  quizzes.forEach((quiz) => {
    const id = normalizeId(quiz?.id);
    if (id === null) return;
    map.set(id, quiz);
  });
  return map;
};

const resolveQuizForBlock = (
  block: { id?: number | string; quiz?: unknown; quizIds?: unknown },
  fallbackId: number,
  quizzesByBlockId: Map<number, unknown[]>,
  quizzesById: Map<number, unknown>
) => {
  if (block.quiz !== undefined) return block.quiz;
  const id = normalizeId(block.id) ?? fallbackId;
  if (block.quizIds !== undefined) {
    if (Array.isArray(block.quizIds)) {
      const resolved = block.quizIds
        .map((quizId) => normalizeId(quizId))
        .filter((quizId): quizId is number => quizId !== null)
        .map((quizId) => quizzesById.get(quizId))
        .filter(Boolean);
      return resolved;
    }
    const singleId = normalizeId(block.quizIds);
    if (singleId !== null) {
      return quizzesById.get(singleId) ?? '';
    }
  }
  const quizList = quizzesByBlockId.get(id);
  return quizList ?? '';
};

const buildQuizRows = (quiz: unknown): QuizRow[] => {
  if (!quiz) return [];
  if (Array.isArray(quiz)) {
    return quiz.map((item, index) => {
      if (item && typeof item === 'object') {
        const q = item as Record<string, unknown>;
        const question = typeof q.question === 'string' ? q.question : prettyValue(q.question);
        const options = Array.isArray(q.options) ? q.options : [];
        const answer = q.answer;
        const answerIndex = typeof answer === 'number' ? answer : null;
        const answerText =
          answerIndex !== null && options[answerIndex] ? options[answerIndex] : answerIndex !== null ? String(answerIndex) : '';
        const optionLines = options.length
          ? options.map((opt, i) => `  ${i + 1}. ${opt}`).join('\n')
          : '';
        const valueParts = [
          question ? `Q: ${question}` : '',
          optionLines ? `Options:\n${optionLines}` : '',
          answerText ? `Answer: ${answerText}` : '',
        ].filter(Boolean);
        return {
          label: `Q${index + 1}`,
          value: valueParts.join('\n'),
        };
      }
      return {
        label: `Q${index + 1}`,
        value: prettyValue(item),
      };
    });
  }
  if (quiz && typeof quiz === 'object') {
    return Object.entries(quiz).map(([key, value]) => ({
      label: key,
      value: prettyValue(value),
    }));
  }
  const text = prettyValue(quiz);
  return text ? [{ label: 'Quiz', value: text }] : [];
};

const isQuizItemList = (quiz: unknown): quiz is QuizItem[] =>
  Array.isArray(quiz) && quiz.some((item) => item && typeof item === 'object' && 'question' in (item as object));

export const LearnKalyaniPage = () => {
  const [data, setData] = useState<KalyaniResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [openQuiz, setOpenQuiz] = useState<Record<number, boolean>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(FAST_API_ENDPOINTS.learnKalyani);
        if (!res.ok) {
          return;
        }
        const json = (await res.json()) as KalyaniResponse;
        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        // Silent failure: don't surface errors for the optional feature.
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const blocks = useMemo<LessonBlock[]>(() => {
    if (!data) return [];

    const quizMap = buildQuizMap(data.quizIds);
    const quizzesByBlockId = buildQuizzesByBlockId(data.quizzes);
    const quizzesById = buildQuizzesById(data.quizzes);

    if (Array.isArray(data.blocks)) {
      return data.blocks.map((block, index) => ({
        id: normalizeId(block.id) ?? index + 1,
        title: block.title ?? `Block ${index + 1}`,
        content: block.content ?? '',
        quiz:
          resolveQuizForBlock(block, index + 1, quizzesByBlockId, quizzesById) ??
          quizMap.get(normalizeId(block.id) ?? index + 1) ??
          '',
      }));
    }

    const collected: LessonBlock[] = [];
    for (let i = 1; i <= 8; i += 1) {
      const content =
        data[`block${i}`] ??
        data[`block_${i}`] ??
        data[`block${i}_content`] ??
        data[`block${i}Content`] ??
        data[`block${i}Text`];
      const quiz =
        data[`block${i}_quiz`] ??
        data[`block${i}Quiz`] ??
        data[`block${i}Questions`] ??
        data[`quiz${i}`];
      if (content !== undefined || quiz !== undefined) {
        collected.push({
          id: i,
          title: `Block ${i}`,
          content: content ?? '',
          quiz: quiz ?? quizzesByBlockId.get(i) ?? quizMap.get(i) ?? '',
        });
      }
    }

    if (collected.length > 0) return collected;

    // Fallback to single content/quiz if no blocks exist.
    const contentValue = data.content ?? data.lesson ?? data.text ?? data.body ?? '';
    const quizValue = data.quiz ?? data.questions ?? data.assessment ?? '';
    if (contentValue || quizValue) {
      return [
        {
          id: 1,
          title: 'Block 1',
          content: contentValue,
          quiz: quizValue,
        },
      ];
    }
    return [];
  }, [data]);

  return (
    <YStack
      minHeight="100vh"
      backgroundColor="#0B1538"
      color="#FFFFFF"
      style={{
        backgroundImage:
          'radial-gradient(1200px 700px at 8% 0%, rgba(120,200,255,0.18), transparent 60%), radial-gradient(900px 500px at 92% 12%, rgba(255,190,230,0.14), transparent 60%), radial-gradient(800px 500px at 50% 100%, rgba(140,255,210,0.10), transparent 60%), linear-gradient(180deg, #0B1538 0%, #101B45 100%)',
      }}
    >
      <PageContainer>
        <YStack gap="$6" paddingVertical="$7" maxWidth={1100} alignSelf="center" width="100%">
          <YStack
            padding="$6"
            borderRadius="$radius.12"
            backgroundColor="rgba(255,255,255,0.06)"
            borderWidth={1}
            borderColor="rgba(255,255,255,0.18)"
            shadowColor="rgba(0,0,0,0.4)"
            shadowRadius={18}
            shadowOffset={{ width: 0, height: 8 }}
            gap="$3"
          >
            <Paragraph
              fontFamily="$heading"
              fontSize="$9"
              color="#FFFFFF"
              letterSpacing={0.6}
            >
              Kalyani Raga
            </Paragraph>
          </YStack>

          {loading && (
            <XStack alignItems="center" gap="$3">
              <Spinner size="large" color="$primary" />
              <Paragraph color="#D7DCEE">Loading lesson...</Paragraph>
            </XStack>
          )}

          {error && !loading && null}

          {!loading && !error && (
            <YStack gap="$5">
              {blocks.length === 0 ? (
                <Paragraph color="#D7DCEE">No lesson blocks found.</Paragraph>
              ) : (
                blocks.map((block) => (
                  <YStack
                    key={block.id}
                    padding="$5"
                    gap="$4"
                    borderRadius="$radius.12"
                    borderWidth={1}
                    borderColor="rgba(255,255,255,0.2)"
                    backgroundColor="rgba(255,255,255,0.07)"
                    shadowColor="rgba(0,0,0,0.35)"
                    shadowRadius={16}
                    shadowOffset={{ width: 0, height: 8 }}
                    style={{
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    <XStack alignItems="center" justifyContent="space-between" flexWrap="wrap" gap="$3">
                      <Paragraph fontFamily="$heading" fontSize="$6" color="#FFFFFF">
                        {block.title}
                      </Paragraph>
                      <Paragraph
                        paddingHorizontal="$3"
                        paddingVertical="$2"
                        borderRadius="$radius.10"
                        backgroundColor="rgba(88,129,255,0.18)"
                        borderWidth={1}
                        borderColor="rgba(88,129,255,0.35)"
                        color="#DDE6FF"
                        fontSize="$2"
                        letterSpacing={0.3}
                      >
                        Lesson Block {block.id}
                      </Paragraph>
                    </XStack>
                    <XStack gap="$4" flexWrap="wrap">
                      <YStack
                        flex={1}
                        minWidth={280}
                        borderRadius="$radius.10"
                        borderWidth={1}
                        borderColor="rgba(255,255,255,0.14)"
                        padding="$4"
                        gap="$2"
                        backgroundColor="rgba(12,20,48,0.8)"
                        style={{
                          backgroundImage:
                            'linear-gradient(135deg, rgba(88,129,255,0.12), rgba(12,20,48,0.8))',
                        }}
                      >
                        <Paragraph fontWeight="700" color="#FFFFFF" fontSize="$5">
                          Content
                        </Paragraph>
                        {renderBlock(block.content)}
                      </YStack>
                      <YStack
                        flex={1}
                        minWidth={280}
                        borderRadius="$radius.10"
                        borderWidth={1}
                        borderColor="rgba(255,255,255,0.18)"
                        padding="$4"
                        gap="$2"
                        backgroundColor="#0E1A45"
                      >
                        <XStack alignItems="center" justifyContent="space-between" gap="$2">
                          <Paragraph fontWeight="800" color="#FFFFFF" fontSize="$5">
                            Quiz
                          </Paragraph>
                          {block.id === 3 && (
                            <Paragraph
                              role="button"
                              onPress={() => {
                                window.location.href = '/practice/kalyani';
                              }}
                              color="#D7DCEE"
                              fontWeight="700"
                              fontSize="$3"
                            >
                              Start Practice
                            </Paragraph>
                          )}
                          <Paragraph
                            role="button"
                            onPress={() => {
                              setOpenQuiz((prev) => ({ ...prev, [block.id]: !prev[block.id] }));
                            }}
                            color="#D7DCEE"
                            fontWeight="700"
                            fontSize="$3"
                          >
                            {openQuiz[block.id] ? 'Hide' : 'Show'}
                          </Paragraph>
                        </XStack>
                        {openQuiz[block.id] && (
                          <YStack
                            marginTop="$2"
                            borderRadius="$radius.8"
                            borderWidth={1}
                            borderColor="rgba(255,255,255,0.14)"
                            overflow="hidden"
                          >
                            {isQuizItemList(block.quiz) ? (
                              <YStack gap="$3" padding="$3">
                                {block.quiz.map((item, index) => {
                                  const questionId = String(item.id ?? `${block.id}-${index}`);
                                  const options = Array.isArray(item.options) ? item.options : [];
                                  const selected = selectedOptions[questionId];
                                  const answerIndex =
                                    typeof item.answer === 'number'
                                      ? item.answer
                                      : typeof item.answer === 'string'
                                        ? Number(item.answer)
                                        : null;
                                  const answerText =
                                    answerIndex !== null && Number.isFinite(answerIndex) && options[answerIndex]
                                      ? options[answerIndex]
                                      : null;
                                  return (
                                    <YStack
                                      key={questionId}
                                      gap="$2"
                                      padding="$3"
                                      borderRadius="$radius.8"
                                      backgroundColor="rgba(255,255,255,0.04)"
                                      borderWidth={1}
                                      borderColor="rgba(255,255,255,0.12)"
                                      animation="bouncy"
                                      hoverStyle={{ transform: [{ scale: 1.01 }] }}
                                      pressStyle={{ transform: [{ scale: 0.99 }] }}
                                    >
                                      <XStack alignItems="center" gap="$2">
                                        <Paragraph fontSize="$5">🎵</Paragraph>
                                        <Paragraph color="#FFFFFF" fontWeight="700" fontSize="$4">
                                          {item.question ?? `Question ${index + 1}`}
                                        </Paragraph>
                                      </XStack>
                                      {options.length > 0 ? (
                                        <YStack gap="$2">
                                          {options.map((option, optionIndex) => {
                                            const isSelected = selected === optionIndex;
                                            return (
                                              <XStack
                                                key={`${questionId}-${optionIndex}`}
                                                alignItems="center"
                                                gap="$2"
                                                padding="$2"
                                                borderRadius="$radius.6"
                                                backgroundColor={isSelected ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.06)'}
                                                borderWidth={1}
                                                borderColor={isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.18)'}
                                                onPress={() => {
                                                  setSelectedOptions((prev) => ({
                                                    ...prev,
                                                    [questionId]: optionIndex,
                                                  }));
                                                }}
                                              >
                                                <XStack
                                                  width={18}
                                                  height={18}
                                                  borderRadius={9}
                                                  borderWidth={2}
                                                  borderColor={isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.6)'}
                                                  alignItems="center"
                                                  justifyContent="center"
                                                >
                                                  {isSelected && (
                                                    <XStack
                                                      width={8}
                                                      height={8}
                                                      borderRadius={4}
                                                      backgroundColor="#FFFFFF"
                                                    />
                                                  )}
                                                </XStack>
                                                <Paragraph color="#FFFFFF" flex={1}>
                                                  {option}
                                                </Paragraph>
                                              </XStack>
                                            );
                                          })}
                                          <XStack alignItems="center" justifyContent="space-between" marginTop="$2">
                                            <Paragraph color="#D7DCEE" fontSize="$3">
                                              {selected !== undefined ? 'Selection saved.' : 'Select an option.'}
                                            </Paragraph>
                                            <XStack
                                              paddingVertical="$1"
                                              paddingHorizontal="$3"
                                              borderRadius="$radius.6"
                                              backgroundColor="rgba(255,255,255,0.12)"
                                              borderWidth={1}
                                              borderColor="rgba(255,255,255,0.24)"
                                              onPress={() => {
                                                if (selected === undefined) return;
                                                setShowAnswers((prev) => ({
                                                  ...prev,
                                                  [questionId]: !prev[questionId],
                                                }));
                                              }}
                                            >
                                              <Paragraph color="#FFFFFF" fontWeight="700" fontSize="$3">
                                                {showAnswers[questionId] ? 'Hide answer' : 'Show answer'}
                                              </Paragraph>
                                            </XStack>
                                          </XStack>
                                          {showAnswers[questionId] && (
                                            <YStack
                                              marginTop="$2"
                                              padding="$2"
                                              borderRadius="$radius.6"
                                              backgroundColor="#F4C430"
                                            >
                                              <Paragraph color="#1C1400" fontWeight="800" fontSize="$3">
                                                {answerIndex !== null && selected !== undefined
                                                  ? selected === answerIndex
                                                    ? 'Correct'
                                                    : 'Wrong'
                                                  : 'Answer'}
                                                {selected !== undefined && options[selected]
                                                  ? ` — Your choice: ${options[selected]}`
                                                  : ''}
                                              </Paragraph>
                                              <Paragraph color="#1C1400" fontWeight="700" fontSize="$3">
                                                Correct answer: {answerText ?? 'Not provided'}
                                              </Paragraph>
                                            </YStack>
                                          )}
                                        </YStack>
                                      ) : (
                                        <YStack gap="$2" alignSelf="flex-start">
                                          <Paragraph color="#D7DCEE" fontSize="$3">
                                            Click, listen and sing along with the notes.
                                          </Paragraph>
                                          {block.id === 3 && (
                                            <XStack
                                              backgroundColor="$primary"
                                              borderRadius="$radius.8"
                                              paddingVertical="$1"
                                              paddingHorizontal="$3"
                                              hoverStyle={{ backgroundColor: '$primaryActive' }}
                                              pressStyle={{ backgroundColor: '$primaryActive' }}
                                              onPress={() => {
                                                window.location.href = '/practice/kalyani';
                                              }}
                                            >
                                              <Paragraph color="$background" fontWeight="700" fontSize="$2">
                                                Start Practice
                                              </Paragraph>
                                            </XStack>
                                          )}
                                        </YStack>
                                      )}
                                    </YStack>
                                  );
                                })}
                              </YStack>
                            ) : (
                              <>
                                <XStack
                                  backgroundColor="rgba(255,255,255,0.08)"
                                  paddingVertical="$2"
                                  paddingHorizontal="$3"
                                  justifyContent="space-between"
                                  gap="$3"
                                >
                                  <Paragraph color="#FFFFFF" fontWeight="700" fontSize="$3" width={90}>
                                    Item
                                  </Paragraph>
                                  <Paragraph color="#FFFFFF" fontWeight="700" fontSize="$3" flex={1}>
                                    Details
                                  </Paragraph>
                                </XStack>
                                {buildQuizRows(block.quiz).map((row, index) => (
                                  <XStack
                                    key={`${block.id}-${row.label}-${index}`}
                                    paddingVertical="$2"
                                    paddingHorizontal="$3"
                                    gap="$3"
                                    backgroundColor={index % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)'}
                                  >
                                    <Paragraph color="#D7DCEE" fontWeight="700" fontSize="$3" width={90}>
                                      {row.label}
                                    </Paragraph>
                                    <Paragraph color="#FFFFFF" fontSize="$3" flex={1} whiteSpace="pre-wrap">
                                      {row.value || '--'}
                                    </Paragraph>
                                  </XStack>
                                ))}
                                {buildQuizRows(block.quiz).length === 0 && (
                                  <XStack paddingVertical="$3" paddingHorizontal="$3">
                                    <Paragraph color="#D7DCEE" fontSize="$3">
                                      No quiz data available.
                                    </Paragraph>
                                  </XStack>
                                )}
                              </>
                            )}
                          </YStack>
                        )}
                      </YStack>
                    </XStack>
                  </YStack>
                ))
              )}
            </YStack>
          )}
        </YStack>
      </PageContainer>
    </YStack>
  );
};
