import Header from "@/components/header";

export default function Home() {

  const isButtonVisible = true;
  

  return (
    <div>
    <Header 
      title=" Welcome to our games !" 
      subtitle="The ultimate gaming experience" 
      isVisible={isButtonVisible}
      titleGame = ""
    />
    
  </div>
  );
}