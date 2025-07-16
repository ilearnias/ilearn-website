"use client";

import React from 'react';
import Container from '@/components/common/Container';
import Heading from '@/components/common/Heading';
import styles from '../../junior/components/community.module.scss';
import { FiSend, FiInstagram, FiFacebook, FiYoutube, FiLinkedin } from 'react-icons/fi';

interface SocialLinkProps {
  icon: React.ReactNode;
  platform: string;
  username?: string;
  href: string;
}

const SocialLink = ({ icon, platform, username, href }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.socialLink}
  >
    <div className={styles.iconWrapper}>
      {icon}
    </div>
    <div className={styles.textWrapper}>
      <div className={styles.platform}>{platform}</div>
      {username && <div className={styles.username}>{username}</div>}
    </div>
  </a>
);

const CommunitySection = () => {
  const socialLinks = [
    {
      icon: <FiInstagram className={styles.icon} />,
      platform: "Instagram",
      username: "@ilearnias.junior",
      href: "https://instagram.com/ilearnias.junior"
    },
    {
      icon: <FiFacebook className={styles.icon} />,
      platform: "Facebook",
      href: "#"
    },
    {
      icon: <FiYoutube className={styles.icon} />,
      platform: "YouTube",
      href: "#"
    },
    {
      icon: <FiLinkedin className={styles.icon} />,
      platform: "LinkedIn",
      href: "#"
    }
  ];

  return (
    <section className={styles.section}>
      <Container>
       

          <div className='_heading-box-title1 text-center'>Community & Social</div>
          {/* Telegram Community */}
          <div className={styles.telegramCard}>
            <div className={styles.telegramHeader}>
              <FiSend className={styles.telegramIcon} />
              <h3 className={styles.telegramTitle}>Join Our Telegram Community</h3>
            </div>
            <p className={styles.telegramDescription}>
            iLearn IAS Ignite Circle – Your UPSC Prep Circle
            </p>
            <button className={styles.telegramButton}>
              <FiSend className={styles.buttonIcon} />
              Join Telegram Group
            </button>
          </div>

          {/* Social Media Links */}
          <div className={styles.socialSection}>
            <h3 className={styles.socialTitle}>
              Engage with us on Social Media
            </h3>
            <div className={styles.socialGrid}>
              {socialLinks.map((link, index) => (
                <SocialLink key={index} {...link} />
              ))}
            </div>
          </div>

          {/* Knowledge Hub */}
          <div className={styles.knowledgeCard}>
            <div className='_heading-box-title1 text-center'>Knowledge Hub</div>
            
            <div className={styles.reelsGrid}>
              {/* Placeholder for Reels - Replace with actual embeds */}
              {[1, 2, 3].map((reel) => (
                <div key={reel} className={styles.reelPlaceholder}>
                  Reel {reel}
                </div>
              ))}
            </div>
          </div>
   
      </Container>
    </section>
  );
};

export default CommunitySection; 