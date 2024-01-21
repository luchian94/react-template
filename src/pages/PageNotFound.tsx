import { NavLink } from 'react-router-dom';

import { Button } from 'primereact/button';

export const PageNotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-neutral-100">
      <h1 className="text-9xl font-extrabold text-accent tracking-widest">404</h1>
      <p className="text-accent">Oops! La Page not found.</p>
      <Button className="mt-10">
        <NavLink to={'/'}>Back to home</NavLink>
      </Button>
    </div>
  );
};
