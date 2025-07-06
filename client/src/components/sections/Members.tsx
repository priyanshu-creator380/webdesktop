import { Window } from '../layout/Window';
import { content } from '@/data/content';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function Members() {
  return (
    <Window id="members" title="Members">
      <div className="space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">Faculty Head</h2>
          <div className="bg-card p-6 rounded-lg flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{content.members.faculty.name}</h3>
              <p className="text-muted-foreground">{content.members.faculty.title}</p>
              <p className="mt-2">{content.members.faculty.background}</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">Current Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.members.current.map((member, index) => (
              <motion.div
                key={index}
                className="bg-card p-4 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Avatar className="w-12 h-12 mb-3">
                  <AvatarFallback>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
                <p className="text-sm mt-1">Focus: {member.focus}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6">Previous Leads</h2>
          <div className="space-y-4">
            {content.members.previous.map((member, index) => (
              <motion.div
                key={index}
                className="bg-muted p-4 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.period}</p>
                <p className="mt-2">{member.achievement}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </Window>
  );
}
