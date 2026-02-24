import { ExternalLink, Github } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  demo?: string
  featured?: boolean
}

export function ProjectCard({ title, description, tags, github, demo, featured }: Project) {
  return (
    <Card className={`flex flex-col h-full group ${featured ? 'ring-1 ring-purple-500/40' : ''}`}>
      {featured && (
        <div className="px-6 pt-4">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
            ⭐ Featured
          </span>
        </div>
      )}
      <CardHeader className={featured ? 'pt-2' : ''}>
        <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <div className="flex gap-3 mt-auto pt-2">
          {github && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(github, '_blank')}
              className="gap-2"
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </Button>
          )}
          {demo && (
            <Button
              variant="default"
              size="sm"
              onClick={() => window.open(demo, '_blank')}
              className="gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Demo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
