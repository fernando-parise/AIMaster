import React, { useState, useEffect } from 'react';

const SubscriptionPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  useEffect(() => {
    // Animation effect for content
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Subscription plans data
  const subscriptionPlans = [
    {
      id: 'monthly',
      name: 'Assinatura Mensal',
      price: '99',
      period: 'Por mês',
      features: [
        'Acesso ilimitado a todos os cursos',
        'Download de vídeos das aulas',
        'Acesso à comunidade de aprendizagem',
        'Sessões semanais ao vivo de perguntas e respostas'
      ],
      recommended: false,
      savingText: ''
    },
    {
      id: 'annual',
      name: 'Assinatura Anual',
      price: '999',
      period: 'Por ano',
      features: [
        'Acesso ilimitado a todos os cursos',
        'Download de vídeos das aulas',
        'Acesso à comunidade de aprendizagem',
        'Sessões semanais ao vivo de perguntas e respostas',
        'Mentoria exclusiva',
        'Recursos práticos de projetos'
      ],
      recommended: true,
      savingText: 'Economize mais de 16%'
    },
    {
      id: 'lifetime',
      name: 'Assinatura Vitalícia',
      price: '2999',
      period: 'Pagamento único',
      features: [
        'Acesso vitalício e ilimitado a todos os cursos',
        'Download de vídeos das aulas',
        'Acesso à comunidade de aprendizagem',
        'Sessões semanais ao vivo de perguntas e respostas',
        'Mentoria exclusiva',
        'Recursos práticos de projetos',
        'Ingresso VIP para eventos presenciais',
        'Acesso prioritário a novos cursos'
      ],
      recommended: false,
      savingText: 'Melhor custo-benefício'
    }
  ];
  
  // FAQ items
  const faqItems = [
    {
      question: 'Como escolher o plano de assinatura ideal para mim?',
      answer: 'Escolha de acordo com suas necessidades de aprendizado e orçamento. Para quem deseja aprender por mais tempo, a assinatura anual ou vitalícia é mais vantajosa. Para experimentar a plataforma, escolha a assinatura mensal.'
    },
    {
      question: 'A assinatura dá acesso a todos os cursos?',
      answer: 'Sim, todos os níveis de assinatura oferecem acesso ilimitado a todos os cursos da nossa plataforma, incluindo futuros lançamentos.'
    },
    {
      question: 'Como cancelar minha assinatura?',
      answer: 'Você pode cancelar a renovação automática da assinatura mensal ou anual a qualquer momento nas configurações da sua conta. Após o cancelamento, você ainda terá acesso até o fim do período vigente.'
    },
    {
      question: 'Existe política de reembolso?',
      answer: 'Oferecemos garantia de reembolso total em até 7 dias após a compra, sem perguntas. Se não estiver satisfeito, basta solicitar à nossa equipe de suporte.'
    },
    {
      question: 'Quais são exatamente os benefícios da assinatura?',
      answer: 'Os benefícios incluem: download dos vídeos das aulas, acesso completo à comunidade, sessões ao vivo com instrutores, download de arquivos de projetos e trilhas de aprendizado exclusivas.'
    }
  ];
  
  const handleSubscribe = (planId) => {
    setSelectedPlan(planId);
    // In a real application, this would redirect to a payment page or open a payment modal
    console.log(`Selected plan: ${planId}`);
  };
  
  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-900 to-black py-24 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Junte-se à nossa <span className="text-yellow-400">comunidade de aprendizado de elite</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Tenha acesso ilimitado a recursos de aprendizado, aprenda com especialistas de destaque do setor e inicie sua jornada de crescimento profissional
          </p>
          <div className="flex justify-center">
            <a href="#plans" className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded transition-colors">
              Ver planos de assinatura
            </a>
          </div>
        </div>
      </div>

      {/* Membership Benefits */}
      <div className="bg-black py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Benefícios da assinatura</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {/* Benefit 1 */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-yellow-500 bg-opacity-20 rounded-full">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Acesso ilimitado a todos os cursos</h3>
              <p className="text-gray-400">Acesse todos os cursos da plataforma, incluindo novos conteúdos lançados futuramente.</p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-yellow-500 bg-opacity-20 rounded-full">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Download de vídeos das aulas</h3>
              <p className="text-gray-400">Baixe vídeos das aulas para seu dispositivo e estude offline a qualquer momento.</p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-yellow-500 bg-opacity-20 rounded-full">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Comunidade exclusiva de aprendizado</h3>
              <p className="text-gray-400">Participe da nossa comunidade profissional, interaja com instrutores e colegas.</p>
            </div>
            
            {/* Benefit 4 */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-yellow-500 bg-opacity-20 rounded-full">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Orientação de especialistas</h3>
              <p className="text-gray-400">Receba orientação direta de especialistas do setor e supere rapidamente seus desafios de aprendizado.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div id="plans" className="bg-gradient-to-b from-black to-gray-900 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Escolha o plano ideal para você</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {subscriptionPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`bg-gray-900 rounded-lg overflow-hidden border-2 transition-transform transform hover:-translate-y-2 ${
                  plan.recommended ? 'border-yellow-400 relative' : 'border-gray-800'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-black font-bold py-1 px-4 text-sm">
                    Recomendado
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                  <div className="flex items-end mb-4">
                    <span className="text-4xl font-bold">¥{plan.price}</span>
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  </div>
                  {plan.savingText && (
                    <span className="inline-block bg-green-900 text-green-400 text-xs font-semibold px-2 py-1 rounded mb-4">
                      {plan.savingText}
                    </span>
                  )}
                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex">
                        <svg className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => handleSubscribe(plan.id)}
                    className={`w-full py-3 rounded font-semibold transition-colors ${
                      plan.recommended 
                        ? 'bg-yellow-500 hover:bg-yellow-400 text-black' 
                        : 'bg-gray-800 hover:bg-gray-700 text-white'
                    }`}
                  >
                    Assinar agora
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Money-back guarantee */}
          <div className="text-center">
            <p className="inline-flex items-center text-gray-300">
              <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Todos os planos contam com garantia de reembolso incondicional de 7 dias
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-900 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-center">Perguntas Frequentes</h2>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
                <p className="text-gray-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-yellow-900/20 to-black py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para começar sua jornada de aprendizado?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Participe da nossa comunidade, aprenda com especialistas e desenvolva suas habilidades profissionais
          </p>
          <a 
            href="#plans"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded transition-colors inline-block"
          >
            Escolher um plano agora
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;