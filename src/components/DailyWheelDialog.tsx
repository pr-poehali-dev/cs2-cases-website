import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface DailyWheelProps {
  showDailyWheel: boolean;
  setShowDailyWheel: (show: boolean) => void;
  onWheelSpin: (amount: number) => void;
  user: any;
}

const DailyWheelDialog: React.FC<DailyWheelProps> = ({
  showDailyWheel,
  setShowDailyWheel,
  onWheelSpin,
  user
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [lastSpinDate, setLastSpinDate] = useState<string | null>(null);
  const [canSpin, setCanSpin] = useState(true);
  const [timeUntilNextSpin, setTimeUntilNextSpin] = useState('');

  const wheelSegments = [
    { amount: 5, color: 'text-red-400', bg: 'from-red-500 to-red-600' },
    { amount: 10, color: 'text-orange-400', bg: 'from-orange-500 to-orange-600' },
    { amount: 15, color: 'text-yellow-400', bg: 'from-yellow-500 to-yellow-600' },
    { amount: 20, color: 'text-green-400', bg: 'from-green-500 to-green-600' },
    { amount: 25, color: 'text-purple-400', bg: 'from-purple-500 to-purple-600' },
    { amount: 8, color: 'text-blue-400', bg: 'from-blue-500 to-blue-600' },
    { amount: 12, color: 'text-pink-400', bg: 'from-pink-500 to-pink-600' },
    { amount: 18, color: 'text-indigo-400', bg: 'from-indigo-500 to-indigo-600' }
  ];

  useEffect(() => {
    if (user) {
      const savedSpinDate = localStorage.getItem(`dailyWheel_${user.email}`);
      if (savedSpinDate) {
        const lastSpin = new Date(savedSpinDate);
        const now = new Date();
        const timeDiff = now.getTime() - lastSpin.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          setCanSpin(false);
          setLastSpinDate(savedSpinDate);
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (!canSpin && lastSpinDate) {
      const interval = setInterval(() => {
        const lastSpin = new Date(lastSpinDate);
        const now = new Date();
        const timeDiff = now.getTime() - lastSpin.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        if (hoursDiff >= 24) {
          setCanSpin(true);
          setTimeUntilNextSpin('');
          clearInterval(interval);
        } else {
          const hoursLeft = 24 - hoursDiff;
          const hours = Math.floor(hoursLeft);
          const minutes = Math.floor((hoursLeft - hours) * 60);
          setTimeUntilNextSpin(`${hours}ч ${minutes}м`);
        }
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [canSpin, lastSpinDate]);

  const spinWheel = () => {
    if (!canSpin || isSpinning) return;

    setIsSpinning(true);
    const randomSegment = Math.floor(Math.random() * wheelSegments.length);
    const baseRotation = 360 * 5; // 5 полных оборотов
    const segmentAngle = 360 / wheelSegments.length;
    const targetRotation = baseRotation + (360 - (randomSegment * segmentAngle + segmentAngle / 2));
    
    setWheelRotation(targetRotation);

    setTimeout(() => {
      const wonAmount = wheelSegments[randomSegment].amount;
      onWheelSpin(wonAmount);
      setIsSpinning(false);
      setCanSpin(false);
      const now = new Date().toISOString();
      localStorage.setItem(`dailyWheel_${user.email}`, now);
      setLastSpinDate(now);
      
      setTimeout(() => {
        setShowDailyWheel(false);
      }, 2000);
    }, 4000);
  };

  return (
    <Dialog open={showDailyWheel} onOpenChange={setShowDailyWheel}>
      <DialogContent className="bg-jungle-dark border-jungle-accent/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white font-['Oswald'] text-2xl text-center">
            <Icon name="RotateCcw" className="w-6 h-6 inline mr-2 text-jungle-gold" />
            Ежедневное колесо удачи 🎯
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-center">
            {canSpin ? 'Крутите колесо раз в 24 часа и получайте Cobras Coins!' : `Следующий спин через: ${timeUntilNextSpin}`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-8 py-6">
          <div className="relative w-80 h-80">
            <div 
              className={`w-full h-full rounded-full border-8 border-jungle-gold transition-transform duration-4000 ease-out`}
              style={{ 
                transform: `rotate(${wheelRotation}deg)`,
                background: `conic-gradient(
                  ${wheelSegments.map((segment, index) => {
                    const start = (index * 45);
                    const end = ((index + 1) * 45);
                    return `from ${segment.bg.split(' ')[1]} ${start}deg ${end}deg`;
                  }).join(', ')}
                )`
              }}
            >
              {wheelSegments.map((segment, index) => (
                <div
                  key={index}
                  className="absolute w-full h-full flex items-center justify-center text-white font-bold text-xl"
                  style={{
                    transform: `rotate(${index * 45 + 22.5}deg)`,
                    transformOrigin: 'center'
                  }}
                >
                  <span 
                    className="transform rotate-90"
                    style={{ marginTop: '-120px' }}
                  >
                    {segment.amount} 🐍
                  </span>
                </div>
              ))}
            </div>
            
            {/* Указатель */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
              <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-jungle-gold"></div>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            {canSpin ? (
              <Button 
                onClick={spinWheel}
                disabled={isSpinning}
                className="cobra-gradient text-black font-bold px-8 py-3 text-lg"
              >
                {isSpinning ? (
                  <>
                    <Icon name="Loader2" className="w-5 h-5 mr-2 animate-spin" />
                    Крутится...
                  </>
                ) : (
                  <>
                    <Icon name="RotateCcw" className="w-5 h-5 mr-2" />
                    Крутить колесо!
                  </>
                )}
              </Button>
            ) : (
              <div className="text-center">
                <Icon name="Clock" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">Колесо недоступно</p>
                <p className="text-jungle-gold font-bold">{timeUntilNextSpin}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DailyWheelDialog;