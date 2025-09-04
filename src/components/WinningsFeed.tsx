import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface WinningsItem {
  id: string;
  username: string;
  weaponName: string;
  weaponImage: string;
  rarity: string;
  value: number;
  timestamp: Date;
}

interface WinningsFeedProps {
  winnings: WinningsItem[];
  getRarityClass: (rarity: string) => string;
}

const WinningsFeed: React.FC<WinningsFeedProps> = ({ winnings, getRarityClass }) => {
  return (
    <div className="fixed left-4 top-32 bottom-4 w-80 z-40 hidden xl:block px-0.5 rounded-sm">
      <Card className="bg-jungle-dark/90 backdrop-blur-sm border-jungle-accent/20 h-full">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Trophy" className="w-5 h-5 text-jungle-gold" />
            <h3 className="text-white font-bold font-['Oswald']">ЖИВЫЕ ВЫИГРЫШИ</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-jungle-accent/20 mx-0">
            {winnings.map((winning) => (
              <div 
                key={winning.id}
                className="bg-jungle-darker/50 p-3 rounded-lg border border-jungle-accent/10 hover:border-jungle-accent/30 transition-all animate-slide-in"
              >
                <div className="flex items-center space-x-3">
                  <img 
                    src={winning.weaponImage} 
                    alt={winning.weaponName}
                    className={`w-12 h-12 object-cover rounded ${getRarityClass(winning.rarity)}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-jungle-cobra text-sm font-bold truncate">{winning.username}</span>
                      <Icon name="Crown" className="w-3 h-3 text-jungle-gold" />
                    </div>
                    <p className="text-white text-xs truncate">{winning.weaponName}</p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge className={`text-xs ${getRarityClass(winning.rarity)} text-black`}>
                        {winning.rarity}
                      </Badge>
                      <span className="text-jungle-gold font-bold text-xs">{winning.value} 🐍</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {winnings.length === 0 && (
              <div className="text-center py-8">
                <Icon name="Trophy" className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Пока нет выигрышей</p>
                <p className="text-gray-500 text-xs">Будьте первым охотником!</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t border-jungle-accent/20">
            <div className="flex items-center justify-center space-x-2 text-jungle-cobra text-xs">
              <Icon name="Activity" className="w-4 h-4" />
              <span>Live режим</span>
              <div className="w-2 h-2 bg-jungle-cobra rounded-full animate-pulse"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WinningsFeed;