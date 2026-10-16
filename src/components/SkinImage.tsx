import { motion } from 'framer-motion';

interface SkinImageProps {
  image: string;
  alt: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function SkinImage({ image, alt, className = '', size = 'md' }: SkinImageProps) {
  const sizeClasses = {
    sm: 'text-lg w-8 h-8',
    md: 'text-2xl w-12 h-12',
    lg: 'text-3xl w-16 h-16',
    xl: 'text-5xl w-24 h-24',
  };

  const isUrl = image.startsWith('http') || image.startsWith('data:');

  if (isUrl) {
    return (
      <img 
        src={image} 
        alt={alt}
        className={`${className} object-cover rounded`}
        style={{ width: '100%', height: '100%' }}
      />
    );
  }

  return (
    <span className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      {image}
    </span>
  );
}
