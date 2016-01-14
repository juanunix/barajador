unit SuperMemo2Plug;

interface

procedure Install(path:PChar); export;
procedure Initialize(path:PChar); export;
procedure Description(var text:PChar); export;
procedure Repetition(ElementNo,Grade:longint;var NextInterval:longint;commit:WordBool); export;
procedure ResetAlgorithm; export;

implementation

uses SysUtils,StdProcs;

const TheDescription='SuperMemo 2.0 Algorithm';

type TDataRecord=record

Interval:longint;
Repetition:byte;
EF:real;
end;

var DataFile:string;
Data:file of TDataRecord;

procedure Initialize(path:PChar);
var l:longint;
begin

l:=StrLen(path);
SetLength(DataFile,l);
Move(path^,pointer(DataFile)^,l);
DataFile:=DataFile+'\alg';
CreateDirectory(DataFile,false,false);
DataFile:=DataFile+'\sm2';
CreateDirectory(DataFile,false,false);
DataFile:=DataFile+'\eldata.dat';
end;
function GetDataRecord(ElementNo:longint):TDataRecord;
begin

with Result do begin
  Interval:=0;
  Repetition:=0;
  EF:=2.5;
end;
if DataFile='' then
  exit;
if not FileExists(DataFile) then
  exit;
AssignFile(Data,DataFile);
Reset(Data);
if FileSize(Data)<ElementNo then
  exit;
seek(Data,ElementNo-1);
read(Data,Result);
CloseFile(Data);
end;

procedure SetDataRecord(ElementNo:longint;DataRecord:TDataRecord);
var EmptyDataRecord:TDataRecord;
begin

  if DataFile='' then
    exit;
  AssignFile(Data,DataFile);
  if FileExists(DataFile) then
    Reset(Data)
  else
    Rewrite(Data);
  if ElementNo>FileSize(Data) then begin
    with EmptyDataRecord do begin
      Interval:=0;
      Repetition:=0;
      EF:=2.5;
    end;
    seek(Data,FileSize(Data));
    while ElementNo>FileSize(Data) do
    write(Data,EmptyDataRecord);
  end;
  seek(Data,ElementNo-1);
  write(Data,DataRecord);
  CloseFile(Data);
end;

procedure Repetition(ElementNo,Grade:longint;var NextInterval:longint;commit:WordBool);
var DataRecord:TDataRecord;
begin

  DataRecord:=GetDataRecord(ElementNo);
  with DataRecord do begin
    if Grade>=3 then begin
      if Repetition=0 then begin
        Interval:=1;
        Repetition:=1;
      end
      else if Repetition=1 then begin
        Interval:=6;
        Repetition:=2;
      end
      else begin
        Interval:=round(Interval*EF);
        Repetition:=Repetition+1;
      end;
    end
    else begin
      Repetition:=0;
      Interval:=1;
    end;

    EF:=EF+(0.1-(5-Grade)*(0.08+(5-Grade)*0.02));
    if EF<1.3 then
      EF:=1.3;
    NextInterval:=Interval;
  end;
  if commit then
    SetDataRecord(ElementNo,DataRecord);
end;

procedure ResetAlgorithm;
begin
  DeleteFile(DataFile);
end;

procedure Install(path:PChar);
var InstallPath:string;
l:longint;
begin

  l:=StrLen(path);
  SetLength(InstallPath,l);
  Move(path^,pointer(InstallPath)^,l);
  Msg('SuperMemo 2 Plug-In installed in: '+InstallPath);
end;

procedure Description(var text:PChar); 
begin
  text:=TheDescription;
end;

initialization

  DataFile:='';

end.
