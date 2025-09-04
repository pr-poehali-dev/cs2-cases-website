import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface AdminPanelProps {
  showAdmin: boolean;
  setShowAdmin: (show: boolean) => void;
  user: any;
  balance: number;
  setBalance: (balance: number) => void;
  weapons: any[];
  setWeapons: (weapons: any[]) => void;
  cases: any[];
  setCases: (cases: any[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  showAdmin,
  setShowAdmin,
  user,
  balance,
  setBalance,
  weapons,
  setWeapons,
  cases,
  setCases
}) => {
  const [newWeapon, setNewWeapon] = useState({ 
    name: '', 
    rarity: 'потребительский', 
    price: 0, 
    image: '', 
    dropChance: 0.1 
  });
  const [newCase, setNewCase] = useState({ 
    name: '', 
    price: 0, 
    image: '', 
    rarity: 'обычный' 
  });
  const [balanceChange, setBalanceChange] = useState(0);
  const [dropMultiplier, setDropMultiplier] = useState(1);

  const mockUsers = [
    { id: 1, username: 'hunter123', email: 'hunter@test.com', balance: 250, status: 'active' },
    { id: 2, username: 'sniper_pro', email: 'sniper@test.com', balance: 1500, status: 'active' },
    { id: 3, username: 'noob_player', email: 'noob@test.com', balance: 50, status: 'blocked' },
    { id: 4, username: 'admin', email: 'admin@junglecases.com', balance: 999999, status: 'admin' }
  ];

  const rarities = ['потребительский', 'промышленный', 'армейский', 'запрещенный', 'засекреченный', 'скрытый'];

  const addWeapon = () => {
    if (newWeapon.name && newWeapon.price > 0) {
      const weapon = {
        ...newWeapon,
        id: Date.now(),
        image: newWeapon.image || '/img/5ac857d4-d25f-43b9-b2d2-5a30db8c30c9.jpg'
      };
      setWeapons([...weapons, weapon]);
      setNewWeapon({ name: '', rarity: 'потребительский', price: 0, image: '', dropChance: 0.1 });
    }
  };

  const addCase = () => {
    if (newCase.name && newCase.price > 0) {
      const caseItem = {
        ...newCase,
        id: Date.now(),
        image: newCase.image || '/img/386effb8-3efb-4de0-a5a6-acc2b09939e8.jpg'
      };
      setCases([...cases, caseItem]);
      setNewCase({ name: '', price: 0, image: '', rarity: 'обычный' });
    }
  };

  const changeBalance = () => {
    setBalance(balance + balanceChange);
    setBalanceChange(0);
  };

  const updateDropChances = () => {
    const updatedWeapons = weapons.map(weapon => ({
      ...weapon,
      dropChance: weapon.dropChance * dropMultiplier
    }));
    setWeapons(updatedWeapons);
    setDropMultiplier(1);
  };

  return (
    <Dialog open={showAdmin} onOpenChange={setShowAdmin}>
      <DialogContent className="bg-jungle-dark border-jungle-accent/20 max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white font-['Oswald'] text-2xl">
            <Icon name="Shield" className="w-6 h-6 inline mr-2 text-jungle-accent" />
            Админ-панель джунглей 👑
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Управление сайтом Jungle Cases
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-jungle-darker">
            <TabsTrigger value="stats" className="text-white data-[state=active]:bg-jungle-accent data-[state=active]:text-black">
              Статистика
            </TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-jungle-accent data-[state=active]:text-black">
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="weapons" className="text-white data-[state=active]:bg-jungle-accent data-[state=active]:text-black">
              Оружие
            </TabsTrigger>
            <TabsTrigger value="cases" className="text-white data-[state=active]:bg-jungle-accent data-[state=active]:text-black">
              Кейсы
            </TabsTrigger>
            <TabsTrigger value="balance" className="text-white data-[state=active]:bg-jungle-accent data-[state=active]:text-black">
              Баланс
            </TabsTrigger>
            <TabsTrigger value="drops" className="text-white data-[state=active]:bg-jungle-accent data-[state=active]:text-black">
              Дропы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg">Управление пользователями</h4>
              {mockUsers.map((mockUser) => (
                <Card key={mockUser.id} className="bg-jungle-darker border-jungle-accent/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mockUser.username}`}
                          alt={mockUser.username}
                          className="w-12 h-12 rounded-full border-2 border-jungle-cobra"
                        />
                        <div>
                          <h5 className="text-white font-bold">{mockUser.username}</h5>
                          <p className="text-gray-400 text-sm">{mockUser.email}</p>
                          <p className="text-jungle-gold text-sm">{mockUser.balance} 🐍</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          mockUser.status === 'admin' ? 'bg-jungle-accent text-black' :
                          mockUser.status === 'blocked' ? 'bg-red-500 text-white' :
                          'bg-green-500 text-white'
                        }>
                          {mockUser.status}
                        </Badge>
                        <Button size="sm" variant="outline" className="border-jungle-cobra text-jungle-cobra">
                          <Icon name="Edit" className="w-4 h-4 mr-1" />
                          Изменить
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500 text-red-400">
                          <Icon name="Ban" className="w-4 h-4 mr-1" />
                          {mockUser.status === 'blocked' ? 'Разблокировать' : 'Блокировать'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weapons" className="space-y-4">
            <Card className="bg-jungle-darker border-jungle-accent/20">
              <CardContent className="p-4">
                <h4 className="text-white font-bold text-lg mb-4">Добавить новое оружие</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Название</Label>
                    <Input 
                      value={newWeapon.name}
                      onChange={(e) => setNewWeapon({...newWeapon, name: e.target.value})}
                      placeholder="AK-47 | Jungle Tiger"
                      className="bg-jungle-darker border-jungle-accent/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Редкость</Label>
                    <select 
                      value={newWeapon.rarity}
                      onChange={(e) => setNewWeapon({...newWeapon, rarity: e.target.value})}
                      className="w-full p-2 bg-jungle-darker border border-jungle-accent/20 text-white rounded"
                    >
                      {rarities.map(rarity => (
                        <option key={rarity} value={rarity}>{rarity}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Цена (🐍)</Label>
                    <Input 
                      type="number"
                      value={newWeapon.price}
                      onChange={(e) => setNewWeapon({...newWeapon, price: parseInt(e.target.value)})}
                      className="bg-jungle-darker border-jungle-accent/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Шанс дропа</Label>
                    <Input 
                      type="number"
                      step="0.01"
                      value={newWeapon.dropChance}
                      onChange={(e) => setNewWeapon({...newWeapon, dropChance: parseFloat(e.target.value)})}
                      className="bg-jungle-darker border-jungle-accent/20 text-white"
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label className="text-white">URL изображения</Label>
                  <Input 
                    value={newWeapon.image}
                    onChange={(e) => setNewWeapon({...newWeapon, image: e.target.value})}
                    placeholder="/img/weapon.jpg"
                    className="bg-jungle-darker border-jungle-accent/20 text-white"
                  />
                </div>
                <Button 
                  onClick={addWeapon}
                  className="cobra-gradient text-black font-bold mt-4"
                >
                  <Icon name="Plus" className="w-4 h-4 mr-2" />
                  Добавить оружие
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              {weapons.map((weapon, index) => (
                <Card key={index} className="bg-jungle-darker border-jungle-accent/20">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={weapon.image} 
                        alt={weapon.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h5 className="text-white font-bold text-sm">{weapon.name}</h5>
                        <p className="text-gray-400 text-xs">{weapon.rarity}</p>
                        <p className="text-jungle-gold text-sm">{weapon.price} 🐍</p>
                        <p className="text-jungle-cobra text-xs">{(weapon.dropChance * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cases" className="space-y-4">
            <Card className="bg-jungle-darker border-jungle-accent/20">
              <CardContent className="p-4">
                <h4 className="text-white font-bold text-lg mb-4">Добавить новый кейс</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Название</Label>
                    <Input 
                      value={newCase.name}
                      onChange={(e) => setNewCase({...newCase, name: e.target.value})}
                      placeholder="Jungle Serpent Case"
                      className="bg-jungle-darker border-jungle-accent/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Цена (🐍)</Label>
                    <Input 
                      type="number"
                      value={newCase.price}
                      onChange={(e) => setNewCase({...newCase, price: parseInt(e.target.value)})}
                      className="bg-jungle-darker border-jungle-accent/20 text-white"
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label className="text-white">URL изображения</Label>
                  <Input 
                    value={newCase.image}
                    onChange={(e) => setNewCase({...newCase, image: e.target.value})}
                    placeholder="/img/case.jpg"
                    className="bg-jungle-darker border-jungle-accent/20 text-white"
                  />
                </div>
                <Button 
                  onClick={addCase}
                  className="cobra-gradient text-black font-bold mt-4"
                >
                  <Icon name="Plus" className="w-4 h-4 mr-2" />
                  Добавить кейс
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              {cases.map((caseItem) => (
                <Card key={caseItem.id} className="bg-jungle-darker border-jungle-accent/20">
                  <CardContent className="p-3">
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h5 className="text-white font-bold text-sm">{caseItem.name}</h5>
                    <p className="text-jungle-gold text-sm">{caseItem.price} 🐍</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="balance" className="space-y-4">
            <Card className="bg-jungle-darker border-jungle-accent/20">
              <CardContent className="p-6">
                <h4 className="text-white font-bold text-lg mb-4">Управление балансом</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 mb-2">Текущий баланс: <span className="text-jungle-gold font-bold">{balance} 🐍</span></p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Input 
                      type="number"
                      value={balanceChange}
                      onChange={(e) => setBalanceChange(parseInt(e.target.value))}
                      placeholder="Изменение баланса (+ или -)"
                      className="bg-jungle-darker border-jungle-accent/20 text-white"
                    />
                    <Button 
                      onClick={changeBalance}
                      className="cobra-gradient text-black font-bold"
                    >
                      <Icon name="DollarSign" className="w-4 h-4 mr-2" />
                      Изменить
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => {setBalanceChange(1000); changeBalance();}}
                      size="sm"
                      variant="outline"
                      className="border-green-500 text-green-400"
                    >
                      +1000 🐍
                    </Button>
                    <Button 
                      onClick={() => {setBalanceChange(5000); changeBalance();}}
                      size="sm"
                      variant="outline"
                      className="border-green-500 text-green-400"
                    >
                      +5000 🐍
                    </Button>
                    <Button 
                      onClick={() => {setBalanceChange(-500); changeBalance();}}
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-400"
                    >
                      -500 🐍
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drops" className="space-y-4">
            <Card className="bg-jungle-darker border-jungle-accent/20">
              <CardContent className="p-6">
                <h4 className="text-white font-bold text-lg mb-4">Управление шансами дропа</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Input 
                      type="number"
                      step="0.1"
                      value={dropMultiplier}
                      onChange={(e) => setDropMultiplier(parseFloat(e.target.value))}
                      placeholder="Множитель шансов"
                      className="bg-jungle-darker border-jungle-accent/20 text-white"
                    />
                    <Button 
                      onClick={updateDropChances}
                      className="cobra-gradient text-black font-bold"
                    >
                      <Icon name="Zap" className="w-4 h-4 mr-2" />
                      Применить
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => {setDropMultiplier(2); updateDropChances();}}
                      size="sm"
                      variant="outline"
                      className="border-green-500 text-green-400"
                    >
                      x2 Увеличить
                    </Button>
                    <Button 
                      onClick={() => {setDropMultiplier(0.5); updateDropChances();}}
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-400"
                    >
                      x0.5 Уменьшить
                    </Button>
                    <Button 
                      onClick={() => {setDropMultiplier(1); updateDropChances();}}
                      size="sm"
                      variant="outline"
                      className="border-jungle-cobra text-jungle-cobra"
                    >
                      Сбросить
                    </Button>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Множитель применяется ко всем существующим оружиям. 
                    Например, 2 = удвоить шансы, 0.5 = уменьшить вдвое.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;