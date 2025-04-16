import DefaultLayout from '@/components/Layouts/DefaultLayout'
import AeriusAIChatInterface from '@/components/AeriusAIChatInterface'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aerius AI - Air Pollution Monitoring Assistant',
  description: 'Interact with Aerius AI to learn about air quality, pollution monitoring, and environmental actions.',
}

export default function AeriusAIPage() {
  return (
    <DefaultLayout>
      <AeriusAIChatInterface />
    </DefaultLayout>
  )
}