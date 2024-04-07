import Image from "next/image";

export default function Home() {
  return (
    <div className={'w-full h-full flex flex-col items-center p-10'}>
      <h1 className={"text-3xl md:text-7xl mb-10 text-center font-black"}>To Do Board</h1>
      <Image
        src={'/images/todos.jpeg'}
        alt={"To Do"}
        width={800}
        height={0}
        className={'rounded-lg object-cover shadow-md shadow-blue-500'}
      />
    </div>
  );
}
