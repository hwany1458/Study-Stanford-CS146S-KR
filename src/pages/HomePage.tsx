import { useState, useEffect } from 'react'
import TabNav from '@/components/layout/TabNav'
import CourseDescription from '@/components/home/CourseDescription'
import InfoGrid from '@/components/home/InfoGrid'
import KrSpecialBox from '@/components/home/KrSpecialBox'
import TeamGrid from '@/components/home/TeamGrid'
import TranslatorGrid from '@/components/home/TranslatorGrid'
import WeekCard from '@/components/syllabus/WeekCard'
import FaqAccordion from '@/components/faq/FaqAccordion'
import { syllabus } from '@/content/syllabus'
import { faqItems, contactInfo } from '@/content/faq'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && ['overview', 'syllabus', 'faq'].includes(hash)) {
      setActiveTab(hash)
    }
  }, [])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    window.history.replaceState(null, '', `#${tab}`)
  }

  return (
    <>
      <TabNav activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="max-w-[1024px] mx-auto px-8 py-12">
        {activeTab === 'overview' && (
          <div>
            <KrSpecialBox />
            <CourseDescription />
            <InfoGrid />
            <TranslatorGrid />
            <TeamGrid />
          </div>
        )}

        {activeTab === 'syllabus' && (
          <div>
            <h2 className="text-[32px] font-semibold text-text-primary mb-6 pb-2 border-b-2 border-stanford-red">
              Course Schedule
            </h2>
            <div>
              {syllabus.map((week) => (
                <WeekCard key={week.number} week={week} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div>
            <h2 className="text-[32px] font-semibold text-text-primary mb-6 pb-2 border-b-2 border-stanford-red">
              Frequently Asked Questions
            </h2>
            <FaqAccordion items={faqItems} />

            {/* Contact Information */}
            <h2 className="text-[32px] font-semibold text-text-primary mb-6 pb-2 border-b-2 border-stanford-red mt-12">
              Contact Information
            </h2>
            <div className="space-y-2 text-[16px] text-text-primary">
              <p>
                <span className="font-semibold">GitHub:</span>{' '}
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stanford-red hover:underline"
                >
                  team-attention/stanford-cs146s-kr
                </a>
              </p>
              <p>
                <span className="font-semibold">Translated by:</span>{' '}
                <a
                  href={contactInfo.team}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stanford-red hover:underline"
                >
                  Team Attention
                </a>
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
