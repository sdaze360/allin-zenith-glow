import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/sections/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { AppleButton } from '@/components/ui/AppleButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Envelope } from 'phosphor-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await resetPassword(email);
      setEmailSent(true);
      toast({
        title: 'Email Sent!',
        description: 'Check your inbox for password reset instructions.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Reset Failed',
        description: 'Could not send reset email. Please check your email address.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-light mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Reset Password
                  </h1>
                  <p className="text-muted-foreground">
                    Enter your email to receive a password reset link
                  </p>
                </div>
                
                {emailSent ? (
                  <div className="text-center space-y-6">
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-primary">
                      <p>A password reset link has been sent to your email address.</p>
                      <p className="mt-2">Please check your inbox and follow the instructions.</p>
                    </div>
                    
                    <Link to="/login">
                      <AppleButton
                        variant="secondary"
                        className="w-full"
                      >
                        Back to Login
                      </AppleButton>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Envelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <AppleButton
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </AppleButton>
                    
                    <p className="text-center text-sm text-muted-foreground">
                      Remember your password?{' '}
                      <Link to="/login" className="text-primary hover:underline">
                        Back to Login
                      </Link>
                    </p>
                  </form>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}