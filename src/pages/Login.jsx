import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { language, login } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate(-1); // Go back to where they were, or home
    } else {
      setError(language === 'en' ? 'Invalid credentials' : 'చెల్లని ఆధారాలు');
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
            {language === 'en' ? 'Welcome Back' : 'స్వాగతం'}
          </h1>
          <p className="text-[#758467] dark:text-[#A4B396]">
            {language === 'en' ? 'Enter your details to access your account.' : 'మీ ఖాతాను యాక్సెస్ చేయడానికి మీ వివరాలను నమోదు చేయండి.'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {error && <div className="text-red-500 text-sm text-center font-bold">{error}</div>}
          <div>
            <label className="block text-sm font-bold text-[#1D2E28] dark:text-[#EAECE9] mb-2">
              {language === 'en' ? 'Username / Email' : 'వినియోగదారు పేరు / ఇమెయిల్'}
            </label>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F8F7FF] dark:bg-[#0A0E0C] border border-[#DFE6DA] dark:border-[#2A3630] rounded-xl px-4 py-3 text-[#1D2E28] dark:text-white focus:outline-none focus:border-[#9CAF88] transition-colors"
              placeholder="admin or user1"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-[#1D2E28] dark:text-[#EAECE9]">
                {language === 'en' ? 'Password' : 'పాస్వర్డ్'}
              </label>
              <a href="#" className="text-xs text-[#9CAF88] hover:text-[#1D2E28] dark:hover:text-white transition-colors">
                {language === 'en' ? 'Forgot password?' : 'పాస్వర్డ్ మర్చిపోయారా?'}
              </a>
            </div>
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
            {language === 'en' ? 'Sign In' : 'సైన్ ఇన్ చేయండి'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-[#758467] dark:text-[#A4B396]">
          {language === 'en' ? "Don't have an account? " : "ఖాతా లేదా? "}
          <Link to="/register" className="font-bold text-[#1D2E28] dark:text-white hover:text-[#9CAF88] transition-colors">
            {language === 'en' ? 'Create one' : 'ఒకటి సృష్టించండి'}
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
