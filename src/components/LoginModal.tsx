'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from "next/navigation";


interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [formData, setFormData] = useState({
        identifier: '', // Can be email or username
        password: '',
        userType: 'athlete' as 'athlete' | 'coach' | 'team' | 'club'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    // Clear form when modal closes
    useEffect(() => {
        if (!isOpen) {
            // Reset form data when modal is closed
            setFormData({
                identifier: '',
                password: '',
                userType: 'athlete'
            });
            setError('');
            setIsLoading(false);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Use the auth hook to login
            login(data.token, data.user);

        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-md">
            <div className="relative w-full max-w-md">
                {/* Transparent Card with Glass Effect */}
                <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500 border-opacity-30 p-8">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-white hover:text-cyan-200 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Modal Content */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-cyan-100">
                            Sign in to access your account
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-500 bg-opacity-20 backdrop-blur-sm border border-red-400 border-opacity-30 text-red-200 px-4 py-3 rounded-xl mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off" key={isOpen ? 'open' : 'closed'}>
                        <div>
                            <label htmlFor="user-type" className="block text-sm font-medium text-white mb-2">
                                I am a:
                            </label>
                            <select
                                id="user-type"
                                value={formData.userType}
                                onChange={(e) => setFormData({ ...formData, userType: e.target.value as any })}
                                className="w-full px-4 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-cyan-500 border-opacity-30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                            >
                                <option value="athlete" className="text-gray-800">Athlete</option>
                                <option value="coach" className="text-gray-800">Coach</option>
                                <option value="team" className="text-gray-800">Team Manager</option>
                                <option value="club" className="text-gray-800">Club Trainer</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="user-identifier" className="block text-sm font-medium text-white mb-2">
                                Email or Username
                            </label>
                            <input
                                type="text"
                                id="user-identifier"
                                name="user-login-identifier"
                                autoComplete="new-password"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                required
                                value={formData.identifier}
                                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                                className="w-full px-4 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-cyan-500 border-opacity-30 rounded-xl text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your email or username"
                            />
                        </div>

                        <div>
                            <label htmlFor="user-password" className="block text-sm font-medium text-white mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="user-password"
                                name="user-login-password"
                                autoComplete="new-password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-cyan-500 border-opacity-30 rounded-xl text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-2xl"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-cyan-200 text-sm">
                            Don't have an account?{' '}
                            <button
                                onClick={() => {
                                    onClose();
                                    router.push("/register");
                                }}
                                className="text-white font-semibold hover:text-cyan-200 transition-colors underline"
                            >
                                Sign up here
                            </button>
                        </p>
                    </div>
                </div>

                {/* Decorative Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-xl opacity-20 -z-10"></div>
            </div>
        </div>
    );
}