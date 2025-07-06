import { Window } from '../layout/Window';
import { content } from '@/data/content';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';

const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1581091870621-1b1a89ab0c89",
    alt: "Artificial Intelligence",
    title: "Shaping the Future with AI"
  },
  {
    src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
    alt: "Robotics Lab",
    title: "Innovation in Technology"
  },
  {
    src: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a",
    alt: "Data Science",
    title: "Data-Driven Future"
  },
  {
    src: "https://images.unsplash.com/photo-1593642634367-d91a135587b5",
    alt: "Cloud Computing",
    title: "Powering Digital Transformation"
  },
  {
    src: "https://images.unsplash.com/photo-1610484826967-986bd174c988",
    alt: "Machine Learning",
    title: "Revolutionizing Industries with ML"
  }
];

export function Introduction() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (emblaApi) {
      const interval = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [emblaApi]);

  return (
    <Window id="intro" title="Introduction to AI Lab">
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Carousel */}
        <div className="overflow-hidden rounded-lg" ref={emblaRef}>
          <div className="flex">
            {carouselImages.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 relative">
                <div className="relative h-[400px]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-8 left-8 text-white">
                      <h2 className="text-3xl font-bold mb-2">{image.title}</h2>
                      <p className="text-lg opacity-80">{image.alt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <motion.h1 
            className="text-4xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {content.intro.title}
          </motion.h1>

          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {content.intro.description}
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-card p-6 rounded-lg backdrop-blur-sm bg-opacity-50 shadow-inner shadow-cyan-900">
              <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
              <p>{content.intro.mission}</p>
            </div>

            <div className="bg-card p-6 rounded-lg backdrop-blur-sm bg-opacity-50 shadow-inner shadow-cyan-900">
              <h2 className="text-xl font-semibold mb-3">Our Vision</h2>
              <p>{content.intro.vision}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Window>
  );
}