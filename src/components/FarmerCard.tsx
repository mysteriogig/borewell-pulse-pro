import { User, Droplet, AlertCircle } from 'lucide-react';

interface FarmerCardProps {
  name: string;
  email: string;
  quota: number;
  currentUsage: number;
}

const FarmerCard = ({ name, email, quota, currentUsage }: FarmerCardProps) => {
  const usagePercentage = (currentUsage / quota) * 100;
  const isExceeded = currentUsage > quota;
  const remaining = quota - currentUsage;

  return (
    <div className={`bg-card rounded-xl p-4 shadow-card border-2 transition-all hover:shadow-water ${
      isExceeded ? 'border-destructive' : 'border-border'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
        {isExceeded && (
          <AlertCircle className="w-5 h-5 text-destructive animate-pulse" />
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Daily Quota</span>
          <span className="font-medium text-foreground">{quota}L</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Current Usage</span>
          <span className={`font-medium ${isExceeded ? 'text-destructive' : 'text-foreground'}`}>
            {currentUsage}L
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Remaining</span>
          <span className={`font-medium ${isExceeded ? 'text-destructive' : 'text-success'}`}>
            {remaining}L
          </span>
        </div>

        {/* Usage Bar */}
        <div className="mt-3">
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isExceeded ? 'bg-destructive' : 'bg-primary'
              }`}
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>0%</span>
            <span className={isExceeded ? 'text-destructive font-medium' : ''}>
              {Math.round(usagePercentage)}%
            </span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerCard;
