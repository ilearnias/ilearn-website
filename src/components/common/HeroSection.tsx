import { Container } from "react-bootstrap";
import { twMerge } from "tailwind-merge";
import "./styles.scss";

interface HeroSectionProps {
  title: string;
  pageName?: string;
  description?: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  breadcrumbClassName?: string;
  buttons?: React.ReactNode;
  children?: React.ReactNode;
}

const HeroSection = ({
  title,
  pageName,
  description,
  className = "",
  overlayClassName = "",
  contentClassName = "",
  titleClassName = "",
  breadcrumbClassName = "",
  buttons,
  children,
}: HeroSectionProps) => {
  const baseStyles = {
    hero: "common-hero",
    overlay: "hero-overlay",
    content: "hero-content",
    breadcrumb: "breadcrumb",
  };

  return (
    <div className={twMerge(baseStyles.hero, className)}>
      <div className={twMerge(baseStyles.overlay, overlayClassName)}>
        <Container>
          <div className={twMerge(baseStyles.content, contentClassName)}>
            <h1 className="_banner-header-txt1">{title}</h1>
            {description && (
              <p className="_banner-sub-header-txt1">{description}</p>
            )}
            {buttons && <div className="btn">{buttons}</div>}
            {children}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;