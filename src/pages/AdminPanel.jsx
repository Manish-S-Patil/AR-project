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
      
      const response = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.auth.adminUsers), {
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
        description: `Successfully loaded ${data.users?.length || 0} users.`
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
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8"
        >
          <div className="min-w-0">
            <h1 className="text-3xl sm:text-4xl font-bold cyber-text mb-1 sm:mb-2 break-words">
              Admin Panel
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage users and monitor system activity
            </p>
          </div>
          
          <div className="flex items-center sm:space-x-4 gap-2 sm:gap-0 flex-wrap">
            <div className="flex items-center space-x-2 glass-effect px-3 sm:px-4 py-2 rounded-lg">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">Admin Access</span>
            </div>
            <div className="flex items-center space-x-2 glass-effect px-3 sm:px-4 py-2 rounded-lg">
              <User className="w-4 h-4" />
              <span className="text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">{userData.username || 'Admin'}</span>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="glass-effect w-full sm:w-auto"
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
          className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
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
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <CardTitle className="text-xl sm:text-2xl">User Management</CardTitle>
                  <CardDescription>
                    View and manage all registered users
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="glass-effect w-full sm:w-auto"
                  >
                    {showPasswords ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    {showPasswords ? 'Hide' : 'Show'} Passwords
                  </Button>
                  <Button
                    onClick={fetchUsers}
                    disabled={loading}
                    className="glass-effect w-full sm:w-auto"
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
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-muted">
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold">ID</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold">Username</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold">Email</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold">Password</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold">Role</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold">Verified</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold">Name</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold">Created</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold">Updated</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold">Actions</th>
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
                          <td className="py-3 px-4">
                            <div className="font-mono text-sm">
                              {showPasswords ? (
                                <span className="text-green-400">{user.password}</span>
                              ) : (
                                <span className="text-muted-foreground">••••••••</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'admin' 
                                ? 'bg-purple-500/20 text-purple-400' 
                                : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.isVerified 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {user.isVerified ? 'Verified' : 'Unverified'}
                            </span>
                          </td>
                          <td className="py-3 px-4">{user.name || 'N/A'}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {formatDate(user.createdAt)}
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {formatDate(user.updatedAt)}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                className={`text-red-400 border-red-400 hover:bg-red-400/10 ${user.role==='admin' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={user.role==='admin'}
                                onClick={async ()=>{
                                  if (user.role==='admin') return;
                                  if (!confirm(`Delete user #${user.id} (${user.username})?`)) return;
                                  try {
                                    const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.auth.adminDeleteUser(user.id)), {
                                      method: 'DELETE',
                                      headers: API_CONFIG.getAuthHeaders(userData.token)
                                    });
                                    const data = await res.json();
                                    if (!res.ok) throw new Error(data.error || 'Failed to delete user');
                                    toast({ title: 'User deleted', description: `Removed #${user.id}` });
                                    fetchUsers();
                                  } catch (e) {
                                    toast({ title: 'Delete failed', description: e.message, variant: 'destructive' });
                                  }
                                }}
                              >
                                Delete
                              </Button>
                            </div>
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

        {/* Game Content Management */}
        <motion.div variants={itemVariants} className="mt-8">
          <Card className="glass-effect cyber-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">Game Content Management</CardTitle>
                  <CardDescription>Create phishing email entries for the game</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <PhishingEmailManager />
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
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  const [filterCategory, setFilterCategory] = useState('all');

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
      // Refresh questions list
      fetchQuestions();
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      setLoadingQuestions(true);
      const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.quiz.admin.getAllQuestions), {
        method: 'GET',
        headers: API_CONFIG.getAuthHeaders(userData.token)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch questions');
      setQuestions(data.questions || []);
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setLoadingQuestions(false);
    }
  };

  const deleteQuestion = async (questionId) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    
    try {
      const res = await fetch(API_CONFIG.getUrl(`${API_CONFIG.endpoints.quiz.admin.deleteQuestion}/${questionId}`), {
        method: 'DELETE',
        headers: API_CONFIG.getAuthHeaders(userData.token)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete question');
      toast({ title: 'Question deleted', description: `Question #${questionId} has been removed` });
      fetchQuestions();
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  // Load questions on component mount
  useEffect(() => {
    if (userData.token) {
      fetchQuestions();
    }
  }, [userData.token]);

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-2 border-b border-muted">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'create'
              ? 'border-purple-500 text-purple-400'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Create Question
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'manage'
              ? 'border-purple-500 text-purple-400'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Manage Questions ({questions.length})
        </button>
      </div>

      {/* Create Question Tab */}
      {activeTab === 'create' && (
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
      )}

      {/* Manage Questions Tab */}
      {activeTab === 'manage' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h3 className="text-lg font-semibold">All Quiz Questions</h3>
            <div className="flex items-center gap-3">
              <label className="text-sm text-muted-foreground">Filter by category</label>
              <select
                className="bg-transparent border rounded p-2 text-sm"
                value={filterCategory}
                onChange={(e)=>setFilterCategory(e.target.value)}
              >
                <option value="all">All</option>
                {Array.from(new Set(questions.map(q=>q.category.key))).map(key=>{
                  const title = (questions.find(q=>q.category.key===key)||{}).category.title;
                  return <option key={key} value={key}>{title}</option>
                })}
              </select>
              <Button onClick={fetchQuestions} disabled={loadingQuestions} variant="outline" className="glass-effect">
                <RefreshCw className={`w-4 h-4 mr-2 ${loadingQuestions ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
          
          {loadingQuestions ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin text-purple-400" />
              <span className="ml-2">Loading questions...</span>
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <p>No questions found. Create your first question!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions
                .filter(q => filterCategory==='all' || q.category.key===filterCategory)
                .map((q) => (
                <QuestionRow key={q.id} q={q} onDeleted={() => fetchQuestions()} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const QuestionRow = ({ q, onDeleted }) => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const [isEditing, setIsEditing] = useState(false);
  const [questionText, setQuestionText] = useState(q.question);
  const [explanationText, setExplanationText] = useState(q.explanation || '');
  const [optionsState, setOptionsState] = useState(q.options.map(o => ({ text: o.text, isCorrect: o.isCorrect })));
  const [saving, setSaving] = useState(false);

  const correctIndex = optionsState.findIndex(o => o.isCorrect);

  const save = async () => {
    try {
      setSaving(true);
      const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.quiz.admin.updateQuestion(q.id)), {
        method: 'PUT',
        headers: API_CONFIG.getAuthHeaders(userData.token),
        body: JSON.stringify({
          question: questionText,
          explanation: explanationText,
          options: optionsState.map(o => o.text),
          correctIndex: Math.max(0, correctIndex)
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update question');
      toast({ title: 'Question updated', description: `ID #${q.id}` });
      setIsEditing(false);
    } catch (e) {
      toast({ title: 'Update failed', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    try {
      const res = await fetch(API_CONFIG.getUrl(`${API_CONFIG.endpoints.quiz.admin.deleteQuestion}/${q.id}`), {
        method: 'DELETE',
        headers: API_CONFIG.getAuthHeaders(userData.token)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      toast({ title: 'Question deleted' });
      onDeleted?.();
    } catch (e) {
      toast({ title: 'Delete failed', description: e.message, variant: 'destructive' });
    }
  };

  return (
    <div className="border border-muted rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-medium">
              {q.category.title}
            </span>
            <span className="text-sm text-muted-foreground">ID: #{q.id}</span>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <input className="w-full bg-transparent border rounded p-2" value={questionText} onChange={e=>setQuestionText(e.target.value)} />
              <div className="space-y-1">
                {optionsState.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input className="flex-1 bg-transparent border rounded p-2" value={opt.text} onChange={e=>{
                      const copy=[...optionsState]; copy[idx]={...copy[idx], text:e.target.value}; setOptionsState(copy);
                    }} />
                    <label className="flex items-center gap-1 text-sm">
                      <input type="radio" name={`correct-${q.id}`} checked={optionsState[idx].isCorrect} onChange={()=>{
                        setOptionsState(optionsState.map((o,i)=>({...o, isCorrect:i===idx})));
                      }} /> Correct
                    </label>
                  </div>
                ))}
              </div>
              <input className="w-full bg-transparent border rounded p-2" placeholder="Explanation (optional)" value={explanationText} onChange={e=>setExplanationText(e.target.value)} />
            </div>
          ) : (
            <>
              <h4 className="font-medium mb-2">{q.question}</h4>
              <div className="space-y-1">
                {q.options.map((option, idx) => (
                  <div key={idx} className={`text-sm ${option.isCorrect ? 'text-green-400 font-medium' : 'text-muted-foreground'}`}>
                    {idx + 1}. {option.text} {option.isCorrect && '✓'}
                  </div>
                ))}
              </div>
              {q.explanation && (
                <p className="text-sm text-muted-foreground mt-2 italic">Explanation: {q.explanation}</p>
              )}
            </>
          )}
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={save} size="sm" className="glass-effect" disabled={saving}>Save</Button>
              <Button onClick={()=>{setIsEditing(false)}} size="sm" variant="outline" className="glass-effect" disabled={saving}>Cancel</Button>
            </>
          ) : (
            <>
              <Button onClick={()=>setIsEditing(true)} size="sm" className="glass-effect">Edit</Button>
              <Button onClick={remove} size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400/10">Delete</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const PhishingEmailManager = () => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const [sender, setSender] = useState('security@paypaI.com');
  const [subject, setSubject] = useState('URGENT: Account Suspended - Verify Now!');
  const [content, setContent] = useState('Your account has been suspended due to suspicious activity. Click here to verify immediately or lose access forever!');
  const [isPhishing, setIsPhishing] = useState(true);
  const [indicators, setIndicators] = useState('Misspelled domain (paypaI vs paypal), Urgent language, Threats of account loss');
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('all'); // all | phishing | safe

  const listEmails = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.game.admin.listPhishingEmails), {
        method: 'GET',
        headers: API_CONFIG.getAuthHeaders(userData.token)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch');
      setItems(data.emails || []);
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally { setLoading(false) }
  };

  const createEmail = async () => {
    try {
      setSaving(true);
      const payload = {
        sender,
        subject,
        content,
        isPhishing,
        indicators: indicators.split(',').map(s => s.trim()).filter(Boolean)
      };
      const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.game.admin.createPhishingEmail), {
        method: 'POST',
        headers: API_CONFIG.getAuthHeaders(userData.token),
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create entry');
      toast({ title: 'Entry created', description: `ID #${data.id}` });
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const updateEmail = async (id, body) => {
    const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.game.admin.updatePhishingEmail(id)), {
      method: 'PATCH', headers: API_CONFIG.getAuthHeaders(userData.token), body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update');
  };

  const deleteEmail = async (id) => {
    const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.game.admin.deletePhishingEmail(id)), {
      method: 'DELETE', headers: API_CONFIG.getAuthHeaders(userData.token)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete');
  };

  useEffect(() => { if (userData.token) listEmails(); }, [userData.token]);

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Sender</label>
          <input className="w-full bg-transparent border rounded p-2" value={sender} onChange={e => setSender(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Subject</label>
          <input className="w-full bg-transparent border rounded p-2" value={subject} onChange={e => setSubject(e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Content</label>
          <textarea className="w-full bg-transparent border rounded p-2" rows={3} value={content} onChange={e => setContent(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Indicators (comma separated)</label>
          <input className="w-full bg-transparent border rounded p-2" value={indicators} onChange={e => setIndicators(e.target.value)} />
        </div>
        <div className="flex items-center gap-2 mt-6">
          <input type="checkbox" checked={isPhishing} onChange={e => setIsPhishing(e.target.checked)} id="isPhishing" />
          <label htmlFor="isPhishing" className="text-sm">Is Phishing</label>
        </div>
      </div>
      <div className="flex gap-3">
        <Button onClick={createEmail} disabled={saving} className="glass-effect">Create Phishing Email</Button>
      </div>

      {/* Manage List */}
      <div className="border-t border-muted pt-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h3 className="text-lg font-semibold">Manage Game Content</h3>
          <div className="flex items-center gap-3">
            <label className="text-sm text-muted-foreground">Filter</label>
            <select className="bg-transparent border rounded p-2 text-sm" value={filterType} onChange={e=>setFilterType(e.target.value)}>
              <option value="all">All</option>
              <option value="phishing">Phishing</option>
              <option value="safe">Safe</option>
            </select>
            <Button onClick={listEmails} variant="outline" className="glass-effect" disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </Button>
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-8"><RefreshCw className="w-6 h-6 animate-spin text-purple-400" /><span className="ml-2">Loading...</span></div>
        ) : items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No entries yet.</div>
        ) : (
          <div className="space-y-4">
            {items
              .filter(it => filterType==='all' || (filterType==='phishing' ? it.isPhishing : !it.isPhishing))
              .map(it => (
              <GameItemRow key={it.id} item={it} onRefresh={listEmails} onUpdate={updateEmail} onDelete={deleteEmail} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const GameItemRow = ({ item, onRefresh, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [sender, setSender] = useState(item.sender);
  const [subject, setSubject] = useState(item.subject);
  const [content, setContent] = useState(item.content);
  const [indicators, setIndicators] = useState((item.indicators||[]).join(', '));
  const [isPhishing, setIsPhishing] = useState(!!item.isPhishing);
  const [active, setActive] = useState(!!item.active);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    try {
      setSaving(true);
      await onUpdate(item.id, { sender, subject, content, indicators: indicators.split(',').map(s=>s.trim()).filter(Boolean), isPhishing, active });
      toast({ title: 'Updated' });
      setEditing(false);
      onRefresh();
    } catch (e) { toast({ title: 'Update failed', description: e.message, variant: 'destructive' }); } finally { setSaving(false); }
  };

  const remove = async () => {
    try { await onDelete(item.id); toast({ title: 'Deleted' }); onRefresh(); }
    catch (e) { toast({ title: 'Delete failed', description: e.message, variant: 'destructive' }); }
  };

  return (
    <div className="border border-muted rounded-lg p-4 space-y-3">
      {editing ? (
        <div className="space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <input className="bg-transparent border rounded p-2" value={sender} onChange={e=>setSender(e.target.value)} />
            <input className="bg-transparent border rounded p-2" value={subject} onChange={e=>setSubject(e.target.value)} />
          </div>
          <textarea className="w-full bg-transparent border rounded p-2" rows={3} value={content} onChange={e=>setContent(e.target.value)} />
          <input className="w-full bg-transparent border rounded p-2" value={indicators} onChange={e=>setIndicators(e.target.value)} />
          <div className="flex items-center gap-4">
            <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={isPhishing} onChange={e=>setIsPhishing(e.target.checked)} /> Phishing</label>
            <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={active} onChange={e=>setActive(e.target.checked)} /> Active</label>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${isPhishing ? 'bg-red-500/20 text-red-400':'bg-green-500/20 text-green-400'}`}>{isPhishing?'Phishing':'Safe'}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${active ? 'bg-blue-500/20 text-blue-400':'bg-muted/50 text-muted-foreground'}`}>{active?'Active':'Inactive'}</span>
          </div>
          <div className="font-medium">{subject}</div>
          <div className="text-sm text-muted-foreground">From: {sender}</div>
          <div className="text-sm">{content}</div>
          {indicators && <div className="text-xs text-muted-foreground">Indicators: {indicators}</div>}
        </div>
      )}
      <div className="flex gap-2">
        {editing ? (
          <>
            <Button onClick={save} size="sm" className="glass-effect" disabled={saving}>Save</Button>
            <Button onClick={()=>setEditing(false)} size="sm" variant="outline" className="glass-effect" disabled={saving}>Cancel</Button>
          </>
        ) : (
          <>
            <Button onClick={()=>setEditing(true)} size="sm" className="glass-effect">Edit</Button>
            <Button onClick={remove} size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400/10">Delete</Button>
          </>
        )}
      </div>
    </div>
  );
};
