import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Paperclip, X } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', file: null });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);
      if (formData.file) {
        data.append('file', formData.file);
      }

      await axios.post('http://localhost:5000/api/contact', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus('success');
      toast.success('Thank you for contacting me!');
      setFormData({ name: '', email: '', message: '', file: null });
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      toast.error(error.response?.data?.message || 'Unable to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Get In Touch</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Have a data problem? Let's solve it together.</p>
      </div>

      <div className="glass p-8 rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
            <input 
              type="text" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input 
              type="email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
            <textarea 
              required 
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Attach File (optional)</label>
            <div className="relative">
              <input 
                type="file" 
                id="fileUploadSec"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if(file && file.size > 5 * 1024 * 1024) {
                    toast.error('File size must be less than 5MB');
                    e.target.value = '';
                    return;
                  }
                  setFormData({...formData, file});
                }}
                className="hidden"
              />
              <label 
                htmlFor="fileUploadSec" 
                className="flex items-center gap-3 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card text-slate-500 dark:text-slate-400 cursor-pointer hover:border-primary-500 transition"
              >
                <Paperclip className="w-5 h-5 flex-shrink-0" />
                <span className="truncate flex-grow text-sm">{formData.file ? formData.file.name : 'Select a file (Images, PDF, DOC - Max 5MB)'}</span>
              </label>
              {formData.file && (
                <button 
                  type="button" 
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData({...formData, file: null});
                    document.getElementById('fileUploadSec').value = '';
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors z-10"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={status === 'sending'}
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition shadow-md shadow-primary-500/30 disabled:opacity-70"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          
          {status === 'success' && <p className="text-green-500 text-center text-sm font-medium text-center">Thank you for contacting me!</p>}
          {status === 'error' && <p className="text-red-500 text-center text-sm font-medium text-center">Unable to send message. Please try again.</p>}
        </form>
      </div>
    </section>
  );
}
