import React from 'react';
import { AlertCircle } from 'lucide-react';

const DisclaimerBanner = ({ customText }) => {
  return (
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200/90 font-mono flex items-start space-x-3 mb-6 shadow-lg shadow-amber-500/5">
      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="font-semibold text-amber-300 uppercase tracking-wider text-[11px]">Scientific & Geological Disclaimer</p>
        <p className="leading-relaxed">
          {customText || "AI-generated exploration targets are prototype decision-support outputs and must be validated through geological surveys, field sampling, drilling and official resource estimation before being treated as confirmed mineral reserves. Satellite spectral indicators are exploratory proxies and are not direct measurements of underground manganese reserves."}
        </p>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
