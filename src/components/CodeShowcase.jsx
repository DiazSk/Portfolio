import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const codeSnippets = [
  {
    id: 1,
    title: "ecommerce_pipeline.py",
    language: "Python",
    icon: "🐍",
    color: "text-blue-400",
    glow: "shadow-blue-500/20",
    code: `@dag(
    dag_id='ecommerce_analytics_pipeline',
    schedule_interval='@daily',
    start_date=datetime(2024, 1, 1),
    catchup=False
)
def ecommerce_pipeline():
    extract_task = extract_from_fakestore_api()
    validate_task = validate_data_quality()
    transform_task = dbt_run_models()
    load_task = load_to_warehouse()
    
    extract_task >> validate_task >> transform_task >> load_task`
  },
  {
    id: 2,
    title: "CryptoAggregator.java",
    language: "Java",
    icon: "☕",
    color: "text-orange-400",
    glow: "shadow-orange-500/20",
    code: `public class CryptoAggregator 
    extends ProcessWindowFunction<CryptoEvent, CryptoMetrics, 
                                   String, TimeWindow> {
    
    @Override
    public void process(String key, Context context,
                       Iterable<CryptoEvent> events,
                       Collector<CryptoMetrics> out) {
        
        double sum = 0, high = Double.MIN_VALUE;
        double low = Double.MAX_VALUE;
        
        for (CryptoEvent event : events) {
            sum += event.getPrice();
            high = Math.max(high, event.getPrice());
            low = Math.min(low, event.getPrice());
        }
        
        out.collect(new CryptoMetrics(key, sum/count, high, low));
    }
}`
  },
  {
    id: 3,
    title: "fact_orders.sql",
    language: "SQL",
    icon: "🗄️",
    color: "text-green-400",
    glow: "shadow-green-500/20",
    code: `-- models/marts/fact_orders.sql
WITH orders AS (
    SELECT * FROM {{ ref('stg_orders') }}
),
customers AS (
    SELECT * FROM {{ ref('dim_customers') }}
),
products AS (
    SELECT * FROM {{ ref('dim_products') }}
)

SELECT
    o.order_id,
    c.customer_key,
    p.product_key,
    o.quantity * p.unit_price AS revenue
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.customer_id
LEFT JOIN products p ON o.product_id = p.product_id`
  },
  {
    id: 4,
    title: "main.tf",
    language: "HCL",
    icon: "🏗️",
    color: "text-purple-400",
    glow: "shadow-purple-500/20",
    code: `resource "aws_s3_bucket" "data_lake" {
  bucket = "ecommerce-analytics-datalake"
  
  lifecycle_rule {
    enabled = true
    
    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }
    
    transition {
      days          = 90
      storage_class = "GLACIER"
    }
  }
  
  tags = {
    Environment = "Production"
    Project     = "Analytics"
  }
}`
  }
];

const SyntaxHighlighter = ({ code, language }) => {
  const highlight = (text) => {
    if (!text) return text;

    const tokens = [];
    const saveToken = (content, className) => {
      const id = `__TOKEN_${tokens.length}__`;
      tokens.push({ id, content: `<span class="${className}">${content}</span>` });
      return id;
    };

    // 1. Protect Strings and Comments first
    // Matches: Strings ("..." or '...') OR Comments (//..., #..., --...)
    text = text.replace(/((['"])(?:(?!\2).)*\2)|(\/\/.*$|#.*$|--.*$)/gm, (match, stringGroup, quote, commentGroup) => {
      if (stringGroup) {
        return saveToken(match, 'text-green-400');
      }
      if (commentGroup) {
        return saveToken(match, 'text-gray-500 italic');
      }
      return match;
    });

    // 2. Keywords (now safe from strings and comments)
    text = text.replace(/\b(def|class|import|from|return|if|else|for|while|public|void|extends|implements|new|resource|variable|output|module|provider|data|select|from|where|join|on|group|by|having|order|limit|with|as)\b/gi, '<span class="text-pink-400 font-bold">$1</span>');

    // 3. Functions/Decorators
    text = text.replace(/(@\w+)/g, '<span class="text-yellow-400">$1</span>');
    text = text.replace(/(\w+)\(/g, '<span class="text-blue-400">$1</span>(');

    // 4. Restore tokens
    tokens.forEach(token => {
      text = text.replace(token.id, token.content);
    });

    return text;
  };

  return (
    <div dangerouslySetInnerHTML={{ __html: highlight(code) }} />
  );
};

const TypingCode = ({ code, language }) => {
  const [displayedCode, setDisplayedCode] = useState('');

  useEffect(() => {
    setDisplayedCode('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < code.length) {
        setDisplayedCode(prev => prev + code.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 2); // Typing speed

    return () => clearInterval(interval);
  }, [code]);

  return (
    <pre className="font-mono text-sm md:text-base leading-relaxed overflow-x-auto p-4">
      <code className="language-javascript">
        <SyntaxHighlighter code={displayedCode} language={language} />
      </code>
    </pre>
  );
};

const TerminalWindow = ({ activeTab, setActiveTab }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  // Smooth out the rotation
  const springConfig = { damping: 20, stiffness: 100 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const activeSnippet = codeSnippets[activeTab];

  return (
    <motion.div
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto perspective-1000"
    >
      {/* Glow Effect behind the terminal */}
      <div
        className={`absolute -inset-4 bg-gradient-to-r ${activeSnippet.glow.replace('shadow-', 'from-').replace('/20', '/30')} to-transparent blur-3xl opacity-40 transition-colors duration-500 -z-10`}
      />

      <div className="relative bg-[#0c0c1d]/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        {/* Window Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="text-xs text-gray-400 font-mono flex items-center gap-2">
            <span className="opacity-50">~/projects/production/</span>
            <span className="text-white">{activeSnippet.title}</span>
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* Sidebar / Tabs */}
          <div className="w-full md:w-64 bg-black/20 border-r border-white/5 flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
            {codeSnippets.map((snippet, idx) => (
              <button
                key={snippet.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 w-full text-left border-l-2 whitespace-nowrap
                  ${activeTab === idx
                    ? `bg-white/5 text-white border-${snippet.color.split('-')[1]}-400`
                    : 'text-gray-500 border-transparent hover:bg-white/5 hover:text-gray-300'
                  }`}
              >
                <span className="text-lg">{snippet.icon}</span>
                <span>{snippet.title}</span>
              </button>
            ))}
          </div>

          {/* Code Area */}
          <div className="flex-1 relative bg-[#0c0c1d]/50">
            {/* Line Numbers Background */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-white/5 border-r border-white/5 hidden md:block" />

            <div className="relative z-10 pl-0 md:pl-14">
              <TypingCode code={activeSnippet.code} language={activeSnippet.language} />
            </div>
          </div>
        </div>

        {/* Footer Status Bar */}
        <div className="px-4 py-2 bg-white/5 border-t border-white/5 flex justify-between items-center text-xs text-gray-500 font-mono">
          <div className="flex gap-4">
            <span>NORMAL</span>
            <span>{activeSnippet.language}</span>
            <span>UTF-8</span>
          </div>
          <div className="flex gap-4">
            <span>Ln 1, Col 1</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CodeShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="c-space section-spacing overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-heading mb-4">Production Code Samples</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Explore the architecture of my production systems through this interactive terminal.
          </p>
        </motion.div>

        <div className="py-10 px-4">
          <TerminalWindow activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </section>
  );
};

export default CodeShowcase;
