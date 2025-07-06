import { useState } from 'react';
import { Window } from '../layout/Window';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import img from "../../public/logo.png";


const content = {
  events: {
    upcoming: [
      {
        title: 'AI Workshop',
        date: '2025-03-15',
        description: 'Learn about the latest AI techniques.',
        image: "https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        title: 'Deep Learning Seminar',
        date: '2025-01-20',
        description: 'An in-depth exploration of neural networks.',
        image: 'https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        title: 'Computer Vision Talk',
        date: '2025-02-05',
        description: 'Understanding how computers see the world.',
        image: 'https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        title: 'NLP Discussion',
        date: '2025-02-15',
        description: 'Discussing recent advances in natural language processing.',
        image: '/images/ai-club-launch.jpg',
      },
      // Other upcoming events
    ],
    past: [
      {
        title: 'AI Club Launch',
        date: '2025-01-10',
        description: 'The grand opening of our AI Club!',
        image: '/images/ai-club-launch.jpg',
      },
      {
        title: 'Deep Learning Seminar',
        date: '2025-01-20',
        description: 'An in-depth exploration of neural networks.',
        image: '/images/ai-club-launch.jpg',
      },
      {
        title: 'Computer Vision Talk',
        date: '2025-02-05',
        description: 'Understanding how computers see the world.',
        image: '/images/ai-club-launch.jpg',
      },
      {
        title: 'NLP Discussion',
        date: '2025-02-15',
        description: 'Discussing recent advances in natural language processing.',
        image: '/images/ai-club-launch.jpg',
      },
      // Other past events
    ],
  },
};

interface Event {
  title: string;
  date: string;
  description: string;
  image: string;
}

export function Events() {
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllPast, setShowAllPast] = useState(false);
  
  // Define initial visible count
  const initialVisibleCount = 3;
  
  // Prepare events to display based on showAll state
  const upcomingEventsToShow = showAllUpcoming 
    ? content.events.upcoming 
    : content.events.upcoming.slice(0, initialVisibleCount);
  
  const pastEventsToShow = showAllPast 
    ? content.events.past 
    : content.events.past.slice(0, initialVisibleCount);

  return (
    <Window id="events" title="Events">
      <div className="space-y-12 p-2">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            {content.events.upcoming.length > initialVisibleCount && (
              <button
                onClick={() => setShowAllUpcoming(!showAllUpcoming)}
                className="text-primary flex items-center hover:underline transition-colors"
              >
                {showAllUpcoming ? 'Show Less' : 'View All'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEventsToShow.map((event: Event, index: number) => (
              <motion.div
                key={`upcoming-${index}`}
                className="bg-card rounded-xl  overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (index % initialVisibleCount) }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-5 flex-grow">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mt-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <p className="mt-3 text-muted-foreground">{event.description}</p>
                </div>
                <div className="p-4 pt-0">
                  <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Register Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Past Events</h2>
            {content.events.past.length > initialVisibleCount && (
              <button
                onClick={() => setShowAllPast(!showAllPast)}
                className="text-primary flex items-center hover:underline transition-colors"
              >
                {showAllPast ? 'Show Less' : 'View All'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEventsToShow.map((event: Event, index: number) => (
              <motion.div
                key={`past-${index}`}
                className="bg-muted rounded-xl overflow-hidden shadow-md hover:shadow-lg  transition-shadow duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (index % initialVisibleCount) }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-52 object-cover opacity-90"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mt-2">
                    <Clock className="w-4 h-4" />
                    <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <p className="mt-3 text-muted-foreground">{event.description}</p>
                  <button className="mt-4 text-primary hover:underline">
                    View Recap
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </Window>
  );
}