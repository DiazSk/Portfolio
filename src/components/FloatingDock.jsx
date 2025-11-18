import { useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import PropTypes from 'prop-types';

const FloatingDock = ({
  items,
  className = '',
  magnification = 60,
  distance = 150,
  baseSize = 40
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ${className}`}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-4 px-4 pb-3 pt-2 rounded-2xl backdrop-blur-lg bg-black/40 border border-white/10 shadow-2xl"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            mouseX={mouseX}
            magnification={magnification}
            distance={distance}
            baseSize={baseSize}
            {...item}
          />
        ))}
      </motion.div>
    </div>
  );
};

const DockItem = ({ mouseX, icon, label, onClick, magnification, distance, baseSize }) => {
  const ref = useRef(null);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseSize };
    return val - rect.x - rect.width / 2;
  });

  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseSize, magnification, baseSize]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  });

  return (
    <motion.button
      ref={ref}
      style={{ width, height: width }}
      onClick={onClick}
      className="relative flex items-center justify-center text-white hover:cursor-pointer group"
    >
      <motion.div
        className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
      >
        {label}
      </motion.div>
      <div className="w-full h-full flex items-center justify-center">
        {typeof icon === 'string' ? (
          <img src={icon} alt={label} className="w-full h-full object-contain" />
        ) : (
          icon
        )}
      </div>
    </motion.button>
  );
};

FloatingDock.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func
    })
  ).isRequired,
  className: PropTypes.string,
  magnification: PropTypes.number,
  distance: PropTypes.number,
  baseSize: PropTypes.number
};

DockItem.propTypes = {
  mouseX: PropTypes.object.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  magnification: PropTypes.number.isRequired,
  distance: PropTypes.number.isRequired,
  baseSize: PropTypes.number.isRequired
};

export default FloatingDock;
