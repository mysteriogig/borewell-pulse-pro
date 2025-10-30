import { AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react';

export type AlertType = 'error' | 'warning' | 'info' | 'success';

interface AlertCardProps {
  type: AlertType;
  title: string;
  message: string;
  timestamp: string;
}

const AlertCard = ({ type, title, message, timestamp }: AlertCardProps) => {
  const config = {
    error: {
      icon: AlertCircle,
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive',
      textColor: 'text-destructive',
      iconColor: 'text-destructive',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning',
      textColor: 'text-warning',
      iconColor: 'text-warning',
    },
    info: {
      icon: Info,
      bgColor: 'bg-info/10',
      borderColor: 'border-info',
      textColor: 'text-info',
      iconColor: 'text-info',
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-success/10',
      borderColor: 'border-success',
      textColor: 'text-success',
      iconColor: 'text-success',
    },
  };

  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = config[type];

  return (
    <div className={`${bgColor} rounded-xl p-4 border-2 ${borderColor} shadow-card`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-6 h-6 ${iconColor} flex-shrink-0 mt-1`} />
        <div className="flex-1">
          <h3 className={`font-semibold ${textColor} mb-1`}>{title}</h3>
          <p className="text-sm text-foreground/80 mb-2">{message}</p>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
