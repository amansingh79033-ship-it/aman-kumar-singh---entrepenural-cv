import React from 'react';
import { motion } from 'framer-motion';

const Mindspace: React.FC = () => {
  return (
    <section id="mindspace" className="py-40 px-6 relative overflow-hidden">
      {/* Background Floating Text */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center overflow-hidden">
        <div className="text-[20vw] font-display font-bold whitespace-nowrap -rotate-12">SAHIR SIKANDAR AMAN</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="text-sky-400 font-display uppercase tracking-[0.5em] text-[10px] font-bold block mb-4">Personal Scribbles</span>
          <h2 className="text-5xl font-display font-bold text-white italic">"Sikandar"</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8 text-right font-light"
          >
            <div className="text-xl md:text-2xl text-slate-300 leading-relaxed space-y-2">
              <p>एक दुनिया था ख़ुद में, और था ये भी की</p>
              <p>मुट्ठी भर राख के मुक़ाबिल ना था ।</p>
              <div className="h-4" />
              <p>पूछते हैं उनसे अकेलेपन की इंतहाँ ?</p>
              <p>वो ख़ुद अपने जनाज़े में शामिल ना था ।</p>
              <div className="h-4" />
              <p className="text-sky-300">वो टूट के भी मुस्कुरा रहा है अमन से ,</p>
              <p className="text-sky-300">कुछ भी था, वो रोने के क़ाबिल ना था।</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8 border-l border-white/10 pl-12"
          >
            <div className="text-sm uppercase tracking-[0.3em] text-yellow-100 font-bold mb-8">मेरे साहिर.</div>
            <div className="text-lg text-slate-400 leading-relaxed space-y-6">
              <p>तेरे हिस्से का साहिर सबब जो बचा हुआ है <br />हम इसे एक ज़माने तक ज़िंदा रखेंगे।</p>
              <p>मेरे जनाज़े में जो परेशान लग रहे थे <br />कह रहे हैं, पिंजरे में कोई नया परिंदा रखेंगे।</p>
              <p>मर गए पर चिल्ला रही है ख़ामोशी,।२। <br />इतना न पूछ सका, हमें कब विदा करेंगे।</p>
            </div>
          </motion.div>
        </div>
        <div className="mt-40 text-center">
          <div className="glass p-12 rounded-[3rem] border-sky-400/20 inline-block max-w-2xl">
            <h4 className="text-2xl font-display text-white mb-6 uppercase tracking-widest italic">“ क्या हूँ मैं? “</h4>
            <div className="text-slate-400 space-y-4">
              <p>जब लगेगा कुछ फिसल सा रहा है हाथों से… कस के पकड़ूगा नहीं, छोड़ दूँगा ।</p>
              <p>जब भी धूल दिखेगी रिश्तों पर मेरे .. उसे फूकूँगा एक बार, फिर तोड़ दूँगा ।</p>
              <p>मुझे मारने की ज़ुर्रत तो फ़ज़ूल है, एक गोली हो जो जाँ लेले, मैं दो लूँगा ।</p>
            </div>
          </div>
        </div>
        <div className="mt-40 text-center">
          <div className="glass p-12 rounded-[3rem] border-yellow-400/20 inline-block max-w-3xl">
            <h4 className="text-2xl font-display text-yellow-100 mb-6 uppercase tracking-widest italic">" पत्थर के ज़ुबाँ "</h4>
            <div className="text-slate-300 space-y-4 text-left">
              <p>जौन तुम्हें कुछ बताना चाहता था,</p>
              <p className="text-sky-300">सफ़र को छोड़ के वो घर आना चाहता था ।</p>
              <br />
              <p>झुर्रियों को लपेट के मेरी आँखों पर,</p>
              <p className="text-sky-300">नख़ुदा सैलाब छुपाना चाहता था।</p>
              <br />
              <p>उसने मेरे कंधे पर हाथ रखा ऐसे,</p>
              <p className="text-sky-300">कोई आसमाँ का ठिकाना चाहता था।</p>
              <br />
              <p>लाज़िमी तो नहीं पर बस शब-ए-फ़िराक़ में,</p>
              <p className="text-sky-300">अपनी ग़लतियों के वाजिब, ग़ुरुर एक आशियाना चाहता था ।</p>
              <br />
              <p>उसको सरे-आफ़ताब पर बिठा के अमन से दरिया,</p>
              <p className="text-sky-300">दरिया के किनारे में ठिकाना चाहता था।</p>
              <br />
              <p>नुमाइश की सौख कोई नहीं मुझको ।२।</p>
              <p className="text-sky-300">साहिर तो फ़क़त एक ज़माना चाहता था।</p>
              <br />
              <p>नुमाइश की सौख कोई नहीं मुझको ।२।</p>
              <p className="text-sky-300">साहिर तो फ़क़त एक ज़माना चाहता था।</p>
              <br />
              <p>उन दुश्मनों को भी याद रखे मुसल्सल ज़माना,</p>
              <p className="text-sky-300">वैरी फ़रेब के बदले मर जाना चाहता था।</p>
              <br />
              <p>सुनते थका नहीं आरज़ू वो सारे जहाँ की ।२।</p>
              <p className="text-sky-300">सारे जहाँ को एक उम्र पहले, वो छोड़ जाना चाहता था।</p>
              <br />
              <p>ये उजड़े हुए घरों को देख के ठहर गया वरना,</p>
              <p className="text-sky-300">वो इन हाथों से अपना घर सजाना चाहता था।</p>
              <br />
              <p>हर एक को राह में पत्थर दिख रहा है एक,</p>
              <p className="text-sky-300">बेज़ुबा! इन जाने वालों को मनाना चाहता था।</p>
              <br />
              <p>क़त्ल से पहले का एक ख़त मिला है मुझको (२)</p>
              <p className="text-sky-300">ये लटका हुआ हक़ीक़त में, बदल जाना चाहता था ।२।</p>
              <br />
              <p className="mt-8 text-slate-400">Jaun Tumhe kuch batana chahta tha</p>
              <p className="text-slate-400">safar ko chor k wo ghar aana chahta tha</p>
              <br />
              <p className="text-slate-400">jhurriyon ko lapet k meri aankhon par</p>
              <p className="text-slate-400">Nakhuda sailaab chipana chahta tha.</p>
              <br />
              <p className="text-slate-400">usne mere kandhe par hath rakha aise,</p>
              <p className="text-slate-400">Koi Aasmaa ka thikana chahta tha.</p>
              <br />
              <p className="text-slate-400">Lazimi toh nahi par bas shab ae firaq me</p>
              <p className="text-slate-400">Apni galtiyo k waazib wo alag ashiyana chahta tha</p>
              <br />
              <p className="text-slate-400">Usko sare-aaftaab par bitha k aman</p>
              <p className="text-slate-400">Dariya k kinare ek thikana chahta tha</p>
              <br />
              <p className="text-slate-400">numaish ki sau kh koi nahi mujhko,</p>
              <p className="text-slate-400">saahir toh faqat ek zamana chahta tha</p>
              <br />
              <p className="text-slate-400">Un dushmanon ko v yaad rakhe musal-sal zamana</p>
              <p className="text-slate-400">Vairi fareb k badle mar jana chahta tha</p>
              <br />
              <p className="text-slate-400">Sunte thaka nahi aarzuu wo sare jaha k,</p>
              <p className="text-slate-400">Sare jaha ko ek umra pehle, wo chor jana chahta tha</p>
              <br />
              <p className="text-slate-400">Ye uzre huye gharon ko dekh k thehar gaya Warna,</p>
              <p className="text-slate-400">Wo in hathon se apna ghar sajana chahta tha</p>
              <br />
              <p className="text-slate-400">Har Jaane wale k liye mil ka pathar ban k aana chahta tha</p>
              <p className="text-slate-400">bezuban hi tha bas, wo har ek ko manana chahta tha.</p>
              <br />
              <p className="text-slate-400">Katal se pehle ka ek khat mila h mujhko (2)</p>
              <p className="text-slate-400">Ye latka hua haqiqat me badal jana chahta tha !</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mindspace;