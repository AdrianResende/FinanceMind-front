import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function WelcomeCard() {
  return (
    <div className="rounded-lg border bg-gradient-to-br from-black to-gray-800 p-6 shadow-sm text-white">
      <h2 className="text-xl font-semibold">👋 Bem-vindo!</h2>
      <p className="mt-2 text-sm text-gray-200">
        Comece com a visão geral e entre para liberar simulações e explicações completas.
      </p>
      <div className="mt-4 flex gap-2">
        <Button 
          size="sm" 
          className="bg-white text-black hover:bg-gray-100"
          asChild
        >
          <Link to="/login">Fazer login</Link>
        </Button>
      </div>
    </div>
  );
}

