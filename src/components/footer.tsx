import { Heart } from 'lucide-react';
import Main from "@/components/main";

export default function Footer() {
  const elements = [
    'made',
    'with',
    <Heart size={19} fill="red" strokeWidth={0} key="footer-el-heart"/>,
    'by',
    'havus',
  ];

  return (
    <footer className='font-mono absolute bottom-0 w-full flex mt-24 items-center justify-center gap-2 p-3'>
      {elements.map((item, index) => (
        <span key={`footer-el-${index}`}>{item}</span>
      ))}
    </footer>
  );
}
