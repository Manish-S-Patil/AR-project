import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Shield, 
  LogOut, 
  RefreshCw, 
  User, 
  Mail, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from '../components/ui/use-toast';
import API_CONFIG from '../lib/api';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPasswords, setShowPasswords] = useState(false);
  const navigate = useNavigate();
  
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  // Check if user is authenticated
  useEffect(() => {
    if (!userData.token && !userData.isGuest) {
      toast({
        title: "Access Denied",
        description: "Please log in to access the admin panel.",
        variant: "destructive"
      });
      navigate('/');
      return;
    }
    
    // If user is a guest, show message and redirect
    if (userData.isGuest) {
      toast({
        title: "Guest Access",
        description: "Admin panel requires authentication. Please log in.",
        variant: "destructive"
      });
      navigate('/');
      return;
    }
  }, [userData, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.users.admin), {
        method: 'GET',
        headers: API_CONFIG.getAuthHeaders(userData.token)
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Token is invalid or expired
          localStorage.removeItem('userData');
          toast({
            title: "Session Expired",
            description: "Please log in again to access the admin panel.",
            variant: "destructive"
          });
          navigate('/');
          return;
        }
        throw new Error(data.error || 'Failed to fetch users');
      }

      setUsers(data.users || []);
      toast({
        title: "Users Loaded",
        description: `Successfully loaded ${data.count} users.`
      });
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message);
      toast({
        title: "Error",
        description: err.message || "Failed to fetch users.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData.token) {
      fetchUsers();
    }
  }, [userData.token]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
    navigate('/');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Show loading or redirect if not authenticated
  if (!userData.token || userData.isGuest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Card className="glass-effect cyber-border max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 text-red-400" />
            <h2 className="text-2xl font-bold mb-2">Access Required</h2>
            <p className="text-muted-foreground mb-4">
              The admin panel requires authentication. Please log in to continue.
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold cyber-text mb-2">
              Admin Panel
            </h1>
            <p className="text-muted-foreground">
              Manage users and monitor system activity
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-lg">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">Admin Access</span>
            </div>
            <div className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-lg">
              <User className="w-4 h-4" />
              <span className="text-sm">{userData.username || 'Admin'}</span>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="glass-effect"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass-effect cyber-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 glow-effect">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{users.length}</p>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-effect cyber-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 glow-effect">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{users.filter(user => user.createdAt).length}</p>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-effect cyber-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 glow-effect">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {users.filter(user => {
                        const userDate = new Date(user.createdAt);
                        const today = new Date();
                        const diffTime = Math.abs(today - userDate);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        return diffDays <= 7;
                      }).length}
                    </p>
                    <p className="text-sm text-muted-foreground">New This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Users Table */}
        <motion.div variants={itemVariants}>
          <Card className="glass-effect cyber-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">User Management</CardTitle>
                  <CardDescription>
                    View and manage all registered users
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="glass-effect"
                  >
                    {showPasswords ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    {showPasswords ? 'Hide' : 'Show'} Passwords
                  </Button>
                  <Button
                    onClick={fetchUsers}
                    disabled={loading}
                    className="glass-effect"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="w-8 h-8 animate-spin text-purple-400" />
                  <span className="ml-2">Loading users...</span>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-12 text-red-400">
                  <AlertCircle className="w-8 h-8 mr-2" />
                  <span>{error}</span>
                </div>
              ) : users.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-muted-foreground">
                  <Users className="w-8 h-8 mr-2" />
                  <span>No users found</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-muted">
                        <th className="text-left py-3 px-4 font-semibold">ID</th>
                        <th className="text-left py-3 px-4 font-semibold">Username</th>
                        <th className="text-left py-3 px-4 font-semibold">Email</th>
                        <th className="text-left py-3 px-4 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 font-semibold">Created</th>
                        <th className="text-left py-3 px-4 font-semibold">Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          variants={itemVariants}
                          className="border-b border-muted/50 hover:bg-muted/20 transition-colors"
                        >
                          <td className="py-3 px-4 text-sm font-mono text-muted-foreground">
                            #{user.id}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{user.username}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              <span>{user.email}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{user.name || 'N/A'}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {formatDate(user.createdAt)}
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {formatDate(user.updatedAt)}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quiz Management */}
        <motion.div variants={itemVariants} className="mt-8">
          <Card className="glass-effect cyber-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">Quiz Management</CardTitle>
                  <CardDescription>Create quiz categories and questions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <QuizManager />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;

