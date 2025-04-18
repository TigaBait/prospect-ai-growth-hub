
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      window.location.href = "/dashboard";
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-brand-50 to-brand-100">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white font-semibold text-xl">P</div>
        <h1 className="text-2xl font-bold text-brand-900">ProspectAI</h1>
      </div>

      <Card className="w-full max-w-md shadow-lg border-brand-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Log in to your account to continue
          </CardDescription>
        </CardHeader>
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="social">Social Login</TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="social">
            <CardContent className="space-y-4 pt-4">
              <Button variant="outline" className="w-full" onClick={() => alert("This would connect to Google")}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Sign in with Google
              </Button>
              <Button variant="outline" className="w-full" onClick={() => alert("This would connect to Microsoft")}>
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#ff5722" d="M6 6H22V22H6z" />
                  <path fill="#4caf50" d="M26 6H42V22H26z" />
                  <path fill="#ffc107" d="M6 26H22V42H6z" />
                  <path fill="#03a9f4" d="M26 26H42V42H26z" />
                </svg>
                Sign in with Microsoft
              </Button>
            </CardContent>
          </TabsContent>
        </Tabs>
        <div className="mt-4 px-8 pb-8 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="underline text-primary hover:text-primary/90">
            Sign up
          </Link>
        </div>
      </Card>
      
      <div className="mt-8 text-center text-muted-foreground text-sm">
        <p>© 2025 ProspectAI. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
