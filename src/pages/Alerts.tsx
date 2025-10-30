import { useState } from 'react';
import { Bell, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AlertCard, { AlertType } from '@/components/AlertCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Alert {
  id: number;
  type: AlertType;
  title: string;
  message: string;
  timestamp: string;
}

const mockAlerts: Alert[] = [
  {
    id: 1,
    type: 'error',
    title: 'Critical Water Level',
    message: 'Tank water level has dropped below 20%. Immediate attention required.',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Excessive Usage Detected',
    message: 'Arun Patel has exceeded daily quota by 200L. Current usage: 6200L.',
    timestamp: '5 hours ago',
  },
  {
    id: 3,
    type: 'info',
    title: 'Maintenance Reminder',
    message: 'Scheduled tank cleaning due in 3 days. Plan accordingly.',
    timestamp: '1 day ago',
  },
  {
    id: 4,
    type: 'success',
    title: 'System Healthy',
    message: 'All sensors functioning normally. Last check: 30 minutes ago.',
    timestamp: '30 minutes ago',
  },
  {
    id: 5,
    type: 'warning',
    title: 'High Community Usage',
    message: 'Total community usage at 71%. Monitor closely to avoid depletion.',
    timestamp: '3 hours ago',
  },
  {
    id: 6,
    type: 'info',
    title: 'New Farmer Added',
    message: 'Suresh Yadav has joined the community. Quota assigned: 5000L.',
    timestamp: '2 days ago',
  },
];

const Alerts = () => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredAlerts = filterType === 'all' 
    ? mockAlerts 
    : mockAlerts.filter(alert => alert.type === filterType);

  const alertCounts = {
    all: mockAlerts.length,
    error: mockAlerts.filter(a => a.type === 'error').length,
    warning: mockAlerts.filter(a => a.type === 'warning').length,
    info: mockAlerts.filter(a => a.type === 'info').length,
    success: mockAlerts.filter(a => a.type === 'success').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
          <p className="text-muted-foreground mt-1">System warnings and important updates</p>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-card rounded-xl p-4 shadow-card border border-border text-center">
            <p className="text-2xl font-bold text-foreground">{alertCounts.all}</p>
            <p className="text-xs text-muted-foreground mt-1">Total</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-destructive/30 text-center">
            <p className="text-2xl font-bold text-destructive">{alertCounts.error}</p>
            <p className="text-xs text-muted-foreground mt-1">Critical</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-warning/30 text-center">
            <p className="text-2xl font-bold text-warning">{alertCounts.warning}</p>
            <p className="text-xs text-muted-foreground mt-1">Warning</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-info/30 text-center">
            <p className="text-2xl font-bold text-info">{alertCounts.info}</p>
            <p className="text-xs text-muted-foreground mt-1">Info</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-success/30 text-center">
            <p className="text-2xl font-bold text-success">{alertCounts.success}</p>
            <p className="text-xs text-muted-foreground mt-1">Success</p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-card rounded-xl p-4 shadow-card border border-border">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Alerts</SelectItem>
                <SelectItem value="error">Critical Only</SelectItem>
                <SelectItem value="warning">Warnings Only</SelectItem>
                <SelectItem value="info">Info Only</SelectItem>
                <SelectItem value="success">Success Only</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground ml-auto">
              {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Alerts List */}
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No alerts to display</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                type={alert.type}
                title={alert.title}
                message={alert.message}
                timestamp={alert.timestamp}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Alerts;
