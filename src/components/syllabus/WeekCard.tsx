import type { Week } from '@/types/syllabus'
import ReadingList from './ReadingList'
import LectureList from './LectureList'

interface WeekCardProps {
  week: Week
}

export default function WeekCard({ week }: WeekCardProps) {
  // 비활성화된 주차 처리
  if (week.disabled) {
    return (
      <section className="mb-12 border-2 border-gray-300 rounded-xl px-8 pt-4 pb-8 bg-gray-50 opacity-60 cursor-not-allowed">
        {/* Week Header */}
        <h3 className="text-[20.8px] font-semibold text-gray-400 leading-[31.2px] mb-2">
          Week {week.number}: {week.title}
        </h3>
        <p className="text-gray-500 text-[16px]">
          한국어 번역은 준비 중입니다.
        </p>
      </section>
    )
  }

  return (
    <section className="mb-12 border-2 border-stanford-red rounded-xl px-8 pt-4 pb-8">
      {/* Week Header */}
      <h3 className="text-[20.8px] font-semibold text-stanford-red leading-[31.2px] mb-2">
        Week {week.number}: {week.title}
      </h3>

      {/* Week Content */}
      <div>
        {week.topics.length > 0 && (
          <div className="mb-6">
            <p className="text-[16px] font-bold text-text-primary mb-2">Topics</p>
            <ul className="pl-3 space-y-1">
              {week.topics.map((topic, i) => (
                <li key={i} className="text-[20.8px] leading-[33.28px] text-text-body">• {topic}</li>
              ))}
            </ul>
          </div>
        )}

        {week.readings.length > 0 && (
          <div className="mb-6">
            <p className="text-[16px] font-bold text-text-primary mb-2">Reading</p>
            <ReadingList readings={week.readings} weekNumber={week.number} />
          </div>
        )}

        {week.assignments.length > 0 && (
          <div className="mb-6">
            <p className="text-[16px] font-bold text-text-primary mb-2">Assignment</p>
            <ul className="pl-3 space-y-1">
              {week.assignments.map((assignment, i) => (
                <li key={i} className="text-[20.8px] leading-[33.28px] text-text-body">
                  • {assignment.url ? (
                    <a href={assignment.url} target="_blank" rel="noopener noreferrer" className="text-stanford-red underline">
                      {assignment.title}
                    </a>
                  ) : (
                    assignment.title
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {week.lectures.length > 0 && (
          <LectureList lectures={week.lectures} weekNumber={week.number} />
        )}
      </div>
    </section>
  )
}
