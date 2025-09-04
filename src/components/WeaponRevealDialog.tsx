import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface WeaponRevealDialogProps {
  openedWeapon: any;
  setOpenedWeapon: (weapon: any) => void;
  getRarityClass: (rarity: string) => string;
  isRoulette: boolean;
}

const WeaponRevealDialog: React.FC<WeaponRevealDialogProps> = ({
  openedWeapon,
  setOpenedWeapon,
  getRarityClass,
  isRoulette
}) => {
  if (!openedWeapon || isRoulette) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center animate-weapon-reveal">
        <div className="w-80 h-80 mx-auto mb-8 relative weapon-float-animation">
          <img 
            src={openedWeapon.image} 
            alt={openedWeapon.name} 
            className={`w-full h-full object-cover rounded-lg ${getRarityClass(openedWeapon.rarity)}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
        </div>
        <h2 className="text-5xl font-bold text-white mb-4 font-['Oswald']">{openedWeapon.name}</h2>
        <Badge className={`text-xl px-6 py-3 mb-6 text-black font-bold ${getRarityClass(openedWeapon.rarity)}`}>
          {openedWeapon.rarity.toUpperCase()}
        </Badge>
        <p className="text-3xl text-jungle-gold mb-8 font-bold">{openedWeapon.price} 🐍</p>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => setOpenedWeapon(null)}
            className="cobra-gradient text-black font-bold px-8 text-lg"
          >
            <Icon name="Package" className="w-5 h-5 mr-2" />
            В инвентарь
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WeaponRevealDialog;