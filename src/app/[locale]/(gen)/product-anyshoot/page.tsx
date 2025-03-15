import { unstable_setRequestLocale } from 'next-intl/server';
import VirtualFittingClient from './client';

export default function ProductAnyshoot({ params }: { params: { locale: string } }) {
  // 启用静态渲染
  unstable_setRequestLocale(params.locale);
  
  // 渲染客户端组件
  return <VirtualFittingClient />;
}