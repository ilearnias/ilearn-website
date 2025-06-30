import { Container } from "react-bootstrap";
import { twMerge } from 'tailwind-merge';
import "./styles.scss";

interface HeroSectionProps {
  title: string;
  pageName: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  breadcrumbClassName?: string;
}

const HeroSection = ({ 
  title, 
  pageName,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  titleClassName = '',
  breadcrumbClassName = ''
}: HeroSectionProps) => {
  // Base styles that should always be applied
  const baseStyles = {
    hero: 'common-hero',
    overlay: 'hero-overlay',
    content: 'hero-content',
    breadcrumb: 'breadcrumb'
  };

  return (
    <div className={twMerge(baseStyles.hero, className)}>
      <div className={twMerge(baseStyles.overlay, overlayClassName)}>
        <Container>
          <div className={twMerge(baseStyles.content, contentClassName)}>
            <h1 className={titleClassName}>{title}</h1>
            <div className={twMerge(baseStyles.breadcrumb, breadcrumbClassName)}>
              Home / <span className="active">{pageName}</span>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HeroSection; 