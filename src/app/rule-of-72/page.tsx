import { Metadata } from 'next';
import RuleOf72PageClient from './RuleOf72PageClient';

export const metadata: Metadata = {
  title: 'Rule of 72 Calculator | FinIQ',
  description: 'Calculate how long it takes for your money to double using the Rule of 72. Learn this powerful financial concept for investment planning.',
  keywords: 'rule of 72, doubling time, investment calculator, compound interest, financial planning, money growth',
};

export default function RuleOf72Page() {
  return <RuleOf72PageClient />;
} 