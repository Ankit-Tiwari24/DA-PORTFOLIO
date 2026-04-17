import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import axios from 'axios';
import { Send, Paperclip, X, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', file: null });
  const [status, setStatus] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('empty');
      return;
    }
    
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
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setStatus('success');
      toast.success('Thank you for contacting me!');
      setFormData({ name: '', email: '', message: '', file: null });
      if(fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      toast.error(error.response?.data?.message || 'Unable to send message. Please try again.');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file && file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      e.target.value = '';
      return;
    }
    setFormData({...formData, file});
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-16 lg:pb-0 min-h-full"
    >
      <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
        
        {/* LEFT SIDE: Info & Highlights */}
        <div className="lg:col-span-2 space-y-10 lg:sticky lg:top-8 mt-4">
          <div>
            <h2 className="text-[38px] md:text-[44px] font-extrabold text-white leading-tight tracking-tight mb-5 relative w-fit">
              Let's Work<br/>Together <span className="inline-block hover:rotate-12 transition-transform cursor-pointer origin-bottom-right drop-shadow-lg">🚀</span>
              <span className="w-16 h-1.5 bg-accent rounded-full absolute -bottom-3 left-0 shadow-[0_0_15px_rgba(255,215,0,0.5)]"></span>
            </h2>
            <p className="text-dark-mutedtext mt-8 text-lg leading-relaxed font-medium">
              I’m open to Data Analyst roles, freelance work, and exciting collaborations. Let's discuss your data needs and build something impactful.
            </p>
          </div>

          <div className="space-y-6">
            <HighlightCard icon="⚡" title="Quick Response" desc="Typically reply within 24 hours" />
            <HighlightCard icon="📊" title="Data-Driven Solutions" desc="Turning complex data into clear insights" />
            <HighlightCard icon="💼" title="Open for Opportunities" desc="Available for full-time and freelance projects" />
          </div>
        </div>

        {/* RIGHT SIDE: SaaS Premium Form */}
        <div className="lg:col-span-3 w-full">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:-translate-y-1">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-accent/20 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-accent/30"></div>
            
            <h3 className="text-2xl font-bold text-white mb-8 relative z-10 flex items-center gap-3">
              Send a Message
              <span className="h-0.5 flex-grow bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
            </h3>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center z-10 relative"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/40 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">Thank you for contacting me!</h4>
                  <p className="text-dark-mutedtext font-medium">I've received your message and will get back to you shortly.</p>
                  <button 
                    onClick={() => setStatus('')}
                    className="mt-8 px-6 py-2.5 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors border border-white/10"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6 relative z-10"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-dark-mutedtext uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Jane Doe"
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl border border-gray-700/50 bg-black/30 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 placeholder-slate-600 shadow-inner hover:bg-black/40 focus:bg-black/50 focus:shadow-[0_0_15px_rgba(255,215,0,0.15)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-dark-mutedtext uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="jane@example.com"
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl border border-gray-700/50 bg-black/30 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 placeholder-slate-600 shadow-inner hover:bg-black/40 focus:bg-black/50 focus:shadow-[0_0_15px_rgba(255,215,0,0.15)]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-dark-mutedtext uppercase tracking-widest ml-1">Message</label>
                    <textarea 
                      placeholder="How can we help each other?"
                      required 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl border border-gray-700/50 bg-black/30 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 placeholder-slate-600 resize-none shadow-inner hover:bg-black/40 focus:bg-black/50 focus:shadow-[0_0_15px_rgba(255,215,0,0.15)]"
                    />
                  </div>
                  
                  {/* File Upload Premium Drag & Drop Area */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-dark-mutedtext uppercase tracking-widest ml-1">Attachments (Optional)</label>
                    <div className="relative w-full">
                      <input 
                        type="file" 
                        id="fileUpload"
                        ref={fileInputRef}
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label 
                        htmlFor="fileUpload" 
                        className={`flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6 py-6 md:py-8 rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer group shadow-sm overflow-hidden
                          ${formData.file ? 'border-accent/50 bg-accent/5' : 'border-gray-700/60 bg-black/20 hover:border-accent hover:bg-black/40 hover:shadow-[0_0_15px_rgba(255,215,0,0.05)]'}`}
                      >
                        <div className="p-3 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-300 group-hover:bg-accent/20 group-hover:text-accent border border-white/10 group-hover:border-accent/30 text-dark-mutedtext">
                          <Paperclip className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col items-center sm:items-start text-center sm:text-left min-w-0 flex-grow w-full max-w-full">
                          {formData.file ? (
                            <>
                              <span className="text-white font-semibold text-sm truncate max-w-[200px] md:max-w-[280px] leading-tight block">{formData.file.name}</span>
                              <span className="text-green-400 text-[11px] font-bold uppercase tracking-wider mt-1">Ready to send</span>
                            </>
                          ) : (
                            <>
                              <span className="text-dark-mutedtext font-medium text-sm group-hover:text-gray-300 transition-colors">Drag & drop your file here</span>
                              <span className="text-gray-500 text-[11px] mt-1 font-semibold uppercase tracking-wider">Images, PDF, DOC (Max 5MB)</span>
                            </>
                          )}
                        </div>
                      </label>
                      {formData.file && (
                        <button 
                          type="button" 
                          onClick={(e) => {
                            e.preventDefault();
                            setFormData({...formData, file: null});
                            if(fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-full transition-all duration-300 shadow-sm z-10 group/close"
                          title="Remove file"
                        >
                          <X className="w-4 h-4 group-hover/close:rotate-90 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Status & Submit Row */}
                  <div className="pt-2 flex flex-col gap-4">
                    {status === 'error' && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm font-semibold bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Unable to send message. Please try again.
                      </motion.p>
                    )}
                    {status === 'empty' && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-accent text-sm font-semibold bg-accent/10 border border-accent/20 px-4 py-2 rounded-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span> All fields are required.
                      </motion.p>
                    )}
                    
                    <button 
                      type="submit" 
                      disabled={status === 'sending'}
                      className="w-full py-4 bg-gradient-to-r from-accent to-[#eab308] text-[#111] font-extrabold text-[15px] rounded-full hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all duration-300 shadow-[0_4px_15px_rgba(255,215,0,0.2)] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-3 overflow-hidden relative group/btn outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[#111]"
                    >
                      <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                      {status === 'sending' ? (
                          <span className="flex items-center gap-3 relative z-10">
                            Sending Message... 
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-5 h-5 border-[3px] border-[#111]/30 border-t-[#111] rounded-full"></motion.div>
                          </span>
                      ) : (
                          <span className="flex items-center gap-3 relative z-10 tracking-wide uppercase">
                            Send Message <Send className="w-5 h-5 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                          </span>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function HighlightCard({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 shadow-sm hover:bg-white/10 transition-colors group cursor-default">
      <div className="text-2xl mt-1 group-hover:scale-110 transition-transform duration-300 origin-bottom">
        {icon}
      </div>
      <div>
        <h4 className="text-white font-bold text-sm tracking-wide mb-1 group-hover:text-accent transition-colors">{title}</h4>
        <p className="text-dark-mutedtext text-[13px] leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}
