import { IMAGES } from '@/constants/images';
import { LoginForm } from '@/features/login/components/LoginForm';

export function LoginPage() {
  return (
    <div className="flex h-dvh flex-1 justify-center">
      <div className="flex h-dvh w-full items-center justify-center p-12 lg:w-1/2 xl:w-5/12">
        <div className="w-full sm:mx-auto sm:max-w-sm">
          <h2 className="mb-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
          <LoginForm />
        </div>
      </div>
      <div className="hidden flex-1 text-center lg:flex">
        <div
          className="w-full bg-cover bg-left bg-no-repeat"
          style={{
            backgroundImage: `url(${IMAGES.loginBg})`,
          }}
        ></div>
      </div>
    </div>
  );
}
