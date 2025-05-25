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
      name: '月度会员',
      price: '99',
      period: '每月',
      features: [
        '无限访问所有课程',
        '离线下载课程视频',
        '访问学习社区',
        '每周直播问答'
      ],
      recommended: false,
      savingText: ''
    },
    {
      id: 'annual',
      name: '年度会员',
      price: '999',
      period: '每年',
      features: [
        '无限访问所有课程',
        '离线下载课程视频',
        '访问学习社区',
        '每周直播问答',
        '专属导师指导',
        '项目实战练习资源'
      ],
      recommended: true,
      savingText: '节省超过16%'
    },
    {
      id: 'lifetime',
      name: '终身会员',
      price: '2999',
      period: '一次付款',
      features: [
        '终身无限访问所有课程',
        '离线下载课程视频',
        '访问学习社区',
        '每周直播问答',
        '专属导师指导',
        '项目实战练习资源',
        'VIP线下活动门票',
        '优先获取新课程'
      ],
      recommended: false,
      savingText: '最具价值'
    }
  ];
  
  // FAQ items
  const faqItems = [
    {
      question: '如何选择适合我的会员方案？',
      answer: '根据您的学习需求和预算选择。如果您想长期学习，年度或终身会员更为划算。如果您想先体验我们的平台，可以选择月度会员。'
    },
    {
      question: '会员可以访问所有课程吗？',
      answer: '是的，所有级别的会员均可无限访问我们平台上的全部课程内容，包括未来新增的课程。'
    },
    {
      question: '如何取消会员资格？',
      answer: '您可以随时在账户设置中取消月度或年度会员的自动续订。取消后，您仍然可以使用会员功能直到当前订阅期结束。'
    },
    {
      question: '是否提供退款？',
      answer: '我们提供7天无条件退款保证。如果您在购买会员后7天内不满意，可以联系客服申请全额退款。'
    },
    {
      question: '会员特权有哪些具体内容？',
      answer: '会员特权包括但不限于：课程视频离线下载、学习社区讨论区完整访问权限、讲师直播问答、项目案例源文件下载、专属学习路径规划等。'
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
            加入我们的<span className="text-yellow-400">精英学习社区</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            获取无限学习资源，向行业顶尖专家学习，开启您的专业成长之旅
          </p>
          <div className="flex justify-center">
            <a href="#plans" className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded transition-colors">
              查看会员方案
            </a>
          </div>
        </div>
      </div>

      {/* Membership Benefits */}
      <div className="bg-black py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">会员特权</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {/* Benefit 1 */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-yellow-500 bg-opacity-20 rounded-full">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">全部课程无限访问</h3>
              <p className="text-gray-400">无限制访问平台上所有课程，包括未来更新的全新内容。</p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-yellow-500 bg-opacity-20 rounded-full">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">课程视频下载</h3>
              <p className="text-gray-400">下载课程视频到本地设备，随时随地离线学习。</p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-yellow-500 bg-opacity-20 rounded-full">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">专属学习社区</h3>
              <p className="text-gray-400">加入我们的专业社区，与讲师和同行交流讨论。</p>
            </div>
            
            {/* Benefit 4 */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-yellow-500 bg-opacity-20 rounded-full">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">导师指导与指点</h3>
              <p className="text-gray-400">获得行业专家的直接指导，快速突破学习瓶颈。</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div id="plans" className="bg-gradient-to-b from-black to-gray-900 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">选择适合您的会员方案</h2>
          
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
                    推荐
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
                    立即订阅
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
              所有方案均提供7天无条件退款保证
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-900 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-center">常见问题</h2>
          
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">准备好开始您的学习之旅了吗？</h2>
          <p className="text-xl text-gray-300 mb-8">
            加入我们的学习社区，向行业顶尖专家学习，提升您的专业技能
          </p>
          <a 
            href="#plans"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded transition-colors inline-block"
          >
            立即选择方案
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;