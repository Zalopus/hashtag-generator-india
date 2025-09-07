'use client';

interface AdPlaceholderProps {
  className?: string;
  size?: 'banner' | 'rectangle' | 'square';
}

export default function AdPlaceholder({ className = '', size = 'banner' }: AdPlaceholderProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'banner':
        return 'h-24 w-full';
      case 'rectangle':
        return 'h-60 w-80';
      case 'square':
        return 'h-60 w-60';
      default:
        return 'h-24 w-full';
    }
  };

  return (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${getSizeClasses()} ${className}`}>
      <div className="text-center text-gray-500">
        <div className="text-sm font-medium">Advertisement Space</div>
        <div className="text-xs">Google Ads Integration Ready</div>
      </div>
    </div>
  );
}
