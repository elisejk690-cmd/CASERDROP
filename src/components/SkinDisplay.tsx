import { Skin } from '../data/skins';

interface SkinDisplayProps {
  skin: Skin;
  size?: 'sm' | 'md' | 'lg';
}

// Helper function to check if image is a URL
function isImageUrl(image: string): boolean {
  return image.startsWith('http') || image.startsWith('data:image');
}

export default function SkinDisplay({ skin, size = 'md' }: SkinDisplayProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  // Rare Special Item - golden star effect
  if (skin.type === 'rare_special') {
    return (
      <div className={`${sizeClasses[size]} relative overflow-hidden rounded`}>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent animate-shimmer" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl animate-spin-slow">⭐</span>
        </div>
      </div>
    );
  }

  // Signature item - golden paper effect (MUST be checked FIRST, before URL check)
  if (skin.type === 'signature' && !isImageUrl(skin.image)) {
    return (
      <div className={`${sizeClasses[size]} relative overflow-hidden rounded`}>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent animate-shimmer" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white drop-shadow-lg" style={{ textShadow: '0 0 10px rgba(255,215,0,0.8)' }}>
            ✍️
          </span>
        </div>
      </div>
    );
  }

  // If it's a URL, show image
  if (isImageUrl(skin.image)) {
    return (
      <div className={`${sizeClasses[size]} overflow-hidden rounded`}>
        <img src={skin.image} alt={skin.name} className="w-full h-full object-cover" />
      </div>
    );
  }

  // Gloves - fabric texture effect
  if (skin.type === 'glove') {
    return (
      <div className={`${sizeClasses[size]} relative overflow-hidden rounded`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${skin.gradient}`} />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
        }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">{skin.image}</span>
        </div>
      </div>
    );
  }

  // Agent - character silhouette
  if (skin.type === 'agent') {
    return (
      <div className={`${sizeClasses[size]} relative overflow-hidden rounded`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${skin.gradient}`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-8 h-8 bg-black/30 rounded-full mb-1" />
            <div className="w-10 h-6 bg-black/30 rounded-t-lg" />
          </div>
        </div>
      </div>
    );
  }

  // Music kit - vinyl record effect
  if (skin.type === 'music') {
    return (
      <div className={`${sizeClasses[size]} relative overflow-hidden rounded`}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-purple-500/50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
          </div>
        </div>
        <div className="absolute inset-0 animate-spin-slow">
          <div className="w-full h-full rounded-full border border-white/10" />
        </div>
      </div>
    );
  }

  // Keychain - metallic effect
  if (skin.type === 'keychain') {
    return (
      <div className={`${sizeClasses[size]} relative overflow-hidden rounded`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${skin.gradient}`} />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">{skin.image}</span>
        </div>
      </div>
    );
  }

  // Egg - shiny egg effect
  if (skin.type === 'egg') {
    return (
      <div className={`${sizeClasses[size]} relative overflow-hidden rounded`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${skin.gradient}`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-10 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
        </div>
      </div>
    );
  }

  // Default weapon - sleek weapon silhouette
  return (
    <div className={`${sizeClasses[size]} relative overflow-hidden rounded`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${skin.gradient}`} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-3/4 h-1/3 bg-black/40 rounded-sm transform -rotate-12" />
          <div className="absolute w-1/4 h-1/4 bg-black/40 rounded-sm transform rotate-45 -translate-x-2 translate-y-1" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent" />
    </div>
  );
}
