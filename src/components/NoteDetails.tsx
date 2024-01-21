import { Card } from 'primereact/card';

export const NoteDetails = () => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">Title of note.</div>
        <div className="flex flex-col text-sm text-primary font-bold">
          <div>13-04-22</div>
          <div>writed by John Doe</div>
        </div>
      </div>
      <div>Description of problem.</div>
    </Card>
  );
};
