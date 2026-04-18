import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { Upload, Trash2, Mail, Edit } from 'lucide-react';

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [editId, setEditId] = useState(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tools, setTools] = useState('');
  const [insights, setInsights] = useState('');
  const [category, setCategory] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (token) {
      fetchAdminData();
    }
  }, [token]);

  const fetchAdminData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [msgRes, projRes] = await Promise.all([
        axios.get(`${API_URL}/api/messages`, config),
        axios.get(`${API_URL}/api/projects`)
      ]);
      setMessages(msgRes.data);
      setProjects(projRes.data);
    } catch (err) {
      if (err.response?.status === 401) handleLogout();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { username, password });
      setToken(res.data.token);
      localStorage.setItem('adminToken', res.data.token);
    } catch (err) {
      alert('Login failed. Ensure backend is running and username/password is admin/admin123');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('adminToken');
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tools', tools);
    formData.append('insights', insights);
    formData.append('category', category);
    if(githubLink) formData.append('githubLink', githubLink);
    if(liveLink) formData.append('liveLink', liveLink);
    if (image) formData.append('image', image);

    try {
      if (editId) {
        await axios.put(`${API_URL}/api/projects/${editId}`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
        alert('Project updated!');
      } else {
        await axios.post(`${API_URL}/api/projects`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
        alert('Project added!');
      }
      fetchAdminData();
      setTitle(''); setDescription(''); setTools(''); setInsights(''); setCategory(''); setGithubLink(''); setLiveLink(''); setImage(null); setEditId(null);
    } catch (error) {
      console.error(error);
      alert('Error saving project');
    }
  };

  const handleEditClick = (p) => {
    setEditId(p._id);
    setTitle(p.title);
    setDescription(p.description);
    setTools(p.tools ? p.tools.join(', ') : '');
    setInsights(p.insights || '');
    setCategory(p.category || '');
    setGithubLink(p.githubLink || '');
    setLiveLink(p.liveLink || '');
    setImage(null);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`${API_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAdminData();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  if (!token) {
    return (
      <div className="pt-32 pb-16 px-4 flex justify-center min-h-[80vh] items-center">
        <div className="glass p-8 rounded-2xl max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white text-center">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required className="w-full px-4 py-2 border rounded-lg dark:bg-dark-border dark:border-none dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-lg dark:bg-dark-border dark:border-none dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
            <button type="submit" className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium">Login</button>
          </form>
          <div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
            <p>Hint: Use admin / admin123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-dark-border dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium rounded-lg transition">Logout</button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Add Project */}
        <div className="glass p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4 flex items-center text-slate-900 dark:text-white"><Upload className="w-5 h-5 mr-2"/> Add Project</h2>
          <form onSubmit={handleAddProject} className="space-y-4">
            <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required className="w-full px-3 py-2 border rounded-lg dark:bg-dark-border dark:text-white dark:border-none outline-none focus:ring-2 focus:ring-primary-500" />
            <textarea placeholder="Description" rows={3} value={description} onChange={e=>setDescription(e.target.value)} required className="w-full px-3 py-2 border rounded-lg dark:bg-dark-border dark:text-white dark:border-none outline-none focus:ring-2 focus:ring-primary-500" />
            <input type="text" placeholder="Tools (comma separated)" value={tools} onChange={e=>setTools(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-dark-border dark:text-white dark:border-none outline-none focus:ring-2 focus:ring-primary-500" />
            <textarea placeholder="Key Insights" rows={2} value={insights} onChange={e=>setInsights(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-dark-border dark:text-white dark:border-none outline-none focus:ring-2 focus:ring-primary-500" />
            <input type="text" placeholder="Category (e.g., Python, SQL, Dashboard)" value={category} onChange={e=>setCategory(e.target.value)} default="Dashboard" className="w-full px-3 py-2 border rounded-lg dark:bg-dark-border dark:text-white dark:border-none outline-none focus:ring-2 focus:ring-primary-500" />
            <div className="flex gap-4">
               <input type="text" placeholder="GitHub Link" value={githubLink} onChange={e=>setGithubLink(e.target.value)} className="flex-1 px-3 py-2 border rounded-lg dark:bg-dark-border dark:text-white dark:border-none outline-none focus:ring-2 focus:ring-primary-500" />
               <input type="text" placeholder="Live Link" value={liveLink} onChange={e=>setLiveLink(e.target.value)} className="flex-1 px-3 py-2 border rounded-lg dark:bg-dark-border dark:text-white dark:border-none outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Project Image</label>
              <input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} className="w-full text-slate-600 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-dark-border dark:file:text-primary-400 cursor-pointer" />
            </div>
            <button type="submit" className="w-full py-3 bg-accent text-dark-bg hover:bg-accent-hover font-semibold rounded-xl transition mt-4">{editId ? 'Update Project' : 'Save Project'}</button>
            {editId && <button type="button" onClick={() => {setTitle(''); setDescription(''); setTools(''); setInsights(''); setCategory(''); setGithubLink(''); setLiveLink(''); setImage(null); setEditId(null);}} className="w-full py-2 bg-transparent text-dark-mutedtext hover:text-white transition mt-2">Cancel Edit</button>}
          </form>
        </div>

        <div className="space-y-8">
          {/* Projects List */}
          <div className="glass p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Manage Projects</h2>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {projects.map(p => (
                <div key={p._id} className="flex justify-between items-center p-3 bg-white/50 dark:bg-dark-border/50 rounded-lg border dark:border-none relative">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{p.title}</h3>
                    <p className="text-xs text-slate-500">{p.category}</p>
                  </div>
                  <div className="flex">
                    <button onClick={() => handleEditClick(p)} className="text-blue-500 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteProject(p._id)} className="text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && <p className="text-slate-500 text-sm">No projects added yet.</p>}
            </div>
          </div>

          {/* Messages */}
          <div className="glass p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 flex items-center text-slate-900 dark:text-white"><Mail className="w-5 h-5 mr-2"/> Messages</h2>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {messages.map(m => (
                <div key={m._id} className="p-4 bg-white/50 dark:bg-dark-border/50 rounded-lg border dark:border-none">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{m.name}</h4>
                      <a href={`mailto:${m.email}`} className="text-xs text-primary-500 hover:underline">{m.email}</a>
                    </div>
                    <span className="text-xs text-slate-500">{new Date(m.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 p-2 bg-slate-50 dark:bg-dark-card rounded break-words">{m.message}</p>
                </div>
              ))}
              {messages.length === 0 && <p className="text-slate-500 text-sm">No new messages.</p>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
