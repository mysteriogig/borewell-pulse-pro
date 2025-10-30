import { useState, useEffect } from 'react';
import { FileText, Download, TrendingUp, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

interface HistoricalData {
  date: string;
  level: number;
  usage: number;
}

const Reports = () => {
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch('/data/usageData.json');
        const data = await response.json();
        setHistoricalData(data.historicalData);
      } catch (error) {
        console.error('Failed to fetch historical data');
      }
    };

    fetchHistoricalData();
  }, []);

  const handleDownloadCSV = () => {
    const csv = [
      ['Date', 'Water Level (L)', 'Usage (L)'],
      ...historicalData.map(d => [d.date, d.level, d.usage])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'water-usage-report.csv';
    a.click();
  };

  const avgLevel = historicalData.length > 0
    ? Math.round(historicalData.reduce((sum, d) => sum + d.level, 0) / historicalData.length)
    : 0;

  const avgUsage = historicalData.length > 0
    ? Math.round(historicalData.reduce((sum, d) => sum + d.usage, 0) / historicalData.length)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Logs</h1>
            <p className="text-muted-foreground mt-1">Historical water usage data</p>
          </div>
          <Button onClick={handleDownloadCSV} className="gap-2">
            <Download className="w-4 h-4" />
            Download CSV
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Data Period</h3>
            </div>
            <p className="text-2xl font-bold text-foreground">{historicalData.length} Days</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-foreground">Avg Level</h3>
            </div>
            <p className="text-2xl font-bold text-foreground">{avgLevel}L</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-success" />
              <h3 className="font-semibold text-foreground">Avg Usage</h3>
            </div>
            <p className="text-2xl font-bold text-foreground">{avgUsage}L</p>
          </div>
        </div>

        {/* Chart Visualization */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Usage Trend</h2>
          <div className="space-y-3">
            {historicalData.map((data, index) => {
              const maxUsage = 25000;
              const usagePercent = (data.usage / maxUsage) * 100;
              const levelPercent = (data.level / 500) * 100;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-foreground">
                      {new Date(data.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <div className="flex gap-4 text-xs">
                      <span className="text-primary">Level: {data.level}L</span>
                      <span className="text-accent">Usage: {data.usage}L</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-8 bg-secondary rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${levelPercent}%` }}
                      />
                    </div>
                    <div className="flex-1 h-8 bg-secondary rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-accent transition-all duration-300"
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded" />
              <span className="text-muted-foreground">Water Level</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent rounded" />
              <span className="text-muted-foreground">Usage</span>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border overflow-x-auto">
          <h2 className="text-xl font-bold text-foreground mb-4">Detailed Records</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Water Level</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Usage</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {historicalData.map((data, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4 text-sm text-foreground">
                    {new Date(data.date).toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-primary">{data.level}L</td>
                  <td className="py-3 px-4 text-sm font-medium text-accent">{data.usage}L</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      data.level < 300 
                        ? 'bg-destructive/10 text-destructive' 
                        : data.level < 400
                        ? 'bg-warning/10 text-warning'
                        : 'bg-success/10 text-success'
                    }`}>
                      {data.level < 300 ? 'Critical' : data.level < 400 ? 'Low' : 'Normal'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Reports;
