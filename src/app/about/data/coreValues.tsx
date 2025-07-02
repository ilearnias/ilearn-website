import { ReactNode } from 'react';
import { FaGraduationCap, FaUserFriends, FaChartLine, FaHeart } from "react-icons/fa";

export interface CoreValue {
  title: string;
  description: string;
  icon: ReactNode;
}

export const coreValues: CoreValue[] = [
  {
    title: "Academic Excellence",
    description: "Commitment to providing top-quality education and guidance",
    icon: <FaGraduationCap size={48} />,
  },
  {
    title: "Personal Mentorship",
    description: "Individual attention and support for every aspirant",
    icon: <FaUserFriends size={48} />,
  },
  {
    title: "Continuous Growth",
    description: "Focus on consistent improvement and development",
    icon: <FaChartLine size={48} />,
  },
  {
    title: "Student Care",
    description: "Nurturing environment that supports holistic growth",
    icon: <FaHeart size={48} />,
  },
]; 