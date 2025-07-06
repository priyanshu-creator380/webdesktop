import { Window } from '../layout/Window';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const images = [
  { src: "https://images.unsplash.com/photo-1646583288948-24548aedffd8", alt: "AI Technology Concept" },
  { src: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d", alt: "Team Collaboration" },
  { src: "https://images.unsplash.com/photo-1563974604538-67f52beb353a", alt: "Research Lab" },
  { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", alt: "Tech Team" },
  { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", alt: "AI Robot" },
  { src: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68", alt: "AI Server Room" },
  { src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1", alt: "Programmer at Work" },
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475", alt: "Machine Learning Concept" },
  { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", alt: "AI Robot" },
  { src: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68", alt: "AI Server Room" },
  { src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1", alt: "Programmer at Work" },
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475", alt: "Machine Learning Concept" }
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Window id="gallery" title="Gallery">
      {/* Masonry Grid Layout */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative mb-4 overflow-hidden rounded-lg cursor-pointer shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedImage(image.src)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-cover rounded-md"
            />
          </motion.div>
        ))}
      </div>

      {/* Full-Screen Image Modal with Spacing */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-6xl w-full h-full flex items-center justify-center bg-black p-6">
          {selectedImage && (
            <motion.img 
              key={selectedImage} 
              src={selectedImage} 
              alt="Full-screen preview"
              className="w-auto max-w-full h-[90vh] rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.1 }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Window>
  );
}
