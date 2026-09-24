import type { Metadata } from "next";
import Resume from "@/components/resume";
import "./resume.css";

export const metadata: Metadata = {
  title: "이민형 — Resume",
  description: "A부터 E까지 모두 가능한 멀티플레이어 개발자, 이민형의 이력서",
};

export default function ResumePage() {
  return <Resume />;
}
