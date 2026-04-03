import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const { language, register } = useAppContext();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!fullName || !email || !password) {
      setError(language === 'en' ? 'Please fill all fields.' : 'దయచేసి అన్ని ఫీల్డ్‌లను పూరించండి.');
      return;
    }

    const res = register(fullName, email, password);
    if (!res.success) {
       setError(res.message);
    } else {
       setSuccess(language === 'en' ? 'Account created! Redirecting...' : 'ఖాతా సృష్టించబడింది! దారి మళ్లిస్తోంది...');
       setTimeout(() => {
         navigate('/login');
       }, 2000);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-[#F8F7FF] dark:bg-[#0A0E0C]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#111814] p-10 rounded-3xl shadow-xl border border-[#DFE6DA] dark:border-[#2A3630] w-full max-w-md mx-4"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif text-[#1D2E28] dark:text-[#EAECE9] mb-2">
            {language === 'en' ? 'Create Account' : 'ఖాతా సృష్టించండి'}
          </h1>
          <p className="text-[#758467] dark:text-[#A4B396]">
            {language === 'en' ? 'Join the movement of ancient superfoods.' : 'పురాతన సూపర్‌ఫుడ్‌ల ఉద్యమంలో చేరండి.'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleRegister}>
          {error && <div className="text-red-500 text-sm text-center font-bold">{error}</div>}
          {success && <div className="text-green-500 text-sm text-center font-bold">{success}</div>}
          
          <div>
            <label className="block text-sm font-bold text-[#1D2E28] dark:text-[#EAECE9] mb-2">
              {language === 'en' ? 'Full Name' : 'పూర్తి పేరు'}
            </label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#F8F7FF] dark:bg-[#0A0E0C] border border-[#DFE6DA] dark:border-[#2A3630] rounded-xl px-4 py-3 text-[#1D2E28] dark:text-white focus:outline-none focus:border-[#9CAF88] transition-colors"
              placeholder={language === 'en' ? 'John Doe' : 'జాన్ డో'}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1D2E28] dark:text-[#EAECE9] mb-2">
              {language === 'en' ? 'Email Address' : 'ఇమెయిల్ చిరునామా'}
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F8F7FF] dark:bg-[#0A0E0C] border border-[#DFE6DA] dark:border-[#2A3630] rounded-xl px-4 py-3 text-[#1D2E28] dark:text-white focus:outline-none focus:border-[#9CAF88] transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1D2E28] dark:text-[#EAECE9] mb-2">
              {language === 'en' ? 'Password' : 'పాస్వర్డ్'}
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F8F7FF] dark:bg-[#0A0E0C] border border-[#DFE6DA] dark:border-[#2A3630] rounded-xl px-4 py-3 text-[#1D2E28] dark:text-white focus:outline-none focus:border-[#9CAF88] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="w-full bg-[#1D2E28] dark:bg-[#EAECE9] text-white dark:text-[#1D2E28] py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            {language === 'en' ? 'Sign Up' : 'సైన్ అప్ చేయండి'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-[#758467] dark:text-[#A4B396]">
          {language === 'en' ? "Already have an account? " : "ఇప్పటికే ఖాతా ఉందా? "}
          <Link to="/login" className="font-bold text-[#1D2E28] dark:text-white hover:text-[#9CAF88] transition-colors">
            {language === 'en' ? 'Sign in' : 'సైన్ ఇన్ చేయండి'}
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
