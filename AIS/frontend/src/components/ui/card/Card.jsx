/**
 * Card Component - Base UI Component
 * 
 * Reusable card wrapper component for consistent styling and spacing.
 * Perfect for product cards, feature boxes, and containers.
 */

import styles from './Card.module.css';

const Card = ({ children, className = '', hover = true, ...props }) => {
  const cardClasses = [
    styles.card,
    hover && styles.hover,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;
