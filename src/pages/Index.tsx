import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [openedWeapon, setOpenedWeapon] = useState<any>(null);
  const [balance, setBalance] = useState(2500);
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [isRoulette, setIsRoulette] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [showContracts, setShowContracts] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [rouletteItems, setRouletteItems] = useState<any[]>([]);
  const [contractAnimating, setContractAnimating] = useState(false);

  // Статистика пользователя
  const [userStats, setUserStats] = useState({
    casesOpened: 45,
    contractsCompleted: 12,
    totalSpent: 8750,
    totalEarned: 9200,
    favoriteWeapon: 'AK-47 | Jungle Tiger',
    luckyStreak: 7,
    totalProfit: 450
  });

  const cases = [
    {
      id: 1,
      name: 'Jungle Serpent Case',
      price: 250,
      image: '/img/386effb8-3efb-4de0-a5a6-acc2b09939e8.jpg',
      rarity: 'легендарный'
    },
    {
      id: 2,
      name: 'Viper Venom Case',
      price: 150,
      image: '/img/386effb8-3efb-4de0-a5a6-acc2b09939e8.jpg',
      rarity: 'эпический'
    },
    {
      id: 3,
      name: 'Cobra King Case',
      price: 300,
      image: '/img/386effb8-3efb-4de0-a5a6-acc2b09939e8.jpg',
      rarity: 'легендарный'
    }
  ];

  const weapons = [
    {
      name: 'AK-47 | Jungle Tiger',
      rarity: 'скрытый',
      price: 450,
      image: '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
    },
    {
      name: 'AWP | Viper Strike',
      rarity: 'засекреченный',
      price: 380,
      image: '/img/7cbd286a-e297-45d7-a8cb-ea49f06fa988.jpg'
    },
    {
      name: 'M4A4 | Serpent Skin',
      rarity: 'запрещенный',
      price: 120,
      image: '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
    },
    {
      name: 'Glock-18 | Jungle Camo',
      rarity: 'армейский',
      price: 80,
      image: '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
    },
    {
      name: 'P250 | Green Python',
      rarity: 'промышленный',
      price: 45,
      image: '/img/7cbd286a-e297-45d7-a8cb-ea49f06fa988.jpg'
    },
    {
      name: 'USP-S | Forest Whisper',
      rarity: 'потребительский',
      price: 25,
      image: '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
    }
  ];

  const [inventory, setInventory] = useState([
    {
      name: 'AK-47 | Jungle Warrior',
      rarity: 'засекреченный',
      price: 280,
      image: '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
    },
    {
      name: 'AWP | Cobra Elite',
      rarity: 'скрытый',
      price: 2800,
      image: '/img/7cbd286a-e297-45d7-a8cb-ea49f06fa988.jpg'
    },
    {
      name: 'M4A1-S | Venom Green',
      rarity: 'запрещенный',
      price: 150,
      image: '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
    },
    {
      name: 'Deagle | Jungle King',
      rarity: 'армейский',
      price: 90,
      image: '/img/7cbd286a-e297-45d7-a8cb-ea49f06fa988.jpg'
    },
    {
      name: 'MP7 | Green Mamba',
      rarity: 'промышленный',
      price: 55,
      image: '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
    },
    {
      name: 'Five-Seven | Jungle Stalker',
      rarity: 'потребительский',
      price: 30,
      image: '/img/7cbd286a-e297-45d7-a8cb-ea49f06fa988.jpg'
    },
    {
      name: 'FAMAS | Viper Camo',
      rarity: 'армейский',
      price: 75,
      image: '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
    },
    {
      name: 'Galil AR | Jungle Strike',
      rarity: 'промышленный',
      price: 40,
      image: '/img/7cbd286a-e297-45d7-a8cb-ea49f06fa988.jpg'
    },
    {
      name: 'P90 | Emerald Snake',
      rarity: 'запрещенный',
      price: 130,
      image: '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
    },
    {
      name: 'MAC-10 | Forest Fury',
      rarity: 'потребительский',
      price: 20,
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
    setUserStats(prev => ({...prev, casesOpened: prev.casesOpened + 1, totalSpent: prev.totalSpent + caseItem.price}));
    
    const items = generateRouletteItems();
    setRouletteItems(items);
    
    setTimeout(() => {
      const winningItem = items[25];
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
      if (prev.length >= 10) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const performContract = () => {
    if (selectedItems.length !== 10) return;
    
    setContractAnimating(true);
    const totalValue = selectedItems.reduce((sum, item) => sum + item.price, 0);
    const random = Math.random();
    
    setTimeout(() => {
      // Убираем выбранные предметы из инвентаря
      setInventory(prev => 
        prev.filter(item => !selectedItems.find(selected => selected.name === item.name))
      );
      
      let rewardValue;
      if (random < 0.5) {
        // 50% шанс получить на 80% меньше
        rewardValue = Math.floor(totalValue * 0.2);
      } else {
        // 50% шанс получить на 40% больше
        rewardValue = Math.floor(totalValue * 1.4);
      }
      
      // Находим подходящее оружие по цене
      const suitableWeapons = weapons.filter(w => Math.abs(w.price - rewardValue) < rewardValue * 0.3);
      const newWeapon = suitableWeapons.length > 0 
        ? suitableWeapons[Math.floor(Math.random() * suitableWeapons.length)]
        : weapons[Math.floor(Math.random() * weapons.length)];
      
      const contractResult = {...newWeapon, price: rewardValue};
      setOpenedWeapon(contractResult);
      setInventory(prev => [...prev, contractResult]);
      setUserStats(prev => ({
        ...prev, 
        contractsCompleted: prev.contractsCompleted + 1,
        totalSpent: prev.totalSpent + totalValue,
        totalEarned: prev.totalEarned + rewardValue
      }));
      
      setSelectedItems([]);
      setShowContracts(false);
      setContractAnimating(false);
    }, 2500);
  };

  const sellItem = (item: any, index: number) => {
    setBalance(prev => prev + item.price);
    setUserStats(prev => ({
      ...prev, 
      totalEarned: prev.totalEarned + item.price,
      totalProfit: prev.totalProfit + item.price
    }));
    if (index !== -1) {
      setInventory(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleAuth = (email: string, password: string) => {
    const newUser = {
      email,
      username: email.split('@')[0],
      isAdmin: email === 'admin@junglecases.com',
      balance: balance,
      joinDate: new Date('2024-01-15'),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    setUser(newUser);
    setShowAuth(false);
    
    if (newUser.isAdmin) {
      setShowAdmin(true);
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-jungle-darker via-jungle-dark to-black">
      {/* Navigation */}
      <nav className="bg-black/50 backdrop-blur-sm border-b border-jungle-accent/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 cobra-gradient rounded-lg flex items-center justify-center">
                <Icon name="Zap" className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold text-white font-['Oswald']">JUNGLE CASES</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-jungle-cobra hover:text-white transition-colors"
              >
                Главная
              </button>
              <button 
                onClick={() => scrollToSection('cases')}
                className="text-white hover:text-jungle-cobra transition-colors"
              >
                Кейсы
              </button>
              <button 
                onClick={() => scrollToSection('inventory')}
                className="text-white hover:text-jungle-cobra transition-colors"
              >
                Инвентарь
              </button>
              <button 
                onClick={() => setShowContracts(true)}
                className="text-white hover:text-jungle-cobra transition-colors"
              >
                Контракты
              </button>
              <button 
                onClick={() => setShowStats(true)}
                className="text-white hover:text-jungle-cobra transition-colors"
              >
                Статистика
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-jungle-dark rounded-lg px-4 py-2">
                <Icon name="Coins" className="w-5 h-5 text-jungle-gold" />
                <span className="text-jungle-gold font-bold">{balance} 🐍</span>
              </div>
              
              {user ? (
                <div className="flex items-center space-x-2">
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
                  className="cobra-gradient text-black font-bold hover:opacity-90"
                >
                  Войти
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="bg-jungle-dark border-jungle-accent/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white font-['Oswald'] text-2xl flex items-center">
              <Icon name="User" className="w-6 h-6 mr-2 text-jungle-cobra" />
              Профиль охотника
            </DialogTitle>
          </DialogHeader>
          
          {user && (
            <div className="space-y-6">
              <div className="flex items-center space-x-6 p-6 bg-jungle-darker rounded-lg">
                <img 
                  src={user.avatar} 
                  alt={user.username}
                  className="w-24 h-24 rounded-full border-4 border-jungle-cobra"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white font-['Oswald']">{user.username}</h3>
                  <p className="text-jungle-cobra">{user.email}</p>
                  <p className="text-gray-400">В джунглях с {user.joinDate.toLocaleDateString('ru')}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-jungle-darker rounded-lg text-center">
                  <Icon name="Package" className="w-8 h-8 text-jungle-cobra mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{userStats.casesOpened}</p>
                  <p className="text-gray-400">Открыто кейсов</p>
                </div>
                
                <div className="p-4 bg-jungle-darker rounded-lg text-center">
                  <Icon name="FileContract" className="w-8 h-8 text-jungle-gold mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{userStats.contractsCompleted}</p>
                  <p className="text-gray-400">Контрактов</p>
                </div>
                
                <div className="p-4 bg-jungle-darker rounded-lg text-center">
                  <Icon name="TrendingUp" className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-400">{userStats.totalProfit} 🐍</p>
                  <p className="text-gray-400">Прибыль</p>
                </div>
                
                <div className="p-4 bg-jungle-darker rounded-lg text-center">
                  <Icon name="Zap" className="w-8 h-8 text-jungle-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{userStats.luckyStreak}</p>
                  <p className="text-gray-400">Удачная серия</p>
                </div>
              </div>
              
              <div className="p-4 bg-jungle-darker rounded-lg">
                <h4 className="text-white font-bold mb-2">Любимое оружие</h4>
                <p className="text-jungle-cobra">{userStats.favoriteWeapon}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Statistics Dialog */}
      <Dialog open={showStats} onOpenChange={setShowStats}>
        <DialogContent className="bg-jungle-dark border-jungle-accent/20 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-white font-['Oswald'] text-2xl">
              <Icon name="BarChart3" className="w-6 h-6 inline mr-2 text-jungle-accent" />
              Статистика джунглей
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-3 gap-6 py-4">
            <Card className="bg-jungle-darker border-jungle-cobra/20 stats-card">
              <CardContent className="p-6 text-center">
                <Icon name="Users" className="w-12 h-12 text-jungle-cobra mx-auto mb-4" />
                <h3 className="text-white font-bold text-2xl mb-2">12,847</h3>
                <p className="text-gray-400">Активных охотников</p>
                <p className="text-xs text-jungle-cobra mt-2">+247 за неделю</p>
              </CardContent>
            </Card>
            
            <Card className="bg-jungle-darker border-jungle-gold/20 stats-card">
              <CardContent className="p-6 text-center">
                <Icon name="Package" className="w-12 h-12 text-jungle-gold mx-auto mb-4" />
                <h3 className="text-white font-bold text-2xl mb-2">89,432</h3>
                <p className="text-gray-400">Открыто кейсов</p>
                <p className="text-xs text-jungle-gold mt-2">+1,234 сегодня</p>
              </CardContent>
            </Card>
            
            <Card className="bg-jungle-darker border-jungle-accent/20 stats-card">
              <CardContent className="p-6 text-center">
                <Icon name="TrendingUp" className="w-12 h-12 text-jungle-accent mx-auto mb-4" />
                <h3 className="text-white font-bold text-2xl mb-2">523,410 🐍</h3>
                <p className="text-gray-400">Общий оборот</p>
                <p className="text-xs text-jungle-accent mt-2">+15,230 сегодня</p>
              </CardContent>
            </Card>
            
            <Card className="bg-jungle-darker border-red-500/20 stats-card">
              <CardContent className="p-6 text-center">
                <Icon name="FileContract" className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-2xl mb-2">15,678</h3>
                <p className="text-gray-400">Контрактов заключено</p>
                <p className="text-xs text-red-400 mt-2">67% успешных</p>
              </CardContent>
            </Card>
            
            <Card className="bg-jungle-darker border-purple-500/20 stats-card">
              <CardContent className="p-6 text-center">
                <Icon name="Crown" className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-2xl mb-2">AK-47 | Tiger</h3>
                <p className="text-gray-400">Самый редкий дроп</p>
                <p className="text-xs text-purple-400 mt-2">0.001% шанс</p>
              </CardContent>
            </Card>
            
            <Card className="bg-jungle-darker border-green-500/20 stats-card">
              <CardContent className="p-6 text-center">
                <Icon name="Target" className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-2xl mb-2">78%</h3>
                <p className="text-gray-400">Средний винрейт</p>
                <p className="text-xs text-green-400 mt-2">Выше среднего</p>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Auth Dialog */}
      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent className="bg-jungle-dark border-jungle-accent/20">
          <DialogHeader>
            <DialogTitle className="text-white font-['Oswald']">
              {authMode === 'login' ? 'Вход в джунгли' : 'Регистрация охотника'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {authMode === 'login' ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт охотника'}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'register')}>
            <TabsList className="grid w-full grid-cols-2 bg-jungle-darker">
              <TabsTrigger value="login" className="text-white data-[state=active]:bg-jungle-accent data-[state=active]:text-black">
                Вход
              </TabsTrigger>
              <TabsTrigger value="register" className="text-white data-[state=active]:bg-jungle-accent data-[state=active]:text-black">
                Регистрация
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input id="email" type="email" placeholder="hunter@jungle.com" className="bg-jungle-darker border-jungle-accent/20 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Пароль</Label>
                <Input id="password" type="password" className="bg-jungle-darker border-jungle-accent/20 text-white" />
              </div>
              <Button 
                onClick={() => handleAuth('hunter@jungle.com', 'password')}
                className="w-full cobra-gradient text-black font-bold"
              >
                Войти в джунгли
              </Button>
              <p className="text-xs text-gray-400 text-center">
                Для админ-панели используйте: admin@junglecases.com
              </p>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-email" className="text-white">Email</Label>
                <Input id="reg-email" type="email" placeholder="hunter@jungle.com" className="bg-jungle-darker border-jungle-accent/20 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password" className="text-white">Пароль</Label>
                <Input id="reg-password" type="password" className="bg-jungle-darker border-jungle-accent/20 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-white">Подтвердите пароль</Label>
                <Input id="confirm-password" type="password" className="bg-jungle-darker border-jungle-accent/20 text-white" />
              </div>
              <Button 
                onClick={() => handleAuth('newhunter@jungle.com', 'password')}
                className="w-full cobra-gradient text-black font-bold"
              >
                Стать охотником
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Admin Panel */}
      <Dialog open={showAdmin} onOpenChange={setShowAdmin}>
        <DialogContent className="bg-jungle-dark border-jungle-accent/20 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-white font-['Oswald'] text-2xl">
              <Icon name="Shield" className="w-6 h-6 inline mr-2 text-jungle-accent" />
              Админ-панель джунглей
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Управление сайтом Jungle Cases
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-3 gap-6 py-4">
            <Card className="bg-jungle-darker border-jungle-cobra/20">
              <CardContent className="p-6 text-center">
                <Icon name="Users" className="w-12 h-12 text-jungle-cobra mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">12,847</h3>
                <p className="text-gray-400">Активных охотников</p>
              </CardContent>
            </Card>
            
            <Card className="bg-jungle-darker border-jungle-gold/20">
              <CardContent className="p-6 text-center">
                <Icon name="Package" className="w-12 h-12 text-jungle-gold mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">89,432</h3>
                <p className="text-gray-400">Открыто кейсов</p>
              </CardContent>
            </Card>
            
            <Card className="bg-jungle-darker border-jungle-accent/20">
              <CardContent className="p-6 text-center">
                <Icon name="TrendingUp" className="w-12 h-12 text-jungle-accent mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">523,410 🐍</h3>
                <p className="text-gray-400">Общий оборот</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button className="cobra-gradient text-black font-bold flex-1">
                <Icon name="Plus" className="w-4 h-4 mr-2" />
                Добавить кейс
              </Button>
              <Button variant="outline" className="border-jungle-cobra text-jungle-cobra flex-1">
                <Icon name="Edit" className="w-4 h-4 mr-2" />
                Редактировать оружие
              </Button>
            </div>
            <Button variant="outline" className="w-full border-jungle-gold text-jungle-gold">
              <Icon name="BarChart3" className="w-4 h-4 mr-2" />
              Статистика джунглей
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section id="home" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 jungle-gradient opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold text-white mb-6 font-['Oswald'] tracking-wider">
              КЕЙСЫ ДЖУНГЛЕЙ
              <span className="block text-transparent bg-clip-text cobra-gradient mt-2">
                🐍 COBRAS 🐍
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Откройте легендарные скины в глубинах джунглей! 
              Испытайте удачу и получите редчайшие предметы от королевской кобры!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('cases')}
                className="cobra-gradient text-black font-bold text-lg px-8 hover:opacity-90 jungle-pulse"
              >
                <Icon name="Play" className="w-5 h-5 mr-2" />
                В джунгли!
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setShowStats(true)}
                className="border-jungle-cobra text-jungle-cobra hover:bg-jungle-cobra hover:text-black"
              >
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
            <h2 className="text-4xl font-bold text-white mb-8 font-['Oswald']">ОХОТА В ДЖУНГЛЯХ...</h2>
            
            <div className="relative w-full max-w-4xl mx-auto h-40 bg-jungle-dark rounded-lg border-2 border-jungle-accent/20 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-32 bg-jungle-accent z-10 rounded-full"></div>
              
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
            <p className="text-3xl text-jungle-gold mb-8 font-bold">{openedWeapon.price} 🐍</p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => {
                  sellItem(openedWeapon, -1);
                  setOpenedWeapon(null);
                }}
                className="cobra-gradient text-black font-bold px-8 text-lg"
              >
                <Icon name="DollarSign" className="w-5 h-5 mr-2" />
                Продать за {openedWeapon.price} 🐍
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
            КЕЙСЫ ДЖУНГЛЕЙ 🐍
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cases.map((caseItem) => (
              <Card key={caseItem.id} className="bg-jungle-dark border-jungle-accent/20 hover:border-jungle-accent/50 transition-all hover:scale-105 group overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.name}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-jungle-accent text-black font-bold">
                        {caseItem.rarity}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardTitle className="text-white font-['Oswald']">{caseItem.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    Содержит редкие скины из глубин джунглей
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-jungle-gold">{caseItem.price} 🐍</span>
                    <Button 
                      onClick={() => openCase(caseItem)}
                      disabled={balance < caseItem.price}
                      className="cobra-gradient text-black font-bold hover:opacity-90 jungle-pulse"
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
            МОЯ КОЛЛЕКЦИЯ 🎒
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {inventory.map((item, index) => (
              <Card key={index} className="bg-jungle-dark border-jungle-cobra/20 hover:border-jungle-cobra/50 transition-all group">
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
                        disabled={selectedItems.length >= 10 && !selectedItems.find(i => i.name === item.name)}
                      />
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`text-xs text-black font-bold ${getRarityClass(item.rarity)}`}>
                      {item.rarity}
                    </Badge>
                    <span className="text-jungle-gold font-bold">{item.price} 🐍</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => sellItem(item, index)}
                      className="flex-1 bg-jungle-cobra text-black hover:bg-jungle-cobra/80"
                    >
                      <Icon name="DollarSign" className="w-3 h-3 mr-1" />
                      Продать
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toggleItemSelection(item)}
                      className="flex-1 border-jungle-accent text-jungle-accent hover:bg-jungle-accent hover:text-black"
                      disabled={selectedItems.length >= 10 && !selectedItems.find(i => i.name === item.name)}
                    >
                      <Icon name="FileContract" className="w-3 h-3 mr-1" />
                      Контракт
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedItems.length > 0 && (
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-jungle-dark rounded-xl border border-jungle-accent/20">
              <h3 className="text-white font-bold text-xl mb-4 font-['Oswald']">
                Выбрано предметов: {selectedItems.length} / 10
              </h3>
              <p className="text-gray-300 mb-4">
                Общая стоимость: {selectedItems.reduce((sum, item) => sum + item.price, 0)} 🐍
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={() => setShowContracts(true)}
                  disabled={selectedItems.length !== 10}
                  className="cobra-gradient text-black font-bold flex-1"
                >
                  <Icon name="FileContract" className="w-4 h-4 mr-2" />
                  Контракт ({selectedItems.length}/10)
                </Button>
                <Button 
                  onClick={() => setSelectedItems([])}
                  variant="outline"
                  className="border-jungle-cobra text-jungle-cobra"
                >
                  Отменить
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contracts Dialog */}
      <Dialog open={showContracts} onOpenChange={setShowContracts}>
        <DialogContent className="bg-jungle-dark border-jungle-accent/20 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-white font-['Oswald'] text-2xl">
              <Icon name="FileContract" className="w-6 h-6 inline mr-2 text-jungle-accent" />
              Контракт кобры 🐍
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Объедините 10 предметов для заключения контракта с королевской коброй
            </DialogDescription>
          </DialogHeader>
          
          <div className={`space-y-6 ${contractAnimating ? 'contract-animation' : ''}`}>
            <div className="grid grid-cols-5 gap-3">
              {selectedItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg ${getRarityClass(item.rarity)} flex flex-col items-center space-y-2 ${contractAnimating ? 'contract-item-animation' : ''}`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                  <p className="text-black font-bold text-xs text-center">{item.name.split('|')[0]}</p>
                  <p className="text-black text-xs">{item.price} 🐍</p>
                </div>
              ))}
            </div>
            
            <div className="bg-jungle-darker p-6 rounded-xl border-2 border-jungle-accent/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-jungle-accent/5 to-transparent"></div>
              <h4 className="text-white font-bold mb-4 text-xl font-['Oswald']">🐍 Условия контракта королевской кобры:</h4>
              <p className="text-white text-lg mb-4">
                <strong>Общая жертва:</strong> {selectedItems.reduce((sum, item) => sum + item.price, 0)} 🐍
              </p>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 p-6 rounded-xl border border-red-500/30">
                  <div className="text-center">
                    <Icon name="TrendingDown" className="w-8 h-8 text-red-400 mx-auto mb-3" />
                    <p className="text-red-300 font-bold text-lg">50% шанс</p>
                    <p className="text-red-200 text-xl font-bold">{Math.floor(selectedItems.reduce((sum, item) => sum + item.price, 0) * 0.2)} 🐍</p>
                    <p className="text-xs text-red-400 mt-2">Кобра забирает 80%</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 p-6 rounded-xl border border-green-500/30">
                  <div className="text-center">
                    <Icon name="TrendingUp" className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <p className="text-green-300 font-bold text-lg">50% шанс</p>
                    <p className="text-green-200 text-xl font-bold">{Math.floor(selectedItems.reduce((sum, item) => sum + item.price, 0) * 1.4)} 🐍</p>
                    <p className="text-xs text-green-400 mt-2">Кобра благословляет +40%</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-jungle-accent/10 rounded-lg border border-jungle-accent/30">
                <p className="text-jungle-gold text-center font-bold">
                  🐍 Королевская кобра решит вашу судьбу! Все предметы будут принесены в жертву. 🐍
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                onClick={performContract}
                disabled={selectedItems.length !== 10 || contractAnimating}
                className="cobra-gradient text-black font-bold flex-1 text-lg jungle-pulse"
              >
                {contractAnimating ? (
                  <>
                    <Icon name="Loader2" className="w-5 h-5 mr-2 animate-spin" />
                    Кобра решает...
                  </>
                ) : (
                  <>
                    <Icon name="Zap" className="w-5 h-5 mr-2" />
                    Заключить контракт 🐍
                  </>
                )}
              </Button>
              <Button 
                onClick={() => {setShowContracts(false); setSelectedItems([]);}}
                variant="outline"
                disabled={contractAnimating}
                className="border-white text-white"
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-black border-t border-jungle-accent/20 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 cobra-gradient rounded-lg flex items-center justify-center">
                  <Icon name="Zap" className="w-5 h-5 text-black" />
                </div>
                <span className="text-xl font-bold text-white font-['Oswald']">JUNGLE CASES</span>
              </div>
              <p className="text-gray-400 text-sm">
                Лучший сайт для охоты за скинами в джунглях с честной системой и лучшими наградами
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Охота</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button onClick={() => scrollToSection('cases')} className="hover:text-jungle-cobra transition-colors">Кейсы</button></li>
                <li><button onClick={() => scrollToSection('inventory')} className="hover:text-jungle-cobra transition-colors">Инвентарь</button></li>
                <li><button onClick={() => setShowContracts(true)} className="hover:text-jungle-cobra transition-colors">Контракты</button></li>
                <li><button onClick={() => setShowStats(true)} className="hover:text-jungle-cobra transition-colors">Статистика</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-jungle-cobra transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-jungle-cobra transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-jungle-cobra transition-colors">Правила джунглей</a></li>
                <li><a href="#" className="hover:text-jungle-cobra transition-colors">Честная охота</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Сообщество охотников</h4>
              <div className="flex space-x-4 mb-4">
                <Button size="sm" variant="outline" className="border-jungle-cobra text-jungle-cobra hover:bg-jungle-cobra hover:text-black">
                  <Icon name="MessageCircle" className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-jungle-cobra text-jungle-cobra hover:bg-jungle-cobra hover:text-black">
                  <Icon name="Users" className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-jungle-cobra text-jungle-cobra hover:bg-jungle-cobra hover:text-black">
                  <Icon name="Youtube" className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-400">
                Присоединяйся к охотникам джунглей и получай бонусы! 🐍
              </p>
            </div>
          </div>
          
          <div className="border-t border-jungle-accent/20 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Jungle Cases. Все права защищены. Охотьтесь ответственно. 🐍
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;