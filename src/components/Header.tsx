import MoonIcon from './icons/MoonIcon';

export default function Header() {
  return (
    <>
      <header className="bg-(image:--hero-mobile-light) md:bg-(image:--hero-desktop-light) h-[330px] p-5 md:p-0 bg-cover bg-center bg-no-repeat">
        <div className="max-container h-full">
          <div className="flex justify-center items-center h-full">
            <div className="w-[540px] my-0 mx-auto">
              <div className="list-header flex justify-between items-center mb-10">
                <h1 className="text-white text-[40px] leading-normal uppercase font-bold style not-italic tracking-[15px]">
                  todo
                </h1>
                <MoonIcon
                  fillColor="#FFFFFF"
                  hoverState="hover:fill-white cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
