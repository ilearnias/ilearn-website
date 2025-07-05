import { Container } from "react-bootstrap";
import { twMerge } from "tailwind-merge";
import "./styles.scss";
import Heading from "./Heading";

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
  // Base styles that should always be applied
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
            <Heading
              text={title}
              color="tricolor"
              className={titleClassName}
              animate={true}
            />
            {description && <p className="hero-description">{description}</p>}
            {buttons && <div className="hero-buttons">{buttons}</div>}
            {children}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;
