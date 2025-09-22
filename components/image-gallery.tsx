"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ImageData {
  src: string
  alt: string
  caption: string
}

interface ImageGalleryProps {
  images: ImageData[]
  className?: string
}

export function ImageGallery({ images, className = "" }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }
  }

  return (
    <>
      <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-sm font-medium text-balance">{image.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <Image
                  src={images[selectedImage].src || "/placeholder.svg"}
                  alt={images[selectedImage].alt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
                <p className="text-white text-lg font-medium text-balance">{images[selectedImage].caption}</p>
                <p className="text-white/70 text-sm mt-1">{images[selectedImage].alt}</p>
              </div>

              {/* Navigation */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                onClick={prevImage}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                onClick={nextImage}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Close button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
