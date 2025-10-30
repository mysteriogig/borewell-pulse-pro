import { useEffect, useState } from 'react';

interface TankDisplayProps {
  waterLevel: number;
  tankDepth: number;
}

const TankDisplay = ({ waterLevel, tankDepth }: TankDisplayProps) => {
  const percentage = Math.min(100, Math.max(0, (waterLevel / tankDepth) * 100));
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getColorClass = () => {
    if (percentage < 20) return 'from-destructive/80 to-destructive';
    if (percentage < 50) return 'from-warning/80 to-warning';
    return 'from-primary-light to-primary';
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Tank Container */}
      <div className="relative h-80 bg-secondary/30 rounded-2xl overflow-hidden border-2 border-border shadow-card">
        {/* Water Fill */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${getColorClass()} transition-all duration-1000 ease-out`}
          style={{ height: `${animatedPercentage}%` }}
        >
          {/* Animated Waves */}
          <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
            <div className="absolute inset-0 bg-wave-gradient animate-wave opacity-40" />
            <div className="absolute inset-0 bg-wave-gradient animate-wave opacity-30" style={{ animationDelay: '-1s' }} />
          </div>

          {/* Ripple Effect */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-8 rounded-full border-2 border-white/30 animate-ripple" />
          </div>
        </div>

        {/* Measurement Lines */}
        {[0, 25, 50, 75, 100].map((mark) => (
          <div
            key={mark}
            className="absolute left-0 right-0 border-t border-border/30"
            style={{ bottom: `${mark}%` }}
          >
            <span className="absolute -left-12 -top-2 text-xs text-muted-foreground">
              {mark}%
            </span>
          </div>
        ))}

        {/* Percentage Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-water">
            <div className="text-5xl font-bold text-primary">
              {Math.round(percentage)}%
            </div>
            <div className="text-sm text-muted-foreground text-center mt-1">
              {Math.round(waterLevel)}L / {tankDepth}L
            </div>
          </div>
        </div>
      </div>

      {/* Status Label */}
      <div className="mt-4 text-center">
        <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
          percentage < 20 
            ? 'bg-destructive/10 text-destructive' 
            : percentage < 50 
            ? 'bg-warning/10 text-warning' 
            : 'bg-success/10 text-success'
        }`}>
          {percentage < 20 ? 'Critical Level' : percentage < 50 ? 'Low Level' : 'Good Level'}
        </span>
      </div>
    </div>
  );
};

export default TankDisplay;
