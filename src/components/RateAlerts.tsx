import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Bell, Mail, Check, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RateAlert {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  targetRate: number;
  condition: 'above' | 'below';
  email: string;
  created: Date;
  isActive: boolean;
}

interface RateAlertsProps {
  fromCurrency: string;
  toCurrency: string;
  currentRate: number;
}

const RateAlerts = ({ fromCurrency, toCurrency, currentRate }: RateAlertsProps) => {
  const [email, setEmail] = useState('');
  const [targetRate, setTargetRate] = useState('');
  const [condition, setCondition] = useState<'above' | 'below'>('above');
  const [alerts, setAlerts] = useState<RateAlert[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const createAlert = async () => {
    if (!email || !targetRate) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and target rate.",
        variant: "destructive"
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    const rate = parseFloat(targetRate);
    if (isNaN(rate) || rate <= 0) {
      toast({
        title: "Invalid Rate",
        description: "Please enter a valid exchange rate.",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);

    // Simulate API call
    setTimeout(() => {
      const newAlert: RateAlert = {
        id: Math.random().toString(36).substr(2, 9),
        fromCurrency,
        toCurrency,
        targetRate: rate,
        condition,
        email,
        created: new Date(),
        isActive: true
      };

      setAlerts(prev => [...prev, newAlert]);
      setEmail('');
      setTargetRate('');
      setIsCreating(false);

      toast({
        title: "Alert Created!",
        description: `We'll notify you when ${fromCurrency}/${toCurrency} goes ${condition} ${rate.toFixed(4)}`,
      });
    }, 1000);
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    toast({
      title: "Alert Deleted",
      description: "Rate alert has been removed.",
    });
  };

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <CardTitle>Rate Alerts</CardTitle>
        </div>
        <CardDescription>
          Get notified when {fromCurrency}/{toCurrency} reaches your target rate
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Create New Alert */}
        <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
          <h4 className="font-medium">Create New Alert</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetRate">Target Rate</Label>
              <Input
                id="targetRate"
                type="number"
                step="0.0001"
                placeholder={currentRate.toFixed(4)}
                value={targetRate}
                onChange={(e) => setTargetRate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Notify me when rate goes</Label>
            <Select value={condition} onValueChange={(value: 'above' | 'below') => setCondition(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="above">Above target rate</SelectItem>
                <SelectItem value="below">Below target rate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={createAlert} 
            disabled={isCreating}
            className="w-full"
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Alert...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Create Alert
              </>
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Current rate: 1 {fromCurrency} = {currentRate.toFixed(6)} {toCurrency}
          </p>
        </div>

        {/* Active Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Your Alerts</h4>
            
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className="flex items-center justify-between p-3 border rounded-lg bg-card"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={alert.isActive ? 'default' : 'secondary'}>
                      {alert.isActive ? 'Active' : 'Paused'}
                    </Badge>
                    <span className="text-sm font-medium">
                      {alert.fromCurrency}/{alert.toCurrency}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Notify {alert.email} when rate goes {alert.condition} {alert.targetRate.toFixed(4)}
                  </p>
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    Created {alert.created.toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleAlert(alert.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteAlert(alert.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {alerts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No alerts created yet</p>
            <p className="text-sm">Create your first rate alert above</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RateAlerts;