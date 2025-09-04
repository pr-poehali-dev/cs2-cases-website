import React from 'react';
import { Progress } from '@/components/ui/progress';

interface RouletteAnimationProps {
  isRoulette: boolean;
  rouletteItems: any[];
  getRarityClass: (rarity: string) => string;
}

const RouletteAnimation: React.FC<RouletteAnimationProps> = ({
  isRoulette,
  rouletteItems,
  getRarityClass
}) => {
  if (!isRoulette) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center w-full px-4">
        <h2 className="text-4xl font-bold text-white mb-8 font-['Oswald']">ОХОТА В ДЖУНГЛЯХ...</h2>
        
        <div className="relative w-full max-w-6xl mx-auto h-48 bg-gradient-to-r from-jungle-darker via-jungle-dark to-jungle-darker rounded-xl border-2 border-jungle-accent/20 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-40 bg-gradient-to-b from-jungle-accent to-jungle-gold z-20 rounded-full shadow-lg"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rotate-45 bg-jungle-accent z-20 border-2 border-jungle-gold"></div>
          
          <div className="case-roulette-smooth flex items-center h-full px-4" style={{width: '8000px'}}>
            {rouletteItems.map((item, index) => (
              <div key={index} className={`roulette-item flex-shrink-0 w-40 h-40 p-3 ${index === 25 ? 'roulette-winner-highlight' : ''}`}>
                <div className={`w-full h-full rounded-xl ${getRarityClass(item.rarity)} flex flex-col items-center justify-center p-3 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover mb-2 relative z-10"
                  />
                  <p className="text-xs text-black font-bold text-center relative z-10">{item.name.split('|')[0]}</p>
                  <p className="text-xs text-black font-bold relative z-10">{item.price} 🐍</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8">
          <div className="w-80 mx-auto mb-4 bg-jungle-darker rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-jungle-cobra to-jungle-gold rounded-full animate-pulse" style={{width: '85%'}}></div>
          </div>
          <p className="text-jungle-cobra font-bold">Кобра выбирает...</p>
        </div>
      </div>
    </div>
  );
};

export default RouletteAnimation;