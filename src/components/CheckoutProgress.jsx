import { CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function CheckoutProgress({ currentStep, onStepClick }) {
  const { language } = useAppContext();
  const steps = [
    { id: 1, num: 1, name: 'Order Details' },
    { id: 2, num: 2, name: 'Shipping Address' },
    { id: 3, num: 3, name: 'Payment' }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="flex items-center justify-between relative">
        {/* Background Track */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#DFE6DA] dark:bg-[#2A3630] z-0 rounded-full"></div>
        {/* Active Track */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#1D2E28] dark:bg-[#EAECE9] z-0 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${(currentStep - 1) * 50}%` }}
        ></div>

        {steps.map((step) => {
          const isCompleted = currentStep > step.num;
          const isActive = currentStep === step.num;

          return (
            <div 
              key={step.id} 
              className={`flex flex-col items-center relative z-10 ${
                onStepClick 
                  ? 'cursor-pointer hover:scale-105 transition-transform' 
                  : step.id === currentStep
                    ? 'cursor-default'
                    : 'opacity-90'
              }`}
              onClick={() => {
                if (onStepClick) {
                  onStepClick(step.id);
                }
              }}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm ${
                  isActive 
                    ? 'bg-[#1D2E28] dark:bg-[#EAECE9] text-white dark:text-[#1D2E28] ring-4 ring-[#1D2E28]/20 dark:ring-[#EAECE9]/20' 
                    : isCompleted 
                      ? 'bg-[#9CAF88] text-white' 
                      : 'bg-white dark:bg-[#0A0E0C] text-[#758467] dark:text-[#A4B396] border-2 border-[#DFE6DA] dark:border-[#2A3630]'
                }`}
              >
                {isCompleted ? <CheckCircle2 size={20} /> : step.num}
              </div>
              <span className={`absolute top-12 whitespace-nowrap text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                isActive ? 'text-[#1D2E28] dark:text-[#EAECE9]' : isCompleted ? 'text-[#9CAF88]' : 'text-[#758467] dark:text-[#A4B396]'
              }`}>
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
