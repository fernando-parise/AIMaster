import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: '课程',
      links: [
        { name: '全部课程', path: '/courses' },
        { name: '热门课程', path: '/courses?filter=popular' },
        { name: '最新上线', path: '/courses?filter=newest' },
        { name: '即将上线', path: '/courses?filter=upcoming' }
      ]
    },
    {
      title: '关于我们',
      links: [
        { name: '公司简介', path: '/about' },
        { name: '讲师团队', path: '/instructors' },
        { name: '加入我们', path: '/careers' },
        { name: '联系方式', path: '/contact' }
      ]
    },
    {
      title: '会员服务',
      links: [
        { name: '订阅方案', path: '/subscription' },
        { name: '常见问题', path: '/faq' },
        { name: '隐私条款', path: '/privacy' },
        { name: '服务条款', path: '/terms' }
      ]
    }
  ];

  return (
    <footer className="bg-black border-t border-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold tracking-tight text-white">
                AIMASTER
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              提供高质量在线课程，由行业顶尖专家授课，帮助你掌握实用技能，开启职业新征程。
            </p>
            <div className="flex space-x-4">
              <a href="https://weibo.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <span className="sr-only">微博</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9.37,9.28C5.54,8.81,2.11,10.97,1.64,14c-0.47,3.03,1.69,6.74,5.52,7.21s6.08-1.7,6.55-4.73C14.18,13.45,13.21,9.76,9.37,9.28z M11.21,16.7c-0.47,2.1-2.53,3.31-4.58,2.7C4.58,18.79,3.38,16.51,3.85,14.41c0.47-2.1,2.53-3.31,4.58-2.7C10.48,12.31,11.68,14.59,11.21,16.7z M7.45,14.08c-0.78-0.34-1.65-0.03-1.95,0.69c-0.3,0.72,0.09,1.58,0.87,1.93c0.78,0.34,1.65,0.03,1.95-0.69C8.63,15.29,8.23,14.43,7.45,14.08z M8.96,15.46c-0.13,0.31-0.49,0.45-0.79,0.33c-0.3-0.12-0.44-0.47-0.31-0.77c0.13-0.31,0.49-0.45,0.79-0.33C8.96,14.81,9.1,15.16,8.96,15.46z M13.36,8.27c-0.28,0-0.56-0.11-0.76-0.32c-0.19-0.21-0.28-0.47-0.28-0.76c0-0.58,0.47-1.05,1.05-1.05c0.58,0,1.05,0.47,1.05,1.05C14.41,7.79,13.94,8.27,13.36,8.27z M22,5.8v6.28c0,0.29-0.24,0.53-0.53,0.53h-2.12c-0.29,0-0.53-0.24-0.53-0.53V6.33h-2.83c-0.29,0-0.53-0.24-0.53-0.53c0-0.29,0.24-0.53,0.53-0.53h5.48C21.76,5.27,22,5.51,22,5.8z M19.35,9.27c-0.13,0.04-0.26-0.08-0.26-0.21c0-0.13,0.1-0.19,0.15-0.23c0.58-0.29,0.93-0.76,0.93-1.28c0-0.9-0.92-1.63-2.07-1.63c-1.15,0-2.07,0.73-2.07,1.63c0,0.13-0.1,0.21-0.21,0.21c-0.13,0-0.21-0.1-0.21-0.21c0-1.13,1.12-2.06,2.49-2.06c1.38,0,2.49,0.92,2.49,2.06C20.59,8.3,20.09,8.96,19.35,9.27z"/>
                </svg>
              </a>
              <a href="https://wx.qq.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <span className="sr-only">微信</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.32,13.31c0-3.16-3.11-5.72-6.96-5.72s-6.97,2.58-6.97,5.72c0,3.15,3.12,5.71,6.97,5.71c0.8,0,1.57-0.1,2.3-0.29L16.9,20l-1.18-2.14C18.38,16.67,19.32,15.1,19.32,13.31z M12.07,10.54c-0.57,0-1.04-0.47-1.04-1.04c0-0.57,0.47-1.04,1.04-1.04s1.04,0.47,1.04,1.04C13.11,10.07,12.64,10.54,12.07,10.54z M16.21,10.54c-0.57,0-1.04-0.47-1.04-1.04c0-0.57,0.47-1.04,1.04-1.04s1.04,0.47,1.04,1.04C17.24,10.07,16.77,10.54,16.21,10.54z M7.07,7.05c0-2.95,2.92-5.34,6.54-5.34c3.62,0,6.54,2.39,6.54,5.34c0,1.67-0.88,3.15-2.28,4.17l1.2,2.17l-2.45-1.31c-0.67,0.16-1.39,0.26-2.12,0.26C9.1,12.34,7.07,9.94,7.07,7.05z M9.11,5.15c-0.54,0-0.97,0.43-0.97,0.97s0.43,0.97,0.97,0.97c0.54,0,0.97-0.43,0.97-0.97S9.65,5.15,9.11,5.15z M14.03,5.15c-0.54,0-0.97,0.43-0.97,0.97s0.43,0.97,0.97,0.97s0.97-0.43,0.97-0.97S14.57,5.15,14.03,5.15z"/>
                </svg>
              </a>
              <a href="https://www.douyin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <span className="sr-only">抖音</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.2,6.76c-0.96,0-1.84-0.34-2.53-0.91c-0.69-0.57-1.15-1.36-1.27-2.25h-2.61v11.09c0,0.74-0.24,1.42-0.65,1.98c-0.4,0.56-0.97,0.98-1.64,1.18c-0.34,0.1-0.69,0.15-1.06,0.15c-0.69,0-1.34-0.17-1.91-0.48c-0.43-0.23-0.8-0.53-1.11-0.89c-0.72-0.84-1.15-1.94-1.1-3.15c0.06-1.47,0.81-2.75,1.96-3.49c0.68-0.44,1.48-0.69,2.33-0.69c0.24,0,0.48,0.02,0.71,0.06V7c-0.24-0.03-0.48-0.05-0.72-0.05c-1.41,0-2.72,0.44-3.8,1.18c-1.08,0.74-1.92,1.77-2.42,3C3.12,12.15,3,12.95,3,13.77C3,15.33,3.51,16.77,4.4,17.9c0.89,1.13,2.13,1.95,3.54,2.25c0.71,0.15,1.43,0.21,2.18,0.13c1.77-0.18,3.36-1.03,4.51-2.3c1.14-1.27,1.82-2.94,1.84-4.74V8.78c1.35,0.97,2.99,1.53,4.74,1.53V7.61C20.81,7.28,20.52,6.99,20.2,6.76z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {footerLinks.map((column, idx) => (
                <div key={idx}>
                  <h3 className="text-white text-lg font-medium mb-4">
                    {column.title}
                  </h3>
                  <ul className="space-y-2">
                    {column.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link 
                          to={link.path}
                          className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} AIMASTER在线课程平台. 保留所有权利
            </p>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-xs">
                  隐私政策
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-xs">
                  服务条款
                </Link>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-xs">
                  联系我们
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;