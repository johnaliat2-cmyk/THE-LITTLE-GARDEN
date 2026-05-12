/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Trees, 
  Menu, 
  Leaf, 
  Calendar, 
  CheckCircle, 
  HeartPulse, 
  CreditCard, 
  Award, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  Home, 
  Scissors, 
  BookOpen, 
  Flower2, 
  Paintbrush,
  X,
  Facebook
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants & Types ---

type View = 'home' | 'services' | 'gallery' | 'menu' | 'enquiry';

const IMAGES = {
  hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9qn_8vywkmsbRw5681lVKnLjLi0ge8JWFW3SWIgyXlEVVrVSRNQJkWD67vPotYqGiM5n6x3nf3JNS6Z1WluGCOs3FcANhGpr_BtUfX1qNIO0hJz0TNxhC7y1BUInNTg-L4G252UtBaocvBIS9gznlAmxudEFC4Fz6iaTMpKV5XrApr0H0ZWASKcoB4RzfyJs_gSWQbFh06YNobtDYFrDboY8ZsG1H851Bfpm3uS598qkAkVxK9B0fe3XnvDYd5IaDaIHDh49snSx8',
  lookbook1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp2pdxv6wqGP6kVCtW1xBTdTp4J415RUyQCpkZz8MU_tp-sR-ozweyi4bEHf9XkjBMbgksU6FO1TfK_6IVkoYOp2VJIOmel5GAVE3NUrERmnQvE7DNIlabjip5ycrHSWTrPyMUnaEtvE1V-3zu9ABW_LWiehHeGaNvZ4TB-0yUPewrEUKFVLaYhR-aKV7yaulpygmImNlK4GCSeKneqepehrY1AvjuPqu3jih0_wJEY5_p6JRIfaVHKkycHgoOo-e0qrcgrFc9jDSV',
  lookbook2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEvZ2GWbGaRvwh357pOCuGS1T2rB3omwazeYx4WuPmcULf7hA9F_fROL4rBm9KCuLpoqbH1FUrRvfo5IhE5EglD2pfyhKBgGyiRudLiP3e1S5ae6HBBjU7WjWzKRFHxiohfPoml9iv1tT-Nx1W12dru8WTMLNMsIuwfi1VFP1I2pf3H_Q1EhjjX6_cHXQl4nYFIZFsxr5TYb3izQBuyAfNGeR-myfVkauTYuebg-Oamrv7zLCK-cL_QMis31rwsJ9JME2iccCbLIhW',
  lookbook3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLRmG2C7orha8oZi4b6p8kWcZ-oBNn78s0Uu_HgMszHmSfRBbg4KvoI_dVyTF761hhxsQz5B0PKrsUSicChwraWm0vgoqlvYj06ROi3cPfR_mI8Dk45hxIYHFJanWm0-J8ZAkZ5yDoha_QKIUTpQUyrDynzAng5248st5vEZkeTRLaasdQ_xrYD9v5YJVyZFodsRETmgNwHql2PVRluDzeSaO1tVv1zXGHdjJ55YcwlCU9duIt9426M9VXaxzNw-rkW03Lq3duFwlK',
  lookbook4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQMd_e1N5pH1dEMKcTbB0mzh-yijwtFjrlpLjYerzVnPvlgRwrwRxbeALbmBeJnXuGfcgSXoZdqYT-D3vfKm1H4j6fVB6PB_f2fAMOGpBmKhdQQV_B0i_LvzLUfP5EB2k3-FTCOzeZFQHVJndyANRmPHqy4RkAAeRBXt8ozQ0akFXllk1SUO4ZBOnOJGEIJwtClSYiPrTwqTC6HgOoPszKnQYyfO71u8YpF9V2Ht3tqTmiGgnPSePYC9vrMUEF2bv_V86OcFMw_xtE',
  lookbook5: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwHAkZk_qq000b6PcbrFZEnj6UJs4qZfVC9bNhekNOa0SEDEuddHeFsSic3UEDqAWBpclZOC0r3Xob4434uFkb2aPQ5J8QXbHblMRlwtBP_-BojFI5NihK2JlDf8CZarHUcH-r-GzwS52bU_4mGYoV_uSxOX1SKLFeXWCcR_FCSMVyReHYC-wNkr3vUMOogd3_GExlK9O43YWWt_RFSUgAr-Vw6-81TvsE9kj0k7p1HtPztX5N91QaTn4QvpLN4Z8v3BXiLNbi0-30',
  lookbook6: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7Vf0zquEbaa6M1_9PofQ8iNPp-Y6FNoHH7PfEGsHHhjFeI_pvnKrxAhGq4aKYHB7oo-BUXtXtNNJ-BN3SzhetEgxsEzkISqIxGlwKns7PWcwzNGMJfEKHMik9LXhj9KL1RMLunTWF3pnkUYBp65QwNd0U1_T6awrFYtAv_KeJY5YJpbz4vGBs-46t7Vv4UxYcEGphiST9s64jBpM4Q04HrFA_bgokY1X1c6DV5i6ueOLcmJP2BLs4rhnb_HrUsAEF0u2nNvT_OGcZ',
  lookbook7: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuDFJl7r7M0LvWDjtUAdwK2N-iVLbh5wFRblCwtKaxAdUnC32Wt6OsuLpV5JoGXvhBZPFi9ezVxzyvX-hJnJbNW7gA3LtZZXIYp0AfTe1A5JoyrB07xeRkFDVNevHErK0a4qjqr14DApeuCFrT-ojIZMF7mrGZNSURTnYn0QiunuxMiVoefkvWJ6LsRZrcvRmCkzXRL1SW0FaePWx4X70ZkgmPOUlmKBPMzeUTXyV6BaecE-K5ng1zZGkzZgiLsEnOfXBtGJqi2P3B',
  painting: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDICbaclXohUl4bJa8mwiSMussra29zyf700EtZhT78OazeuooCOW3UTAIDy8Pxfk5TS0up7rxq3AEetmiF0Wwfl07M7jbqP9Z7VGXaC1mAWpv7B4b7kN503lVDoSKHTBFMtyqdbgT0VkoW0IDTBQebwV8luy1hHeg0qF03TynI-ZuFH22uevF4uS_MFnyoshpII0oEnp2vTsJStdvbQR--wB-eOBJCKRfx_tbi-TpkzEgsIYHsi1SmzGZQ8FuR9MhkIHyPNxJRuDMn',
  estateCare: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACg4HCqt1HRmuy1gF6Qa9J_yJWxm3c-QsL-LU5ydvNb4Wmhotx8A-wCZe4Q6jzbjX4CJT4ZWnANYqbSkpPBetvm04lc5X91tMA5-hZhcafOouIcDlWrfBUNg_EqtOEwNky3LoO1PndslIVV2qN7CsZ4SM8MBT_0Jj7PLpZWnWpdLsNBnSBFpM-B8hs0apA4sMuzNbq47tPXdOr5SNYQ-n00sGFbroSesF_7RudvCcNsH3r33bTaefz0o_xmVZhLNvKmcedWrNladEE',
  maintenance: 'https://res.cloudinary.com/didqabx8q/image/upload/v1778520240/504896123_122162813318546664_4981169854565130030_n_paowpe.jpg',
  painting2: 'https://res.cloudinary.com/didqabx8q/image/upload/v1778520115/513989311_122166379238546664_1068479289259874079_n_ivmsli.jpg',
  portfolio1: 'https://res.cloudinary.com/didqabx8q/image/upload/v1778519299/678514669_122212571540546664_6335488447438372360_n_vsqvud.jpg',
  portfolio2: 'https://res.cloudinary.com/didqabx8q/image/upload/v1778519285/683008616_122212571582546664_2774102797283909603_n_pqyoxo.jpg',
  portfolio3: 'https://res.cloudinary.com/didqabx8q/image/upload/v1778519285/675279041_122211793346546664_6153916024164442488_n_c73fso.jpg',
  portfolio4: 'https://res.cloudinary.com/didqabx8q/image/upload/v1778519284/670332280_122210359670546664_7145240781816057965_n_r5iu1d.jpg',
  portfolio5: 'https://res.cloudinary.com/didqabx8q/image/upload/v1778519285/674359722_122211793556546664_3999077834823068120_n_szbrnp.jpg',
  portfolio6: 'https://res.cloudinary.com/didqabx8q/image/upload/v1778519284/667118570_122210182142546664_6731009051333977738_n_knyd4v.jpg',
  portfolio7: 'https://res.cloudinary.com/didqabx8q/image/upload/v1778519285/674586267_122211793640546664_9180346334306613241_n_tlfk2s.jpg',
  portfolio8: 'https://res.cloudinary.com/didqabx8q/image/upload/v1778519284/670409331_122210359904546664_6907401501019976810_n_x87hct.jpg',
  logo: 'https://res.cloudinary.com/didqabx8q/image/upload/v1778518217/462079176_122108903012546664_6337647890782225812_n_fu3e4m.jpg',
  meticulous: 'https://res.cloudinary.com/didqabx8q/image/upload/v1778601039/687051595_122213653106546664_2602345084358482647_n_wuep5r.jpg',
  corporateNhs: 'https://res.cloudinary.com/didqabx8q/image/upload/v1778601401/657259747_122209164242546664_7148954046927616758_n_qoofxo.jpg',
  galleryItem1: 'https://res.cloudinary.com/didqabx8q/image/upload/v1778601851/658397020_122208779078546664_3826606235566457352_n_ubbxtr.jpg',
  galleryItem2: 'https://res.cloudinary.com/didqabx8q/image/upload/v1778601851/646159094_122206132736546664_8812014559590832507_n_js4ikw.jpg',
  galleryItem3: 'https://res.cloudinary.com/didqabx8q/image/upload/v1778601851/654618801_122207802806546664_9205214813508603010_n_itpvyo.jpg',
};

