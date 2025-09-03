import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [openedWeapon, setOpenedWeapon] = useState<any>(null);
  const [balance, setBalance] = useState(2500);
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isRoulette, setIsRoulette] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [upgradeChance, setUpgradeChance] = useState(50);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [rouletteItems, setRouletteItems] = useState<any[]>([]);

  const cases = [
    {
      id: 1,
      name: 'Dragon Lore Case',
      price: 250,
      image: '/img/386effb8-3efb-4de0-a5a6-acc2b09939e8.jpg',
      rarity: 'легендарный'
    },
    {
      id: 2,
      name: 'Spectrum Case',
      price: 150,
      image: '/img/386effb8-3efb-4de0-a5a6-acc2b09939e8.jpg',
      rarity: 'эпический'
    },
    {
      id: 3,
      name: 'Revolution Case',
      price: 300,
      image: '/img/386effb8-3efb-4de0-a5a6-acc2b09939e8.jpg',
      rarity: 'легендарный'
    }
  ];

  const weapons = [
    {
      name: 'AK-47 | Neon Revolution',
      rarity: 'скрытый',
      price: 450,
      image: '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
    },
    {
      name: 'AWP | Hyper Beast',
      rarity: 'засекреченный',
      price: 380,
      image: '/img/7cbd286a-e297-45d7-a8cb-ea49f06fa988.jpg'
    },
    {
      name: 'M4A4 | Cyber Security',
      rarity: 'запрещенный',
      price: 120,
      image: '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
    },
    {
      name: 'Glock-18 | Fade',
      rarity: 'армейский',
      price: 80,
      image: '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
    },
    {
      name: 'P250 | See Ya Later',
      rarity: 'промышленный',
      price: 45,
      image: '/img/7cbd286a-e297-45d7-a8cb-ea49f06fa988.jpg'
    }
  ];

  const [inventory, setInventory] = useState([
    {
      name: 'AK-47 | Redline',
      rarity: 'засекреченный',
      price: 280,
      image: '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
    },
    {
      name: 'AWP | Dragon Lore',
      rarity: 'скрытый',
      price: 2800,
      image: '/img/7cbd286a-e297-45d7-a8cb-ea49f06fa988.jpg'
    }
  ]);

  const getRarityClass = (rarity: string) => {
    const rarityClasses = {
      'потребительский': 'weapon-rarity-consumer',
      'промышленный': 'weapon-rarity-industrial', 
      'армейский': 'weapon-rarity-milspec',
      'запрещенный': 'weapon-rarity-restricted',
      'засекреченный': 'weapon-rarity-classified',
      'скрытый': 'weapon-rarity-covert'
    };
    return rarityClasses[rarity as keyof typeof rarityClasses] || 'weapon-rarity-consumer';
  };

  const generateRouletteItems = () => {
    const items = [];
    for (let i = 0; i < 50; i++) {
      items.push(weapons[Math.floor(Math.random() * weapons.length)]);
    }
    return items;
  };

  const openCaseWithRoulette = (caseItem: any) => {
    if (balance < caseItem.price) return;
    
    setIsRoulette(true);
    setBalance(prev => prev - caseItem.price);
    
    const items = generateRouletteItems();
    setRouletteItems(items);
    
    setTimeout(() => {
      const winningItem = items[25]; // Середина рулетки
      setOpenedWeapon(winningItem);
      setIsRoulette(false);
      setInventory(prev => [...prev, winningItem]);
    }, 3000);
  };

  const openCase = (caseItem: any) => {
    openCaseWithRoulette(caseItem);
  };

  const toggleItemSelection = (item: any) => {
    setSelectedItems(prev => {
      const isSelected = prev.find(i => i.name === item.name);
      if (isSelected) {
        return prev.filter(i => i.name !== item.name);
      }
      return [...prev, item];
    });
  };

  const performUpgrade = () => {
    if (selectedItems.length < 2) return;
    
    const totalValue = selectedItems.reduce((sum, item) => sum + item.price, 0);
    const success = Math.random() * 100 < upgradeChance;
    
    // Удаляем выбранные предметы из инвентаря
    setInventory(prev => 
      prev.filter(item => !selectedItems.find(selected => selected.name === item.name))
    );
    
    if (success) {
      const betterWeapons = weapons.filter(w => w.price > totalValue * 0.8);
      const newWeapon = betterWeapons.length > 0 
        ? betterWeapons[Math.floor(Math.random() * betterWeapons.length)]
        : weapons[Math.floor(Math.random() * weapons.length)];
      
      setOpenedWeapon({...newWeapon, price: Math.floor(totalValue * 1.2)});
      setInventory(prev => [...prev, {...newWeapon, price: Math.floor(totalValue * 1.2)}]);
    } else {
      alert('Апгрейд не удался! Предметы потеряны.');
    }
    
    setSelectedItems([]);
    setShowUpgrade(false);
  };

  const sellItem = (item: any, index: number) => {
    setBalance(prev => prev + item.price);
    setInventory(prev => prev.filter((_, i) => i !== index));
  };

  const handleAuth = (email: string, password: string) => {
    // Простая имитация авторизации
    const newUser = {
      email,
      isAdmin: email === 'admin@cs2cases.com',
      balance: balance
    };
    setUser(newUser);
    setShowAuth(false);
    
    if (newUser.isAdmin) {
      setShowAdmin(true);
    }
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
              <button 
                onClick={() => setShowUpgrade(true)}
                className="text-white hover:text-cs2-cyan transition-colors"
              >
                Контракты
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-cs2-dark rounded-lg px-4 py-2">
                <Icon name="Coins" className="w-5 h-5 text-cs2-yellow" />
                <span className="text-cs2-yellow font-bold">${balance}</span>
              </div>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-white">{user.email}</span>
                  {user.isAdmin && (
                    <Button 
                      onClick={() => setShowAdmin(true)}
                      variant="outline" 
                      size="sm"
                      className="border-cs2-orange text-cs2-orange hover:bg-cs2-orange hover:text-black"
                    >
                      <Icon name="Settings" className="w-4 h-4 mr-1" />
                      Админ
                    </Button>
                  )}
                  <Button 
                    onClick={() => setUser(null)}
                    variant="outline" 
                    size="sm"
                  >
                    Выйти
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setShowAuth(true)}
                  className="cs2-gradient text-black font-bold hover:opacity-90"
                >
                  Войти
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Dialog */}
      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent className="bg-cs2-dark border-cs2-orange/20">
          <DialogHeader>
            <DialogTitle className="text-white font-['Oswald']">
              {authMode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {authMode === 'login' ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'register')}>
            <TabsList className="grid w-full grid-cols-2 bg-cs2-darker">
              <TabsTrigger value="login" className="text-white data-[state=active]:bg-cs2-orange data-[state=active]:text-black">
                Вход
              </TabsTrigger>
              <TabsTrigger value="register" className="text-white data-[state=active]:bg-cs2-orange data-[state=active]:text-black">
                Регистрация
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" className="bg-cs2-darker border-cs2-orange/20 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Пароль</Label>
                <Input id="password" type="password" className="bg-cs2-darker border-cs2-orange/20 text-white" />
              </div>
              <Button 
                onClick={() => handleAuth('user@test.com', 'password')}
                className="w-full cs2-gradient text-black font-bold"
              >
                Войти
              </Button>
              <p className="text-xs text-gray-400 text-center">
                Для админ-панели используйте: admin@cs2cases.com
              </p>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-email" className="text-white">Email</Label>
                <Input id="reg-email" type="email" placeholder="your@email.com" className="bg-cs2-darker border-cs2-orange/20 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password" className="text-white">Пароль</Label>
                <Input id="reg-password" type="password" className="bg-cs2-darker border-cs2-orange/20 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-white">Подтвердите пароль</Label>
                <Input id="confirm-password" type="password" className="bg-cs2-darker border-cs2-orange/20 text-white" />
              </div>
              <Button 
                onClick={() => handleAuth('newuser@test.com', 'password')}
                className="w-full cs2-gradient text-black font-bold"
              >
                Зарегистрироваться
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Admin Panel */}
      <Dialog open={showAdmin} onOpenChange={setShowAdmin}>
        <DialogContent className="bg-cs2-dark border-cs2-orange/20 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-white font-['Oswald'] text-2xl">
              <Icon name="Shield" className="w-6 h-6 inline mr-2 text-cs2-orange" />
              Админ-панель
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Управление сайтом CS2 Cases
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-3 gap-6 py-4">
            <Card className="bg-cs2-darker border-cs2-cyan/20">
              <CardContent className="p-6 text-center">
                <Icon name="Users" className="w-12 h-12 text-cs2-cyan mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">1,247</h3>
                <p className="text-gray-400">Активных пользователей</p>
              </CardContent>
            </Card>
            
            <Card className="bg-cs2-darker border-cs2-yellow/20">
              <CardContent className="p-6 text-center">
                <Icon name="Package" className="w-12 h-12 text-cs2-yellow mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">8,932</h3>
                <p className="text-gray-400">Открыто кейсов</p>
              </CardContent>
            </Card>
            
            <Card className="bg-cs2-darker border-cs2-orange/20">
              <CardContent className="p-6 text-center">
                <Icon name="DollarSign" className="w-12 h-12 text-cs2-orange mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">$52,341</h3>
                <p className="text-gray-400">Общий доход</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button className="cs2-gradient text-black font-bold flex-1">
                <Icon name="Plus" className="w-4 h-4 mr-2" />
                Добавить кейс
              </Button>
              <Button variant="outline" className="border-cs2-cyan text-cs2-cyan flex-1">
                <Icon name="Edit" className="w-4 h-4 mr-2" />
                Редактировать оружие
              </Button>
            </div>
            <Button variant="outline" className="w-full border-cs2-yellow text-cs2-yellow">
              <Icon name="BarChart3" className="w-4 h-4 mr-2" />
              Статистика и аналитика
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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

      {/* Case Opening Roulette */}
      {isRoulette && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center w-full px-4">
            <h2 className="text-4xl font-bold text-white mb-8 font-['Oswald']">ОТКРЫВАЕМ КЕЙС...</h2>
            
            <div className="relative w-full max-w-4xl mx-auto h-40 bg-cs2-dark rounded-lg border-2 border-cs2-orange/20 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-32 bg-cs2-orange z-10 rounded-full"></div>
              
              <div className="case-roulette flex items-center h-full" style={{width: '5000px'}}>
                {rouletteItems.map((item, index) => (
                  <div key={index} className="flex-shrink-0 w-32 h-32 p-2">
                    <div className={`w-full h-full rounded-lg ${getRarityClass(item.rarity)} flex flex-col items-center justify-center p-2`}>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover mb-1"
                      />
                      <p className="text-xs text-black font-bold text-center">{item.name.split('|')[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Progress value={66} className="w-64 mx-auto mt-8" />
          </div>
        </div>
      )}

      {/* Weapon Reveal */}
      {openedWeapon && !isRoulette && (
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
            <p className="text-3xl text-cs2-yellow mb-8 font-bold">${openedWeapon.price}</p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => {
                  sellItem(openedWeapon, -1);
                  setOpenedWeapon(null);
                }}
                className="cs2-gradient text-black font-bold px-8 text-lg"
              >
                <Icon name="DollarSign" className="w-5 h-5 mr-2" />
                Продать за ${openedWeapon.price}
              </Button>
              <Button 
                onClick={() => setOpenedWeapon(null)}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black px-8 text-lg"
              >
                <Icon name="Package" className="w-5 h-5 mr-2" />
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
              <Card key={caseItem.id} className="bg-cs2-dark border-cs2-orange/20 hover:border-cs2-orange/50 transition-all hover:scale-105 group overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.name}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-cs2-orange text-black font-bold">
                        {caseItem.rarity}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardTitle className="text-white font-['Oswald']">{caseItem.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    Содержит редкие скины оружия высокого качества
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
              <Card key={index} className="bg-cs2-dark border-cs2-cyan/20 hover:border-cs2-cyan/50 transition-all group">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className={`w-full h-32 object-cover rounded-lg ${getRarityClass(item.rarity)} transition-transform group-hover:scale-105`}
                    />
                    <div className="absolute top-2 right-2">
                      <input 
                        type="checkbox"
                        className="w-4 h-4"
                        checked={selectedItems.find(i => i.name === item.name) !== undefined}
                        onChange={() => toggleItemSelection(item)}
                      />
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`text-xs text-black font-bold ${getRarityClass(item.rarity)}`}>
                      {item.rarity}
                    </Badge>
                    <span className="text-cs2-yellow font-bold">${item.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => sellItem(item, index)}
                      className="flex-1 bg-cs2-cyan text-black hover:bg-cs2-cyan/80"
                    >
                      <Icon name="DollarSign" className="w-3 h-3 mr-1" />
                      Продать
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toggleItemSelection(item)}
                      className="flex-1 border-cs2-orange text-cs2-orange hover:bg-cs2-orange hover:text-black"
                    >
                      <Icon name="ArrowUp" className="w-3 h-3 mr-1" />
                      Апгрейд
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedItems.length > 0 && (
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-cs2-dark rounded-xl border border-cs2-orange/20">
              <h3 className="text-white font-bold text-xl mb-4 font-['Oswald']">
                Выбрано предметов: {selectedItems.length}
              </h3>
              <p className="text-gray-300 mb-4">
                Общая стоимость: ${selectedItems.reduce((sum, item) => sum + item.price, 0)}
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={() => setShowUpgrade(true)}
                  className="cs2-gradient text-black font-bold flex-1"
                >
                  <Icon name="ArrowUp" className="w-4 h-4 mr-2" />
                  Апгрейд ({selectedItems.length})
                </Button>
                <Button 
                  onClick={() => setSelectedItems([])}
                  variant="outline"
                  className="border-cs2-cyan text-cs2-cyan"
                >
                  Отменить
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Upgrade Dialog */}
      <Dialog open={showUpgrade} onOpenChange={setShowUpgrade}>
        <DialogContent className="bg-cs2-dark border-cs2-orange/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white font-['Oswald'] text-2xl">
              <Icon name="ArrowUp" className="w-6 h-6 inline mr-2 text-cs2-orange" />
              Апгрейд оружия
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Объедините предметы для получения более редкого оружия
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {selectedItems.map((item, index) => (
                <div key={index} className={`p-3 rounded-lg ${getRarityClass(item.rarity)} flex items-center space-x-3`}>
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded" />
                  <div>
                    <p className="text-black font-bold text-sm">{item.name}</p>
                    <p className="text-black text-xs">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-white mb-2 block">Шанс успеха: {upgradeChance}%</Label>
                <Slider
                  value={[upgradeChance]}
                  onValueChange={(value) => setUpgradeChance(value[0])}
                  max={90}
                  min={10}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>10%</span>
                  <span>90%</span>
                </div>
              </div>
              
              <div className="bg-cs2-darker p-4 rounded-lg">
                <p className="text-white text-sm">
                  <strong>Общая стоимость:</strong> ${selectedItems.reduce((sum, item) => sum + item.price, 0)}
                </p>
                <p className="text-cs2-yellow text-sm">
                  <strong>Потенциальная награда:</strong> ${Math.floor(selectedItems.reduce((sum, item) => sum + item.price, 0) * 1.2)}
                </p>
                <p className="text-red-400 text-xs mt-2">
                  ⚠️ При неудаче все предметы будут потеряны
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                onClick={performUpgrade}
                disabled={selectedItems.length < 2}
                className="cs2-gradient text-black font-bold flex-1 text-lg"
              >
                <Icon name="Zap" className="w-5 h-5 mr-2" />
                Выполнить апгрейд
              </Button>
              <Button 
                onClick={() => {setShowUpgrade(false); setSelectedItems([]);}}
                variant="outline"
                className="border-white text-white"
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
                Лучший сайт для открытия кейсов CS2 с честной системой и лучшими наградами
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Игра</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#cases" className="hover:text-cs2-cyan transition-colors">Кейсы</a></li>
                <li><a href="#inventory" className="hover:text-cs2-cyan transition-colors">Инвентарь</a></li>
                <li><a href="#upgrade" className="hover:text-cs2-cyan transition-colors">Апгрейд</a></li>
                <li><a href="#" className="hover:text-cs2-cyan transition-colors">Контракты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cs2-cyan transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-cs2-cyan transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-cs2-cyan transition-colors">Правила</a></li>
                <li><a href="#" className="hover:text-cs2-cyan transition-colors">Честная игра</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Социальные сети</h4>
              <div className="flex space-x-4 mb-4">
                <Button size="sm" variant="outline" className="border-cs2-cyan text-cs2-cyan hover:bg-cs2-cyan hover:text-black">
                  <Icon name="MessageCircle" className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-cs2-cyan text-cs2-cyan hover:bg-cs2-cyan hover:text-black">
                  <Icon name="Users" className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-cs2-cyan text-cs2-cyan hover:bg-cs2-cyan hover:text-black">
                  <Icon name="Youtube" className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-400">
                Подпишись на наши соцсети и получай бонусы!
              </p>
            </div>
          </div>
          
          <div className="border-t border-cs2-orange/20 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 CS2 Cases. Все права защищены. Играйте ответственно.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;