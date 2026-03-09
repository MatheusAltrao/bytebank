import HeroSection from '@/components/sections/hero-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof HeroSection> = {
  title: 'Seções/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-5xl mx-auto p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof HeroSection>

export const Default: Story = {}
