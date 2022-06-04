function LogoLetter({ text, green }: { text: string; green: boolean }) {
  return (
    <div
      className={
        "select-none w-5 h-5 flex items-center justify-center text-xs leading-none font-bold text-white text-center rounded-md " +
        (green
          ? "bg-green-500 shadow-green-800"
          : "bg-yellow-500 shadow-yellow-800")
      }
    >
      {text}
    </div>
  );
}

export function Logo() {
  return (
    <div className='flex justify-center gap-1 p-2'>
      <LogoLetter text='W' green={true} />
      <LogoLetter text='O' green={true} />
      <LogoLetter text='R' green={true} />
      <LogoLetter text='D' green={true} />
      <LogoLetter text='L' green={true} />
      <LogoLetter text='E' green={true} />
      <LogoLetter text='G' green={false} />
      <LogoLetter text='A' green={false} />
      <LogoLetter text='M' green={false} />
      <LogoLetter text='E' green={false} />
    </div>
  );
}
