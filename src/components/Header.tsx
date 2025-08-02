import React, { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, User as UserIcon, LogOut, Calculator, BarChart3, Bell, Plane, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    }
  };

  const isActive = (path: string) => window.location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center space-x-2">
            <Calculator className="h-6 w-6" />
            <span className="font-bold text-lg">Currency Converter</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Converter
            </a>
            <a 
              href="/charts" 
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 ${
                isActive('/charts') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Charts
            </a>
            <a 
              href="/alerts" 
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 ${
                isActive('/alerts') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Bell className="h-4 w-4" />
              Alerts
            </a>
            <a 
              href="/travel" 
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 ${
                isActive('/travel') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Plane className="h-4 w-4" />
              Travel
            </a>
            <a 
              href="/blog" 
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 ${
                isActive('/blog') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Blog
            </a>
            <a 
              href="/faq" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/faq') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              FAQ
            </a>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Legal
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-2">
                      <NavigationMenuLink asChild>
                        <a 
                          href="/privacy-policy"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Privacy Policy</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            How we handle your data
                          </p>
                        </a>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <a 
                          href="/terms-of-service"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Terms of Service</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Terms and conditions
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Mobile Navigation */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <a href="/">Converter</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/charts">Charts</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/alerts">Alerts</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/travel">Travel</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/blog">Blog</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/faq">FAQ</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/privacy-policy">Privacy Policy</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/terms-of-service">Terms of Service</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <a href="/auth">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </a>
              <a href="/auth">
                <Button size="sm">
                  Sign Up
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;