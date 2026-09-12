import React, { useState, useEffect } from 'react';
import { pricingData } from '../data';
import { Check, X, Zap, Copy } from 'lucide-react';

export const Pricing: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [selectedPkg, setSelectedPkg] = useState<typeof pricingData[0] | null>(null);

  const lnurl = "lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhhqmm5v93xcetnd9nkuctvxgcsm55zyn";

  // Fetch current BTC price to calculate exact Sats
  useEffect(() => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => res.json())
      .then(data => {
        if (data?.bpi?.USD?.rate_float) {
          setBtcPrice(data.bpi.USD.rate_float);
        }
      })
      .catch(err => console.error('Failed to fetch BTC price', err));
  }, []);

  const getSatsAmount = (usdPriceStr: string) => {
    if (!btcPrice) return null;
    const usd = parseFloat(usdPriceStr.replace('$', '').replace(',', ''));
    return Math.round((usd / btcPrice) * 100000000);
  };

  const handleCopyLnurl = async () => {
    const fallbackCopy = (text: string) => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
      document.body.removeChild(textArea);
    };

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(lnurl);
      } else {
        fallbackCopy(lnurl);
      }
    } catch (err) {
      console.warn('Clipboard API failed, using fallback', err);
      fallbackCopy(lnurl);
    }
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="pricing" className="py-24 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold leading-7 text-brand-600">Pricing</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Scale your content, not your headcount
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Hire an AI virtual assistant for a fraction of the cost. Start for free, upgrade when you need more volume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingData.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`relative flex flex-col rounded-3xl p-8 ring-1 ${
                pkg.isPopular 
                  ? 'bg-slate-900 ring-slate-900 shadow-xl scale-105 z-10' 
                  : 'bg-white ring-slate-200 shadow-sm mt-4 mb-4'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-brand-500 px-3 py-1 text-center text-xs font-semibold text-white shadow-sm">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className={`text-lg font-semibold leading-8 ${pkg.isPopular ? 'text-white' : 'text-slate-900'}`}>
                  {pkg.name}
                </h3>
                <p className={`mt-4 text-sm leading-6 h-12 ${pkg.isPopular ? 'text-slate-300' : 'text-slate-600'}`}>
                  {pkg.description}
                </p>
                <div className="mt-6 flex items-baseline gap-x-1">
                  <span className={`text-4xl font-bold tracking-tight ${pkg.isPopular ? 'text-white' : 'text-slate-900'}`}>
                    {pkg.price}
                  </span>
                  <span className={`text-sm font-semibold leading-6 ${pkg.isPopular ? 'text-slate-300' : 'text-slate-600'}`}>
                    {pkg.interval}
                  </span>
                </div>
              </div>

              <ul className={`mt-auto space-y-3 text-sm leading-6 ${pkg.isPopular ? 'text-slate-300' : 'text-slate-600'} mb-8`}>
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex gap-x-3">
                    <Check className={`h-5 w-5 flex-none ${pkg.isPopular ? 'text-brand-400' : 'text-brand-600'}`} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPkg(pkg)}
                className={`mt-auto flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors ${
                  pkg.isPopular
                    ? 'bg-brand-500 text-white hover:bg-brand-400 focus-visible:outline-brand-500'
                    : 'bg-brand-50 text-brand-600 hover:bg-brand-100 ring-1 ring-inset ring-brand-200'
                }`}
              >
                <Zap className="h-4 w-4" />
                Pay with Lightning
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {selectedPkg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
                Lightning Payment
              </h3>
              <button 
                onClick={() => setSelectedPkg(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 text-center">
              <p className="text-slate-600 mb-6">
                Scan this QR code with your Lightning wallet to subscribe to the <strong className="text-slate-900">{selectedPkg.name}</strong> plan.
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 inline-block mb-6">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=lightning:${lnurl}`} 
                  alt="Lightning Invoice QR Code" 
                  className="w-48 h-48 mx-auto rounded-lg"
                />
              </div>

              <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 mb-6">
                <p className="text-sm text-brand-600 font-medium mb-1">Amount to send:</p>
                <div className="text-3xl font-bold text-brand-900">
                  {getSatsAmount(selectedPkg.price)?.toLocaleString() || '...'} <span className="text-lg font-semibold text-brand-700">Sats</span>
                </div>
                <p className="text-xs text-brand-600/80 mt-1">
                  ≈ {selectedPkg.price} USD (Live Rate)
                </p>
              </div>

              <button
                onClick={handleCopyLnurl}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-400" />
                    LNURL Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy LNURL
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};