// --- Shared Components ---

function Header({ currentView, setView }: { currentView: View, setView: (v: View) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header id="main-header" className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant/30">
      <div className="flex justify-between items-center h-20 px-6 md:px-16 max-w-7xl mx-auto w-full">
        <div id="logo-section" className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
          <img src={IMAGES.logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain rounded-full border border-outline-variant/30 shadow-sm" />
          <h1 className="font-display text-lg md:text-xl tracking-tight text-primary font-bold">
            The little Garden <span className="text-pale-gold">&amp;</span> Painting Company
          </h1>
        </div>


        <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
          <div className="flex gap-8">
            <button 
              onClick={() => setView('home')} 
              className={`font-sans text-xs uppercase tracking-widest transition-colors ${currentView === 'home' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setView('services')} 
              className={`font-sans text-xs uppercase tracking-widest transition-colors ${currentView === 'services' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}
            >
              Services
            </button>
            <button 
              onClick={() => setView('gallery')} 
              className={`font-sans text-xs uppercase tracking-widest transition-colors ${currentView === 'gallery' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}
            >
              Gallery
            </button>
            <button 
              onClick={() => setView('menu')} 
              className={`font-sans text-xs uppercase tracking-widest transition-colors ${currentView === 'menu' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}
            >
              About
            </button>
          </div>
            <button 
              onClick={() => setView('enquiry')} 
              className={`px-8 py-3 bg-pale-gold text-primary font-sans text-xs uppercase tracking-[0.2em] hover:bg-pale-gold/90 transition-all flex items-center justify-center ${currentView === 'enquiry' ? 'ring-2 ring-primary ring-offset-2' : ''}`}
            >
              Enquire
            </button>
        </nav>

        <button id="mobile-menu-trigger" className="md:hidden text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            id="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-outline-variant/30 py-8 px-6 shadow-xl"
          >
            <div className="flex flex-col gap-6 items-center">
              <button 
                onClick={() => { setView('home'); setIsMenuOpen(false); }} 
                className={`font-sans text-sm uppercase tracking-widest ${currentView === 'home' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
              >
                Home
              </button>
              <button 
                onClick={() => { setView('services'); setIsMenuOpen(false); }} 
                className={`font-sans text-sm uppercase tracking-widest ${currentView === 'services' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
              >
                Services
              </button>
              <button 
                onClick={() => { setView('gallery'); setIsMenuOpen(false); }} 
                className={`font-sans text-sm uppercase tracking-widest ${currentView === 'gallery' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
              >
                Gallery
              </button>
              <button 
                onClick={() => { setView('menu'); setIsMenuOpen(false); }} 
                className={`font-sans text-sm uppercase tracking-widest ${currentView === 'menu' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
              >
                About
              </button>
              <button 
                onClick={() => { setView('enquiry'); setIsMenuOpen(false); }} 
                className={`px-12 py-4 bg-pale-gold text-primary font-sans text-sm uppercase tracking-[0.2em] w-full text-center ${currentView === 'enquiry' ? 'ring-2 ring-primary ring-inset' : ''}`}
              >
                Enquire
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer id="main-footer" className="bg-primary text-on-primary py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
        <div id="footer-about" className="space-y-6">
          <div className="flex items-center gap-3">
            <img src={IMAGES.logo} alt="Logo" className="w-8 h-8 object-contain rounded-full border border-white/10" />
            <span className="font-display text-xl tracking-tight">The little Garden &amp; Painting Company</span>
          </div>
          <p className="font-body opacity-60 max-w-xs leading-relaxed italic">
            Meticulous care for residential estates and heritage properties across the South East.
          </p>
        </div>

        <div id="footer-links" className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-widest text-pale-gold font-bold">Discovery</h4>
            <nav className="flex flex-col gap-2 opacity-60 font-body text-sm">
              <a href="#" className="hover:opacity-100 transition-opacity">Our Craft</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Sustainability</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Archives</a>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-widest text-pale-gold font-bold">Legal</h4>
            <nav className="flex flex-col gap-2 opacity-60 font-body text-sm">
              <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
            </nav>
          </div>
        </div>

        <div id="footer-contact" className="space-y-6">
          <h4 className="font-sans text-xs uppercase tracking-widest text-pale-gold font-bold">Contact</h4>
          <p className="font-body opacity-60 text-sm italic">Based in the Cotswolds,<br />Serving the Greater Region.</p>
          <a href="mailto:wheatonmike38@outlook.com" className="block font-sans text-xs uppercase tracking-widest text-on-primary underline underline-offset-8 decoration-pale-gold/30">
            wheatonmike38@outlook.com
          </a>
          <a href="tel:+447365848799" className="block font-sans text-xs uppercase tracking-widest text-on-primary mt-4 opacity-80 hover:opacity-100 transition-opacity">
            +44 7365 848799
          </a>
        </div>
      </div>
      
      <div id="footer-bottom" className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans uppercase tracking-widest text-[10px] opacity-40">© 2024 Crafted Heritage Group</p>
        <div className="flex gap-6 opacity-40">
          <a href="https://www.facebook.com/profile.php?id=61566399947267" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-5 h-5 cursor-pointer hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function BottomNav({ setView, currentView }: { setView: (v: View) => void, currentView: View }) {
  return (
    <nav id="mobile-bottom-nav" className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-outline-variant/30 z-50">
      <div className="flex justify-around items-center h-16">
        <button 
          onClick={() => setView('home')}
          className={`flex flex-col items-center gap-1 ${currentView === 'home' ? 'text-primary' : 'text-on-surface-variant'}`}
        >
          <Home className={`w-5 h-5 ${currentView === 'home' ? 'fill-primary' : ''}`} />
          <span className="font-sans text-[10px] uppercase font-medium">Home</span>
        </button>
        <button 
          onClick={() => setView('services')}
          className={`flex flex-col items-center gap-1 ${currentView === 'services' ? 'text-primary' : 'text-on-surface-variant'}`}
        >
          <Leaf className="w-5 h-5" />
          <span className="font-sans text-[10px] uppercase font-medium">Services</span>
        </button>
        <button 
          onClick={() => setView('gallery')}
          className={`flex flex-col items-center gap-1 ${currentView === 'gallery' ? 'text-primary' : 'text-on-surface-variant'}`}
        >
          <Scissors className="w-5 h-5" />
          <span className="font-sans text-[10px] uppercase font-medium">Gallery</span>
        </button>
        <button 
          onClick={() => setView('menu')}
          className={`flex flex-col items-center gap-1 ${currentView === 'menu' ? 'text-primary' : 'text-on-surface-variant'}`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="font-sans text-[10px] uppercase font-medium">Menu</span>
        </button>
          <button 
            onClick={() => setView('enquiry')}
            className={`flex flex-col items-center gap-1 ${currentView === 'enquiry' ? 'text-primary' : 'text-on-surface-variant'}`}
          >
            <Mail className="w-5 h-5" />
            <span className="font-sans text-[10px] uppercase font-medium">Enquire</span>
          </button>
        </div>
      </nav>
  );
}

// --- Views ---

function HomeView({ setView }: { setView: (v: View) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24 pt-20"
    >
      {/* Hero Landing */}
      <section id="hero-landing" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.hero} 
            alt="Cinematic Garden" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-12">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-pale-gold mb-8 block">Artisanal Heritage &amp; Care</span>
            <h1 className="font-display text-5xl md:text-[8rem] text-on-primary leading-[0.85] italic mb-12">
              The little Garden <br /> &amp; Painting Company
            </h1>
          </motion.div>

          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-body text-xl md:text-3xl text-pale-gold/80 italic max-w-2xl mx-auto leading-relaxed"
          >
            "Curating sanctuaries of natural elegance and structural precision for the South East's most distinguished estates."
          </motion.p>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center pt-8"
          >
            <button 
              onClick={() => setView('services')}
              className="px-12 py-5 bg-pale-gold text-primary font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-2xl hover:scale-105 transition-all"
            >
              Our Services
            </button>
            <button 
              onClick={() => setView('gallery')}
              className="px-12 py-5 border border-white/20 text-white font-sans text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
            >
              View Gallery
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        >
          <span className="font-sans text-[8px] uppercase tracking-widest text-white">Scroll</span>
          <div className="w-px h-12 bg-white/40"></div>
        </motion.div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <span className="font-sans text-[10px] text-pale-gold uppercase tracking-[0.3em] block">Our Philosophy</span>
              <h2 className="font-display text-5xl md:text-7xl text-primary italic leading-tight">
                Meticulousness is the root of beauty.
              </h2>
            </div>
            
            <p className="font-body text-xl text-on-surface-variant italic leading-relaxed max-w-lg">
              We believe that a garden is a living portrait, and a home is its frame. Our artisanal approach combines traditional horticultural wisdom with modern structural refinement to create cohesive, breathtaking living spaces.
            </p>

            <div className="grid grid-cols-2 gap-12 pt-8">
              <div className="space-y-2">
                <span className="font-display text-3xl text-pale-gold">01</span>
                <p className="font-sans text-[10px] uppercase tracking-widest opacity-60 font-bold">Organic Integrity</p>
              </div>
              <div className="space-y-2">
                <span className="font-display text-3xl text-pale-gold">02</span>
                <p className="font-sans text-[10px] uppercase tracking-widest opacity-60 font-bold">Structural Precision</p>
              </div>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => setView('services')}
                className="font-sans text-[10px] uppercase tracking-widest text-primary border-b border-pale-gold pb-2 hover:text-pale-gold transition-colors font-bold"
              >
                Our Methodology
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-3xl relative"
          >
            <img src={IMAGES.meticulous} alt="Artisanal Work" className="w-full h-full object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[3rem]"></div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links / Featured Shots */}
      <section className="py-32 bg-pale-gold/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-24">
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <span className="font-sans text-[10px] text-secondary uppercase tracking-[0.3em]">Excellence Showcased</span>
              <h2 className="font-display text-4xl text-primary italic">Featured Craft</h2>
            </div>
            <button onClick={() => setView('gallery')} className="font-sans text-[10px] uppercase tracking-widest text-primary border-b border-primary pb-1">All Projects</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[IMAGES.meticulous, IMAGES.galleryItem1, IMAGES.galleryItem2].map((img, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer">
                <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Work" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Quote */}
      <section className="py-48 px-6 bg-pale-gold text-primary text-center">
        <div className="max-w-3xl mx-auto space-y-12">
          <HeartPulse className="w-12 h-12 text-primary/20 mx-auto" />
          <p className="font-display text-3xl md:text-5xl italic leading-tight">
            "They transformed our neglected estate into a place of profound peace and structural elegance. It is more than a garden; it is a sanctuary."
          </p>
          <div className="flex flex-col items-center">
            <div className="w-16 h-px bg-primary/20 mb-6"></div>
            <span className="font-sans text-[10px] uppercase tracking-widest opacity-60">The Hamilton Family — Surrey</span>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function ServicesView({ setView }: { setView: (v: View) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24 pt-32"
    >
      <section className="px-6 py-16 md:py-24 max-w-4xl mx-auto text-center md:text-left mb-12">
        <span className="font-sans text-[10px] text-pale-gold uppercase tracking-[0.3em] mb-4 block">Bespoke Offerings</span>
        <h1 className="font-display text-5xl md:text-7x text-primary italic mb-8">Our Services</h1>
        <p className="font-body text-xl text-on-surface-variant italic leading-relaxed max-w-2xl">
          From the initial consultation to seasonal maintenance, we provide a holistic approach to residence care.
        </p>
      </section>

      {/* Trust Bar */}
      <section id="trust-bar" className="bg-pale-gold text-primary py-6 overflow-hidden border-y border-primary/10 mb-20">
        <div className="flex items-center justify-center whitespace-nowrap overflow-hidden">
          <div className="flex items-center gap-16 px-6 animate-scroll">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-12">
                <div className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.2em] opacity-80">
                  <CheckCircle className="w-3 h-3" />
                  <span>Fully Insured</span>
                </div>
                <div className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.2em] opacity-80">
                  <HeartPulse className="w-3 h-3" />
                  <span>NHS Partner</span>
                </div>
                <div className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.2em] opacity-80">
                  <CreditCard className="w-3 h-3" />
                  <span>Flexible Rates</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Content */}
      <section id="services-preview" className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col gap-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="font-display text-4xl md:text-5xl text-primary">Garden Maintenance</h3>
              <div className="h-px bg-pale-gold/40 w-24"></div>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed italic">
                Tailored pricing models for discerning clients. From one-off seasonal tidying to comprehensive annual maintenance programs.
              </p>
              <button 
                onClick={() => setView('menu')}
                className="inline-block font-sans text-xs uppercase tracking-widest text-primary border-b border-primary pb-1"
              >
                Learn More
              </button>
            </div>
            <div className="bg-surface-variant h-[400px] rounded-lg overflow-hidden relative group shadow-2xl">
              <img src={IMAGES.maintenance} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Gardening" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 bg-surface-variant h-[400px] rounded-lg overflow-hidden relative group shadow-2xl">
              <img src={IMAGES.painting2} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Painting" />
            </div>
            <div className="order-1 md:order-2 space-y-8">
              <h3 className="font-display text-4xl md:text-5xl text-primary">Professional Painting</h3>
              <div className="h-px bg-pale-gold/40 w-24"></div>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed italic">
                Exquisite finishes for your garden boundaries and interiors. Our specialist crew ensures a durable, boutique-quality application.
              </p>
              <div className="flex items-baseline gap-4 mt-4">
                <span className="font-display text-2xl text-pale-gold font-bold">£20</span>
                <span className="font-sans text-[10px] uppercase tracking-widest opacity-60">per hour / worker</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section with Gold Accent */}
      <section className="py-24 bg-pale-gold/5 flex justify-center">
        <div className="w-24 h-1 bg-pale-gold/30 rounded-full"></div>
      </section>

      {/* NHS Feature */}
      <section id="nhs-feature" className="bg-pale-gold/10 py-32 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <HeartPulse className="w-12 h-12 text-primary/40 mx-auto" />
          <h2 className="font-display text-4xl text-primary italic">A Partnership with the NHS</h2>
          <p className="font-body text-lg text-on-surface-variant italic leading-relaxed">
            "We proudly offer exclusive rates for healthcare professionals as a token of our gratitude for their tireless service."
          </p>
          <button 
            onClick={() => setView('enquiry')}
            className="px-10 py-5 border border-primary/30 text-primary font-sans text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-on-primary transition-all inline-block"
          >
            NHS Member Enquiries
          </button>
        </div>
      </section>
    </motion.div>
  );
}

function GalleryView({ setView }: { setView: (v: View) => void }) {
  const images = [
    IMAGES.meticulous,
    IMAGES.corporateNhs,
    IMAGES.galleryItem1,
    IMAGES.galleryItem2,
    IMAGES.galleryItem3,
    IMAGES.lookbook1,
    IMAGES.lookbook2,
    IMAGES.lookbook3,
    IMAGES.lookbook4,
    IMAGES.portfolio1,
    IMAGES.portfolio2,
    IMAGES.portfolio4,
    IMAGES.lookbook5,
    IMAGES.lookbook6,
    IMAGES.lookbook7,
    IMAGES.portfolio5,
    IMAGES.portfolio6,
    IMAGES.portfolio7,
    IMAGES.portfolio8,
  ].filter(Boolean);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24 pt-32 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col items-center gap-4 mb-16">
          <span className="font-sans text-[10px] text-pale-gold uppercase tracking-[0.3em]">Artisanal Portfolio</span>
          <h1 className="font-display text-5xl md:text-7xl text-primary italic text-center">Gallery</h1>
          <div className="w-12 h-px bg-pale-gold/40"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="aspect-square bg-surface-variant overflow-hidden rounded-lg shadow-sm group"
            >
              <img 
                src={img} 
                alt={`Gallery ${idx}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <section className="mt-32">
        <div className="bg-pale-gold text-primary rounded-[2rem] p-16 md:p-24 text-center max-w-7xl mx-auto overflow-hidden relative shadow-2xl">
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-6xl mb-12 italic">Commence your own transformation.</h2>
            <button 
              onClick={() => setView('enquiry')}
              className="bg-pale-gold text-primary px-12 py-5 rounded-full font-sans text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl font-bold inline-block"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function EnquiryView() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24 pt-32 px-6"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="font-sans text-[10px] text-pale-gold uppercase tracking-[0.3em] block">Connect With Us</span>
          <h1 className="font-display text-5xl md:text-7xl text-primary italic">Enquire</h1>
          <div className="w-12 h-px bg-pale-gold/40 mx-auto"></div>
          <p className="font-body text-xl text-on-surface-variant italic">Reach out for a bespoke consultation.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Details */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-pale-gold italic">Direct Contact</h2>
              <div className="space-y-4 font-body italic text-on-surface-variant">
                <a href="mailto:wheatonmike38@outlook.com" className="flex items-center gap-4 hover:text-pale-gold transition-colors">
                  <Mail className="w-5 h-5 text-pale-gold" />
                  <span>wheatonmike38@outlook.com</span>
                </a>
                <a href="tel:+447365848799" className="flex items-center gap-4 hover:text-pale-gold transition-colors">
                  <Phone className="w-5 h-5 text-pale-gold" />
                  <span>+44 7365 848799</span>
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-3xl text-primary font-bold">WhatsApp</h2>
              <p className="font-body text-on-surface-variant italic">Message us directly for a faster response.</p>
              <a 
                href="https://wa.me/447365848799" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-8 py-4 bg-[#25D366] text-white rounded-full font-sans text-xs uppercase tracking-widest font-bold shadow-lg hover:scale-105 transition-all"
              >
                <Phone className="w-5 h-5 fill-white" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-pale-gold/5 p-8 md:p-12 rounded-[2rem] shadow-xl border border-pale-gold/20">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                <CheckCircle className="w-16 h-16 text-primary" />
                <h3 className="font-display text-3xl text-primary">Message Sent</h3>
                <p className="font-body italic text-on-surface-variant">We will be in touch shortly.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="font-sans text-[10px] uppercase tracking-widest text-primary border-b border-primary pb-1"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="font-sans text-[10px] uppercase tracking-widest opacity-60">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full bg-white/50 border-b border-outline-variant py-3 px-1 focus:border-primary outline-none transition-colors font-body italic" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-[10px] uppercase tracking-widest opacity-60">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    className="w-full bg-white/50 border-b border-outline-variant py-3 px-1 focus:border-primary outline-none transition-colors font-body italic"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-[10px] uppercase tracking-widest opacity-60">Message</label>
                  <textarea 
                    required 
                    rows={4}
                    className="w-full bg-white/50 border-b border-outline-variant py-3 px-1 focus:border-primary outline-none transition-colors font-body italic resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full py-5 bg-pale-gold text-primary font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-xl hover:translate-y-[-2px] transition-all"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MenuView({ setView }: { setView: (v: View) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24 pt-32"
    >
      <section className="px-6 py-16 md:py-24 max-w-3xl mx-auto text-center border-b border-outline-variant/20 mb-20">
        <span className="font-sans text-[10px] text-pale-gold uppercase tracking-[0.3em] mb-4 block">Artisanal Heritage</span>
        <h2 className="font-display text-4xl md:text-6xl text-on-surface mb-6 italic">About Our Craft</h2>
        <p className="text-body text-xl text-on-surface-variant mx-auto italic leading-relaxed">
          From the rolling hills of the Cotswolds to the historic estates of the South East, our journey is one of precision, nature, and community.
        </p>
      </section>

      {/* Services List */}
      <div className="px-6 max-w-4xl mx-auto">
        <div className="mb-24">
          <h3 className="font-display text-3xl text-primary mb-12 text-center md:text-left">Landscape &amp; Flora</h3>
          <div className="space-y-12">
            <ServiceItem title="Artisanal Hedge Craft" price="Starting from £45" desc="Precision shaping, structural pruning, and health assessment for your garden boundaries." />
            <ServiceItem title="The Seasonal Lawn Cure" price="Starting from £30" desc="Organic fertilization, edging, and professional mowing using traditional techniques." />
            <ServiceItem title="Botanical Planting" price="Bespoke Pricing" desc="Curated perennial selections and architectural planting plans for year-round interest." />
          </div>
        </div>

        {/* Large atmospheric image */}
        <div className="my-32 overflow-hidden rounded-2xl h-[400px] shadow-2xl">
          <img src={IMAGES.painting} className="w-full h-full object-cover contrast-125" alt="Painting Detail" />
        </div>

        <div className="mb-24">
          <h3 className="font-display text-3xl text-primary mb-12 text-center md:text-left">Structure &amp; Color</h3>
          <div className="space-y-12">
            <ServiceItem title="Heritage Fence Restoration" price="£20 /hr per worker" desc="Deep cleaning followed by premium weather-resistant oils or rich heritage stains." />
            <ServiceItem title="Exterior Architectural Coating" price="Starting from £450" desc="Full facade revitalization using breathable masonry paints and professional preparation." />
            <ServiceItem title="Sash & Trim Refinement" price="Bespoke Pricing" desc="Meticulous hand-painting for windows, doors, and architectural timber features." />
          </div>
        </div>
      </div>

      {/* Corporate Partnership section */}
      <section className="bg-pale-gold text-primary py-32 px-6 mt-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <Award className="text-primary/60 mb-6 w-10 h-10" />
            <h3 className="font-display text-4xl md:text-5xl mb-8 leading-tight italic">Corporate &amp; NHS Programs</h3>
            <p className="font-body text-lg text-primary/80 mb-10 leading-relaxed font-light italic">
              We are honored to provide specialized maintenance programs for local institutions and dedicated healthcare professionals. Our premium service tiers include priority scheduling, eco-sensitive materials, and exclusive tiered pricing.
            </p>
            <div className="flex flex-col gap-6 font-body text-base">
              <div className="flex items-center gap-4 border-b border-primary/10 pb-4">
                <CheckCircle className="text-primary w-5 h-5" />
                <span>NHS Staff: Guaranteed 15% Reduction on all Labor</span>
              </div>
              <div className="flex items-center gap-4 border-b border-primary/10 pb-4">
                <Building2 className="text-primary w-5 h-5" />
                <span>Corporate Campus &amp; Estate Management Contracts</span>
              </div>
            </div>
            <button 
              onClick={() => setView('enquiry')}
              className="mt-12 px-10 py-4 border border-primary/30 text-primary font-sans text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all font-bold inline-block"
            >
              Inquire About Partnerships
            </button>
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-3xl">
              <img src={IMAGES.portfolio3} alt="Artisanal Heritage" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center px-6">
        <h4 className="font-display text-3xl mb-4 italic text-primary">Ready to curate your sanctuary?</h4>
        <p className="font-body text-on-surface-variant mb-12 italic">Contact our lead artisan for a site visit and bespoke quotation.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button 
            onClick={() => setView('enquiry')}
            className="bg-pale-gold text-primary px-12 py-5 font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-lg hover:scale-105 transition-transform"
          >
            Book Consultation
          </button>
          <button 
            onClick={() => setView('gallery')}
            className="border border-outline-variant px-12 py-5 font-sans text-xs uppercase tracking-[0.2em] hover:bg-surface-variant transition-colors font-bold"
          >
            View Gallery
          </button>
        </div>
      </section>
    </motion.div>
  );
}

function ServiceItem({ title, price, desc }: { title: string, price: string, desc: string }) {
  return (
    <div className="group border-b border-outline-variant pb-8 hover:bg-black/[0.02] transition-colors p-4 -m-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-2">
        <h4 className="font-display text-2xl text-on-surface">{title}</h4>
        <div className="hidden md:block flex-grow border-b border-dotted border-pale-gold/30 mx-4 mb-2"></div>
        <span className="font-sans text-[10px] uppercase tracking-widest text-pale-gold font-bold">{price}</span>
      </div>
      <p className="font-body text-on-surface-variant/80 italic leading-relaxed">{desc}</p>
    </div>
  );
}

// --- Main App ---

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div id="app-root" className="min-h-screen font-body flex flex-col bg-background">
      <Header currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HomeView setView={setCurrentView} />
            </motion.div>
          )}
          {currentView === 'services' && (
            <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ServicesView setView={setCurrentView} />
            </motion.div>
          )}
          {currentView === 'gallery' && (
            <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GalleryView setView={setCurrentView} />
            </motion.div>
          )}
          {currentView === 'menu' && (
            <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MenuView setView={setCurrentView} />
            </motion.div>
          )}
          {currentView === 'enquiry' && (
            <motion.div key="enquiry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <EnquiryView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      
      <BottomNav currentView={currentView} setView={setCurrentView} />

      {/* Floating WhatsApp Action for mobile */}
      <a 
        href="https://wa.me/447365848799"
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-20 right-6 bg-primary text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-40 active:scale-95 transition-transform"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
