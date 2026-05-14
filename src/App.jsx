import { useState } from 'react';
import Step0Landing from './components/Step0Landing';
import Step1Proposal from './components/Step1Proposal';
import Step2DateTime from './components/Step2DateTime';
import Step3Snacks from './components/Step3Snacks';
import Step4Beverages from './components/Step4Beverages';
import Step5Summary from './components/Step5Summary';

function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    date: '',
    time: '',
    location: '',
    snacks: [],
    beverages: []
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);
  
  const resetSteps = () => {
    setStep(0);
    setData({
      date: '',
      time: '',
      location: '',
      snacks: [],
      beverages: []
    });
  };

  const updateData = (newData) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  return (
    <>
      <div className="floating-elements">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
      
      <div className="app-container">
        {step === 0 && <Step0Landing onNext={nextStep} />}
        {step === 1 && <Step1Proposal onNext={nextStep} />}
        {step === 2 && <Step2DateTime data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />}
        {step === 3 && <Step3Snacks data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />}
        {step === 4 && <Step4Beverages data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />}
        {step === 5 && <Step5Summary data={data} onRestart={resetSteps} />}
      </div>
    </>
  );
}

export default App;
