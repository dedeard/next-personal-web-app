export interface SkillGroup {
  label: string
  items: string[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MDX', 'Vite'] },
  { label: 'Backend', items: ['Node.js', 'NestJS', 'Express', 'Laravel', 'Firebase', 'MongoDB', 'MySQL'] },
  { label: 'Cloud & DevOps', items: ['AWS', 'Serverless', 'Docker', 'REST APIs'] },
  { label: 'Workflow', items: ['AI Prompting', 'SEO', 'Git'] },
]

export const FEATURED_SKILLS = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'NestJS',
  'Laravel',
  'Firebase',
  'MongoDB',
  'AWS',
  'Docker',
  'AI Prompting',
]
