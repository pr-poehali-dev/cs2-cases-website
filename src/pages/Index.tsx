import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [openedWeapon, setOpenedWeapon] = useState<any>(null);
  const [balance, setBalance] = useState(2500);

  const cases = [
    {
      id: 1,
      name: 'Dragon Lore Case',
      price: 250,
      image: '/img/386effb8-3efb-4de0-a5a6-acc2b09939e8.jpg',
      rarity: 'legendary'
    },
    {
      id: 2,
      name: 'Spectrum Case',
      price: 150,
      image: '/img/386effb8-3efb-4de0-a5a6-acc2b09939e8.jpg',
      rarity: 'epic'
    },
    {
      id: 3,
      name: 'Revolution Case',
      price: 300,
      image: '/img/386effb8-3efb-4de0-a5a6-acc2b09939e8.jpg',
      rarity: 'legendary'
    }
  ];

  const weapons = [
    {
      name: 'AK-47 | Neon Revolution',
      rarity: 'covert',
      price: 450,
      image: '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
    },
    {
      name: 'AWP | Hyper Beast',
      rarity: 'classified',
      price: 380,
      image: '/img/7cbd286a-e297-45d7-a8cb-ea49f06fa988.jpg'
    },
    {
      name: 'M4A4 | Cyber Security',
      rarity: 'restricted',
      price: 120,
      image: '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
    }
  ];

  const inventory = [
    {
      name: 'AK-47 | Redline',
      rarity: 'classified',
      price: 280,
      image: '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
    },
    {
      name: 'AWP | Dragon Lore',
      rarity: 'covert',
      price: 2800,
      image: '/img/7cbd286a-e297-45d7-a8cb-ea49f06fa988.jpg'
    }
  ];

  const openCase = (caseItem: any) => {
    if (balance < caseItem.price) return;
    
    setIsOpening(true);
    setBalance(prev => prev - caseItem.price);
    
    setTimeout(() => {
      const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
      setOpenedWeapon(randomWeapon);
      setIsOpening(false);
    }, 2000);
  };

  const getRarityClass = (rarity: string) => {
    const rarityClasses = {
      consumer: 'weapon-rarity-consumer',
      industrial: 'weapon-rarity-industrial',
      milspec: 'weapon-rarity-milspec',
      restricted: 'weapon-rarity-restricted',
      classified: 'weapon-rarity-classified',
      covert: 'weapon-rarity-covert'
    };
    return rarityClasses[rarity as keyof typeof rarityClasses] || 'weapon-rarity-consumer';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cs2-dark via-cs2-darker to-black">
      {/* Navigation */}
      <nav className="bg-black/50 backdrop-blur-sm border-b border-cs2-orange/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 cs2-gradient rounded-lg flex items-center justify-center">
                <Icon name="Target" className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold text-white font-['Oswald']">CS2 CASES</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-cs2-cyan hover:text-white transition-colors">Главная</a>
              <a href="#cases" className="text-white hover:text-cs2-cyan transition-colors">Кейсы</a>
              <a href="#inventory" className="text-white hover:text-cs2-cyan transition-colors">Инвентарь</a>
              <a href="#upgrade" className="text-white hover:text-cs2-cyan transition-colors">Апгрейд</a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-cs2-dark rounded-lg px-4 py-2">
                <Icon name="Coins" className="w-5 h-5 text-cs2-yellow" />
                <span className="text-cs2-yellow font-bold">${balance}</span>
              </div>
              <Button className="cs2-gradient text-black font-bold hover:opacity-90">
                Пополнить
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 cs2-gradient opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold text-white mb-6 font-['Oswald'] tracking-wider">
              ОТКРОЙТЕ КЕЙСЫ
              <span className="block text-transparent bg-clip-text cs2-gradient mt-2">
                CS2
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Откройте легендарные скины оружия в Counter-Strike 2. 
              Испытайте удачу и получите редчайшие предметы!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="cs2-gradient text-black font-bold text-lg px-8 hover:opacity-90">
                <Icon name="Play" className="w-5 h-5 mr-2" />
                Начать игру
              </Button>
              <Button size="lg" variant="outline" className="border-cs2-cyan text-cs2-cyan hover:bg-cs2-cyan hover:text-black">
                <Icon name="TrendingUp" className="w-5 h-5 mr-2" />
                Статистика
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Opening Animation */}
      {isOpening && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-40 h-40 mx-auto mb-8 relative animate-case-open">
              <img 
                src="/img/386effb8-3efb-4de0-a5a6-acc2b09939e8.jpg" 
                alt="Opening case" 
                className="w-full h-full object-cover rounded-lg cs2-glow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cs2-orange/30 to-cs2-cyan/30 rounded-lg"></div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 font-['Oswald']">ОТКРЫВАЕМ КЕЙС...</h2>
            <Progress value={66} className="w-64 mx-auto" />
          </div>
        </div>
      )}

      {/* Weapon Reveal */}
      {openedWeapon && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center animate-weapon-reveal">
            <div className="w-60 h-60 mx-auto mb-8 relative">
              <img 
                src={openedWeapon.image} 
                alt={openedWeapon.name} 
                className={`w-full h-full object-cover rounded-lg ${getRarityClass(openedWeapon.rarity)}`}
              />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 font-['Oswald']">{openedWeapon.name}</h2>
            <Badge className={`text-lg px-4 py-2 mb-6 ${getRarityClass(openedWeapon.rarity)}`}>
              {openedWeapon.rarity.toUpperCase()}
            </Badge>
            <p className="text-2xl text-cs2-yellow mb-8">${openedWeapon.price}</p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => setOpenedWeapon(null)}
                className="cs2-gradient text-black font-bold px-8"
              >
                Продать
              </Button>
              <Button 
                onClick={() => setOpenedWeapon(null)}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black"
              >
                В инвентарь
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cases Section */}
      <section id="cases" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-12 font-['Oswald']">
            ПОПУЛЯРНЫЕ КЕЙСЫ
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cases.map((caseItem) => (
              <Card key={caseItem.id} className="bg-cs2-dark border-cs2-orange/20 hover:border-cs2-orange/50 transition-all hover:scale-105 group">
                <CardHeader className="pb-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.name}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardTitle className="text-white font-['Oswald']">{caseItem.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    Содержит редкие скины оружия
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-cs2-yellow">${caseItem.price}</span>
                    <Button 
                      onClick={() => openCase(caseItem)}
                      disabled={balance < caseItem.price}
                      className="cs2-gradient text-black font-bold hover:opacity-90 animate-pulse-glow"
                    >
                      <Icon name="Package" className="w-4 h-4 mr-2" />
                      Открыть
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inventory Section */}
      <section id="inventory" className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-12 font-['Oswald']">
            МОЙ ИНВЕНТАРЬ
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {inventory.map((item, index) => (
              <Card key={index} className="bg-cs2-dark border-cs2-cyan/20 hover:border-cs2-cyan/50 transition-all">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className={`w-full h-32 object-cover rounded-lg ${getRarityClass(item.rarity)}`}
                    />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <Badge className={`text-xs ${getRarityClass(item.rarity)}`}>
                      {item.rarity}
                    </Badge>
                    <span className="text-cs2-yellow font-bold">${item.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upgrade Section */}
      <section id="upgrade" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8 font-['Oswald']">
              АПГРЕЙД ОРУЖИЯ
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Объединяйте скины для получения более редких предметов
            </p>
            
            <div className="bg-cs2-dark rounded-xl p-8 border border-cs2-orange/20">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-cs2-cyan/20 rounded-lg flex items-center justify-center">
                    <Icon name="Plus" className="w-12 h-12 text-cs2-cyan" />
                  </div>
                  <p className="text-white">Выберите предметы</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 cs2-gradient rounded-full flex items-center justify-center animate-pulse">
                    <Icon name="Zap" className="w-8 h-8 text-black" />
                  </div>
                  <p className="text-white">Апгрейд</p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-cs2-yellow/20 rounded-lg flex items-center justify-center">
                    <Icon name="Star" className="w-12 h-12 text-cs2-yellow" />
                  </div>
                  <p className="text-white">Получите награду</p>
                </div>
              </div>
              
              <Button className="mt-8 cs2-gradient text-black font-bold text-lg px-8">
                Начать апгрейд
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-cs2-orange/20 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 cs2-gradient rounded-lg flex items-center justify-center">
                  <Icon name="Target" className="w-5 h-5 text-black" />
                </div>
                <span className="text-xl font-bold text-white font-['Oswald']">CS2 CASES</span>
              </div>
              <p className="text-gray-400 text-sm">
                Лучший сайт для открытия кейсов CS2
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Игра</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cs2-cyan transition-colors">Кейсы</a></li>
                <li><a href="#" className="hover:text-cs2-cyan transition-colors">Инвентарь</a></li>
                <li><a href="#" className="hover:text-cs2-cyan transition-colors">Апгрейд</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cs2-cyan transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-cs2-cyan transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-cs2-cyan transition-colors">Правила</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Социальные сети</h4>
              <div className="flex space-x-4">
                <Button size="sm" variant="outline" className="border-cs2-cyan text-cs2-cyan hover:bg-cs2-cyan hover:text-black">
                  <Icon name="MessageCircle" className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-cs2-cyan text-cs2-cyan hover:bg-cs2-cyan hover:text-black">
                  <Icon name="Users" className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-cs2-orange/20 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 CS2 Cases. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;