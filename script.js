// Forexify Trading Network & Academy Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Close mobile menu on link click
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
    });
  });

  // Animated Number Counter
  const countElements = document.querySelectorAll('.counter-val');
  let counted = false;

  const countUp = () => {
    countElements.forEach(el => {
      const target = +el.getAttribute('data-target');
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const duration = 2000;
      const stepTime = 30;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.innerText = prefix + target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          el.innerText = prefix + Math.floor(current).toLocaleString() + suffix;
        }
      }, stepTime);
    });
  };

  // Intersection Observer for Counter
  const statsSection = document.getElementById('statsSection');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        countUp();
      }
    }, { threshold: 0.25 });
    observer.observe(statsSection);
  } else {
    countUp();
  }

  // Strategy Tabs Switching
  const tabBtns = document.querySelectorAll('.strategy-tab-btn');
  const tabContents = document.querySelectorAll('.strategy-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update button active styles
      tabBtns.forEach(b => {
        b.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/50');
        b.classList.add('text-slate-400', 'border-transparent', 'hover:bg-slate-800/50');
      });
      btn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/50');
      btn.classList.remove('text-slate-400', 'border-transparent', 'hover:bg-slate-800/50');

      // Update contents
      tabContents.forEach(content => {
        if (content.id === targetId) {
          content.classList.remove('hidden');
          content.classList.add('animate-fadeIn');
        } else {
          content.classList.add('hidden');
          content.classList.remove('animate-fadeIn');
        }
      });
    });
  });

  // Interactive Risk & Position Size Calculator
  const calcBalance = document.getElementById('calcBalance');
  const calcRiskPct = document.getElementById('calcRiskPct');
  const calcStopLoss = document.getElementById('calcStopLoss');
  const calcRR = document.getElementById('calcRR');

  const outRiskAmount = document.getElementById('outRiskAmount');
  const outRewardAmount = document.getElementById('outRewardAmount');
  const outLotSize = document.getElementById('outLotSize');
  const outGrowthPct = document.getElementById('outGrowthPct');

  function updateCalculator() {
    if (!calcBalance || !calcRiskPct || !calcStopLoss || !calcRR) return;
    
    const balance = parseFloat(calcBalance.value) || 10000;
    const riskPct = parseFloat(calcRiskPct.value) || 1;
    const slPips = parseFloat(calcStopLoss.value) || 20;
    const rrRatio = parseFloat(calcRR.value) || 3;

    const riskAmount = (balance * (riskPct / 100));
    const rewardAmount = riskAmount * rrRatio;
    // Pip value standard: 1 standard lot = $10 per pip on EURUSD
    const pipCostPerLot = 10;
    const lotSize = (riskAmount / (slPips * pipCostPerLot));
    const growthPct = (rewardAmount / balance) * 100;

    if (outRiskAmount) outRiskAmount.innerText = `$${riskAmount.toFixed(2)}`;
    if (outRewardAmount) outRewardAmount.innerText = `+$${rewardAmount.toFixed(2)}`;
    if (outLotSize) outLotSize.innerText = `${lotSize.toFixed(2)} Lots`;
    if (outGrowthPct) outGrowthPct.innerText = `+${growthPct.toFixed(1)}%`;
  }

  [calcBalance, calcRiskPct, calcStopLoss, calcRR].forEach(input => {
    if (input) {
      input.addEventListener('input', updateCalculator);
    }
  });
  updateCalculator();

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (trigger && answer) {
      trigger.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');
        // Close all
        document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
        document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

        if (!isOpen) {
          answer.classList.remove('hidden');
          if (icon) icon.classList.add('rotate-180');
        }
      });
    }
  });

  // Dynamic subtle fluctuations in market ticker pips to feel super live
  const tickerPrices = document.querySelectorAll('.live-ticker-val');
  setInterval(() => {
    tickerPrices.forEach(node => {
      const baseVal = parseFloat(node.getAttribute('data-base'));
      if (!baseVal) return;
      const decimals = parseInt(node.getAttribute('data-decimals') || '2');
      const randomDelta = (Math.random() - 0.49) * (baseVal * 0.0003);
      const newVal = (baseVal + randomDelta).toFixed(decimals);
      node.innerText = newVal;
    });
  }, 2200);
});

// Direct WhatsApp Dispatcher Helper
function openWhatsApp(courseName = '') {
  const phone = '923045887551';
  let message = 'Hello Forexify Trading Network & Academy! I would like to get more information about joining the academy.';
  
  if (courseName === 'basic') {
    message = 'Hello Forexify Academy! I want to enroll in the Basic Trader Blueprint Course ($99). Please guide me with payment and batch access.';
  } else if (courseName === 'advance') {
    message = 'Hello Forexify Academy! I want to enroll in the Advance Pro Trader Course ($189) with ICT/SMC & BTS Strategy. Please share payment details.';
  } else if (courseName === 'extreme') {
    message = 'Hello Forexify Academy! I want to enroll in the Extreme Master the Market Course ($349) with 1-on-1 Mentorship & Order Flow. Please book my VIP seat.';
  } else if (courseName === 'live-signals') {
    message = 'Hello Forexify Academy! I want more information about the Live Trading Room and Community Network.';
  }

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// Smooth scroll to pricing card for mobile side-by-side row
function scrollToCard(cardId) {
  const targetCard = document.getElementById(cardId);
  if (targetCard) {
    targetCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
}
