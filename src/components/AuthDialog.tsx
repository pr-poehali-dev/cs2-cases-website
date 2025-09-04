import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthDialogProps {
  showAuth: boolean;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  handleAuth: (email: string, password: string) => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({
  showAuth,
  authMode,
  setAuthMode,
  handleAuth
}) => {
  const handleSubmit = (isLogin: boolean) => {
    const emailId = isLogin ? 'email' : 'reg-email';
    const passwordId = isLogin ? 'password' : 'reg-password';
    const email = (document.getElementById(emailId) as HTMLInputElement)?.value || '';
    const password = (document.getElementById(passwordId) as HTMLInputElement)?.value || '';
    if (email && password) handleAuth(email, password);
  };

  const handleKeyPress = (e: React.KeyboardEvent, isLogin: boolean) => {
    if (e.key === 'Enter') {
      if (isLogin) {
        const email = (e.target as HTMLInputElement).value;
        const password = ((e.target as HTMLInputElement).parentNode?.parentNode?.querySelector('#password') as HTMLInputElement)?.value || '';
        if (email && password) handleAuth(email, password);
      } else {
        handleSubmit(false);
      }
    }
  };

  return (
    <Dialog open={showAuth} onOpenChange={() => {}}>
      <DialogContent className="bg-jungle-dark border-jungle-accent/20" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-white font-['Oswald'] text-center text-2xl">
            🐍 Добро пожаловать в джунгли! 🐍
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-center">
            Авторизуйтесь для доступа к охоте за скинами
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
              <Label htmlFor="email" className="text-white">Email или логин</Label>
              <Input 
                id="email" 
                type="text" 
                placeholder="hunter@jungle.com или admin" 
                className="bg-jungle-darker border-jungle-accent/20 text-white"
                onKeyPress={(e) => handleKeyPress(e, true)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Пароль</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Введите пароль"
                className="bg-jungle-darker border-jungle-accent/20 text-white"
                onKeyPress={(e) => handleKeyPress(e, true)}
              />
            </div>
            <Button 
              onClick={() => handleSubmit(true)}
              className="w-full cobra-gradient text-black font-bold"
            >
              Войти в джунгли 🐍
            </Button>
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-400">
                Для админ-панели: <strong>admin</strong> / <strong>admin</strong>
              </p>
              <p className="text-xs text-jungle-cobra">
                Новые охотники получают 1000 🐍
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reg-email" className="text-white">Email</Label>
              <Input 
                id="reg-email" 
                type="email" 
                placeholder="hunter@jungle.com" 
                className="bg-jungle-darker border-jungle-accent/20 text-white" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-password" className="text-white">Пароль</Label>
              <Input 
                id="reg-password" 
                type="password" 
                className="bg-jungle-darker border-jungle-accent/20 text-white" 
              />
            </div>
            <Button 
              onClick={() => handleSubmit(false)}
              className="w-full cobra-gradient text-black font-bold"
            >
              Стать охотником 🐍
            </Button>
            <p className="text-xs text-gray-400 text-center">
              Регистрируясь, вы получаете 1000 🐍 для старта охоты!
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;