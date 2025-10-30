import { useState, useEffect } from 'react';
import { RefreshCw, Droplets, TrendingUp, Clock, Activity } from 'lucide-react';
import Navbar from '@/components/Navbar';
import TankDisplay from '@/components/TankDisplay';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SensorData {
  tankDepth: number;
  currentDistance: number;
  timestamp: string;
  sensorId: string;
}

const Dashboard = () => {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const fetchSensorData = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch('/data/sensorData.json');
      const data = await response.json();
      
      // Simulate slight variation in readings
      const variation = Math.floor(Math.random() * 20) - 10;
      const newDistance = Math.max(50, Math.min(450, data.currentDistance + variation));
      
      setSensorData({
        ...data,
        currentDistance: newDistance,
        timestamp: new Date().toISOString(),
      });
      
      toast({
        title: 'Data refreshed',
        description: 'Latest sensor data loaded',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch sensor data',
        variant: 'destructive',
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchSensorData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!sensorData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <Droplets className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
            <p className="text-muted-foreground">Loading sensor data...</p>
          </div>
        </div>
      </div>
    );
  }

  const waterLevel = sensorData.tankDepth - sensorData.currentDistance;
  const percentage = (waterLevel / sensorData.tankDepth) * 100;
  const estimatedRefill = Math.round((sensorData.tankDepth - waterLevel) / 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Real-time water level monitoring</p>
          </div>
          <Button
            onClick={fetchSensorData}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Total Capacity</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">{sensorData.tankDepth}L</p>
            <p className="text-sm text-muted-foreground mt-1">Maximum capacity</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Current Level</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">{Math.round(waterLevel)}L</p>
            <p className="text-sm text-muted-foreground mt-1">{Math.round(percentage)}% filled</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">Usage Today</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">18,500L</p>
            <p className="text-sm text-muted-foreground mt-1">Community total</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-info" />
              </div>
              <h3 className="font-semibold text-foreground">Est. Refill</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">{estimatedRefill}h</p>
            <p className="text-sm text-muted-foreground mt-1">Approximate time</p>
          </div>
        </div>

        {/* Tank Display */}
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Live Tank Status</h2>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date(sensorData.timestamp).toLocaleTimeString()}
            </p>
          </div>
          <TankDisplay waterLevel={waterLevel} tankDepth={sensorData.tankDepth} />
          
          <div className="mt-6 text-center text-xs text-muted-foreground">
            Sensor ID: {sensorData.sensorId} • Auto-refresh every 10 seconds
          </div>
        </div>

        {/* Community Meter */}
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Community Usage Meter</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Today's Usage</span>
              <span className="font-semibold text-foreground">18,500L / 26,000L</span>
            </div>
            <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary-light to-primary transition-all duration-1000"
                style={{ width: '71%' }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0L</span>
              <span className="text-primary font-medium">71% used</span>
              <span>26,000L</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
