import { useState, useEffect } from 'react';
import { Users, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FarmerCard from '@/components/FarmerCard';
import { Input } from '@/components/ui/input';

interface Farmer {
  id: number;
  name: string;
  email: string;
  quota: number;
  currentUsage: number;
  role: string;
}

const Community = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await fetch('/data/usageData.json');
        const data = await response.json();
        setFarmers(data.farmers);
      } catch (error) {
        console.error('Failed to fetch farmer data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farmer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalQuota = farmers.reduce((sum, f) => sum + f.quota, 0);
  const totalUsage = farmers.reduce((sum, f) => sum + f.currentUsage, 0);
  const exceededCount = farmers.filter(f => f.currentUsage > f.quota).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Usage</h1>
          <p className="text-muted-foreground mt-1">Monitor farmer water quotas and usage</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Total Farmers</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">{farmers.length}</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-foreground">Total Quota</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">{totalQuota}L</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-destructive" />
              <h3 className="font-semibold text-foreground">Over Quota</h3>
            </div>
            <p className="text-3xl font-bold text-destructive">{exceededCount}</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-card rounded-xl p-4 shadow-card border border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Farmers List */}
        {isLoading ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
            <p className="text-muted-foreground">Loading farmers...</p>
          </div>
        ) : filteredFarmers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No farmers found matching your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFarmers.map((farmer) => (
              <FarmerCard
                key={farmer.id}
                name={farmer.name}
                email={farmer.email}
                quota={farmer.quota}
                currentUsage={farmer.currentUsage}
              />
            ))}
          </div>
        )}

        {/* Community Summary */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Community Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Community Quota</span>
              <span className="font-semibold text-foreground">{totalQuota}L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Usage Today</span>
              <span className="font-semibold text-foreground">{totalUsage}L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Remaining</span>
              <span className="font-semibold text-success">{totalQuota - totalUsage}L</span>
            </div>
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden mt-3">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(totalUsage / totalQuota) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
