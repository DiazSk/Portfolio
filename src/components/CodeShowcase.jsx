import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import SpotlightCard from './SpotlightCard';
import Magnet from './Magnet';

const codeSnippets = [
  {
    id: 1,
    title: "Airflow DAG - Daily E-commerce Pipeline",
    language: "Python",
    icon: "🔄",
    gradient: "from-blue-500 to-cyan-500",
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
    title: "Flink Stream Processing - Crypto Aggregation",
    language: "Java",
    icon: "⚡",
    gradient: "from-purple-500 to-pink-500",
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
    title: "dbt SQL - Star Schema Transformation",
    language: "SQL",
    icon: "🗄️",
    gradient: "from-green-500 to-emerald-500",
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
    title: "Terraform IaC - AWS S3 Data Lake",
    language: "HCL",
    icon: "🏗️",
    gradient: "from-orange-500 to-red-500",
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

const CodeSnippet = ({ snippet, isActive }) => {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={snippet.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <SpotlightCard>
            <div className="bg-black/60 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{snippet.icon}</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{snippet.title}</h4>
                    <span className={`text-sm bg-gradient-to-r ${snippet.gradient} bg-clip-text text-transparent font-semibold`}>
                      {snippet.language}
                    </span>
                  </div>
                </div>
              </div>
              <pre className="overflow-x-auto">
                <code className="text-sm text-cyan-400 font-mono leading-relaxed">
                  {snippet.code}
                </code>
              </pre>
            </div>
          </SpotlightCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

CodeSnippet.propTypes = {
  snippet: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired
};

const CodeShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="c-space section-spacing">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-heading mb-4">Production Code Samples</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-3xl">
            Real code from production data engineering systems - Airflow orchestration,
            Flink stream processing, dbt transformations, and Terraform IaC
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-2"
        >
          {codeSnippets.map((snippet, idx) => (
            <Magnet key={snippet.id} strength={0.2}>
              <button
                onClick={() => setActiveTab(idx)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${activeTab === idx
                  ? `bg-gradient-to-r ${snippet.gradient} text-white shadow-lg`
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 border border-gray-700/50'
                  }`}
              >
                <span className="mr-2">{snippet.icon}</span>
                {snippet.language}
              </button>
            </Magnet>
          ))}
        </motion.div>

        {/* Code Display */}
        <div className="min-h-[400px]">
          {codeSnippets.map((snippet, idx) => (
            <CodeSnippet
              key={snippet.id}
              snippet={snippet}
              isActive={activeTab === idx}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 mt-8"
        >
          <Magnet>
            <button
              onClick={() => setActiveTab((prev) => (prev - 1 + codeSnippets.length) % codeSnippets.length)}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <span>←</span> Previous
            </button>
          </Magnet>
          <Magnet>
            <button
              onClick={() => setActiveTab((prev) => (prev + 1) % codeSnippets.length)}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-500/20"
            >
              Next <span>→</span>
            </button>
          </Magnet>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeShowcase;
