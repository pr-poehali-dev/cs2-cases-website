import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  balance: number;
  user: any;
  setShowInventory: (show: boolean) => void;
  setShowContracts: (show: boolean) => void;
  setShowStats: (show: boolean) => void;
  setShowProfile: (show: boolean) => void;
  setShowAdmin: (show: boolean) => void;
  setShowDailyWheel: (show: boolean) => void;
  logout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  balance,
  user,
  setShowInventory,
  setShowContracts,
  setShowStats,
  setShowProfile,
  setShowAdmin,
  setShowDailyWheel,
  logout
}) => {
  return (
    <nav className="bg-black/50 backdrop-blur-sm border-b border-jungle-accent/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 cobra-gradient rounded-lg flex items-center justify-center">
              <Icon name="Zap" className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-white font-['Oswald']">COBRAS CASE
</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Button 
              variant="ghost" 
              onClick={() => setShowInventory(true)}
              className="text-white hover:text-jungle-cobra hover:bg-jungle-darker"
            >
              <Icon name="Package" className="w-4 h-4 mr-2" />
              Инвентарь
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setShowContracts(true)}
              className="text-white hover:text-jungle-cobra hover:bg-jungle-darker"
            >
              <Icon name="FileContract" className="w-4 h-4 mr-2" />
              Контракты
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setShowStats(true)}
              className="text-white hover:text-jungle-cobra hover:bg-jungle-darker"
            >
              <Icon name="BarChart3" className="w-4 h-4 mr-2" />
              Статистика
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setShowDailyWheel(true)}
              className="text-white hover:text-jungle-gold hover:bg-jungle-darker jungle-pulse"
            >
              <Icon name="RotateCcw" className="w-4 h-4 mr-2" />
              Колесо удачи
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-jungle-dark rounded-lg px-4 py-2">
              <Icon name="Coins" className="w-5 h-5 text-jungle-gold" />
              <span className="text-jungle-gold font-bold">{balance} 🐍</span>
            </div>
            
            <button
              onClick={() => setShowProfile(true)}
              className="flex items-center space-x-2 text-white hover:text-jungle-cobra transition-colors"
            >
              <img 
                src={user.avatar} 
                alt={user.username}
                className="w-8 h-8 rounded-full border-2 border-jungle-cobra"
              />
              <span>{user.username}</span>
            </button>
            
            {user.isAdmin && (
              <Button 
                onClick={() => setShowAdmin(true)}
                variant="outline" 
                size="sm"
                className="border-jungle-accent text-jungle-accent hover:bg-jungle-accent hover:text-black"
              >
                <Icon name="Settings" className="w-4 h-4 mr-1" />
                Админ
              </Button>
            )}
            
            <Button 
              onClick={logout}
              variant="outline" 
              size="sm"
            >
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;