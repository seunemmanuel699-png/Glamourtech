import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  ShieldAlert, 
  Zap, 
  HelpCircle, 
  CheckCircle,
  Briefcase,
  Layers,
  ArrowRight,
  Download,
  FileText
} from 'lucide-react';

type AutomationLevel = 'tier1' | 'tier2' | 'tier3';

interface CalculationResult {
  hoursSaved: number;
  monthlySavings: number;
  annualSavings: number;
  efficiencyMultiplier: number;
  potentialRevenueLift: number;
  breakEvenMonths: number;
  roiPercentage: number;
}

export const RoiCalculator: React.FC = () => {
  // Inputs
  const [manualHours, setManualHours] = useState<number>(350);
  const [hourlyWage, setHourlyWage] = useState<number>(45);
  const [automationLevel, setAutomationLevel] = useState<AutomationLevel>('tier2');
  const [monthlyInquiries, setMonthlyInquiries] = useState<number>(1200);
  const [averageCustomerValue, setAverageCustomerValue] = useState<number>(2500);

  // Active Tooltip for explanation
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  // Dynamic calculations based on tier factors
  const results = useMemo<CalculationResult>(() => {
    let takeoverRate = 0.5; // Tier 1: 50%
    let efficiencyFactor = 2.5; // 2.5x speedup
    let leadConversionLift = 0.05; // 5% lift in lead qualification/conversion
    let subscriptionCost = 1200; // Monthly system maintenance/cost

    if (automationLevel === 'tier2') {
      takeoverRate = 0.8; // Tier 2: 80%
      efficiencyFactor = 5.0; // 5x speedup
      leadConversionLift = 0.12; // 12% lift
      subscriptionCost = 2800;
    } else if (automationLevel === 'tier3') {
      takeoverRate = 0.95; // Tier 3: 95%
      efficiencyFactor = 12.0; // 12x speedup
      leadConversionLift = 0.22; // 22% lift
      subscriptionCost = 5500;
    }

    // Direct cost calculation
    const currentCost = manualHours * hourlyWage;
    const hoursSaved = Math.round(manualHours * takeoverRate);
    const grossSavings = hoursSaved * hourlyWage;
    const monthlySavings = Math.max(0, grossSavings - subscriptionCost);
    const annualSavings = monthlySavings * 12;

    // Revenue Lift calculation (conservatively assumes 5% of inquiries are high-intent leads)
    const highIntentLeads = monthlyInquiries * 0.05;
    const baselineConversions = highIntentLeads * 0.15; // 15% baseline conversion
    const absoluteExtraConversions = highIntentLeads * leadConversionLift;
    const potentialRevenueLift = Math.round(absoluteExtraConversions * averageCustomerValue * 12);

    // Timeline and ROI
    // Estimated implementation cost (one-time setup)
    const initialSetupCost = subscriptionCost * 4; 
    const totalFirstYearNetBenefits = annualSavings + potentialRevenueLift;
    const roiPercentage = Math.round(((totalFirstYearNetBenefits - initialSetupCost) / initialSetupCost) * 100);
    const breakEvenMonths = Math.min(12, Number((initialSetupCost / (monthlySavings + (potentialRevenueLift / 12))).toFixed(1)));

    return {
      hoursSaved,
      monthlySavings,
      annualSavings,
      efficiencyMultiplier: efficiencyFactor,
      potentialRevenueLift,
      breakEvenMonths: isNaN(breakEvenMonths) || !isFinite(breakEvenMonths) ? 1 : breakEvenMonths,
      roiPercentage: Math.max(50, roiPercentage)
    };
  }, [manualHours, hourlyWage, automationLevel, monthlyInquiries, averageCustomerValue]);

  const levelDetails = {
    tier1: {
      title: 'Tier 1: Core Automation',
      desc: 'Automates basic repetitive workflows, standard inquiries, and simple lead routing.',
      benefits: ['Up to 50% hours reclaimed', 'Instant lead response speed', 'Basic CRM data logging']
    },
    tier2: {
      title: 'Tier 2: Deep Orchestration',
      desc: 'Deploys autonomous voice/text agents with cross-platform CRM logic & database access.',
      benefits: ['Up to 80% hours reclaimed', 'Full API integrations & context logic', 'Automated scheduling & qualification']
    },
    tier3: {
      title: 'Tier 3: Autonomous Architecture',
      desc: 'Fully autonomous enterprise agents acting as digital workforce with advanced decision models.',
      benefits: ['Up to 95% hours reclaimed', 'Comprehensive risk governance & private cloud', 'Proactive customer & support loops']
    }
  };

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Colors
      const deepNavy = [7, 13, 25]; // #070D19
      const brightTeal = [0, 210, 255]; // #00D2FF
      const primaryBlue = [0, 102, 255]; // #0066FF
      const lightBg = [240, 244, 248];
      const darkText = [30, 41, 59];
      const mutedText = [100, 116, 139];

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Top Header Block
      doc.setFillColor(deepNavy[0], deepNavy[1], deepNavy[2]);
      doc.rect(0, 0, pageWidth, 42, 'F');

      // Accent border
      doc.setFillColor(brightTeal[0], brightTeal[1], brightTeal[2]);
      doc.rect(0, 42, pageWidth, 2.5, 'F');

      // Header Brand text
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text('GLAMOURTECH SOLUTION', 15, 18);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(brightTeal[0], brightTeal[1], brightTeal[2]);
      doc.text('ENTERPRISE AI SYSTEMS & AUTOMATION ARCHITECTURE', 15, 24);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('ROI FEASIBILITY ASSESSMENT REPORT', 15, 33);

      // Metadata on right side
      const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(220, 220, 220);
      doc.text(`DATE: ${today}`, pageWidth - 70, 18);
      doc.text(`REF ID: GT-ROI-${Math.floor(Math.random() * 90000) + 10000}`, pageWidth - 70, 24);
      doc.text(`CONFIDENTIALITY: RESTRICTED`, pageWidth - 70, 30);

      let y = 56;

      // Executive Summary Section
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(deepNavy[0], deepNavy[1], deepNavy[2]);
      doc.text('1. EXECUTIVE SUMMARY', 15, y);
      y += 2;
      doc.setDrawColor(220, 225, 230);
      doc.setLineWidth(0.4);
      doc.line(15, y, pageWidth - 15, y);
      y += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(darkText[0], darkText[1], darkText[2]);
      const summaryPara = `This personalized assessment quantifies the efficiency yields, cost offsets, and revenue generation unlocked by deploying Glamourtech's customized AI systems. Based on your current operational configuration, deploying a ${levelDetails[automationLevel].title} is projected to streamline key workflows, reclaim manual labor capacity, and accelerate response cycles. The total forecasted first-year return on investment reaches +${results.roiPercentage}% with a projected break-even timeline of approximately ${results.breakEvenMonths} months.`;
      const wrapSummary = doc.splitTextToSize(summaryPara, pageWidth - 30);
      doc.text(wrapSummary, 15, y);
      y += wrapSummary.length * 4.8 + 6;

      // Current Operational Baseline Section
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(deepNavy[0], deepNavy[1], deepNavy[2]);
      doc.text('2. OPERATIONAL BASELINE (CLIENT PROVIDED)', 15, y);
      y += 2;
      doc.line(15, y, pageWidth - 15, y);
      y += 6;

      // Custom Baseline Table
      doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
      doc.rect(15, y, pageWidth - 30, 28, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(deepNavy[0], deepNavy[1], deepNavy[2]);
      doc.text('Operational Metric Source', 20, y + 6);
      doc.text('Current Monthly Value', 105, y + 6);
      doc.text('Blended Rate / Value Factor', 150, y + 6);

      doc.setDrawColor(200, 210, 220);
      doc.line(18, y + 9, pageWidth - 18, y + 9);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(darkText[0], darkText[1], darkText[2]);
      doc.text('Manual Administrative Tasks', 20, y + 15);
      doc.text(`${manualHours} Hours / Month`, 105, y + 15);
      doc.text(`$${hourlyWage} / Hour`, 150, y + 15);

      doc.text('Inbound Customer Inquiries', 20, y + 22);
      doc.text(`${monthlyInquiries.toLocaleString()} Inquiries / Month`, 105, y + 22);
      doc.text(`$${averageCustomerValue.toLocaleString()} Avg Value`, 150, y + 22);

      y += 36;

      // ROI & Projected Yields Section
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(deepNavy[0], deepNavy[1], deepNavy[2]);
      doc.text('3. DETAILED AI IMPACT FORECAST (ANNUALIZED)', 15, y);
      y += 2;
      doc.line(15, y, pageWidth - 15, y);
      y += 6;

      // 4 Grid-like highlight boxes
      const boxW = (pageWidth - 30 - 6) / 2;
      
      // Box 1: Reclaimed Savings
      doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
      doc.rect(15, y, boxW, 25, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
      doc.text('ANNUAL DIRECT SAVINGS (OVERHEAD RECLAIMED)', 19, y + 6);
      doc.setFontSize(15);
      doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      doc.text(`$${results.annualSavings.toLocaleString()} / year`, 19, y + 17);

      // Box 2: Revenue Lift
      doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
      doc.rect(15 + boxW + 6, y, boxW, 25, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
      doc.text('ANNUAL EXTRA CAPTURED REVENUE LIFT', 15 + boxW + 9, y + 6);
      doc.setFontSize(15);
      doc.setTextColor(0, 140, 60); // Clean Green
      doc.text(`+$${results.potentialRevenueLift.toLocaleString()} / year`, 15 + boxW + 9, y + 17);

      y += 30;

      // Box 3: Hours Saved & Speedup
      doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
      doc.rect(15, y, boxW, 25, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
      doc.text('MONTHLY MAN-HOURS REDIRECTED', 19, y + 6);
      doc.setFontSize(14);
      doc.setTextColor(deepNavy[0], deepNavy[1], deepNavy[2]);
      doc.text(`${results.hoursSaved} Hours (${results.efficiencyMultiplier}x Speedup)`, 19, y + 17);

      // Box 4: Break Even & Year 1 ROI
      doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
      doc.rect(15 + boxW + 6, y, boxW, 25, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
      doc.text('PROJECTED YEAR 1 ROI / PAYBACK TIMELINE', 15 + boxW + 9, y + 6);
      doc.setFontSize(14);
      doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      doc.text(`+${results.roiPercentage}% / ~${results.breakEvenMonths} Months`, 15 + boxW + 9, y + 17);

      y += 33;

      // Recommended Architecture Breakdown Section
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(deepNavy[0], deepNavy[1], deepNavy[2]);
      doc.text('4. SYSTEM CAPABILITIES & DELIVERY FRAMEWORK', 15, y);
      y += 2;
      doc.line(15, y, pageWidth - 15, y);
      y += 6;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      doc.text(levelDetails[automationLevel].title, 15, y);
      y += 4.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(darkText[0], darkText[1], darkText[2]);
      const wrapDesc = doc.splitTextToSize(levelDetails[automationLevel].desc, pageWidth - 30);
      doc.text(wrapDesc, 15, y);
      y += wrapDesc.length * 4.5 + 4;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(deepNavy[0], deepNavy[1], deepNavy[2]);
      doc.text('Engine Implementation Benchmarks:', 15, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      levelDetails[automationLevel].benefits.forEach((benefit) => {
        doc.text(`[✓]  ${benefit}`, 18, y);
        y += 4.5;
      });

      // Bottom Footer Bar on absolute page boundary
      doc.setFillColor(deepNavy[0], deepNavy[1], deepNavy[2]);
      doc.rect(0, pageHeight - 28, pageWidth, 28, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text('GLAMOURTECH ENTERPRISE STRATEGY', 15, pageHeight - 17);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(190, 200, 210);
      doc.text('Bring this simulation to your next alignment call to configure custom RAG frameworks and private hosting.', 15, pageHeight - 12);
      doc.text('Operations Hub Access & Secure Sandbox: glamourtechsolution@gmail.com', 15, pageHeight - 7);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(brightTeal[0], brightTeal[1], brightTeal[2]);
      doc.text('www.glamourtech.com', pageWidth - 55, pageHeight - 12);

      doc.save(`Glamourtech_ROI_Assessment_${automationLevel}.pdf`);
    } catch (err) {
      console.error('Error rendering PDF layout:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div id="roi-calculator" className="bg-[#070D19]/60 border border-white/10 p-6 md:p-10 rounded-sm shadow-2xl relative overflow-hidden">
      {/* Visual Tech Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-[1px] bg-[#00D2FF]"></div>
      <div className="absolute top-0 left-0 w-[1px] h-8 bg-[#00D2FF]"></div>
      <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-[#00D2FF]"></div>
      <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-[#00D2FF]"></div>

      {/* Header */}
      <div className="mb-10 text-center lg:text-left">
        <span className="text-[#00D2FF] font-black tracking-[0.4em] text-[10px] uppercase block mb-3">Enterprise Optimization Tool</span>
        <h2 className="text-3xl md:text-4xl font-black heading-font uppercase tracking-tight text-white">
          Cost Savings & <span className="text-[#00D2FF]">ROI Calculator</span>
        </h2>
        <p className="text-gray-400 text-sm mt-2 max-w-2xl leading-relaxed">
          Input your current operational metrics below to simulate the projected efficiency yields and financial return of deploying advanced AI automation architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Sliders & Controls */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Select Automation Tier */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black tracking-widest text-gray-400 uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00D2FF]" /> Target Integration Depth
              </label>
              <button 
                onClick={() => setActiveTooltip(activeTooltip === 'tier' ? null : 'tier')}
                className="text-gray-500 hover:text-[#00D2FF] transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
            
            <AnimatePresence>
              {activeTooltip === 'tier' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-[#122B4C]/40 border border-[#00D2FF]/20 rounded-sm text-xs text-gray-300 leading-relaxed mb-2"
                >
                  The integration tier determines the takeover capability of the AI models. Higher tiers use custom retrieval pipelines (RAG), private fine-tuning, and direct API actions.
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['tier1', 'tier2', 'tier3'] as AutomationLevel[]).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setAutomationLevel(tier)}
                  className={`p-4 border transition-all text-left relative overflow-hidden rounded-sm ${
                    automationLevel === tier 
                      ? 'border-[#00D2FF] bg-[#00D2FF]/10 text-white' 
                      : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-gray-400 hover:text-white'
                  }`}
                >
                  {automationLevel === tier && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-[#00D2FF] rounded-bl-sm flex items-center justify-center">
                      <CheckCircle className="w-2.5 h-2.5 text-[#070D19]" />
                    </div>
                  )}
                  <div className="font-bold text-xs uppercase tracking-wider mb-1">
                    {tier === 'tier1' ? 'Tier 1' : tier === 'tier2' ? 'Tier 2' : 'Tier 3'}
                  </div>
                  <div className="text-[10px] opacity-80 leading-snug">
                    {tier === 'tier1' ? 'Core Flows' : tier === 'tier2' ? 'Deep Systems' : 'Autonomous'}
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-sm">
              <h4 className="text-white font-bold text-xs mb-1 uppercase tracking-wider text-[#00D2FF]">
                {levelDetails[automationLevel].title}
              </h4>
              <p className="text-gray-400 text-xs leading-normal mb-3">
                {levelDetails[automationLevel].desc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {levelDetails[automationLevel].benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[10px] text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] flex-shrink-0" />
                    <span className="truncate">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slider 1: Manual Labor Hours */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00D2FF]" /> Manual Operational Hours
              </span>
              <span className="font-mono text-white bg-white/5 px-2 py-1 rounded-sm border border-white/10">
                <input 
                  type="number" 
                  value={manualHours} 
                  onChange={(e) => setManualHours(Math.max(10, Math.min(10000, Number(e.target.value))))}
                  className="bg-transparent text-right w-16 focus:outline-none focus:text-[#00D2FF] font-bold"
                /> hrs/month
              </span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="2000" 
              step="10"
              value={manualHours}
              onChange={(e) => setManualHours(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00D2FF]"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>20 hrs</span>
              <span>1,000 hrs (Mid-size Team)</span>
              <span>2,000 hrs (Enterprise Dept)</span>
            </div>
          </div>

          {/* Slider 2: Average Hourly Cost */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#00D2FF]" /> Avg. Hourly Cost (Blended)
              </span>
              <span className="font-mono text-white bg-white/5 px-2 py-1 rounded-sm border border-white/10">
                $<input 
                  type="number" 
                  value={hourlyWage} 
                  onChange={(e) => setHourlyWage(Math.max(10, Math.min(500, Number(e.target.value))))}
                  className="bg-transparent text-right w-12 focus:outline-none focus:text-[#00D2FF] font-bold"
                /> /hr
              </span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="150" 
              step="5"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00D2FF]"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>$15/hr</span>
              <span>$50/hr (Skilled Dev/Ops)</span>
              <span>$150/hr (Specialist)</span>
            </div>
          </div>

          {/* Grid of secondary metrics (Inquiries & Customer Value) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-white/5">
            {/* Monthly Inquiries */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#00D2FF]" /> Monthly Inquiries
                </span>
                <span className="font-mono text-white font-bold">
                  {monthlyInquiries.toLocaleString()}
                </span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="10000" 
                step="100"
                value={monthlyInquiries}
                onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00D2FF]"
              />
              <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                <span>100</span>
                <span>10,000</span>
              </div>
            </div>

            {/* Average Customer Value */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#00D2FF]" /> Avg. Customer Value
                </span>
                <span className="font-mono text-white font-bold">
                  ${averageCustomerValue.toLocaleString()}
                </span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="25000" 
                step="500"
                value={averageCustomerValue}
                onChange={(e) => setAverageCustomerValue(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00D2FF]"
              />
              <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                <span>$500</span>
                <span>$25k (Enterprise)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Projections / Output Panel */}
        <div className="lg:col-span-5 bg-[#0A162B] border border-white/10 p-6 rounded-sm relative">
          <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/20">
            <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse"></span>
            <span className="text-[9px] font-black tracking-widest text-[#00D2FF] uppercase">Live Model Yield</span>
          </div>

          <h3 className="text-sm font-black tracking-widest text-white uppercase mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#00D2FF]" /> Projected Returns
          </h3>

          <div className="space-y-6">
            
            {/* Primary Massive Metric: Annual Savings */}
            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-sm">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Direct Cost Reclaimed (Annually)</span>
              <div className="text-4xl font-black heading-font text-[#00D2FF] tracking-tight">
                ${results.annualSavings.toLocaleString()}
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5 text-xs text-gray-400">
                <span>Monthly savings:</span>
                <span className="font-mono text-white font-bold">${results.monthlySavings.toLocaleString()}</span>
              </div>
            </div>

            {/* Split Metrics: Hours Reclaimed & Revenue Lift */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-sm">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-1">Hours Reclaimed</span>
                <div className="text-xl font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
                  {results.hoursSaved} <span className="text-[10px] text-gray-400">/mo</span>
                </div>
              </div>

              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-sm">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-1">Performance Speedup</span>
                <div className="text-xl font-bold text-white flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
                  {results.efficiencyMultiplier}x
                </div>
              </div>
            </div>

            {/* Revenue Lift Potential */}
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#0066FF]/5 rounded-full blur-xl"></div>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Potential Lead Revenue Lift (Annual)</span>
              <div className="text-2xl font-black text-white tracking-tight flex items-center gap-1">
                <span className="text-[#00D2FF] font-bold">+</span>
                ${results.potentialRevenueLift.toLocaleString()}
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5 leading-normal">
                Estimated increase in business capture based on instant autonomous qualified responses.
              </p>
            </div>

            {/* Efficiency / Timeline Ring Gauge */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-sm grid grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-1">Est. Break-even</span>
                <div className="text-lg font-black text-white">
                  {results.breakEvenMonths} <span className="text-xs text-gray-400">months</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#0066FF] to-[#00D2FF]" 
                    style={{ width: `${Math.min(100, (12 - results.breakEvenMonths) * 8.3)}%` }}
                  />
                </div>
              </div>

              <div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-1">Projected Year 1 ROI</span>
                <div className="text-lg font-black text-[#00D2FF]">
                  +{results.roiPercentage}%
                </div>
                <span className="text-[8px] text-gray-500 font-mono">Setup included</span>
              </div>
            </div>

            {/* Warning / Disclaimers */}
            <div className="flex gap-2.5 items-start text-[10px] text-gray-400 bg-white/[0.02] p-3 rounded-sm">
              <ShieldAlert className="w-4 h-4 text-[#00D2FF] flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Projections are models based on industry averages. Actual enterprise yields vary by internal legacy structure compatibility.
              </p>
            </div>

            {/* Download PDF Report Action */}
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="w-full py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black text-xs uppercase tracking-[0.25em] transition-all rounded-sm duration-300 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPdf ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#00D2FF] border-t-transparent rounded-full animate-spin"></span>
                  Generating Report...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#00D2FF]" /> Download PDF Report
                </>
              )}
            </button>

            {/* Contact Action */}
            <button
              onClick={() => {
                const contactSection = document.getElementById('strategy-call');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/contact';
                }
              }}
              className="w-full py-4 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] hover:from-[#00D2FF] hover:to-[#0066FF] text-[#070D19] font-black text-xs uppercase tracking-[0.25em] transition-all rounded-sm duration-300 shadow-xl shadow-[#00D2FF]/10 active:scale-[0.99] flex items-center justify-center gap-2"
            >
              Deploy Strategic Plan <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};
