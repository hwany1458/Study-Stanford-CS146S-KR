import { Link } from 'react-router-dom'
import type { Lecture } from '@/types/syllabus'

interface LectureListProps {
  lectures: Lecture[]
  weekNumber: number
}

export default function LectureList({ lectures, weekNumber }: LectureListProps) {
  return (
    <div className="space-y-1">
      {lectures.map((lecture, i) => (
        <p key={i} className="text-[16px] leading-[24px] text-text-primary">
          <span className="font-medium">{lecture.day}: </span>

          {/* Guest speaker case */}
          {lecture.guest ? (
            <>
              <a
                href={lecture.guest.linkedIn || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stanford-red underline"
              >
                {lecture.guest.name}
              </a>
              <span>, {lecture.guest.role} </span>
              <a
                href={lecture.guest.companyUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stanford-red underline"
              >
                {lecture.guest.company}
              </a>
              {/* Co-guest speaker */}
              {lecture.coGuest && (
                <>
                  <span>, and </span>
                  <a
                    href={lecture.coGuest.linkedIn || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stanford-red underline"
                  >
                    {lecture.coGuest.name}
                  </a>
                  <span>, {lecture.coGuest.role} </span>
                  <a
                    href={lecture.coGuest.companyUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stanford-red underline"
                  >
                    {lecture.coGuest.company}
                  </a>
                </>
              )}
            </>
          ) : (
            /* Regular lecture title */
            <span>{lecture.title}</span>
          )}

          {/* Slides link */}
          {lecture.slidesUrl && (
            <>
              {' - '}
              <a
                href={lecture.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stanford-red underline"
              >
                Slides
              </a>
              {lecture.krSlidesSlug && (
                <Link
                  to={`/slides/week${weekNumber}/${lecture.krSlidesSlug}`}
                  className="ml-2 text-kr-accent hover:underline"
                >
                  [한국어]
                </Link>
              )}
            </>
          )}

          {/* Additional resources */}
          {lecture.additionalResources && lecture.additionalResources.map((resource, j) => (
            <span key={j}>
              {', '}
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stanford-red underline"
              >
                {resource.title}
              </a>
            </span>
          ))}
        </p>
      ))}
    </div>
  )
}
