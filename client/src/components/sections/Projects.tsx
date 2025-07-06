import { Window } from '../layout/Window';
import { content } from '@/data/content';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

export function Projects() {
  return (
    <Window id="projects" title="Projects">
      <div className="space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-4">New Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.projects.new.map((project, index) => (
              <motion.div
                key={index}
                className="bg-card p-4 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 text-muted-foreground">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4">Ongoing Projects</h2>
          <div className="space-y-4">
            {content.projects.ongoing.map((project, index) => (
              <motion.div
                key={index}
                className="bg-card p-4 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 text-muted-foreground">{project.description}</p>
                <div className="mt-4">
                  <Progress value={project.progress} className="h-2" />
                  <span className="text-sm text-muted-foreground mt-1">
                    Progress: {project.progress}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4">Completed Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.projects.completed.map((project, index) => (
              <motion.div
                key={index}
                className="bg-muted p-4 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 text-muted-foreground">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </Window>
  );
}
