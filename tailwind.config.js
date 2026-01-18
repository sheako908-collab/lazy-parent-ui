/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主题色 - 极光绿（登录/家长端）
        'primary': '#0ff047',
        'primary-dark': '#0ab835',
        
        // 背景色
        'background-light': '#f5f8f6',
        'background-dark': '#102214',
        'surface-dark': '#193420',
        'border-dark': '#32673f',
        
        // 文字色
        'text-secondary': '#91ca9f',
        
        // AI伴学端主题色（粉红/橙色）
        'ai-primary': '#ec135b',
        'ai-orange': '#fb923c',
        'ai-green-light': '#dcfce7',
        'ai-green-dark': '#064e3b',
        
        // 任务工作台蓝色主题
        'task-primary': '#256af4',
      },
      fontFamily: {
        'display': ['Lexend', 'Noto Sans SC', 'sans-serif'],
        'body': ['Noto Sans SC', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
        'full': '9999px',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(15, 240, 71, 0.3)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.4)',
        'glow-primary': '0 0 20px -5px rgba(236, 19, 91, 0.4)',
        'glow-orange': '0 0 20px -5px rgba(251, 146, 60, 0.4)',
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