// Inline QuizManager component for brevity
const QuizManager = () => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const [categoryKey, setCategoryKey] = useState('general');
  const [categoryTitle, setCategoryTitle] = useState('General Cybersecurity Quiz');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [question, setQuestion] = useState('');
  const [explanation, setExplanation] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [saving, setSaving] = useState(false);

  const preset = [
    { key: 'general', title: 'General Cybersecurity Quiz' },
    { key: 'phishing', title: 'Phishing Detection Quiz' },
    { key: 'fake-login', title: 'Fake Login Page Quiz' },
    { key: 'weak-password', title: 'Password Security Quiz' },
    { key: 'malware-usb', title: 'USB Security Quiz' },
    { key: 'safe-browsing', title: 'Safe Browsing Quiz' }
  ];

  const upsertCategory = async () => {
    try {
      setSaving(true);
      const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.quiz.admin.upsertCategory), {
        method: 'POST',
        headers: API_CONFIG.getAuthHeaders(userData.token),
        body: JSON.stringify({ key: categoryKey, title: categoryTitle, description: categoryDescription })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save category');
      toast({ title: 'Category saved', description: `${data.title} (${data.key})` });
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const createQuestion = async () => {
    try {
      setSaving(true);
      const payload = { categoryKey, question, explanation, options, correctIndex };
      const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.quiz.admin.createQuestion), {
        method: 'POST',
        headers: API_CONFIG.getAuthHeaders(userData.token),
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create question');
      toast({ title: 'Question created', description: `ID #${data.id}` });
      setQuestion('');
      setExplanation('');
      setOptions(['', '', '', '']);
      setCorrectIndex(0);
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <label className="block text-sm mb-1">Category</label>
          <select
            className="w-full bg-transparent border rounded p-2"
            value={categoryKey}
            onChange={(e) => {
              const key = e.target.value;
              setCategoryKey(key);
              const found = preset.find(p => p.key === key);
              if (found) setCategoryTitle(found.title);
            }}
          >
            {preset.map(p => (
              <option key={p.key} value={p.key}>{p.title}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm mb-1">Title</label>
          <input className="w-full bg-transparent border rounded p-2" value={categoryTitle} onChange={e => setCategoryTitle(e.target.value)} />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm mb-1">Description</label>
          <input className="w-full bg-transparent border rounded p-2" value={categoryDescription} onChange={e => setCategoryDescription(e.target.value)} />
        </div>
      </div>
      <div className="flex gap-3">
        <Button onClick={upsertCategory} disabled={saving} className="glass-effect">Save Category</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Question</label>
          <input className="w-full bg-transparent border rounded p-2" value={question} onChange={e => setQuestion(e.target.value)} />
        </div>
        {options.map((opt, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              className="flex-1 bg-transparent border rounded p-2"
              value={opt}
              placeholder={`Option ${idx + 1}`}
              onChange={e => {
                const copy = [...options];
                copy[idx] = e.target.value;
                setOptions(copy);
              }}
            />
            <label className="flex items-center gap-1 text-sm">
              <input type="radio" name="correct" checked={correctIndex === idx} onChange={() => setCorrectIndex(idx)} /> Correct
            </label>
          </div>
        ))}
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Explanation (optional)</label>
          <input className="w-full bg-transparent border rounded p-2" value={explanation} onChange={e => setExplanation(e.target.value)} />
        </div>
      </div>
      <div className="flex gap-3">
        <Button onClick={createQuestion} disabled={saving} className="glass-effect">Create Question</Button>
      </div>
    </div>
  );
};
