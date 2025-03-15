import { unstable_setRequestLocale } from 'next-intl/server';
import ImageUploaderClient from './ImageUploaderClient';

export default function RemoveBgPage({ params }: { params: { locale: string } }) {
  // 在服务器组件中设置语言环境
  unstable_setRequestLocale(params.locale);
  
  // 渲染客户端组件
  return <ImageUploaderClient />;
}
