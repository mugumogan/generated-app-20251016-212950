import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  postfix?: string;
  formatAsCurrency?: boolean;
}
export function AnimatedCounter({ value, prefix = '', postfix = '', formatAsCurrency = false }: AnimatedCounterProps) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => {
    const formattedValue = formatAsCurrency
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(current))
      : Math.round(current).toLocaleString();
    return `${prefix}${formattedValue}${postfix}`;
  });
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);
  return <motion.span>{display}</motion.span>;
}