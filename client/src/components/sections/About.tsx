import { Window } from '../layout/Window';
import { content } from '@/data/content';
import { motion } from 'framer-motion';

export function About() {
  return (
    <Window id="about" title="About AI Club">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold mb-6">{content.about.title}</h1>
          <p className="text-lg mb-8">{content.about.inception}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-card p-6 rounded-lg shadow-inner shadow-cyan-900">
            <h2 className="text-xl font-semibold mb-4">Our Objectives</h2>
            <ul className="space-y-3">
              {content.about.objectives.map((objective, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * (index + 1) }}
                >
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  {objective}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d"
              alt="Team Collaboration"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </Window>
  );
}
